import { create } from '@storybook/theming';

export default create({
  base: 'light',
  brandTitle: `掬一捧's Storybook`,
  brandUrl: 'https://solome.js.org/storybook',

  colorPrimary: '#e5f1f8',
  colorSecondary: '#258fb8',

  // UI
  appBg: '#e5f1f8',
  appContentBg: 'white',
  appBorderColor: 'white',
  appBorderRadius: 4,

  // Typography
  fontBase: `OpenDyslexic, 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`,
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'silver',
  barSelectedColor: '#0074bf',
  barBg: '#e5f1f8',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,
});

