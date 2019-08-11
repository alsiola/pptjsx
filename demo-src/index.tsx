import * as PPTJSX from "../lib";

import { Test } from "./Slide1";

const Deck = (
    <presentation>
        <Test />
    </presentation>
);

PPTJSX.render(Deck).then(deck => {
    deck.save("deck");
});
