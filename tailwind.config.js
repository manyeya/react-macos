module.exports = {
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'wallpaper': "url('assets/img/Desktop.png')",
       },colors:{
        'glass-color': 'rgba(255, 255, 255, 0.5)',
        'border-color': 'rgba(255, 255, 255, 0.18)'
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
