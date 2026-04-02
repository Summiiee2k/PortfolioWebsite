import { TS, FONT } from '../constants.js';

export function buildExperienceZone(scene, H) {
    const startX = TS * 150;
    const groundY = H - TS;

    scene.add.text(startX, groundY - TS * 13, '>> EXPERIENCE', {
        fontSize: '18px', fill: '#FFDD00',
        fontFamily: FONT,
        stroke: '#000', strokeThickness: 4,
    });

    _buildBoehringer(scene, startX, groundY);
    _buildScoutReach(scene, startX + TS * 14, groundY);
    _buildSleepLeads(scene, startX + TS * 22, groundY);
    _buildZynga(scene, startX + TS * 30, groundY);
}

// ── BOEHRINGER — Wide IT glass campus ──────────────────────────────
function _buildBoehringer(scene, px, groundY) {
    const bW = TS * 11;
    const bH = TS * 6;
    const by = groundY - bH;
    const g = scene.add.graphics();

    // ground shadow
    g.fillStyle(0x000000, 0.3);
    g.fillRect(px + 10, by + 10, bW, bH);

    // main concrete base — wide & low
    g.fillStyle(0x37474F, 1);
    g.fillRect(px, by, bW, bH);

    // glass curtain wall panels — 8 columns of floor-to-ceiling glass
    const panelW = (bW - 20) / 8;
    const panelH = bH - 30;
    for (let col = 0; col < 8; col++) {
        const gx = px + 10 + col * (panelW + 2);
        // glass panel
        g.fillStyle(0x4DD0E1, 0.55);
        g.fillRect(gx, by + 15, panelW, panelH);
        // glass sheen
        g.fillStyle(0xffffff, 0.12);
        g.fillRect(gx, by + 15, 8, panelH);
        // dark frame
        g.lineStyle(1, 0x263238, 0.9);
        g.strokeRect(gx, by + 15, panelW, panelH);
        // floor divider line in glass
        g.fillStyle(0x263238, 0.5);
        g.fillRect(gx, by + 15 + panelH / 3, panelW, 2);
        g.fillRect(gx, by + 15 + panelH * 2 / 3, panelW, 2);
    }

    // BI green horizontal accent stripes
    g.fillStyle(0x00C853, 1);
    g.fillRect(px, by, bW, 6);                          // top
    g.fillStyle(0x00C853, 0.6);
    g.fillRect(px, by + bH / 3, bW, 4);                   // mid 1
    g.fillRect(px, by + bH * 2 / 3, bW, 4);                 // mid 2

    // concrete base strip
    g.fillStyle(0x546E7A, 1);
    g.fillRect(px, groundY - 20, bW, 20);

    // entrance canopy — centred
    const canopyX = px + bW / 2 - TS * 1.8;
    const canopyW = TS * 3.6;
    g.fillStyle(0x00C853, 1);
    g.fillRect(canopyX, groundY - 28, canopyW, 8);
    g.fillStyle(0x546E7A, 1);
    g.fillRect(canopyX + 10, groundY - 28, 4, 28);
    g.fillRect(canopyX + canopyW - 14, groundY - 28, 4, 28);

    // entrance door glass
    g.fillStyle(0xB2EBF2, 0.7);
    g.fillRect(px + bW / 2 - 14, groundY - 26, 28, 26);

    // roof edge detail
    g.fillStyle(0x455A64, 1);
    g.fillRect(px, by - 6, bW, 6);

    // HVAC units on roof
    for (let u = 0; u < 3; u++) {
        g.fillStyle(0x607D8B, 1);
        g.fillRect(px + TS * 2 + u * TS * 3, by - 18, TS * 1.8, 12);
        g.fillStyle(0x455A64, 1);
        g.fillRect(px + TS * 2 + u * TS * 3, by - 24, TS * 1.4, 8);
    }

    // trees along base
    for (let t = 0; t < 6; t++) {
        const tx = px + TS + t * TS * 1.6;
        g.fillStyle(0x1B5E20, 1);
        g.fillCircle(tx, groundY - 18, 12);
        g.fillStyle(0x2E7D32, 1);
        g.fillCircle(tx, groundY - 22, 9);
        g.fillStyle(0x5D4037, 1);
        g.fillRect(tx - 2, groundY - 8, 4, 8);
    }

    // BI logo on glass — white background panel so logo is visible
    const logoW = 250, logoH = 90;
    const logoBgX = px + bW / 2 - logoW / 2 - 6;
    const logoBgY = by + 22;
    g.fillStyle(0xffffff, 0.92);
    g.fillRoundedRect(logoBgX, logoBgY, logoW + 12, logoH + 10, 4);

    scene.add.image(px + bW / 2, by + 70, 'logo_bi')
        .setDisplaySize(logoW, logoH)
        .setOrigin(0.5);

    // info card
    _infoCard(scene, px + bW / 2, by - 32,
        'Boehringer\nIngelheim',
        'Trainee AI Engineer',
        'Apr 2025 - Mar 2026',
        '#90CAF9', '#00C853'
    );
}

