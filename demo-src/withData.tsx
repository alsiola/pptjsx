import * as PPTJSX from "../lib";

const _withData: any = (getter: any) => (Component: any) => async (
    props: any
) => {
    const data = await getter();

    return <Component {...data} {...props} />;
};

export const withData: (getter: any) => (component: any) => any = _withData;
