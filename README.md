# pptjsx

Declarative JSX-like syntax for defining pptx presentations to be rendered by pptxgenjs.

This is an early proof-of-concept, which works but with minimal features implemented.

## Usage

There is a bit of toolchain faffery to make this work - mainly around using a custom JSX
pragma with Babel. See `babel.config.js` for the babel config used by the demo.

So far there are three usable components - `presentation`, `slide` and `text`. They must be rendered
hierarchically, i.e.

```
const MyDeck = (
    <presentation>
        <slide>
            <text>Hello There</text>
        </slide>
        <slide>
            <text>Human Friend</text>
        </slide>
    </presentation>
);
```

To produce a file, use the exported `render` function, which will resolve to a pptxgenjs slideshow that
can be saved.

### Data Getting
To be useful, we're probably going to need some data, and it's probably going to be async. Because the model
here diverges from React, in that it won't "re-render" the presentation when props change, we can't use the
same model of HOCs. To get around this, we simply allow our components to be async functions, that must resolve
to valid components.

```
const MyDataSlide = async () => {
    const value = await callMyApi();

    return (
        <slide>
            <text>The value is: {value}</text>
        </slide>
    )
};
```

## Demo
There is a runnable demo included. In the root of the project run `yarn demo` and all necessary build steps will
be run. The source can be modified in `demo-src`.