// ── SCOUTREACH — Cozy working café ─────────────────────────────────
function _buildScoutReach(scene, px, groundY) {
    const bW = TS * 5;
    const bH = TS * 5.5;
    const by = groundY - bH;
    const g = scene.add.graphics();

    // shadow
    g.fillStyle(0x000000, 0.3);
    g.fillRect(px + 6, by + 6, bW, bH);

    // wooden facade — warm brown
    g.fillStyle(0x8D6E63, 1);
    g.fillRect(px, by, bW, bH);

    // wood plank texture lines
    g.lineStyle(1, 0x6D4C41, 0.5);
    for (let row = 0; row < 8; row++) {
        g.lineBetween(px, by + row * (bH / 8), px + bW, by + row * (bH / 8));
    }

    // 2nd floor window strip
    g.fillStyle(0xFFF9C4, 0.85);  // cream/warm white — good contrast for black logo
    g.fillRect(px + 8, by + 14, bW - 16, bH * 0.28);
    g.lineStyle(2, 0x5D4037, 1);
    g.strokeRect(px + 8, by + 14, bW - 16, bH * 0.28);
    // window panes
    g.fillStyle(0x5D4037, 0.4);
    g.fillRect(px + bW / 2 - 1, by + 14, 2, bH * 0.28);
    g.fillRect(px + 8, by + 14 + bH * 0.28 / 2, bW - 16, 2);

    // ScoutReach logo on window — black on cream background = perfect contrast
    scene.add.image(px + bW / 2, by + 14 + bH * 0.15, 'logo_scoutreach')
        .setDisplaySize(bW - 30, 40)
        .setOrigin(0.5);

    // ground floor large display window
    g.fillStyle(0xFFF9C4, 0.75);
    g.fillRect(px + 8, by + bH * 0.5, bW - 16, bH * 0.32);
    g.lineStyle(2, 0x5D4037, 1);
    g.strokeRect(px + 8, by + bH * 0.5, bW - 16, bH * 0.32);
    // silhouettes of people working inside
    g.fillStyle(0x5D4037, 0.35);
    g.fillEllipse(px + bW * 0.3, by + bH * 0.6, 16, 16);
    g.fillRect(px + bW * 0.3 - 8, by + bH * 0.6 + 8, 16, 18);
    g.fillEllipse(px + bW * 0.7, by + bH * 0.6, 16, 16);
    g.fillRect(px + bW * 0.7 - 8, by + bH * 0.6 + 8, 16, 18);

    // awning — terracotta stripes
    const awningY = by + bH * 0.48;
    for (let s = 0; s < 5; s++) {
        g.fillStyle(s % 2 === 0 ? 0xBF360C : 0xE64A19, 1);
        g.fillRect(px + s * (bW / 5), awningY, bW / 5, 14);
    }
    // awning drape
    g.fillStyle(0xBF360C, 1);
    for (let s = 0; s < 8; s++) {
        g.fillTriangle(
            px + s * (bW / 8), awningY + 14,
            px + (s + 1) * (bW / 8), awningY + 14,
            px + (s + 0.5) * (bW / 8), awningY + 22
        );
    }

    // door
    g.fillStyle(0x4E342E, 1);
    g.fillRoundedRect(px + bW / 2 - 10, groundY - TS * 1.4, 20, TS * 1.4, 3);
    g.fillStyle(0xFFD740, 1);
    g.fillCircle(px + bW / 2 + 7, groundY - TS * 0.8, 3);

    // string lights — animated
    const lights = [];
    for (let l = 0; l < 8; l++) {
        const lx = px + 6 + l * (bW / 8);
        const ly = by + 12;
        const light = scene.add.rectangle(lx, ly, 5, 5, 0xFFD740, 0.9);
        lights.push(light);
        scene.tweens.add({
            targets: light, alpha: 0.2,
            duration: Phaser.Math.Between(400, 1200),
            yoyo: true, repeat: -1,
            delay: l * 150,
        });
    }

    // string wire
    const wg = scene.add.graphics();
    wg.lineStyle(1, 0x4E342E, 0.6);
    wg.lineBetween(px + 6, by + 12, px + bW - 6, by + 12);

    // chalkboard sign
    const cbX = px - 28;
    const cbY = groundY - TS * 1.8;
    g.fillStyle(0x2E7D32, 1);
    g.fillRect(cbX, cbY, 24, 36);
    g.fillStyle(0x1B5E20, 1);
    g.fillRect(cbX + 3, cbY + 3, 18, 26);
    g.fillStyle(0x8D6E63, 1);
    g.fillRect(cbX + 9, cbY + 36, 6, 10);

    // potted plants
    for (let pp = 0; pp < 2; pp++) {
        const plantX = px + pp * (bW - 16) + 4;
        g.fillStyle(0x795548, 1);
        g.fillRect(plantX, groundY - 22, 12, 16);
        g.fillStyle(0x388E3C, 1);
        g.fillCircle(plantX + 6, groundY - 26, 10);
        g.fillStyle(0x2E7D32, 1);
        g.fillCircle(plantX + 6, groundY - 30, 7);
    }

    _infoCard(scene, px + bW / 2, by - 28,
        'ScoutReach',
        'AI Solution Engineer',
        'May 2025 - Present',
        '#A5D6A7', '#ffffff'
    );
}

