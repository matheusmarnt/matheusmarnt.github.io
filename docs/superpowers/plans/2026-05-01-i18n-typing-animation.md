# i18n and Typing Animation Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply i18n and translate texts for the "Engenheiro_de_Software" typing animation and the "profile.json" terminal, making the animation dynamic upon language change.

**Architecture:** Extend Alpine.js `translations` object and update reactive components to use these translations with `:key="lang"` for re-triggering animations.

**Tech Stack:** HTML, Alpine.js, Tailwind CSS.

---

### Task 1: Update Translation Keys

**Files:**
- Modify: `index.html:20-100` (within `translations` object)

- [ ] **Step 1: Add new keys to `translations`**

```javascript
// Add these to 'pt'
hero_role: 'Engenheiro_de_Software',
about_profile_role: 'Engenheiro de Software e Analista e Desenvolvedor de Sistemas',
about_profile_focus: 'Inovação Pública & Govtech',
about_profile_bio: 'Engenheiro apaixonado por criar soluções técnicas de alto padrão, com forte atuação em inovação pública, inteligência artificial e tecnologia para governos.',

// Add these to 'en'
hero_role: 'Software_Engineer',
about_profile_role: 'Software Engineer and Systems Analyst and Developer',
about_profile_focus: 'Public Innovation & Govtech',
about_profile_bio: 'Engineer passionate about creating high-standard technical solutions, with strong experience in public innovation, artificial intelligence and technology for governments.',
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat(i18n): add translation keys for hero and about profile"
```

### Task 2: Update Hero Typing Animation

**Files:**
- Modify: `index.html:345-355`

- [ ] **Step 1: Replace hardcoded text with translation helper**

```html
<!-- From -->
<div x-data="typingEffect('Engenheiro_de_Software')" :key="lang">
<!-- To -->
<div x-data="typingEffect(t('hero_role'))" :key="lang">
```

- [ ] **Step 2: Verify in browser**
Switch language and ensure the Hero role types out in the selected language.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(hero): translate and animate hero role"
```

### Task 3: Update About Me Terminal

**Files:**
- Modify: `index.html:440-450`

- [ ] **Step 1: Apply i18n and typing effect to terminal fields**

```html
<!-- Role field -->
&nbsp;&nbsp;<span class="text-cyan-300">"role"</span>: <span class="text-amber-300">"</span><span class="text-amber-300" x-data="typingEffect(t('about_profile_role'))" x-text="text" :key="lang"></span><span class="text-amber-300">"</span>,<br>

<!-- Focus field -->
&nbsp;&nbsp;<span class="text-cyan-300">"focus"</span>: <span class="text-amber-300">"</span><span class="text-amber-300" x-text="t('about_profile_focus')"></span><span class="text-amber-300">"</span>,<br>

<!-- Bio field -->
&nbsp;&nbsp;<span class="text-cyan-300">"bio"</span>: <span class="text-amber-300">"</span><span class="text-amber-300" x-text="t('about_profile_bio')"></span><span class="text-amber-300">"</span><br>
```

- [ ] **Step 2: Verify in browser**
Switch language and ensure terminal fields update correctly.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(about): translate and animate profile terminal"
```
