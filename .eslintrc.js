module.exports = {
    "env": {
        "node": true,
        "mocha": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": { "experimentalObjectRestSpread": true }
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console": "off",
        "indent": ["error", 2],
        "new-cap": ["error"],
        "linebreak-style": ["error", "unix"],
        "padded-blocks": ["error", "never"],
        "eqeqeq": ["error", "always"],
        "semi": ["error", "never"],
        "no-else-return": ["error", { "allowElseIf": false }],
        "no-multi-spaces": ["error",  { "ignoreEOLComments": true }],
        "no-with": ["error"],
        "no-var": ["error"],
        "keyword-spacing": ["error", { "before": true , "after": true }],
        "max-statements-per-line": ["error", { "max": 1 }],
        "one-var": ["error", "never"],
        "space-in-parens": ["error", "never"],
        "one-var-declaration-per-line": ["error", "always"],
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "space-before-blocks": ["error", { "functions": "always", "keywords": "always", "classes": "always" }],
        "brace-style": ["error", "1tbs"],
        "quotes": ["error", "single", { "allowTemplateLiterals": true, "avoidEscape": true }],
        "space-before-function-paren": ["error", { "anonymous": "never", "named": "never", "asyncArrow": "always" }]
    }
}
