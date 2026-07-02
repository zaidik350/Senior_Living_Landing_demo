/** Tailwind config generated from the Google Stitch DESIGN.md tokens ("Clinical Clarity") */
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'secondary-container': '#fed65b',
        'surface-container-lowest': '#ffffff',
        'on-primary-container': '#8296b0',
        'secondary-fixed-dim': '#e9c349',
        'primary-fixed-dim': '#b4c8e4',
        'on-secondary': '#ffffff',
        'secondary-fixed': '#ffe088',
        outline: '#74777d',
        tertiary: '#08192c',
        'primary-fixed': '#d1e4ff',
        'outline-variant': '#c4c6cd',
        'tertiary-fixed-dim': '#b7c8e1',
        'surface-tint': '#4c6078',
        'on-error-container': '#93000a',
        'surface-container-high': '#e5e9eb',
        'on-error': '#ffffff',
        'surface-container-low': '#f1f4f6',
        background: '#f7fafc',
        'inverse-surface': '#2d3133',
        'surface-bright': '#f7fafc',
        'inverse-primary': '#b4c8e4',
        'inverse-on-surface': '#eef1f3',
        surface: '#f7fafc',
        secondary: '#735c00',
        'on-primary': '#ffffff',
        'on-tertiary-fixed': '#0b1c30',
        'on-primary-fixed': '#061d32',
        'on-background': '#181c1e',
        'on-secondary-fixed': '#241a00',
        'surface-variant': '#e0e3e5',
        'on-secondary-container': '#745c00',
        'on-surface-variant': '#43474d',
        'tertiary-container': '#1e2e42',
        error: '#ba1a1a',
        'surface-container-highest': '#e0e3e5',
        'on-surface': '#181c1e',
        'primary-container': '#1a2e44',
        primary: '#03192e',
        'surface-dim': '#d7dadc',
        'on-secondary-fixed-variant': '#574500',
        'on-tertiary': '#ffffff',
        'error-container': '#ffdad6',
        'tertiary-fixed': '#d3e4fe',
        'on-tertiary-container': '#8596ae',
        'surface-container': '#ebeef0',
        'on-tertiary-fixed-variant': '#38485d',
        'on-primary-fixed-variant': '#35485f'
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem'
      },
      spacing: {
        'stack-md': '16px',
        'container-max': '1280px',
        gutter: '24px',
        'margin-desktop': '40px',
        'margin-mobile': '16px',
        'stack-sm': '8px',
        'stack-lg': '32px',
        unit: '8px'
      },
      fontFamily: {
        'body-sm': ['Inter'],
        'label-sm': ['Inter'],
        'headline-lg': ['Inter'],
        'body-lg': ['Inter'],
        'display-lg': ['Inter'],
        'label-md': ['Inter'],
        'headline-md': ['Inter'],
        'headline-lg-mobile': ['Inter'],
        'body-md': ['Inter']
      },
      fontSize: {
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'label-sm': ['12px', { lineHeight: '1', fontWeight: '500' }],
        'headline-lg': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'display-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'label-md': ['14px', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-lg-mobile': ['24px', { lineHeight: '1.2', fontWeight: '600' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }]
      }
    }
  },
  plugins: [forms]
}
