# Design Spec: i18n and Typing Animation Enhancement

## Overview
Apply internationalization (i18n) to the "Engenheiro de Software" typing animation in the Hero section and the profile terminal in the "About Me" section. Enhance the typing effect to be dynamic and re-triggerable upon language change.

## Proposed Changes

### 1. Translation Keys
Add the following keys to the `translations` object in `index.html`:

**Portuguese (pt):**
- `hero_role`: 'Engenheiro_de_Software'
- `about_role_full`: 'Engenheiro de Software e Analista e Desenvolvedor de Sistemas'
- `about_focus_full`: 'Inovação Pública & Govtech'
- `about_bio_full`: 'Engenheiro apaixonado por criar soluções técnicas de alto padrão, com forte atuação em inovação pública, inteligência artificial e tecnologia para governos.'

**English (en):**
- `hero_role`: 'Software_Engineer'
- `about_role_full`: 'Software Engineer and Systems Analyst and Developer'
- `about_focus_full`: 'Public Innovation & Govtech'
- `about_bio_full`: 'Engineer passionate about creating high-standard technical solutions, with strong experience in public innovation, artificial intelligence and technology for governments.'

### 2. Hero Section Update
- Locate the typing animation in the Hero section.
- Replace the hardcoded `'Engenheiro_de_Software'` with `t('hero_role')`.
- Ensure `:key="lang"` is present to trigger re-animation on language switch.

### 3. About Me Terminal Update
- Apply `x-data="typingEffect(t('about_role_full'))"` to the "role" value in the terminal.
- Apply i18n to "focus" and "bio" fields using `x-text="t('...')"` (or `typingEffect` if desired for consistency).
- Use `:key="lang"` on the terminal or specific fields to ensure re-animation/update.

## Technical Implementation
- **Alpine.js**: Use `x-data`, `x-text`, and `:key` for dynamic behavior.
- **i18n**: Leverage the existing `t(key)` helper function.

## Verification Plan
- Switch language between PT and EN.
- Verify that the Hero role updates and re-animates.
- Verify that the About Me terminal fields update and the role re-animates.
