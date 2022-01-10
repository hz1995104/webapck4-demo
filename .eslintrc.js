module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb', // 主流的eslint配置
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-console': 'off',
    'no-plusplus': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
      },
    ],
    'max-classes-per-file': [
      'error',
      { ignoreExpressions: true, max: 4 },
    ],
  },
};
