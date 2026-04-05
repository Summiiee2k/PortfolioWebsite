export class BootScene extends Phaser.Scene {
    constructor() { super('Boot'); }

    preload() {
        const W = window.innerWidth;
        const H = window.innerHeight;

        const FONT = '"Press Start 2P", monospace';

        this.add.rectangle(W / 2, H / 2, W, H, 0x050510);

        this.add.text(W / 2, H / 2 - 100, 'SUMEDH', {
            fontSize: '28px', fill: '#00ff88',
            fontFamily: FONT,
            stroke: '#003322', strokeThickness: 4,
        }).setOrigin(0.5);

        this.add.text(W / 2, H / 2 - 60, 'BAMANE', {
            fontSize: '28px', fill: '#ffffff',
            fontFamily: FONT,
            stroke: '#000000', strokeThickness: 4,
        }).setOrigin(0.5);

        this.add.text(W / 2, H / 2 - 16, 'PORTFOLIO', {
            fontSize: '11px', fill: '#556677',
            fontFamily: FONT,
            letterSpacing: 6,
        }).setOrigin(0.5);

        // loading bar
        this.add.rectangle(W / 2, H / 2 + 30, 400, 8, 0x111111);
        const bar = this.add.graphics();
        this.load.on('progress', v => {
            bar.clear();
            bar.fillStyle(0x00ff88, 1);
            bar.fillRect(W / 2 - 200, H / 2 + 26, 400 * v, 8);
        });

        const tip = this.add.text(W / 2, H / 2 + 60,
            '< USE ARROW KEYS OR D-PAD >', {
            fontSize: '8px', fill: '#334455',
            fontFamily: FONT,
        }
        ).setOrigin(0.5);

        this.tweens.add({
            targets: tip, alpha: 0.2,
            duration: 800, yoyo: true, repeat: -1,
        });

        this.load.on('loaderror', f => console.error('LOAD ERROR:', f.src));

        this.load.spritesheet('tiles', './assets/images/tilemap.png',
            { frameWidth: 16, frameHeight: 16, spacing: 0, margin: 0 }
        );
        this.load.image('player_idle', './assets/images/player_idle.png');
        this.load.image('player_walk1', './assets/images/player_walk1.png');
        this.load.image('player_walk2', './assets/images/player_walk2.png');
        this.load.image('player_jump', './assets/images/player_jump.png');
        this.load.image('logo_bi', './assets/images/logo_bi.png');
        this.load.image('logo_scoutreach', './assets/images/logo_scoutreach.png');
        this.load.image('logo_sleepleads', './assets/images/logo_sleepleads.png');
        this.load.image('logo_zynga', './assets/images/logo_zynga.png');
        this.load.image('easter_photo', './assets/images/easter_egg_photo.jpeg');
        this.load.image('logo_ub', './assets/images/logos/logo_ub.png');
        this.load.image('logo_parul', './assets/images/logos/logo_parul.png');
        this.load.image('logo_seamedu', './assets/images/logos/logo_seamedu.png');
    }

    create() {
        this.scene.start('World');
    }
}