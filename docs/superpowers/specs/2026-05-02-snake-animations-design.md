# Design Spec: Snake Game Animations (UX Pro Max)

Implement advanced animations for the snake game in `index.html`, including a dynamic mouth (Pac-Man style) and a particle explosion effect.

## 1. State Extensions
- `particles`: Array for active explosion particles.
- `mouthOpen`: Float (0.0 to 1.0) for mouth aperture.

## 2. Mouth Animation (Proximity-based)
- **Detection**: Calculate distance between snake head and food.
- **Trigger**: Distance < 3 boxes (60px).
- **Behavior**: `mouthOpen` interpolates towards 1.0 as distance decreases.
- **Rendering**: Head drawn as a pie slice (`arc`) oriented towards movement direction.

## 3. Explosion Effect (Collision)
- **Trigger**: Snake head hits food coordinates.
- **Payload**: Generate 10+ particles at food origin.
- **Particle Props**: Random velocity, diminishing life/alpha, emerald/cyan colors.
- **Cleanup**: Auto-remove particles when life < 0.

## 4. Technical Constraints
- Keep Alpine.js structure.
- Use native Canvas API.
- Maintain compatibility with existing leaderboard and speed logic.
