import * as PPTJSX from "../lib";

import { Test } from "./Slide1";
import { Slide2 } from "./Slide2";

const Deck = (
    <presentation>
        <Test />
        <Slide2>awesome</Slide2>
    </presentation>
);

PPTJSX.render(Deck).then(deck => {
    deck.save("deck");
});
