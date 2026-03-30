import { TS, SCALE } from '../constants.js';
import { PROJECTS } from '../data/projects.js';
import { ProjectScreen } from '../ui/ProjectScreen.js';
import { Dpad } from '../ui/Dpad.js';
import { NavMenu } from '../ui/NavMenu.js';
import { BiomeManager } from '../zones/BiomeManager.js';
import { buildHeroZone } from '../zones/HeroZone.js';
import { buildAboutZone } from '../zones/AboutZone.js';
import { buildEducationZone } from '../zones/EducationZone.js';
import { buildSkillsZone } from '../zones/SkillsZone.js';
import { buildExperienceZone } from '../zones/ExperienceZone.js';
import { buildProjectsZone } from '../zones/ProjectsZone.js';
import { buildHobbiesZone } from '../zones/HobbiesZone.js';
import { buildContactZone } from '../zones/ContactZone.js';
import { buildEasterEggZone } from '../zones/EasterEggZone.js';

// zone X positions in tiles — single source of truth
export const ZONE_TILES = {
    hero: 0,
    about: 26,
    education: 56,
    skills: 90,
    experience: 128,
    projects: 175,
    hobbies: 224,
    contact: 255,
    easter: 282,
};

export class WorldScene extends Phaser.Scene {
    constructor() { super('World'); }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;

        this.pipeZones = [];
        this._currentPipe = null;
        this._promptText = null;
        this._easterTriggered = false;

        const WORLD_W = TS * 320;
        this.physics.world.setBounds(0, 0, WORLD_W, H);

        // biome manager (handles sky + ground colour)
        this._biome = new BiomeManager(this);

        // stars (static, behind everything)
        this._buildStars(WORLD_W, H);

        // clouds
        this._buildClouds(WORLD_W, H);

        // ground
        this.platforms = this.physics.add.staticGroup();
        this._buildGround(WORLD_W, H);

        // all zones
        buildHeroZone(this, H);
        buildAboutZone(this, H);
        buildEducationZone(this, H);
        buildSkillsZone(this, H, this.platforms);
        buildExperienceZone(this, H);
        buildProjectsZone(this, H, this.platforms, this.pipeZones, PROJECTS);
        buildHobbiesZone(this, H);
        buildContactZone(this, H);
        buildEasterEggZone(this, H);

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

        // nav menu — teleport function
        this._navMenu = new NavMenu((zoneKey) => {
            const tile = ZONE_TILES[zoneKey];
            if (tile === undefined) return;
            const targetX = tile * TS;
            // move player and camera instantly
            this.player.setX(targetX + TS * 3);
            this.player.setVelocity(0, 0);
            this.cameras.main.centerOn(targetX + TS * 3, this.player.y);
        });
    }

    _buildStars(WORLD_W, H) {
        for (let i = 0; i < 180; i++) {
            const star = this.add.rectangle(
                Phaser.Math.Between(0, WORLD_W),
                Phaser.Math.Between(0, H * 0.8),
                Phaser.Math.Between(1, 2), Phaser.Math.Between(1, 2),
                0xffffff,
                Phaser.Math.FloatBetween(0.2, 0.9)
            ).setScrollFactor(Phaser.Math.FloatBetween(0.02, 0.18)).setDepth(-8);

            if (i % 3 === 0) {
                this.tweens.add({
                    targets: star, alpha: 0.05,
                    duration: Phaser.Math.Between(700, 2500),
                    yoyo: true, repeat: -1,
                    delay: Phaser.Math.Between(0, 2000),
                });
            }
        }
    }

    _buildClouds(WORLD_W, H) {
        for (let c = 0; c < 18; c++) {
            const cx = Phaser.Math.Between(TS * 3, WORLD_W - TS * 3);
            const cy = Phaser.Math.Between(30, H * 0.4);
            const sf = Phaser.Math.FloatBetween(0.04, 0.2);
            const cg = this.add.graphics().setScrollFactor(sf).setDepth(-7);
            cg.fillStyle(0x142040, 0.5);
            cg.fillRect(cx, cy + 12, 90, 18);
            cg.fillRect(cx + 12, cy + 4, 66, 14);
            cg.fillRect(cx + 26, cy - 4, 38, 14);
        }
    }

    _buildGround(worldW, H) {
        const groundY = H - TS;
        for (let x = 0; x < worldW; x += TS) {
            const g = this.add.graphics();
            g.fillStyle(0x8B5E3C, 1);
            g.fillRect(x, groundY, TS, TS * 2);
            g.fillStyle(0x43A047, 1);
            g.fillRect(x, groundY, TS, 11);
            g.fillStyle(0x66BB6A, 1);
            g.fillRect(x, groundY, TS, 4);
            g.lineStyle(1, 0x000000, 0.1);
            g.strokeRect(x, groundY, TS, TS);
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
        if (!this.anims.exists('idle')) {
            this.anims.create({
                key: 'idle',
                frames: [{ key: 'player_idle' }],
                frameRate: 1,
            });
        }
        if (!this.anims.exists('walk')) {
            this.anims.create({
                key: 'walk',
                frames: [{ key: 'player_walk1' }, { key: 'player_walk2' }],
                frameRate: 8, repeat: -1,
            });
        }
        if (!this.anims.exists('jump')) {
            this.anims.create({
                key: 'jump',
                frames: [{ key: 'player_jump' }],
                frameRate: 1,
            });
        }

        const player = this.physics.add.sprite(
            TS * 3, H - TS * 4, 'player_idle'
        ).setScale(0.65).setCollideWorldBounds(true);

        player.setSize(38, 90).setOffset(21, 18);
        this.physics.add.collider(player, this.platforms);
        return player;
    }

    update() {
        const p = this.player;
        const k = this.keys;
        const d = this._dpad.state;
        const onGround = p.body.blocked.down;
        const SPEED = 280;
        const JUMP = -540;

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

        // update biome based on camera position
        this._biome.update(this.cameras.main.scrollX);

        // update active nav item
        const scrollX = this.cameras.main.scrollX;
        const tile = scrollX / TS;
        let activeZone = 'hero';
        for (const [zone, startTile] of Object.entries(ZONE_TILES)) {
            if (tile >= startTile) activeZone = zone;
        }
        this._navMenu.setActive(activeZone);

        // pipe proximity
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
                    fontSize: '12px', fill: '#ffff00',
                    fontFamily: 'Courier New', fontStyle: 'bold',
                    stroke: '#000', strokeThickness: 4,
                    backgroundColor: '#00000099',
                    padding: { x: 8, y: 5 },
                }
                ).setOrigin(0.5);

                this.tweens.add({
                    targets: this._promptText,
                    y: this._promptText.y - 10,
                    duration: 600, yoyo: true, repeat: -1,
                    ease: 'Sine.easeInOut',
                });
            }
        }
    }
}