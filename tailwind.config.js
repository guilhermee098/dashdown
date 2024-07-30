/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      smallMobile: "320px",
      mediumMobile: "480px",
      verticalTablet: "768px",
      horizontalTablet: "1024px",
      smallDesktop: "1280px",
      largeDesktop: "1440px",
      extraLargeDesktop: "1920px",
      ultraWideDesktop: "2560px",
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
};
