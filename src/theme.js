import { Platform } from "react-native";

const theme = {
  colors: {
    textBlack: '#1a1a1a',
    textGray: '#474747',
    textWhite: '#f0f0f0',

    error: '#d73a4a',

    primaryPurple: '#8d49c4',
    secondaryDark: '#242424',
  },
  fontSizes: {
    header: 18,
    subheading: 16,
    body: 14,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
