module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "darkgray": "#1d1d1d",
        "darkgray-trans": "rgb(21 21 21 / 0.90)",
        "lightblue": '#26d6fc',
        "magenta": '#d648d0',
        "trans-white": "rgba(255,255,255,0.1)"
      },
      screens: {
        'xs': '460px',
      },
    },
  },
  plugins: [],
}