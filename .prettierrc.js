module.exports = {
  // Formatting options
  arrowParens: 'avoid',
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  endOfLine: 'auto',

  // Bracket spacing
  bracketSpacing: true,
  bracketSameLine: false,

  // JSX options
  jsxSingleQuote: false,

  // Override for specific file types
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
      },
    },
    {
      files: ['*.md', '*.mdx'],
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
  ],
};
