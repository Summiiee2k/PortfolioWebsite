import { TS, FONT } from '../constants.js';
import { HOBBIES_DATA } from '../data/hobbies.js';

export function buildHobbiesZone(scene, H, expandZones) {
    const startX = TS * 320;
    const groundY = H - TS;

    scene.add.text(startX, groundY - TS * 13, '>> HOBBIES', {
        fontSize: '18px', fill: '#FFDD00',
        fontFamily: FONT,
        stroke: '#000', strokeThickness: 4,
    });

    HOBBIES_DATA.forEach((hob, i) => {
        _buildHobbyPlacard(scene, startX + i * TS * 7, groundY, hob, expandZones);
    });
}

function _buildHobbyPlacard(scene, px, groundY, hob, expandZones) {
    const pW = TS * 5.5;
    const pHI = TS * 3.5;
    const pHT = TS * 2.5;
    const pH = pHI + pHT;
    const py = groundY - TS * 2 - pH;
    const fw = 8;
    const g = scene.add.graphics();

    const col = Phaser.Display.Color.HexStringToColor(
        hob.accentColor.replace('#', '')
    ).color;

    // double wooden posts
    const frameColor = 0x8B6914;
    g.fillStyle(frameColor, 1);
    g.fillRect(px + pW * 0.2 - 4, py + pH, 8, groundY - py - pH);
    g.fillRect(px + pW * 0.78 - 4, py + pH, 8, groundY - py - pH);

    // shadow
    g.fillStyle(0x000000, 0.35);
    g.fillRect(px + 6, py + 6, pW, pH);

    // frame outer
    g.fillStyle(frameColor, 1);
    g.fillRect(px, py, pW, pH);

    // frame inner
    g.fillStyle(Phaser.Display.Color.IntegerToColor(frameColor).lighten(22).color, 1);
    g.fillRect(px + fw - 2, py + fw - 2, pW - (fw - 2) * 2, pH - (fw - 2) * 2);

    // image section bg
    g.fillStyle(0x08081a, 1);
    g.fillRect(px + fw, py + fw, pW - fw * 2, pHI - fw);

    // checkerboard placeholder
    const cs = 18;
    for (let row = 0; row < Math.ceil((pHI - fw) / cs); row++) {
        for (let col2 = 0; col2 < Math.ceil((pW - fw * 2) / cs); col2++) {
            if ((row + col2) % 2 === 0) {
                g.fillStyle(0xffffff, 0.025);
                g.fillRect(px + fw + col2 * cs, py + fw + row * cs, cs, cs);
            }
        }
    }

    // icon in image area
    scene.add.text(px + pW / 2, py + fw + (pHI - fw) * 0.12,
        hob.icon, { fontSize: '32px' }
    ).setOrigin(0.5, 0);

    // camera icon + "PRESS ↓"
    scene.add.text(px + pW / 2, py + fw + (pHI - fw) * 0.55,
        'PRESS ⬇️ TO OPEN', {
        fontSize: '12px', fill: '#cf0b0bff',
        fontFamily: FONT,
        align: 'center', lineSpacing: 8,
    }
    ).setOrigin(0.5, 0);

    // dashed border in image area
    const dg = scene.add.graphics();
    dg.lineStyle(1, col, 0.3);
    dg.strokeRect(px + fw + 4, py + fw + 4, pW - fw * 2 - 8, pHI - fw - 8);

    // title bar
    const textY = py + pHI;
    g.fillStyle(col, 1);
    g.fillRect(px + fw, textY, pW - fw * 2, 22);
    scene.add.text(px + pW / 2, textY + 11, hob.label, {
        fontSize: '8px', fill: '#ffffff',
        fontFamily: FONT, stroke: '#000', strokeThickness: 2,
    }).setOrigin(0.5);

    // subtitle
    g.fillStyle(0x08081a, 0.9);
    g.fillRect(px + fw, textY + 22, pW - fw * 2, pHT - 22);
    scene.add.text(px + pW / 2, textY + 32, hob.subtitle, {
        fontSize: '7px', fill: hob.accentColor,
        fontFamily: FONT, align: 'center',
        stroke: '#000', strokeThickness: 2,
        wordWrap: { width: pW - fw * 2 - 10 },
    }).setOrigin(0.5, 0);

    // corner ribbon
    g.fillStyle(col, 1);
    g.fillTriangle(px, py, px + 28, py, px, py + 28);

    // nail holes
    g.fillStyle(0x4E342E, 1);
    [[px + 10, py + 10], [px + pW - 14, py + 10],
    [px + 10, py + pH - 14], [px + pW - 14, py + pH - 14]
    ].forEach(([nx, ny]) => g.fillCircle(nx, ny, 3));

    // ── proximity expand zone ──
    const zoneHeight = (groundY - py) + TS;
    const zone = scene.add.zone(
        px + pW / 2,
        py + (groundY - py) / 2,
        pW + TS * 1.5,
        zoneHeight
    ).setOrigin(0.5);
    scene.physics.add.existing(zone, true);
    zone.hobbyData = hob;
    expandZones.push(zone);
}