import { TS, FONT } from '../constants.js';
import { ABOUT_CARDS } from '../data/about.js';

const SIGN_COLORS = [
    { color: 0xA9AED3, top: 0xA9AED3, frame: 0x8B6914 },
    { color: 0xA9AED3, top: 0xA9AED3, frame: 0x6D4C2A },
    { color: 0xA9AED3, top: 0xA9AED3, frame: 0x8B6914 },
    { color: 0xA9AED3, top: 0xA9AED3, frame: 0x6D4C2A },
];

export function buildAboutZone(scene, H, expandZones) {
    const startX = TS * 26;
    const groundY = H - TS;

    scene.add.text(startX, groundY - TS * 11, '>> ABOUT ME', {
        fontSize: '18px', fill: '#FFDD00',
        fontFamily: FONT,
        stroke: '#000', strokeThickness: 4,
    });

    ABOUT_CARDS.forEach((card, i) => {
        const sx = startX + i * TS * 7;
        const sc = SIGN_COLORS[i];
        _buildSign(scene, sx, groundY, card, sc, i, expandZones);
    });
}

function _buildSign(scene, sx, groundY, card, sc, index, expandZones) {
    const sW = TS * 5;
    const sH = TS * 5;
    const sy = groundY - TS * 2 - sH;
    const fw = 8;
    const g = scene.add.graphics();

    // post
    g.fillStyle(sc.frame, 1);
    g.fillRect(sx + sW / 2 - 5, sy + sH, 10, groundY - sy - sH);
    g.fillStyle(Phaser.Display.Color.IntegerToColor(sc.frame).lighten(20).color, 1);
    g.fillRect(sx + sW / 2 - 2, sy + sH, 4, groundY - sy - sH);

    // shadow
    g.fillStyle(0x000000, 0.35);
    g.fillRect(sx + 5, sy + 5, sW, sH);

    // wooden frame
    g.fillStyle(sc.frame, 1);
    g.fillRect(sx, sy, sW, sH);
    g.fillStyle(Phaser.Display.Color.IntegerToColor(sc.frame).lighten(25).color, 1);
    g.fillRect(sx + fw - 2, sy + fw - 2, sW - (fw - 2) * 2, sH - (fw - 2) * 2);

    // content bg
    g.fillStyle(sc.color, 1);
    g.fillRect(sx + fw, sy + fw, sW - fw * 2, sH - fw * 2);

    // top accent
    g.fillStyle(sc.top, 1);
    g.fillRect(sx + fw, sy + fw, sW - fw * 2, 8);

    // right shadow
    g.fillStyle(0x000000, 0.2);
    g.fillRect(sx + sW - fw - 5, sy + fw + 8, 5, sH - fw * 2 - 8);

    // nail holes
    g.fillStyle(0x4E342E, 1);
    [[sx + 10, sy + 10], [sx + sW - 14, sy + 10],
    [sx + 10, sy + sH - 14], [sx + sW - 14, sy + sH - 14]
    ].forEach(([nx, ny]) => {
        g.fillCircle(nx, ny, 3);
        g.fillStyle(0x795548, 1);
        g.fillCircle(nx, ny, 2);
        g.fillStyle(0x4E342E, 1);
    });

    // icon — large
    scene.add.text(sx + sW / 2, sy + fw + 14, card.icon, {
        fontSize: '28px',
    }).setOrigin(0.5, 0);

    // title
    scene.add.text(sx + sW / 2, sy + fw + 62, card.title, {
        fontSize: '8px', fill: '#ffffff',
        fontFamily: FONT,
        align: 'center', stroke: '#000', strokeThickness: 3,
        wordWrap: { width: sW - fw * 2 - 10 },
    }).setOrigin(0.5, 0);

    // divider
    const dg = scene.add.graphics();
    dg.lineStyle(1, sc.top, 0.7);
    dg.lineBetween(sx + fw + 8, sy + fw + 88, sx + sW - fw - 8, sy + fw + 88);

    // ── proximity expand zone ──
    const zoneHeight = (groundY - sy) + TS; // from placard top to ground
    const zone = scene.add.zone(
        sx + sW / 2,
        sy + (groundY - sy) / 2,  // centred between placard top and ground
        sW + TS * 1.5,
        zoneHeight
    ).setOrigin(0.5);
    scene.physics.add.existing(zone, true);
    zone.aboutIndex = index;
    zone.aboutCards = ABOUT_CARDS;
    expandZones.push(zone);
}