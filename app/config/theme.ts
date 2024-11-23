const tintColor = "#4894FE";
const fillColor = "#63B4FF10";

export const Theme = {
  colors: {
    title: "#000",
    description: "#8696BB",
    lightDescription: "#CBE1FF",
    inputBackground: "#FAFAFC",
    borderColor: "#F4F4F6",
    inputColor: "#B2BCC9",
    error: "#ef4444",
    background: "#fff",
    mainColor: tintColor,
    fillColor: fillColor,
    icon: "#687076",
    tabIconDefault: "#687076",
    white: "#fff",
    black: "#000",
    yellow: "#FEB052",
  },
  fonts: {
    thin: "Poppins_100Thin",
    thinItalic: "Poppins_100Thin_Italic",
    extraLight: "Poppins_200ExtraLight",
    extraLightItalic: "Poppins_200ExtraLight_Italic",
    light: "Poppins_300Light",
    lightItalic: "Poppins_300Light_Italic",
    regular: "Poppins_400Regular",
    regularItalic: "Poppins_400Regular_Italic",
    medium: "Poppins_500Medium",
    mediumItalic: "Poppins_500Medium_Italic",
    semiBold: "Poppins_600SemiBold",
    semiBoldItalic: "Poppins_600SemiBold_Italic",
    bold: "Poppins_700Bold",
    boldItalic: "Poppins_700Bold_Italic",
    extraBold: "Poppins_800ExtraBold",
    extraBoldItalic: "Poppins_800ExtraBold_Italic",
    black: "Poppins_900Black",
    blackItalic: "Poppins_900Black_Italic",
  },
  sizes: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "60px",
  },
} as const;
