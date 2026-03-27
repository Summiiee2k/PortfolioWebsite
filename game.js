// ─────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────
const TILE = 16;
const SCALE = 3;
const TS = TILE * SCALE; // 48px per tile on screen

// ─────────────────────────────────────────────
//  BOOT SCENE
// ─────────────────────────────────────────────
class BootScene extends Phaser.Scene {
    constructor() { super('Boot'); }

    preload() {
        const W = window.innerWidth;
        const H = window.innerHeight;

        this.add.rectangle(W / 2, H / 2, 500, 24, 0x333333);
        const bar = this.add.graphics();
        this.add.text(W / 2, H / 2 - 40, 'LOADING PORTFOLIO...', {
            fontSize: '18px', fill: '#00ff88', fontFamily: 'Courier New'
        }).setOrigin(0.5);

        this.load.on('progress', v => {
            bar.clear();
            bar.fillStyle(0x00ff88, 1);
            bar.fillRect(W / 2 - 250, H / 2 - 12, 500 * v, 24);
        });

        this.load.on('loaderror', f => {
            console.error('LOAD ERROR:', f.src);
        });

        this.load.spritesheet('tiles', './tilemap.png',
            { frameWidth: 16, frameHeight: 16, spacing: 0, margin: 0 }
        );
        this.load.spritesheet('characters', './tilemap-characters.png',
            { frameWidth: 16, frameHeight: 16, spacing: 0, margin: 0 }
        );
    }

    create() {
        console.log('tiles frames:', this.textures.get('tiles').frameTotal);
        console.log('characters frames:', this.textures.get('characters').frameTotal);
        console.log('tile sheet size:',
            this.textures.get('tiles').source[0].width, 'x',
            this.textures.get('tiles').source[0].height
        );

        // TEMP: show first 20 character frames on screen
        // so we can identify correct walk/idle/jump frames
        for (let i = 0; i < 20; i++) {
            this.add.image(40 + i * 36, H / 2, 'characters', i).setScale(3);
            this.add.text(40 + i * 36, H / 2 + 30, String(i), {
                fontSize: '10px', fill: '#ffffff', fontFamily: 'Courier New'
            }).setOrigin(0.5);
        }

        // short delay so we can see the frames before world loads
        this.time.delayedCall(2500, () => {
            this.scene.start('World');
        });
    }
}

// ─────────────────────────────────────────────
//  WORLD SCENE
// ─────────────────────────────────────────────
class WorldScene extends Phaser.Scene {
    constructor() { super('World'); }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;

        // ── init pipe zones first — must be before any zone building
        this.pipeZones = [];
        this._currentPipe = null;
        this._promptText = null;
        this._dpadDownUsed = false;

        // ── world bounds (6 zones × 24 tiles wide)
        const WORLD_W = TS * 24 * 6;
        this.physics.world.setBounds(0, 0, WORLD_W, H);

        // ── sky background drawn in code (no image needed)
        const sky = this.add.graphics();
        sky.fillGradientStyle(0x0a0a2e, 0x0a0a2e, 0x1a3a6e, 0x1a3a6e, 1);
        sky.fillRect(0, 0, W, H);
        sky.setScrollFactor(0).setDepth(-10);

        // ── stars (parallax)
        for (let i = 0; i < 100; i++) {
            this.add.rectangle(
                Phaser.Math.Between(0, W),
                Phaser.Math.Between(0, H * 0.75),
                2, 2, 0xffffff,
                Phaser.Math.FloatBetween(0.3, 1.0)
            )
                .setScrollFactor(Phaser.Math.FloatBetween(0.02, 0.15))
                .setDepth(-9);
        }

        // ── ground
        this.platforms = this.physics.add.staticGroup();
        this._buildGround(WORLD_W, H);

        // ── zones
        this._buildHeroZone(H);
        this._buildSkillsZone(H);
        this._buildExperienceZone(H);
        this._buildProjectsZone(H);
        this._buildContactZone(H);

        // ── player
        this.player = this._createPlayer(H);

