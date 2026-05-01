document.addEventListener('alpine:init', () => {
    Alpine.data('portfolio', () => ({
        mouseX: 0,
        mouseY: 0,
        updateMouse(e) {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }
    }));

    Alpine.data('typingEffect', (fullText) => ({
        text: '',
        fullText: fullText,
        index: 0,
        init() {
            let interval = setInterval(() => {
                if (this.index >= this.fullText.length) {
                    clearInterval(interval);
                    return;
                }
                this.text += this.fullText[this.index];
                this.index++;
            }, 100);
        }
    }));

    Alpine.data('tiltEffect', () => ({
        rotateX: 0,
        rotateY: 0,
        handleMouse(e) {
            let rect = this.$el.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            this.rotateY = ((x / rect.width) - 0.5) * 10;
            this.rotateX = ((y / rect.height) - 0.5) * -10;
        },
        resetTilt() {
            this.rotateX = 0;
            this.rotateY = 0;
        }
    }));
});
