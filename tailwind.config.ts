
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Apple-inspired design system com paleta personalizada
				brand: {
					purple: '#9B90F9',
					'purple-medium': '#3B2FA4', 
					'purple-dark': '#191250',
					'purple-black': '#191332'
				},
				primary: {
					DEFAULT: '#9B90F9',
					foreground: '#191332',
					50: '#F5F3FF',
					100: '#EDE9FE', 
					500: '#9B90F9',
					600: '#3B2FA4',
					700: '#191250',
					900: '#191332'
				},
				secondary: {
					DEFAULT: '#3B2FA4',
					foreground: '#F5F3FF'
				},
				accent: {
					DEFAULT: '#191250',
					foreground: '#F5F3FF'
				},
				background: '#FAFAFA',
				foreground: '#191332',
				card: {
					DEFAULT: 'rgba(255, 255, 255, 0.8)',
					foreground: '#191332'
				},
				popover: {
					DEFAULT: 'rgba(255, 255, 255, 0.95)',
					foreground: '#191332'
				},
				muted: {
					DEFAULT: '#F5F5F7',
					foreground: '#6B7280'
				},
				border: '#E5E7EB',
				input: '#F3F4F6',
				ring: '#9B90F9',
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF'
				},
				sidebar: {
					DEFAULT: 'rgba(255, 255, 255, 0.8)',
					foreground: '#191332',
					primary: '#9B90F9',
					'primary-foreground': '#191332',
					accent: 'rgba(155, 144, 249, 0.1)',
					'accent-foreground': '#191332',
					border: 'rgba(229, 231, 235, 0.6)',
					ring: '#9B90F9'
				}
			},
			borderRadius: {
				lg: '16px',
				md: '12px', 
				sm: '8px',
				xl: '20px',
				'2xl': '24px'
			},
			fontFamily: {
				sans: [
					'-apple-system',
					'BlinkMacSystemFont', 
					'SF Pro Display',
					'SF Pro Text',
					'system-ui',
					'sans-serif'
				]
			},
			fontSize: {
				'2xs': ['10px', '14px'],
				'xs': ['12px', '16px'],
				'sm': ['14px', '20px'],
				'base': ['16px', '24px'],
				'lg': ['18px', '28px'],
				'xl': ['20px', '28px'],
				'2xl': ['24px', '32px'],
				'3xl': ['30px', '36px'],
				'4xl': ['36px', '40px'],
				'5xl': ['48px', '1'],
				'6xl': ['60px', '1'],
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
			},
			backdropBlur: {
				xs: '2px',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'bounce-subtle': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-2px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite'
			},
			boxShadow: {
				'apple': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
				'apple-lg': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'apple-xl': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
				'glow': '0 0 20px rgba(155, 144, 249, 0.3)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