// ── SLEEPLEADS — Dark industrial startup ───────────────────────────
function _buildSleepLeads(scene, px, groundY) {
    const bW = TS * 5;
    const bH = TS * 5;
    const by = groundY - bH;
    const g = scene.add.graphics();

    // shadow
    g.fillStyle(0x000000, 0.4);
    g.fillRect(px + 6, by + 6, bW, bH);

    // dark concrete facade
    g.fillStyle(0x1C1C1C, 1);
    g.fillRect(px, by, bW, bH);

    // concrete texture — subtle horizontal lines
    g.lineStyle(1, 0x2A2A2A, 1);
    for (let row = 0; row < 12; row++) {
        g.lineBetween(px, by + row * (bH / 12), px + bW, by + row * (bH / 12));
    }

    // exposed steel beam accents
    g.fillStyle(0x546E7A, 0.8);
    g.fillRect(px + 8, by, 6, bH);
    g.fillRect(px + bW - 14, by, 6, bH);
    g.fillRect(px, by + bH * 0.35, bW, 4);

    // large industrial windows — floor-to-ceiling
    g.fillStyle(0x4FC3F7, 0.4);
    g.fillRect(px + 18, by + 20, bW - 36, bH * 0.5);
    g.lineStyle(2, 0x37474F, 1);
    g.strokeRect(px + 18, by + 20, bW - 36, bH * 0.5);
    // window frame cross
    g.fillStyle(0x37474F, 1);
    g.fillRect(px + bW / 2 - 1, by + 20, 2, bH * 0.5);
    g.fillRect(px + 18, by + 20 + bH * 0.25, bW - 36, 2);

    // inner warm glow through windows
    g.fillStyle(0xF3E5F5, 0.12);
    g.fillRect(px + 20, by + 22, bW - 40, bH * 0.5 - 4);

    // neon "SL" sign on roof — glowing
    const neonX = px + bW / 2;
    const neonY = by - 20;
    // glow halo
    g.fillStyle(0xE040FB, 0.15);
    g.fillCircle(neonX, neonY, 32);
    g.fillStyle(0xE040FB, 0.25);
    g.fillCircle(neonX, neonY, 22);
    // sign background
    g.fillStyle(0x1a0025, 1);
    g.fillRoundedRect(neonX - 28, neonY - 16, 56, 32, 4);
    g.lineStyle(2, 0xE040FB, 1);
    g.strokeRoundedRect(neonX - 28, neonY - 16, 56, 32, 4);

    // SL logo on sign — place the actual logo
    scene.add.image(neonX, neonY, 'logo_sleepleads')
        .setDisplaySize(44, 44)
        .setOrigin(0.5);

    // industrial loading shutters at base
    g.fillStyle(0x37474F, 1);
    g.fillRect(px + 14, groundY - TS * 1.2, bW - 28, TS * 1.2);
    // shutter lines
    g.lineStyle(1, 0x263238, 1);
    for (let sh = 0; sh < 6; sh++) {
        g.lineBetween(
            px + 14, groundY - TS * 1.2 + sh * (TS * 1.2 / 6),
            px + bW - 14, groundY - TS * 1.2 + sh * (TS * 1.2 / 6)
        );
    }

    // // neon sign glow animation
    // const glowRect = scene.add.graphics();
    // scene.tweens.add({
    //     targets: { t: 0 }, t: 1,
    //     duration: 1400, yoyo: true, repeat: -1,
    //     ease: 'Sine.easeInOut',
    //     onUpdate: tw => {
    //         const a = 0.15 + tw.getValue() * 0.25;
    //         glowRect.clear();
    //         glowRect.fillStyle(0xE040FB, a);
    //         glowRect.fillCircle(neonX, neonY, 36);
    //     }
    // });

    // graffiti detail — small pixel art tag
    g.fillStyle(0x7B1FA2, 0.5);
    g.fillRect(px + bW - 22, by + bH * 0.65, 14, 8);
    g.fillRect(px + bW - 20, by + bH * 0.65 + 8, 10, 6);

    _infoCard(scene, px + bW / 2, by - 52,
        'SleepLeads',
        'AI Solution Engineer',
        'Nov 2025 - Present',
        '#FFAB91', '#E040FB'
    );
}