        // ── camera
        this.cameras.main.setBounds(0, 0, WORLD_W, H);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        // ── keyboard
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.down = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.DOWN
        );

        // ── dpad
        this._setupDpad();
    }

    // ────────────────────────────────────────────
    //  GROUND
    // ────────────────────────────────────────────
    _buildGround(worldW, H) {
        const y = H - TS;
        for (let x = 0; x < worldW; x += TS) {
            // top grass tile — frame 0
            const t = this.add.image(x + TS / 2, y + TS / 2, 'tiles', 0)
                .setScale(SCALE);
            this.physics.add.existing(t, true);
            this.platforms.add(t);
            // underground dirt — frame 43 (one row down on a 43-col sheet)
            const d = this.add.image(x + TS / 2, y + TS * 1.5, 'tiles', 43)
                .setScale(SCALE);
            this.physics.add.existing(d, true);
            this.platforms.add(d);
        }
    }

    // ────────────────────────────────────────────
    //  ZONE 1 — HERO
    // ────────────────────────────────────────────
    _buildHeroZone(H) {
        const midY = H / 2;

        this.add.text(TS * 2, midY - 120, 'SUMEDH BAMANE', {
            fontSize: '38px', fill: '#ffffff',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 6
        });

        this.add.text(TS * 2, midY - 68, 'AI ENGINEER  ·  DATA SCIENTIST', {
            fontSize: '18px', fill: '#00ff88',
            fontFamily: 'Courier New',
            stroke: '#000000', strokeThickness: 3
        });

        this.add.text(TS * 2, midY - 34, 'Barcelona, Spain  ·  AWS AI Practitioner', {
            fontSize: '13px', fill: '#aaaaff',
            fontFamily: 'Courier New'
        });

        this.add.text(TS * 2, midY + 4,
            '→  Arrow keys or D-pad to move  ·  ↑ to jump  ·  ↓ to enter pipes', {
            fontSize: '12px', fill: '#888888',
            fontFamily: 'Courier New'
        });

        // animated coin trail leading the player right
        for (let i = 0; i < 10; i++) {
            const coin = this.add.image(
                TS * (10 + i * 2.5),
                H - TS * 3,
                'tiles', 96
            ).setScale(SCALE);

            this.tweens.add({
                targets: coin,
                y: coin.y - 14,
                duration: 500,
                yoyo: true,
                repeat: -1,
                delay: i * 100,
                ease: 'Sine.easeInOut'
            });
        }
    }

    // ────────────────────────────────────────────
    //  ZONE 2 — SKILLS
    // ────────────────────────────────────────────
    _buildSkillsZone(H) {
        const startX = TS * 26;
        const groundY = H - TS;

        this.add.text(startX, groundY - TS * 8, '⚙  SKILLS', {
            fontSize: '22px', fill: '#ffdd00',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        });

        const skills = [
            { label: 'ML & AI', x: 0, h: 4 },
            { label: 'MLOps', x: 4, h: 5 },
            { label: 'Data Eng', x: 8, h: 3 },
            { label: 'LLM / RAG', x: 12, h: 5 },
            { label: 'CV / NLP', x: 16, h: 4 },
        ];

        skills.forEach(s => {
            const px = startX + s.x * TS;
            const py = groundY - s.h * TS;

            for (let i = 0; i < 3; i++) {
                const t = this.add.image(
                    px + i * TS + TS / 2, py + TS / 2, 'tiles', 0
                ).setScale(SCALE);
                this.physics.add.existing(t, true);
                this.platforms.add(t);
            }

            this.add.text(px + TS * 1.5, py - 10, s.label, {
                fontSize: '11px', fill: '#00ffcc',
                fontFamily: 'Courier New',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5, 1);
        });
    }

    // ────────────────────────────────────────────
    //  ZONE 3 — EXPERIENCE
    // ────────────────────────────────────────────
    _buildExperienceZone(H) {
        const startX = TS * 46;
        const groundY = H - TS;

        this.add.text(startX, groundY - TS * 9, '🏢  EXPERIENCE', {
            fontSize: '22px', fill: '#ffdd00',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        });

        const jobs = [
            {
                name: 'Boehringer\nIngelheim',
                dates: 'Apr 2025 – Mar 2026',
                color: 0x4488cc, labelColor: '#88ccff', x: 0
            },
            {
                name: 'ScoutReach',
                dates: 'May 2025 – Present',
                color: 0x228844, labelColor: '#88ffaa', x: 8
            },
            {
                name: 'SleepLeads',
                dates: 'Nov 2025 – Present',
                color: 0xaa6622, labelColor: '#ffcc88', x: 16
            },
            {
                name: 'Zynga Games',
                dates: 'Jun – Aug 2023',
                color: 0x884488, labelColor: '#ffaaff', x: 24
            },
        ];

        jobs.forEach(j => {
            const px = startX + j.x * TS;
            const buildH = 4;
            const buildY = groundY - buildH * TS;

            const g = this.add.graphics();

            // building body
            g.fillStyle(j.color, 0.85);
            g.fillRect(px, buildY, TS * 5, buildH * TS);
            g.lineStyle(2, 0xffffff, 0.25);
            g.strokeRect(px, buildY, TS * 5, buildH * TS);

            // windows
            g.fillStyle(0xffffaa, 0.65);
            for (let row = 0; row < 2; row++) {
                for (let col = 0; col < 3; col++) {
                    g.fillRect(
                        px + col * TS * 1.4 + 10,
                        buildY + row * TS + 12,
                        14, 14
                    );
                }
            }

            // door
            g.fillStyle(0x331100, 1);
            g.fillRect(px + TS * 1.8, groundY - TS, TS * 0.9, TS);

            // name label above building
            this.add.text(px + TS * 2.5, buildY - 28, j.name, {
                fontSize: '11px', fill: j.labelColor,
                fontFamily: 'Courier New', align: 'center',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5, 1);

            // dates below ground
            this.add.text(px + TS * 2.5, groundY + 4, j.dates, {
                fontSize: '9px', fill: '#888888',
                fontFamily: 'Courier New', align: 'center'
            }).setOrigin(0.5, 0);
        });
    }

    // ────────────────────────────────────────────
    //  ZONE 4 — PROJECTS (PIPES)
    // ────────────────────────────────────────────
    _buildProjectsZone(H) {
        const startX = TS * 82;
        const groundY = H - TS;

        this.add.text(startX, groundY - TS * 9,
            '🟢  PROJECTS  —  ENTER THE PIPES  (↓)', {
            fontSize: '18px', fill: '#ffdd00',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }
        );

        PROJECTS.forEach((proj, i) => {
            const px = startX + i * TS * 8;
            const pipeH = 2;
            const pipeW = TS * 3;
            const pipeTopY = groundY - pipeH * TS;

            const g = this.add.graphics();

            // pipe body
            g.fillStyle(proj.pipeColor, 1);
            g.fillRect(px, pipeTopY, pipeW, pipeH * TS);

            // pipe lip (wider at top)
            g.fillStyle(
                Phaser.Display.Color.IntegerToColor(proj.pipeColor).lighten(20).color,
                1
            );
            g.fillRect(px - 8, pipeTopY - 16, pipeW + 16, 20);

            // shine strip
            g.fillStyle(0xffffff, 0.12);
            g.fillRect(px + 5, pipeTopY, 10, pipeH * TS);

            // dark edge
            g.fillStyle(0x000000, 0.2);
            g.fillRect(px + pipeW - 10, pipeTopY, 10, pipeH * TS);

            // label above pipe
            this.add.text(px + pipeW / 2, pipeTopY - 26, proj.pipeLabel, {
                fontSize: '10px', fill: '#ffffff',
                fontFamily: 'Courier New', align: 'center',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5, 1);

            // number badge inside pipe
            this.add.text(px + pipeW / 2, pipeTopY + TS * 0.8, String(i + 1), {
                fontSize: '16px', fill: '#000000',
                fontFamily: 'Courier New', fontStyle: 'bold'
            }).setOrigin(0.5);

            // invisible trigger zone above pipe
            const zone = this.add.zone(
                px + pipeW / 2,
                pipeTopY - TS,
                pipeW + TS,
                TS * 3
            ).setOrigin(0.5, 0);
            this.physics.add.existing(zone, true);
            zone.projectData = proj;
            this.pipeZones.push(zone);
        });
    }

    // ────────────────────────────────────────────
    //  ZONE 5 — CONTACT CASTLE
    // ────────────────────────────────────────────
    _buildContactZone(H) {
        const startX = TS * 126;
        const groundY = H - TS;

        const g = this.add.graphics();

        // castle body
        g.fillStyle(0x886644, 1);
        g.fillRect(startX, groundY - TS * 5, TS * 8, TS * 5);

        // battlements
        g.fillStyle(0x997755, 1);
        for (let i = 0; i < 4; i++) {
            g.fillRect(startX + i * TS * 2, groundY - TS * 6, TS * 1.2, TS);
        }

        // tower
        g.fillStyle(0x775533, 1);
        g.fillRect(startX + TS * 3, groundY - TS * 9, TS * 2.2, TS * 4);

        // tower battlements
        g.fillStyle(0x886644, 1);
        g.fillRect(startX + TS * 2.8, groundY - TS * 10, TS * 0.8, TS * 0.8);
        g.fillRect(startX + TS * 4.4, groundY - TS * 10, TS * 0.8, TS * 0.8);

        // door
        g.fillStyle(0x332211, 1);
        g.fillRoundedRect(startX + TS * 3.2, groundY - TS * 2, TS * 1.6, TS * 2, 10);

        // windows
        g.fillStyle(0xffffaa, 0.7);
        g.fillRect(startX + TS * 1, groundY - TS * 4, TS * 0.8, TS * 0.8);
        g.fillRect(startX + TS * 5.2, groundY - TS * 4, TS * 0.8, TS * 0.8);
        g.fillRect(startX + TS * 3.6, groundY - TS * 7, TS * 0.8, TS * 0.8);

        // flag
        this.add.text(startX + TS * 4.1, groundY - TS * 10.5, '🏁', {
            fontSize: '26px'
        }).setOrigin(0.5);

        // section header
        this.add.text(startX + TS * 4, groundY - TS * 13, '[ CONTACT ME ]', {
            fontSize: '20px', fill: '#ffdd00',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5);

        const contacts = [
            '📧  sumedhbamane8338@gmail.com',
            '💼  linkedin.com/in/sumedh-bamane-494191162',
            '🐙  github.com/Summiiee2k',
            '📍  Barcelona, Spain',
        ];

        contacts.forEach((line, i) => {
            this.add.text(
                startX - TS,
                groundY - TS * 16 + i * 28,
                line, {
                fontSize: '13px', fill: '#dddddd',
                fontFamily: 'Courier New',
                stroke: '#000', strokeThickness: 2
            }
            );
        });
    }

    // ────────────────────────────────────────────
    //  PLAYER
    // ────────────────────────────────────────────
    _createPlayer(H) {
        const player = this.physics.add.sprite(
            TS * 3, H - TS * 4, 'characters', 0
        ).setScale(SCALE * 2).setCollideWorldBounds(true);

        player.setSize(10, 13).setOffset(3, 3);

        if (!this.anims.exists('walk')) {
            this.anims.create({
                key: 'walk',
                frames: this.anims.generateFrameNumbers('characters',
                    { start: 0, end: 3 }),
                frameRate: 10, repeat: -1
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
                frames: [{ key: 'characters', frame: 5 }],
                frameRate: 1
            });
        }

        this.physics.add.collider(player, this.platforms);
        return player;
    }

    // ────────────────────────────────────────────
    //  D-PAD
    // ────────────────────────────────────────────
    _setupDpad() {
        this.dpadState = { left: false, right: false, up: false, down: false };
        this._dpadDownUsed = false;

        const map = {
            'btn-left': 'left', 'btn-right': 'right',
            'btn-up': 'up', 'btn-down': 'down'
        };

        Object.entries(map).forEach(([id, dir]) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('pointerdown', e => {
                e.preventDefault();
                this.dpadState[dir] = true;
                el.classList.add('pressed');
            });
            ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => {
                el.addEventListener(ev, () => {
                    this.dpadState[dir] = false;
                    el.classList.remove('pressed');
                });
            });
        });
    }

    // ────────────────────────────────────────────
    //  UPDATE LOOP
    // ────────────────────────────────────────────
    update() {
        const p = this.player;
        const k = this.keys;
        const d = this.dpadState;
        const onGround = p.body.blocked.down;
        const SPEED = 240;
        const JUMP = -500;

        // horizontal movement
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

        // jump
        if ((Phaser.Input.Keyboard.JustDown(k.up) || d.up) && onGround) {
            p.setVelocityY(JUMP);
        }

        // air animation
        if (!onGround) p.anims.play('jump', true);

        // pipe proximity check
        this._checkPipeProximity();

        // enter pipe — keyboard
        if (Phaser.Input.Keyboard.JustDown(k.down) && this._currentPipe) {
            this._enterPipe(this._currentPipe);
        }

        // enter pipe — dpad (single trigger, not held)
        if (d.down && this._currentPipe && !this._dpadDownUsed) {
            this._dpadDownUsed = true;
            this._enterPipe(this._currentPipe);
        }
        if (!d.down) this._dpadDownUsed = false;
    }

    // ────────────────────────────────────────────
    //  PIPE PROXIMITY
    // ────────────────────────────────────────────
    _checkPipeProximity() {
        const px = this.player.x;
        const py = this.player.y;
        let nearest = null;
        let nearestDist = TS * 2.5;

        this.pipeZones.forEach(zone => {
            const dist = Phaser.Math.Distance.Between(px, py, zone.x, zone.y);
            if (dist < nearestDist) {
                nearestDist = dist;
                nearest = zone;
            }
        });

        if (nearest !== this._currentPipe) {
            this._currentPipe = nearest;

            if (this._promptText) {
                this._promptText.destroy();
                this._promptText = null;
            }

            if (nearest) {
                this._promptText = this.add.text(
                    nearest.x, nearest.y - TS * 0.5,
                    '▼  PRESS ↓ TO ENTER', {
                    fontSize: '11px', fill: '#ffff00',
                    fontFamily: 'Courier New',
                    stroke: '#000000', strokeThickness: 3,
                    backgroundColor: '#00000088',
                    padding: { x: 6, y: 4 }
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

    // ────────────────────────────────────────────
    //  ENTER PIPE → PROJECT SCREEN
    // ────────────────────────────────────────────
    _enterPipe(zone) {
        this._currentPipe = null;
        if (this._promptText) {
            this._promptText.destroy();
            this._promptText = null;
        }

        const proj = zone.projectData;
        const screen = document.getElementById('project-screen');
        const card = document.getElementById('project-card-content');

        const metricsHtml = (proj.metrics || [])
            .map(m => `<span class="metric">${m}</span>`).join('');
        const stackHtml = (proj.stack || [])
            .map(s => `<span class="stack-tag">${s}</span>`).join('');
        const demoBtn = proj.demo
            ? `<a href="${proj.demo}" target="_blank" class="btn btn-demo">
           Live Demo ↗
         </a>`
            : '';

        card.innerHTML = `
      <button class="btn-exit" onclick="closeProject()">✕  ESC</button>
      <div class="year">${proj.year}</div>
      <h1>${proj.title}</h1>
      <p class="description">${proj.description}</p>
      ${metricsHtml ? `<div class="metrics">${metricsHtml}</div>` : ''}
      <div class="stack">${stackHtml}</div>
      <div class="project-buttons">
        <a href="${proj.github}" target="_blank" class="btn btn-github">
          View on GitHub ↗
        </a>
        ${demoBtn}
      </div>
    `;

        screen.classList.add('active');
        this.scene.pause();
    }
}

// ─────────────────────────────────────────────
//  GLOBAL FUNCTIONS
// ─────────────────────────────────────────────
function closeProject() {
    document.getElementById('project-screen').classList.remove('active');
    game.scene.getScene('World').scene.resume();
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProject();
});

// ─────────────────────────────────────────────
//  PHASER GAME CONFIG
// ─────────────────────────────────────────────
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#1a1a2e',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 700 }, debug: false }
    },
    scene: [BootScene, WorldScene]
};

const game = new Phaser.Game(config);