module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    plugins: ['perfectionist', 'unused-imports', 'prettier'],
    extends: ['airbnb', 'airbnb/hooks', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            alias: {
                map: [['src', './src']],
                extensions: ['.js', '.jsx', '.json'],
            },
        },
    },
    /**
     * 0 ~ 'off'
     * 1 ~ 'warn'
     * 2 ~ 'error'
     */
    rules: {
        'no-use-before-define': 0,
        'no-alert': 0,
        camelcase: 0,
        'no-console': 0,
        'no-unused-vars': 0,
        'no-nested-ternary': 0,
        'no-param-reassign': 0,
        'no-underscore-dangle': 0,
        'no-restricted-exports': 0,
        'no-promise-executor-return': 0,
        'import/prefer-default-export': 0,
        'import/order': 0, // disable import ordering

        // 🚫 disable all "unused import" warnings
        'unused-imports/no-unused-imports': 0,
        'unused-imports/no-unused-vars': 0,

        // 🚫 disable restriction on ++ / --
        'no-plusplus': 0,

        // 🚫 disable escaping warning for quotes in JSX
        'react/no-unescaped-entities': 0,

        // 🚫 disable hook exhaustive deps warning
        'react-hooks/exhaustive-deps': 0,
        // disable all these noisy rules
        'import/no-extraneous-dependencies': 0,
        'react/jsx-no-useless-fragment': 0,
        'react/jsx-boolean-value': 0,
        'react/self-closing-comp': 0,
        'react/button-has-type': 0,
        'no-return-assign': 0,
        'arrow-body-style': 0,


        // react
        'react/prop-types': 0,
        'react/no-children-prop': 0,
        'react/react-in-jsx-scope': 0,
        'react/no-array-index-key': 0,
        'react/require-default-props': 0,
        'react/jsx-props-no-spreading': 0,
        'react/function-component-definition': 0,
        'react/jsx-no-duplicate-props': [1, { ignoreCase: false }],
        'react/jsx-no-useless-fragment': [1, { allowExpressions: true }],
        'react/no-unstable-nested-components': [1, { allowAsProps: true }],

        // jsx-a11y
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/control-has-associated-label': 0,

        // perfectionist (all sorting rules disabled)
        'perfectionist/sort-exports': 0,
        'perfectionist/sort-named-imports': 0,
        'perfectionist/sort-named-exports': 0,
        'perfectionist/sort-imports': 0,
    },
};