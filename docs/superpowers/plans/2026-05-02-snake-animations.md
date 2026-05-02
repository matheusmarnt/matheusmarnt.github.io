# Snake Game Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement animated snake mouth (Pac-Man style) and food explosion effect.

**Architecture:** Extend Alpine.js state with `particles` and `mouthOpen`. Update drawing loop to calculate distance-based mouth aperture and handle particle lifecycle.

**Tech Stack:** HTML5 Canvas, Alpine.js, JavaScript.

---

### Task 1: Extend State and Particle Methods

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add state variables to `snakeGame` data object.**

```javascript
// Add after speed: 120,
particles: [],
mouthOpen: 0,
```

- [ ] **Step 2: Initialize state in `reset()` method.**

```javascript
// Add inside reset()
this.particles = [];
this.mouthOpen = 0;
```

- [ ] **Step 3: Implement `createExplosion` and `updateParticles` methods.**

```javascript
// Add after roundRect method
createExplosion(x, y) {
    const color = '#10b981'; // Food color
    for (let i = 0; i < 12; i++) {
        this.particles.push({
            x: x + this.box / 2,
            y: y + this.box / 2,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 1.0,
            size: Math.random() * 3 + 2
        });
    }
},

updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.05;
        if (p.life <= 0) {
            this.particles.splice(i, 1);
        }
    }
},
```

- [ ] **Step 4: Commit changes.**

```bash
git add index.html
git commit -m "feat(snake): add particle state and lifecycle methods"
```

---

### Task 2: Implement Proximity-based Mouth Animation

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Calculate distance and update `mouthOpen` in `draw()`.**

```javascript
// Add at start of draw()
const head = this.snake[0];
if (head && this.food) {
    const dx = head.x - this.food.x;
    const dy = head.y - this.food.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const targetMouth = dist < this.box * 3 ? Math.max(0, 1 - dist / (this.box * 3)) : 0;
    this.mouthOpen = this.mouthOpen * 0.7 + targetMouth * 0.3; // Smoothing
}
```

- [ ] **Step 2: Update head drawing logic to use `ctx.arc` for mouth.**

```javascript
// Replace if (i === 0) block inside for loop
if (i === 0) {
    this.ctx.fillStyle = '#00f0ff';
    const centerX = this.snake[i].x + this.box / 2;
    const centerY = this.snake[i].y + this.box / 2;
    const radius = this.box / 2;
    
    let rotation = 0;
    if (this.d === 'RIGHT') rotation = 0;
    if (this.d === 'DOWN') rotation = Math.PI / 2;
    if (this.d === 'LEFT') rotation = Math.PI;
    if (this.d === 'UP') rotation = 3 * Math.PI / 2;

    const opening = this.mouthOpen * 0.25 * Math.PI;

    this.ctx.beginPath();
    this.ctx.moveTo(centerX, centerY);
    this.ctx.arc(centerX, centerY, radius, rotation + opening, rotation + 2 * Math.PI - opening);
    this.ctx.closePath();
    this.ctx.fill();

    // Eyes
    this.ctx.fillStyle = 'black';
    let eyeSize = 2;
    let eyeX, eyeY1, eyeY2;
    if (this.d == 'RIGHT' || this.d == 'LEFT') {
        eyeX = this.d == 'RIGHT' ? centerX + 2 : centerX - 2;
        this.ctx.beginPath();
        this.ctx.arc(eyeX, centerY - 5, eyeSize, 0, Math.PI * 2);
        this.ctx.arc(eyeX, centerY + 5, eyeSize, 0, Math.PI * 2);
        this.ctx.fill();
    } else {
        eyeY = this.d == 'DOWN' ? centerY + 2 : centerY - 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX - 5, eyeY, eyeSize, 0, Math.PI * 2);
        this.ctx.arc(centerX + 5, eyeY, eyeSize, 0, Math.PI * 2);
        this.ctx.fill();
    }
    continue; // Skip standard roundRect for head
}
```

- [ ] **Step 3: Commit changes.**

```bash
git add index.html
git commit -m "feat(snake): implement distance-based mouth opening animation"
```

---

### Task 3: Implement Food Explosion and Particle Rendering

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Trigger explosion on food collision.**

```javascript
// Add inside collision block: if (snakeX == this.food.x && snakeY == this.food.y)
this.createExplosion(this.food.x, this.food.y);
```

- [ ] **Step 2: Update and draw particles in `draw()`.**

```javascript
// Add at end of draw()
this.updateParticles();
this.particles.forEach(p => {
    this.ctx.fillStyle = `rgba(16, 185, 129, ${p.life})`;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    this.ctx.fill();
});
```

- [ ] **Step 3: Commit changes.**

```bash
git add index.html
git commit -m "feat(snake): trigger food explosion and render particles"
```