// ── ZYNGA — Red brick game studio ──────────────────────────────────
function _buildZynga(scene, px, groundY) {
    const bW = TS * 6;
    const bH = TS * 6;
    const by = groundY - bH;
    const g = scene.add.graphics();

    // shadow
    g.fillStyle(0x000000, 0.35);
    g.fillRect(px + 8, by + 8, bW, bH);

    // red brick facade base
    g.fillStyle(0x7B2D0A, 1);
    g.fillRect(px, by, bW, bH);

    // brick mortar grid
    const brickW = 18, brickH = 10;
    g.lineStyle(1, 0xBCAAA4, 0.25);
    for (let row = 0; row < Math.ceil(bH / brickH); row++) {
        const offset = row % 2 === 0 ? 0 : brickW / 2;
        for (let col = -1; col < Math.ceil(bW / brickW) + 1; col++) {
            g.strokeRect(
                px + col * brickW + offset,
                by + row * brickH,
                brickW, brickH
            );
        }
    }

    // colourful game mural panels on facade
    // const muralColors = [0xFF6F00, 0x1565C0, 0x2E7D32, 0xFF1744, 0x6A1B9A];
    // const muralY = by + bH * 0.18;
    // const muralH = bH * 0.32;
    // muralColors.forEach((col, i) => {
    //     g.fillStyle(col, 0.8);
    //     g.fillRect(px + 4 + i * (bW - 8) / 5, muralY,
    //         (bW - 12) / 5, muralH);
    // });

    // white Zynga sign panel
    const signX = px + bW * 0.08;
    const signW = bW * 0.84;
    const signY = by + bH * 0.48;
    const signH = TS * 1.5;
    g.fillStyle(0xffffff, 0.95);
    g.fillRect(signX, signY, signW, signH);
    g.lineStyle(2, 0xCC0000, 1);
    g.strokeRect(signX, signY, signW, signH);

    // Zynga logo on white sign
    scene.add.image(px + bW / 2, signY + signH / 2, 'logo_zynga')
        .setDisplaySize(signW - 10, signH - 8)
        .setOrigin(0.5);

    // fire escape ladder — right side
    g.fillStyle(0x546E7A, 1);
    g.fillRect(px + bW - 16, by + bH * 0.2, 4, bH * 0.6);
    for (let r = 0; r < 5; r++) {
        g.fillRect(px + bW - 22, by + bH * 0.22 + r * (bH * 0.6 / 5), 12, 2);
    }

    // satellite dishes on roof
    const dishes = [
        { x: px + TS, y: by - 20, size: 22 },
        { x: px + TS * 3, y: by - 28, size: 28 },
    ];
    dishes.forEach(d => {
        // dish post
        g.fillStyle(0x9E9E9E, 1);
        g.fillRect(d.x - 2, d.y, 4, 20);
        // dish bowl
        g.fillStyle(0xBDBDBD, 1);
        g.fillEllipse(d.x, d.y, d.size, d.size * 0.6);
        // dish rim
        g.lineStyle(2, 0x757575, 1);
        g.strokeEllipse(d.x, d.y, d.size, d.size * 0.6);
        // dish center dot
        g.fillStyle(0x616161, 1);
        g.fillCircle(d.x, d.y, 3);
    });

    // antenna tower — left side
    g.fillStyle(0x607D8B, 1);
    g.fillRect(px - 10, by - TS * 2, 6, TS * 2 + bH);
    // cross bars
    g.fillRect(px - 16, by - TS * 1.5, 18, 3);
    g.fillRect(px - 14, by - TS * 0.8, 14, 3);
    // blinky light at top
    const blink = scene.add.rectangle(px - 7, by - TS * 2 - 4, 6, 6, 0xFF1744, 1);
    scene.tweens.add({
        targets: blink, alpha: 0.1,
        duration: 600, yoyo: true, repeat: -1,
    });

    // entrance door
    g.fillStyle(0x1a0a00, 1);
    g.fillRect(px + bW / 2 - 14, groundY - TS * 1.5, 28, TS * 1.5);
    g.fillStyle(0xFF1744, 0.3);
    g.fillRect(px + bW / 2 - 14, groundY - TS * 1.5, 28, TS * 1.5);

    _infoCard(scene, px + bW / 2, by - 32,
        'Zynga Games',
        'Assoc. Game Producer',
        'Jun - Aug 2023',
        '#CE93D8', '#FF1744'
    );
}

