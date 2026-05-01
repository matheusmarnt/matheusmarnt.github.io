document.addEventListener('alpine:init', () => {
    Alpine.data('snakeGame', () => ({
        playing: false,
        playerName: '',
        score: 0,
        leaderboard: JSON.parse(localStorage.getItem('snake_leaderboard')) || [],
        canvas: null,
        ctx: null,
        box: 20,
        snake: [],
        food: null,
        d: null,
        gameInterval: null,
        speed: 120,

        initGame() {
            this.canvas = this.$refs.snakeCanvas;
            this.ctx = this.canvas.getContext('2d');
            this.reset();
        },

        reset() {
            this.score = 0;
            this.speed = 120;
            this.snake = [{ x: 9 * this.box, y: 10 * this.box }];
            this.food = {
                x: Math.floor(Math.random() * 19 + 1) * this.box,
                y: Math.floor(Math.random() * 19 + 1) * this.box
            };
            this.d = 'RIGHT';
            if (this.gameInterval) clearTimeout(this.gameInterval);
        },

        start() {
            if (!this.playerName.trim()) return alert('Insira seu nome/alias');
            this.playing = true;
            this.reset();
            this.loop();
        },

        loop() {
            if (!this.playing) return;
            this.draw();
            this.gameInterval = setTimeout(() => this.loop(), this.speed);
        },

        direction(event) {
            let key = event.keyCode;
            if ([37, 38, 39, 40].includes(key) && this.playing) event.preventDefault();
            if (key == 37 && this.d != 'RIGHT') this.d = 'LEFT';
            else if (key == 38 && this.d != 'DOWN') this.d = 'UP';
            else if (key == 39 && this.d != 'LEFT') this.d = 'RIGHT';
            else if (key == 40 && this.d != 'UP') this.d = 'DOWN';
        },

        collision(head, array) {
            for (let i = 0; i < array.length; i++) {
                if (head.x == array[i].x && head.y == array[i].y) return true;
            }
            return false;
        },

        roundRect(x, y, w, h, r) {
            this.ctx.beginPath();
            this.ctx.moveTo(x + r, y);
            this.ctx.arcTo(x + w, y, x + w, y + h, r);
            this.ctx.arcTo(x + w, y + h, x, y + h, r);
            this.ctx.arcTo(x, y + h, x, y, r);
            this.ctx.arcTo(x, y, x + w, y, r);
            this.ctx.closePath();
            this.ctx.fill();
        },

        draw() {
            this.ctx.fillStyle = '#050505';
            this.ctx.fillRect(0, 0, 400, 400);

            // Food
            this.ctx.fillStyle = '#10b981';
            this.roundRect(this.food.x + 2, this.food.y + 2, this.box - 4, this.box - 4, 8);

            // Snake
            for (let i = 0; i < this.snake.length; i++) {
                let taperFactor = Math.max(0.4, 1 - (i / this.snake.length) * 0.6);
                let size = this.box * taperFactor;
                let offset = (this.box - size) / 2;

                this.ctx.fillStyle = (i == 0) ? '#00f0ff' : `rgba(6, 182, 212, ${taperFactor})`;
                this.roundRect(this.snake[i].x + offset, this.snake[i].y + offset, size, size, size / 2);

                if (i === 0) {
                    this.ctx.fillStyle = 'black';
                    let eyeSize = 3;
                    if (this.d == 'RIGHT' || this.d == 'LEFT') {
                        this.ctx.beginPath();
                        this.ctx.arc(this.snake[i].x + 10, this.snake[i].y + 6, eyeSize, 0, Math.PI * 2);
                        this.ctx.arc(this.snake[i].x + 10, this.snake[i].y + 14, eyeSize, 0, Math.PI * 2);
                        this.ctx.fill();
                    } else {
                        this.ctx.beginPath();
                        this.ctx.arc(this.snake[i].x + 6, this.snake[i].y + 10, eyeSize, 0, Math.PI * 2);
                        this.ctx.arc(this.snake[i].x + 14, this.snake[i].y + 10, eyeSize, 0, Math.PI * 2);
                        this.ctx.fill();
                    }
                }
            }

            let snakeX = this.snake[0].x;
            let snakeY = this.snake[0].y;

            if (this.d == 'LEFT') snakeX -= this.box;
            if (this.d == 'UP') snakeY -= this.box;
            if (this.d == 'RIGHT') snakeX += this.box;
            if (this.d == 'DOWN') snakeY += this.box;

            if (snakeX == this.food.x && snakeY == this.food.y) {
                this.score++;
                if (this.score % 10 === 0) {
                    this.speed = Math.max(40, this.speed * 0.9);
                }
                if (this.score >= 200) {
                    this.playing = false;
                    this.updateLeaderboard();
                    return;
                }
                this.food = {
                    x: Math.floor(Math.random() * 19 + 1) * this.box,
                    y: Math.floor(Math.random() * 19 + 1) * this.box
                };
            } else {
                this.snake.pop();
            }

            let newHead = { x: snakeX, y: snakeY };

            if (snakeX < 0 || snakeX >= 400 || snakeY < 0 || snakeY >= 400 || this.collision(newHead, this.snake)) {
                this.playing = false;
                this.updateLeaderboard();
                return;
            }

            this.snake.unshift(newHead);
        },

        updateLeaderboard() {
            this.leaderboard.push({ name: this.playerName, score: this.score });
            this.leaderboard.sort((a, b) => b.score - a.score);
            this.leaderboard = this.leaderboard.slice(0, 10);
            localStorage.setItem('snake_leaderboard', JSON.stringify(this.leaderboard));
        }
    }));
});
