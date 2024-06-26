module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "unused-imports", "eslint-plugin-react"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "@typescript-eslint/no-unused-vars": "warn",
        "unused-imports/no-unused-imports": "warn",
        "react-refresh/only-export-components": "off",
        "react-hooks/exhaustive-deps": "off",
        "react/jsx-key": "warn",
    },
};

