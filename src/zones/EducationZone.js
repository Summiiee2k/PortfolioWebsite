import { TS, FONT } from '../constants.js';

const SCHOOLS = [
    {
        name: 'Seamedu\nSchool',
        short: 'Seamedu',
        degree: 'B.C.A. Game\nDevelopment',
        year: '2020 - 2023',
        grade: 'CGPA: 8.00/10',
        color: 0xA6A6A6, accent: 0xA6A6A6,
        labelColor: '#A5D6A7',
        logoKey: 'logo_seamedu',
        logoFallbackLetter: 'SE',
        x: 26,
        style: 'school',
    },
    {
        name: 'Parul\nUniversity',
        short: 'Parul Uni',
        degree: 'M.C.A. Big Data\nAnalytics',
        year: '2023 - 2024',
        grade: 'CGPA: 8.20/10',
        color: 0xA6A6A6, accent: 0xA6A6A6,
        labelColor: '#90CAF9',
        logoKey: 'logo_parul',
        logoFallbackLetter: 'PU',
        x: 13,
        style: 'university',
    },
    {
        name: 'Universitat\nde Barcelona\n(Barcelona Tchnology School)',
        short: 'UB / BTS',
        degree: 'M.Sc. Big Data\nAnalytics & AI',
        year: '2024 - 2025',
        grade: 'Grade: 8.0/10',
        color: 0xA6A6A6, accent: 0xA6A6A6,
        labelColor: '#F48FB1',
        logoKey: 'logo_ub',
        logoFallbackLetter: 'UB',
        x: 0,
        style: 'university',
    }

];

export function buildEducationZone(scene, H) {
    const startX = TS * 65;
    const groundY = H - TS;

    scene.add.text(startX, groundY - TS * 15, '>> EDUCATION', {
        fontSize: '18px', fill: '#FFDD00',
        fontFamily: FONT,
        stroke: '#000000ff', strokeThickness: 5,
    });

    SCHOOLS.forEach(s => _buildSchool(scene, startX + s.x * TS, groundY, s));
}

function _buildSchool(scene, px, groundY, s) {
    const bW = TS * 9;
    const bH = TS * 8;
    const by = groundY - bH;
    const g = scene.add.graphics();

    // shadow
    g.fillStyle(0x000000, 0.35);
    g.fillRect(px + 8, by + 8, bW, bH);

    // body
    g.fillStyle(s.color, 1);
    g.fillRect(px, by, bW, bH);

    // accent top band
    g.fillStyle(s.accent, 1);
    g.fillRect(px, by, bW, 12);

    // style-specific roofline
    if (s.style === 'university') {
        g.fillStyle(s.accent, 0.6);
        g.fillTriangle(px, by, px + bW, by, px + bW / 2, by - TS * 1.4);
        g.fillStyle(s.accent, 0.4);
    } else {
        g.fillStyle(s.accent, 1);
        g.fillRect(px + bW / 2 - TS, by - TS * 1.5, TS * 2, TS * 1.5);
        g.fillRect(px + bW / 2 - TS * 0.3, by - TS * 2.2, TS * 0.6, TS * 0.8);
    }

    // windows
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 5; col++) {
            const wx = px + 14 + col * TS * 1.9;
            const wy = by + 22 + row * TS * 2;
            g.fillStyle(0x000000, 0.35);
            g.fillRect(wx - 1, wy - 1, 18, 22);
            g.fillStyle(0xFFF9C4, 0.8);
            g.fillRect(wx, wy, 16, 20);
            g.fillStyle(0xffffff, 0.4);
            g.fillRect(wx, wy, 6, 8);
            g.fillStyle(s.color, 0.5);
            g.fillRect(wx + 7, wy, 2, 20);
            g.fillRect(wx, wy + 9, 16, 2);
        }
    }

    // entrance
    g.fillStyle(0x0d0d0d, 1);
    g.fillRoundedRect(px + bW / 2 - 50, groundY - TS * 2.2, 100, TS * 2.2, 1);
    g.fillStyle(s.accent, 0.3);

    // ── logo badge ──────────────────────────────────────────────────
    const logoX = px + bW / 2;
    const logoY = by + bH * 0.3;
    const logoR = 44;

    if (scene.textures.exists(s.logoKey)) {
        // display logo — no mask, just set display size to fit circle
        scene.add.image(logoX, logoY + 100, s.logoKey)
            .setDisplaySize(logoR * 5, logoR * 3)
            .setOrigin(0.5);
    } else {
        // fallback
        g.fillStyle(s.accent, 1);
        g.fillCircle(logoX, logoY, logoR);
        scene.add.text(logoX, logoY, s.logoFallbackLetter, {
            fontSize: '18px', fill: '#fff',
            fontFamily: FONT,
            stroke: '#000', strokeThickness: 2,
        }).setOrigin(0.5);
    }

    // ── info card ───────────────────────────────────────────────────
    const cardCX = px + bW / 2;
    const cardW = bW + 20;
    const padding = 16;
    const gap = 10;

    // create text objects to measure real heights
    const nameText = scene.add.text(cardCX, 0, s.name, {
        fontSize: '10px', fill: s.labelColor,
        fontFamily: FONT,
        align: 'center', stroke: '#000', strokeThickness: 3,
        lineSpacing: 6,
        wordWrap: { width: cardW - 28 },
    }).setOrigin(0.5, 0);

    const degreeText = scene.add.text(cardCX, 0, s.degree, {
        fontSize: '8px', fill: '#aaccff',
        fontFamily: FONT,
        align: 'center', stroke: '#000', strokeThickness: 2,
        lineSpacing: 4,
        wordWrap: { width: cardW - 28 },
    }).setOrigin(0.5, 0);

    const detailText = scene.add.text(cardCX, 0,
        `${s.year}  |  ${s.grade}`, {
        fontSize: '7px', fill: '#ffdd88',
        fontFamily: FONT,
        align: 'center', stroke: '#000', strokeThickness: 2,
        wordWrap: { width: cardW - 28 },
    }
    ).setOrigin(0.5, 0);

    // total card height from measured text
    const totalH = padding + nameText.height + gap
        + degreeText.height + gap
        + detailText.height + padding;

    // position card ABOVE the building with a fixed gap
    // by = top of building, so card sits above it
    const roofExtra = s.style === 'university' ? TS * 1.6 : TS * 2.4;
    const cardY = by - roofExtra - totalH - 16;

    // draw card background now we know the size
    const cg = scene.add.graphics();
    cg.fillStyle(0x000000, 0.35);
    cg.fillRoundedRect(cardCX - cardW / 2, cardY, cardW, totalH, 8);
    cg.lineStyle(2, s.accent, 0.8);
    cg.strokeRoundedRect(cardCX - cardW / 2, cardY, cardW, totalH, 8);
    cg.lineStyle(3, s.accent, 1);
    cg.lineBetween(
        cardCX - cardW / 2 + 10, cardY + 2,
        cardCX + cardW / 2 - 10, cardY + 2
    );

    // position text inside measured card
    let curY = cardY + padding;
    nameText.setY(curY);
    curY += nameText.height + gap;
    degreeText.setY(curY);
    curY += degreeText.height + gap;
    detailText.setY(curY);
}