import * as PPTJSX from "../lib";
import { withData } from "./withData";

const TestPresentation = ({ name }) => (
    <slide>
        <text x={0.5} y={1} fontSize={36}>
            Hello There {name}
        </text>
        <text x={0.8} y={1} fontSize={18}>
            Goodbye
        </text>
    </slide>
);

export const Test = withData(() => Promise.resolve({ name: "Alex" }))(
    TestPresentation
);
