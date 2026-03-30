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

        // spritesheets
        this.load.spritesheet('tiles', './assets/images/tilemap.png',
            { frameWidth: 16, frameHeight: 16, spacing: 0, margin: 0 }
        );

        // player sprites
        this.load.image('player_idle', './assets/images/player_idle.png');
        this.load.image('player_walk1', './assets/images/player_walk1.png');
        this.load.image('player_walk2', './assets/images/player_walk2.png');
        this.load.image('player_jump', './assets/images/player_jump.png');

        // office buildings
        this.load.image('office_boehringer', './assets/images/office_boehringer.png');
        this.load.image('office_startup', './assets/images/office_startup.png');
        this.load.image('office_games', './assets/images/office_games.png');

        // logos
        this.load.image('logo_bi', './assets/images/logo_bi.png');
        this.load.image('logo_scoutreach', './assets/images/logo_scoutreach.png');
        this.load.image('logo_sleepleads', './assets/images/logo_sleepleads.png');
        this.load.image('logo_zynga', './assets/images/logo_zynga.png');
    }

    create() {
        this.scene.start('World');
    }

    create() {
        this.scene.start('World');
    }
}