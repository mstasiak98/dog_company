module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          grey: '#404040',
          purple: {
            dark: '#2E0152',
            light: '#3B24AD',
            medium: '#6504B5',
            low: '#664de5',
            hover: '#b4a4f4'
          }
        }
      }
    },
  },
  plugins: [],
}
