module.exports = {
  purge: ["./src/**/*.js"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', 
  theme: {},
  variants: {},
  plugins: [require("nightwind")]
}
