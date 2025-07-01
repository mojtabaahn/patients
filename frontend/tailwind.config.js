const {heroui} = require("@heroui/react");
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            'sans': ['Inter', ...defaultTheme.fontFamily.sans]
        },
        extend: {},
    },
    darkMode: "class",
    plugins: [heroui()],
}

