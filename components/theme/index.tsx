import { MantineThemeOverride } from '@mantine/core';
import { appColors } from '../appColors';
import { sfUIDisplay } from './sfUiDisplay';

export const defaultFonts = 'SF UI Display';

export const inputStyles = {
  input: {
    height: '40px',
    fontSize: '1rem',
    lineHeight: '1.5',
    borderRadius: 4,
    backgroundColor: 'transparent',
    border: '0.5px solid rgba(21, 21, 21, 0.06)',
    margin: '0px 6px',
    color: appColors?.blackPrimary,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: '#565C69',
    marginBottom: 8,
  },
};

export const buttonStyles = {
  root: {
    height: '3rem',
    background: appColors?.textColor,
    color: appColors?.white,
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.3s ease, color 0.3s ease, transform 0.2s ease',
    fontSize: '18px',
    '&:hover': {
      background: appColors?.textColor,
      transform: 'scale(1.03)',
    },
  },

  label: {
    fontSize: '1rem',
  },
};

export const checkboxStyles = {
  label: {
    display: 'block',
  },
};

export const appTheme: MantineThemeOverride = {
  black: appColors.blackPrimary,
  colors: {
    brand: [
      '#020217',
      '#060746',
      '#0B0C7D',
      '#0e10a4',
      '#1314d3',
      '#2c2eec',
      '#5b5cf1',
      '#8a8bf5',
      '#b9b9f9',
      '#e8e8fd',
    ],
  },
  primaryColor: 'brand',
  primaryShade: 2,
  defaultRadius: 'md',
  fontFamily: sfUIDisplay.style.fontFamily,
  headings: {
    fontFamily: sfUIDisplay.style.fontFamily,
  },
  components: {
    Input: {
      styles: () => ({
        input: inputStyles.input,
        label: inputStyles.label,
      }),
    },
    InputWrapper: {
      styles: () => ({
        label: inputStyles.label,
      }),
    },
    PasswordInput: {
      styles: () => ({
        innerInput: inputStyles.input,
      }),
    },
    Button: {
      styles: () => buttonStyles,
    },
    Checkbox: {
      styles: () => checkboxStyles,
    },
  },
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
};
