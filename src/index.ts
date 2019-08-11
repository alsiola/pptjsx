import pptxgen from "pptxgenjs";
import { map } from "bluebird";

enum Element {
    slide = "slide",
    text = "text",
    presentation = "presentation"
}

interface Node {
    element: Element | ((props: any) => Node);
    props: any;
    children: Node[];
}

export const c = (element: Element, props: any, ...children: Node[]): Node => ({
    element,
    props,
    children
});

const normalize = async normalChild => {
    if (Array.isArray(normalChild.element)) {
        normalChild.element = await map(normalChild.element, async f => {
            return typeof f === "function"
                ? f({
                      ...normalChild.props,
                      children: await normalize(normalChild.children)
                  })
                : f;
        });
    }

    if (typeof normalChild.element === "function") {
        normalChild = await normalChild.element({
            ...normalChild.props,
            children: await normalize(normalChild.children)
        });
    }

    if (typeof normalChild.element === "function") {
        return normalize(normalChild);
    }

    return normalChild;
};

export const render = async (...els: Node[]) => {
    if (els.length !== 1) {
        throw new Error("Only a single presentation can be rendered");
    }

    const [{ element, children }] = els;

    if (element !== Element.presentation) {
        throw new Error("Root element must be a presentation");
    }
    const PPTX = new pptxgen();

    const normalChildren = await map(children, normalize);

    normalChildren.forEach(child => {
        if (child.element !== Element.slide) {
            throw new Error(
                "Only slides can be direct descendants of presentation"
            );
        }

        renderSlide(PPTX, child);
    });

    return PPTX;
};

const renderSlide = (pptx: any, { props, children }: Node) => {
    const slide = pptx.addNewSlide();

    return children.reduce((sl, child) => renderSlideContent(sl, child), slide);
};

const renderSlideContent = (slide: any, child: Node) => {
    switch (child.element) {
        case Element.slide:
            throw new Error("Slide cannot be a child of slide");
        case Element.text:
            slide.addText(child.children.join(""), child.props);
    }

    return slide;
};
