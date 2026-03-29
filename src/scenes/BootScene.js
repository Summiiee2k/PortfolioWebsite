export class BootScene extends Phaser.Scene {
    constructor() { super('Boot'); }

    preload() {
        const W = window.innerWidth;
        const H = window.innerHeight;

        this.add.rectangle(W / 2, H / 2, W, H, 0x050510);

        this.add.text(W / 2, H / 2 - 90, 'SUMEDH BAMANE', {
            fontSize: '34px', fill: '#ffffff',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#00ff88', strokeThickness: 2
        }).setOrigin(0.5);

        this.add.text(W / 2, H / 2 - 48, 'PORTFOLIO', {
            fontSize: '13px', fill: '#00ff88',
            fontFamily: 'Courier New', letterSpacing: 10
        }).setOrigin(0.5);

        // progress bar
        this.add.rectangle(W / 2, H / 2 + 10, 400, 4, 0x1a2a1a);
        const bar = this.add.graphics();
        this.load.on('progress', v => {
            bar.clear();
            bar.fillStyle(0x00ff88, 1);
            bar.fillRect(W / 2 - 200, H / 2 + 8, 400 * v, 4);
        });

        this.add.text(W / 2, H / 2 + 40,
            '← → move   ·   ↑ jump   ·   ↓ enter pipes   ·   ESC close', {
            fontSize: '11px', fill: '#334455',
            fontFamily: 'Courier New'
        }
        ).setOrigin(0.5);

        this.load.on('loaderror', f => console.error('LOAD ERROR:', f.src));

        this.load.spritesheet('tiles', './assets/images/tilemap.png',
            { frameWidth: 16, frameHeight: 16, spacing: 0, margin: 0 }
        );
        this.load.spritesheet('characters', './assets/images/tilemap-characters.png',
            { frameWidth: 16, frameHeight: 16, spacing: 0, margin: 0 }
        );
    }

    create() {
        this.scene.start('World');
    }
}