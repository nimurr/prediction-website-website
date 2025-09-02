// tailwind.config.js
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}", // Adjust paths to fit your project structure
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4c1d95", // Custom primary color
                secondary: "#D97706", // Custom secondary color
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Custom font family
            },
            spacing: {
                '128': '32rem', // Custom spacing
                '144': '36rem',
            },
        },
    },
    plugins: [],
};
