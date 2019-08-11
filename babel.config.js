const presets = [["@babel/preset-typescript", { jsxPragma: "PPTJSX" }]];

const plugins = [
    ["@babel/plugin-transform-react-jsx", { pragma: "PPTJSX.c" }],
    ["@babel/plugin-transform-modules-commonjs"]
];

module.exports = { presets, plugins };
