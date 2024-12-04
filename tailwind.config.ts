import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            'sm': '640px',
            'md': '1000px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        extend: {
            colors: {
                darkShades: {
                    100: "#121212",
                    200: "#282828",
                    300: "#3f3f3f",
                    400: "#575757",
                    500: "#717171",
                    600: "#8b8b8b",
                },
                lightShades: {
                    100: "#f5f5f5",
                    200: "#c8c8c8",
                    300: "#9c9c9c",
                    400: "#737373",
                    500: "#4c4c4c",
                    600: "#282828",
                },
                primary: {
                    10: "rgb(229 247 255)",
                    20: "rgb(209 237 249)",
                    50: "rgb(141,215,243)",
                    100: "#00a7e3",
                    200: "#1889b9",
                    300: "#1e6c91",
                    400: "#1e516b",
                    500: "#1a3747",
                    600: "#131e26",
                }
            },
            animation: {
                'confetti-cone': 'confetti-cone 1.2s ease infinite',
                'conf-dash': 'conf-dash 1.2s ease infinite',
                'conf-a': 'conf-a 1.2s ease-out infinite',
                'conf-b': 'conf-b 1.2s ease-out infinite',
                'conf-c': 'conf-c 1.2s ease-out infinite',
                'conf-d': 'conf-d 1.2s ease-out infinite',
            },
            keyframes: {
                'confetti-cone': {
                    '0%': {transform: 'translate(40px, 95px) rotate(45deg) scale(1, 1)'},
                    '15%': {transform: 'translate(10px, 145px) rotate(45deg) scale(1.1, 0.85)'},
                    '70%': {transform: 'translate(40px, 105px) rotate(45deg) scale(1, 1)'},
                    '100%': {transform: 'translate(40px, 105px) rotate(45deg) scale(1, 1)'},
                },
                'conf-dash': {
                    '0%': {
                        strokeDasharray: '1000',
                        strokeDashoffset: '500',
                        transform: 'translate(-30px, 30px)',
                        opacity: '0'
                    },
                    '2%': {
                        strokeDasharray: '1000',
                        strokeDashoffset: '500',
                        transform: 'translate(-30px, 30px)',
                        opacity: '0'
                    },
                    '35%': {
                        strokeDasharray: '1000',
                        strokeDashoffset: '900',
                        transform: 'translate(-2px, 0px)',
                        opacity: '1'
                    },
                    '75%': {
                        strokeDasharray: '1000',
                        strokeDashoffset: '1000',
                        transform: 'translate(1px, -5px)',
                        opacity: '1'
                    },
                    '90%': {
                        strokeDasharray: '1000',
                        strokeDashoffset: '1000',
                        transform: 'translate(2px, -8px)',
                        opacity: '0'
                    },
                    '100%': {
                        strokeDasharray: '1000',
                        strokeDashoffset: '500',
                        transform: 'translate(2px, -8px)',
                        opacity: '0'
                    },
                },
                'conf-a': {
                    '0%': {opacity: '0', transform: 'translate(-30px, 20px) rotate(0)'},
                    '15%': {opacity: '1', transform: 'translate(25px, -10px) rotate(60deg)'},
                    '70%': {opacity: '1', transform: 'translate(33px, -18px) rotate(180deg)'},
                    '100%': {opacity: '0', transform: 'translate(37px, -23px) scale(0.5) rotate(230deg)'},
                },
                'conf-b': {
                    '0%': {opacity: '0', transform: 'translate(-30px, 20px) rotate(0)'},
                    '15%': {opacity: '1', transform: 'translate(25px, -10px) rotate(60deg)'},
                    '70%': {opacity: '1', transform: 'translate(33px, -18px) rotate(180deg)'},
                    '100%': {opacity: '0', transform: 'translate(37px, -23px) scale(0.5) rotate(230deg)'},
                },
                'conf-c': {
                    '0%': {opacity: '0', transform: 'translate(-30px, 20px) rotate(0)'},
                    '15%': {opacity: '1', transform: 'translate(25px, -10px) rotate(60deg)'},
                    '70%': {opacity: '1', transform: 'translate(33px, -18px) rotate(180deg)'},
                    '100%': {opacity: '0', transform: 'translate(37px, -23px) scale(0.5) rotate(230deg)'},
                },
                'conf-d': {
                    '0%': {opacity: '0', transform: 'translate(-30px, 20px) rotate(0)'},
                    '15%': {opacity: '1', transform: 'translate(25px, -10px) rotate(60deg)'},
                    '70%': {opacity: '1', transform: 'translate(33px, -18px) rotate(180deg)'},
                    '100%': {opacity: '0', transform: 'translate(37px, -23px) scale(0.5) rotate(230deg)'},
                },
            }
        },
        gridTemplateRows: {
            '1': 'repeat(1, minmax(0, 1fr))',
            '2': 'repeat(2, minmax(0, 1fr))',
            '3': 'repeat(3, minmax(0, 1fr))',
            '4': 'repeat(4, minmax(0, 1fr))',
            '5': 'repeat(5, minmax(0, 1fr))',
            '6': 'repeat(6, minmax(0, 1fr))',
            '7': 'repeat(7, minmax(0, 1fr))',
            '8': 'repeat(8, minmax(0, 1fr))',
            '9': 'repeat(9, minmax(0, 1fr))',
            '10': 'repeat(10, minmax(0, 1fr))',
            '11': 'repeat(11, minmax(0, 1fr))',
            '12': 'repeat(12, minmax(0, 1fr))',
            '13': 'repeat(13, minmax(0, 1fr))',
            '14': 'repeat(14, minmax(0, 1fr))',
            '15': 'repeat(15, minmax(0, 1fr))',
            '16': 'repeat(16, minmax(0, 1fr))',
            '17': 'repeat(17, minmax(0, 1fr))',
            '18': 'repeat(18, minmax(0, 1fr))',
            '19': 'repeat(19, minmax(0, 1fr))',
            '20': 'repeat(20, minmax(0, 1fr))',
            '21': 'repeat(21, minmax(0, 1fr))',
            '22': 'repeat(22, minmax(0, 1fr))',
            '23': 'repeat(23, minmax(0, 1fr))',
            '24': 'repeat(24, minmax(0, 1fr))',
        },
        gridRow: {
            'span-1': 'span 1 / span 1',
            'span-2': 'span 2 / span 2',
            'span-3': 'span 3 / span 3',
            'span-4': 'span 4 / span 4',
            'span-5': 'span 5 / span 5',
            'span-6': 'span 6 / span 6',
            'span-7': 'span 7 / span 7',
            'span-8': 'span 8 / span 8',
            'span-9': 'span 9 / span 9',
            'span-10': 'span 10 / span 10',
            'span-11': 'span 11 / span 11',
            'span-12': 'span 12 / span 12',
            'span-13': 'span 13 / span 13',
            'span-14': 'span 14 / span 14',
            'span-15': 'span 15 / span 15',
            'span-16': 'span 16 / span 16',
            'span-17': 'span 17 / span 17',
            'span-18': 'span 18 / span 18',
            'span-19': 'span 19 / span 19',
            'span-20': 'span 20 / span 20',
            'span-21': 'span 21 / span 21',
            'span-22': 'span 22 / span 22',
            'span-23': 'span 23 / span 23',
            'span-24': 'span 24 / span 24',
        }
    },
    plugins: [
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require('@tailwindcss/forms'),
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require('tailwindcss-motion'),
    ],
    darkMode: "class",
}
export default config;