/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./App.tsx",
    ],
    theme: {
      extend: {
        colors: {
            brand: {
                red: '#E60000',
            }
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }
