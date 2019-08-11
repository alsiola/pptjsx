import * as PPTJSX from "../lib";

export const Slide2 = async ({ children }) => {
    const { name } = await Promise.resolve({ name: "Alex" });
    return (
        <slide>
            <text x={0.5} y={1} fontSize={36}>
                Hello There {name}
            </text>
            <text x={0.8} y={0.2} fontSize={18}>
                Goodbye
            </text>
            <text x={0.9} y={0.2} fontSize={18}>
                {children}
            </text>
        </slide>
    );
};
