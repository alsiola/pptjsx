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

export const render = async (...els: Node[]) => {
    if (els.length !== 1) {
        throw new Error("Only a single presentation can be rendered");
    }

    const [{ element, props, children }] = els;

    if (element !== Element.presentation) {
        throw new Error("Root element must be a presentation");
    }
    const PPTX = new pptxgen();

    const normalize = async normalChild => {
        if (Array.isArray(normalChild.element)) {
            normalChild.element = await map(normalChild.element, f => {
                return typeof f === "function" ? f(normalChild.props) : f;
            });
        }

        if (typeof normalChild.element === "function") {
            normalChild = await normalChild.element(normalChild.props);
        }

        if (typeof normalChild.element === "function") {
            return normalize(normalChild);
        }

        return normalChild;
    };

    await map(children, normalize, { concurrency: 1 }).then(normalChildren => {
        normalChildren.forEach(child => {
            if (child.element !== Element.slide) {
                console.log(child);
                throw new Error(
                    "Only slides can be direct descendants of presentation"
                );
            }

            renderSlide(PPTX, child);
        });
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
