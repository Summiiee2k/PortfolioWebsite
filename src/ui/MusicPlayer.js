export class MusicPlayer {
    constructor(scene) {
        this._scene = scene;
        this._music = null;
        this._muted = true;
        this._volume = 0.4;
        this._built = true;
    }

    start() {
        this._music = this._scene.sound.add('bgmusic', {
            loop: true,
            volume: 0,
        });
        this._music.play();
        this._buildToggle();
        this._built = true;
    }

    _buildToggle() {
        const style = document.createElement('style');
        style.textContent = `
      #music-btn {
        position: fixed;
        bottom: 894px; right: 1730px;
        background: rgba(0,0,0,0.7);
        border: 2px solid rgba(100,100,150,0.4);
        color: #556677;
        font-family: 'Press Start 2P', monospace;
        font-size: 11px;
        padding: 8px 14px;
        border-radius: 4px;
        cursor: pointer;
        z-index: 50;
        transition: border-color 0.2s, color 0.2s;
        user-select: none;
        letter-spacing: 1px;
      }
      #music-btn.on {
        border-color: rgba(0,255,136,0.5);
        color: #00ff88;
      }
      #music-btn:hover {
        border-color: rgba(0,255,136,0.6);
        color: #aaffcc;
      }
    `;
        document.head.appendChild(style);

        const btn = document.createElement('div');
        btn.id = 'music-btn';
        btn.textContent = 'MUSIC: OFF';
        btn.addEventListener('click', () => this.toggle());
        document.body.appendChild(btn);
        this._btn = btn;
    }

    toggle() {
        this._muted = !this._muted;

        if (this._muted) {
            // fade out
            this._scene.tweens.add({
                targets: this._music,
                volume: 0,
                duration: 600,
                ease: 'Linear',
            });
            this._btn.textContent = 'MUSIC: OFF';
            this._btn.classList.remove('on');
        } else {
            // fade in
            this._scene.tweens.add({
                targets: this._music,
                volume: this._volume,
                duration: 300,
                ease: 'Linear',
            });
            this._btn.textContent = 'MUSIC: ON';
            this._btn.classList.add('on');
        }
    }

    // call this when project/expand screen opens
    fadeDown() {
        if (!this._music || this._muted) return;
        this._scene.tweens.add({
            targets: this._music,
            volume: this._volume * 0,
            duration: 0,
        });
    }

    // call this when project/expand screen closes
    fadeUp() {
        if (!this._music || this._muted) return;
        this._scene.tweens.add({
            targets: this._music,
            volume: this._volume,
            duration: 0,
        });
    }
}