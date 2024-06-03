/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      backgroundImage: {
        'login-img': "url('/src/assets/images/login-2.jpg')",
        'footer-texture': "url('/img/footer-texture.png')"
      },
      backgroundColor: {
        'main-color': '#0070f4',
        'hover-main': '#005ac3'
      }
    }
  },
  plugins: [flowbite.plugin()]
}
