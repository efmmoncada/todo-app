module.exports = {
    extends: ['airbnb', 'prettier'],
    rules: {
        'func-names': ['error', 'never'],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }], // devDependencies is ok
        'max-len': [
            2,
            {
                code: 120,
                ignorePattern: '^import .*', // Dont report line length errors on import lines.
            },
        ],
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                arrowParens: 'always',
                trailingComma: 'all',
            },
        ],

        'import/prefer-default-export': 'off',
        'no-console': ['warn', { allow: ['warn', 'error', 'debug'] }], // only console.log or console.info will cause warning
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
        'react/jsx-key': [1, { checkFragmentShorthand: true }], // Show us React "missing key" errors before rendering

        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
    },
    overrides: [
        {
            files: '**/*.js',
            rules: {
                '@typescript-eslint/no-var-requires': 'off', // ok to require() in node files.
                '@typescript-eslint/explicit-function-return-type': 'off',
            },
        },
        {
            files: '**/*.jsx',
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
            },
        },
    ],
};
