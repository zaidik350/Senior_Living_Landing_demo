---
name: Clinical Clarity
colors:
  surface: '#f7fafc'
  surface-dim: '#d7dadc'
  surface-bright: '#f7fafc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f6'
  surface-container: '#ebeef0'
  surface-container-high: '#e5e9eb'
  surface-container-highest: '#e0e3e5'
  on-surface: '#181c1e'
  on-surface-variant: '#43474d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eef1f3'
  outline: '#74777d'
  outline-variant: '#c4c6cd'
  surface-tint: '#4c6078'
  primary: '#03192e'
  on-primary: '#ffffff'
  primary-container: '#1a2e44'
  on-primary-container: '#8296b0'
  inverse-primary: '#b4c8e4'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#08192c'
  on-tertiary: '#ffffff'
  tertiary-container: '#1e2e42'
  on-tertiary-container: '#8596ae'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e4ff'
  primary-fixed-dim: '#b4c8e4'
  on-primary-fixed: '#061d32'
  on-primary-fixed-variant: '#35485f'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7fafc'
  on-background: '#181c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The brand personality is authoritative yet empathetic, balancing the precision of AI technology with the warmth required in the senior living and healthcare sectors. The design system is engineered to build immediate trust with Executive Directors and Marketing Directors, moving away from "tech-heavy" aesthetics toward a "high-touch professional" feel.

The design style is **Corporate Modern with a Warm Humanist edge**. It prioritizes extreme legibility and a sense of calm reliability. We utilize a "Sophisticated Minimalist" approach: heavy emphasis on structured whitespace to reduce cognitive load, balanced by rich, traditional accent colors that evoke a sense of established prestige and stability. The emotional response should be one of "quiet confidence" and "measured intelligence."

## Colors

The palette is anchored by **Deep Navy Blue**, representing the "Clinical" and "Authoritative" aspect of the lead conversion platform. This is the primary color for navigation, primary buttons, and heavy headings.

The **Warm Gold/Amber** is used sparingly as a strategic accent. It serves to highlight high-value actions, conversion metrics, and "human-touch" moments, providing a warm contrast to the cooler navy. **Soft Gray** is utilized for background surfaces to prevent eye strain on large dashboards, while **Crisp White** is reserved for content containers to create a "layered" depth. High-contrast text ensures WCAG AA compliance throughout the interface.

## Typography

This design system utilizes **Inter** exclusively for its utilitarian precision and exceptional legibility in data-heavy environments. 

Headlines use a tighter letter-spacing and heavier weights to establish a clear hierarchy, appearing in Deep Navy Blue. Body text uses a generous 1.6x line height to ensure readability for a demographic that values clarity and ease of use. Data labels and captions utilize a medium weight and slight tracking to distinguish them from standard body copy. On mobile, display sizes scale down significantly to ensure lead management tools remain functional in the field.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid with Fluid Interior** model. On desktop, content is housed within a 1280px central container to prevent line lengths from becoming unreadable. We use a strictly 8px-based spacing rhythm.

- **Desktop:** 12-column grid, 24px gutters, 40px outer margins.
- **Tablet:** 8-column grid, 16px gutters, 24px outer margins.
- **Mobile:** 4-column grid, 16px gutters, 16px outer margins.

The system emphasizes "Generous Breathing Room." Vertical stacks (e.g., between card components) should favor `stack-lg` to maintain a sense of calm and order. Dashboard widgets should use a uniform 24px internal padding.

## Elevation & Depth

To convey credibility, we avoid aggressive shadows or "floating" effects. Instead, we use **Tonal Layers** combined with **Ambient, Low-Opacity Shadows**.

- **Level 0 (Background):** Soft Gray (#F4F7F9).
- **Level 1 (Cards/Surface):** White (#FFFFFF) with a 1px border in a slightly darker gray (#E2E8F0). No shadow.
- **Level 2 (Active/Hover):** White (#FFFFFF) with a soft, diffused shadow: `0px 4px 12px rgba(26, 46, 68, 0.05)`.
- **Level 3 (Modals/Popovers):** White (#FFFFFF) with a deeper, more defined shadow: `0px 12px 32px rgba(26, 46, 68, 0.12)`.

This creates a sense of "physical sheets of paper" on a desk, which is intuitive and grounded for the target audience.

## Shapes

The shape language is **Soft (0.25rem)**. This choice reflects a professional middle ground—avoiding the clinical coldness of sharp corners while steering clear of the "bubbly" or "juvenile" feel of highly rounded corners common in consumer-facing startups.

- **Buttons & Inputs:** 4px (0.25rem) corner radius.
- **Cards & Containers:** 8px (0.5rem) corner radius.
- **Featured Banners:** 12px (0.75rem) corner radius.

This subtle rounding provides a modern touch while maintaining the architectural integrity of a professional B2B platform.

## Components

### Buttons
- **Primary:** Deep Navy Blue background, White text. 4px radius. Uses `label-md` for text.
- **Secondary:** Transparent background, Deep Navy Blue border (1px), Deep Navy Blue text.
- **Accent:** Warm Gold background, Deep Navy Blue text. Used only for "Primary Conversion" actions (e.g., "Schedule Tour" or "Book Lead").

### Inputs & Forms
- Fields use a white background with a 1px border (#E2E8F0). 
- On focus, the border changes to Deep Navy Blue with a 2px soft outer glow in the same color (10% opacity).
- Labels are always positioned above the field using `label-sm`.

### Cards
- White background, 1px Soft Gray border, 8px radius.
- Padding should be a consistent 24px (`stack-lg`).
- Header sections within cards should have a subtle 1px bottom border to separate titles from data.

### Chips/Status Indicators
- Used for lead status (e.g., "New," "In Progress," "Converted").
- Use high-saturation, low-brightness colors (e.g., Navy, Forest Green, Deep Amber) with a 10% opacity background of the same hue for a professional "pill" look.

### Lists & Data Tables
- Rows should have a minimum height of 56px to ensure readability.
- Use zebra-striping with #F8FAFC on even rows for complex lead lists.
- Column headers use `label-md` in Gray-600.