// ── Info card helper ────────────────────────────────────────────────
function _infoCard(scene, cx, topY, name, role, dates, nameColor, accentColor) {
    const cardW = 200;
    const cardH = 88;
    const cardY = topY - cardH;

    const cg = scene.add.graphics();
    cg.fillStyle(0x000000, 0.8);
    cg.fillRoundedRect(cx - cardW / 2, cardY, cardW, cardH, 6);
    cg.lineStyle(2, Phaser.Display.Color.HexStringToColor(accentColor.replace('#', '')).color, 0.9);
    cg.strokeRoundedRect(cx - cardW / 2, cardY, cardW, cardH, 6);

    scene.add.text(cx, cardY + 14, name, {
        fontSize: '8px', fill: nameColor,
        fontFamily: FONT,
        align: 'center', stroke: '#000', strokeThickness: 3,
        lineSpacing: 6,
    }).setOrigin(0.5, 0);

    scene.add.text(cx, cardY + 46, role, {
        fontSize: '7px', fill: '#aabbcc',
        fontFamily: FONT,
        align: 'center', stroke: '#000', strokeThickness: 2,
    }).setOrigin(0.5, 0);

    scene.add.text(cx, cardY + 66, dates, {
        fontSize: '7px', fill: '#FFDD88',
        fontFamily: FONT,
        align: 'center', stroke: '#000', strokeThickness: 2,
    }).setOrigin(0.5, 0);
}