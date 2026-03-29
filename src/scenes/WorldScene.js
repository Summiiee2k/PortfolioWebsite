import { TS, SCALE } from '../constants.js';
import { PROJECTS } from '../data/projects.js';
import { ProjectScreen } from '../ui/ProjectScreen.js';
import { Dpad } from '../ui/Dpad.js';
import { buildHeroZone } from '../zones/HeroZone.js';
import { buildSkillsZone } from '../zones/SkillsZone.js';
import { buildExperienceZone } from '../zones/ExperienceZone.js';
import { buildProjectsZone } from '../zones/ProjectsZone.js';
import { buildContactZone } from '../zones/ContactZone.js';

export class WorldScene extends Phaser.Scene {
    constructor() { super('World'); }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;

        this.pipeZones = [];
        this._currentPipe = null;
        this._promptText = null;

        const WORLD_W = TS * 24 * 9;
        this.physics.world.setBounds(0, 0, WORLD_W, H);

        // sky
        this._buildSky(W, H, WORLD_W);

        // ground
        this.platforms = this.physics.add.staticGroup();
        this._buildGround(WORLD_W, H);

        // zones
        buildHeroZone(this, H);
        buildSkillsZone(this, H, this.platforms);
        buildExperienceZone(this, H);
        buildProjectsZone(this, H, this.platforms, this.pipeZones, PROJECTS);
        buildContactZone(this, H);

        // player
        this.player = this._createPlayer(H);

        // camera
        this.cameras.main.setBounds(0, 0, WORLD_W, H);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        // input
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.down = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.DOWN
        );

        // UI
        this._projectScreen = new ProjectScreen();
        this._projectScreen.setScene(this);
        this._dpad = new Dpad();
    }

    _buildSky(W, H, WORLD_W) {
        const sky = this.add.graphics();
        sky.fillGradientStyle(0x050510, 0x050510, 0x0d1f4a, 0x0d1f4a, 1);
        sky.fillRect(0, 0, W, H);
        sky.setScrollFactor(0).setDepth(-10);

        for (let i = 0; i < 130; i++) {
            const star = this.add.rectangle(
                Phaser.Math.Between(0, WORLD_W),
                Phaser.Math.Between(0, H * 0.8),
                Phaser.Math.Between(1, 2), Phaser.Math.Between(1, 2),
                0xffffff,
                Phaser.Math.FloatBetween(0.3, 1.0)
            ).setScrollFactor(Phaser.Math.FloatBetween(0.02, 0.15)).setDepth(-8);

            if (i % 3 === 0) {
                this.tweens.add({
                    targets: star, alpha: 0.05,
                    duration: Phaser.Math.Between(700, 2200),
                    yoyo: true, repeat: -1,
                    delay: Phaser.Math.Between(0, 2000)
                });
            }
        }

        // pixel clouds
        for (let c = 0; c < 14; c++) {
            const cx = Phaser.Math.Between(TS * 5, WORLD_W - TS * 5);
            const cy = Phaser.Math.Between(40, H * 0.42);
            const sf = Phaser.Math.FloatBetween(0.04, 0.22);
            const cg = this.add.graphics().setScrollFactor(sf).setDepth(-7);
            cg.fillStyle(0x142040, 0.55);
            cg.fillRect(cx, cy + 10, 90, 18);
            cg.fillRect(cx + 10, cy + 2, 70, 14);
            cg.fillRect(cx + 24, cy - 6, 42, 14);
        }
    }

    _buildGround(worldW, H) {
        const groundY = H - TS;
        for (let x = 0; x < worldW; x += TS) {
            const g = this.add.graphics();
            // dirt
            g.fillStyle(0x8B5E3C, 1);
            g.fillRect(x, groundY, TS, TS * 2);
            // grass top
            g.fillStyle(0x43A047, 1);
            g.fillRect(x, groundY, TS, 11);
            // grass highlight
            g.fillStyle(0x66BB6A, 1);
            g.fillRect(x, groundY, TS, 4);
            // dirt texture line
            g.lineStyle(1, 0x000000, 0.12);
            g.strokeRect(x, groundY, TS, TS);
            // lower dirt
            g.fillStyle(0x6D4C2A, 1);
            g.fillRect(x, groundY + TS, TS, TS);

            const body = this.add.rectangle(
                x + TS / 2, groundY + TS / 2, TS, TS
            ).setVisible(false);
            this.physics.add.existing(body, true);
            this.platforms.add(body);
        }
    }

    _createPlayer(H) {
        const player = this.physics.add.sprite(
            TS * 3, H - TS * 3, 'characters', 0
        ).setScale(SCALE * 2).setCollideWorldBounds(true);

        player.setSize(10, 13).setOffset(3, 3);

        if (!this.anims.exists('walk')) {
            this.anims.create({
                key: 'walk',
                frames: this.anims.generateFrameNumbers('characters',
                    { frames: [0, 1] }),
                frameRate: 8, repeat: -1
            });
        }
        if (!this.anims.exists('idle')) {
            this.anims.create({
                key: 'idle',
                frames: [{ key: 'characters', frame: 0 }],
                frameRate: 1
            });
        }
        if (!this.anims.exists('jump')) {
            this.anims.create({
                key: 'jump',
                frames: [{ key: 'characters', frame: 2 }],
                frameRate: 1
            });
        }

        this.physics.add.collider(player, this.platforms);
        return player;
    }

    update() {
        const p = this.player;
        const k = this.keys;
        const d = this._dpad.state;
        const onGround = p.body.blocked.down;
        const SPEED = 260;
        const JUMP = -520;

        if (k.left.isDown || d.left) {
            p.setVelocityX(-SPEED);
            p.setFlipX(true);
            if (onGround) p.anims.play('walk', true);
        } else if (k.right.isDown || d.right) {
            p.setVelocityX(SPEED);
            p.setFlipX(false);
            if (onGround) p.anims.play('walk', true);
        } else {
            p.setVelocityX(0);
            if (onGround) p.anims.play('idle', true);
        }

        if ((Phaser.Input.Keyboard.JustDown(k.up) || d.up) && onGround) {
            p.setVelocityY(JUMP);
        }
        if (!onGround) p.anims.play('jump', true);

        this._checkPipeProximity();

        if (Phaser.Input.Keyboard.JustDown(k.down) && this._currentPipe) {
            this._projectScreen.open(this._currentPipe.projectData);
        }
        if (this._dpad.justDown() && this._currentPipe) {
            this._projectScreen.open(this._currentPipe.projectData);
        }
    }

    _checkPipeProximity() {
        const px = this.player.x;
        const py = this.player.y;
        let nearest = null;
        let nearestDist = TS * 2.5;

        this.pipeZones.forEach(zone => {
            const dist = Phaser.Math.Distance.Between(px, py, zone.x, zone.y);
            if (dist < nearestDist) { nearestDist = dist; nearest = zone; }
        });

        if (nearest !== this._currentPipe) {
            this._currentPipe = nearest;
            if (this._promptText) { this._promptText.destroy(); this._promptText = null; }
            if (nearest) {
                this._promptText = this.add.text(
                    nearest.x, nearest.y - TS * 0.5,
                    '▼  PRESS ↓ TO ENTER', {
                    fontSize: '11px', fill: '#ffff00',
                    fontFamily: 'Courier New', fontStyle: 'bold',
                    stroke: '#000', strokeThickness: 4,
                    backgroundColor: '#00000099',
                    padding: { x: 8, y: 5 }
                }
                ).setOrigin(0.5);

                this.tweens.add({
                    targets: this._promptText,
                    y: this._promptText.y - 10,
                    duration: 600, yoyo: true, repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        }
    }
}