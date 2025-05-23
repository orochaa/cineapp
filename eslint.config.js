import plugin from 'eslint-plugin-mist3rbru'

export default [
  plugin.configs.react,
  {
    rules: {
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
    },
  },
]
