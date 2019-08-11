import * as PPTJSX from "../lib";
import { withData } from "./withData";

export const Slide2 = async () => {
    const { name } = await Promise.resolve({ name: "Alex" });
    return (
        <slide>
            <text x={0.5} y={1} fontSize={36}>
                Hello There {name}
            </text>
            <text x={0.8} y={1} fontSize={18}>
                Goodbye
            </text>
        </slide>
    );
};
