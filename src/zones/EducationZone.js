import { TS, FONT } from '../constants.js';

const SCHOOLS = [
    {
        name: 'Universitat de Barcelona',
        short: 'UB / BTS',
        degree: 'M.Sc. Big Data Analytics & AI',
        year: '2024 – 2025',
        grade: 'Grade: 8.0 / 10',
        color: 0x880E4F, accent: 0xE91E63,
        labelColor: '#F48FB1',
        letter: 'UB',
        x: 0,
        style: 'university',
    },
    {
        name: 'Parul University',
        short: 'Parul Uni',
        degree: 'M.C.A. Big Data Analytics',
        year: '2023 – 2024',
        grade: 'CGPA: 8.20 / 10',
        color: 0x0d47a1, accent: 0x1976D2,
        labelColor: '#90CAF9',
        letter: 'PU',
        x: 12,
        style: 'university',
    },
    {
        name: 'Seamedu School',
        short: 'Seamedu',
        degree: 'B.C.A. Game Development',
        year: '2020 – 2023',
        grade: 'CGPA: 8.00 / 10',
        color: 0x1B5E20, accent: 0x388E3C,
        labelColor: '#A5D6A7',
        letter: 'SE',
        x: 24,
        style: 'school',
    },
];

export function buildEducationZone(scene, H) {
    const startX = TS * 56;
    const groundY = H - TS;

    scene.add.text(startX, groundY - TS * 12, '🎓  EDUCATION', {
        fontSize: '28px', fill: '#ffdd00',
        fontFamily: FONT, fontStyle: 'bold',
        stroke: '#000', strokeThickness: 5,
    });

    SCHOOLS.forEach(s => {
        const px = startX + s.x * TS;
        const bW = TS * 8;
        const bH = TS * 7;
        const by = groundY - bH;
        const g = scene.add.graphics();

        // shadow
        g.fillStyle(0x000000, 0.35);
        g.fillRect(px + 8, by + 8, bW, bH);

        // main body
        g.fillStyle(s.color, 1);
        g.fillRect(px, by, bW, bH);

        // top accent band
        g.fillStyle(s.accent, 1);
        g.fillRect(px, by, bW, 12);

        // side shadow
        g.fillStyle(0x000000, 0.2);
        g.fillRect(px + bW - 8, by + 12, 8, bH - 12);

        if (s.style === 'university') {
            // pillars
            g.fillStyle(0x000000, 0.25);
            for (let p = 0; p < 4; p++) {
                g.fillRect(px + 12 + p * TS * 1.7, by + 12, 12, bH - 12);
            }
            // pediment / triangle roof
            g.fillStyle(s.accent, 0.7);
            g.fillTriangle(
                px, by,
                px + bW, by,
                px + bW / 2, by - TS * 1.2
            );
            // dome
            g.fillStyle(s.accent, 0.5);
            g.fillEllipse(px + bW / 2, by - TS * 0.6, TS * 2, TS * 1.4);
        } else {
            // school style — flat roof with small tower
            g.fillStyle(s.accent, 1);
            g.fillRect(px + bW / 2 - TS, by - TS * 1.5, TS * 2, TS * 1.5);
            g.fillStyle(s.accent, 0.7);
            g.fillRect(px + bW / 2 - TS * 0.3, by - TS * 2.2, TS * 0.6, TS * 0.8);
        }

        // windows — 2 rows × 4 cols
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 4; col++) {
                const wx = px + 14 + col * TS * 1.7;
                const wy = by + 20 + row * TS * 1.8;
                g.fillStyle(0x000000, 0.35);
                g.fillRect(wx - 1, wy - 1, 18, 22);
                g.fillStyle(0xFFF9C4, 0.8);
                g.fillRect(wx, wy, 16, 20);
                g.fillStyle(0xffffff, 0.4);
                g.fillRect(wx, wy, 6, 8);
                // window cross divider
                g.fillStyle(s.color, 0.5);
                g.fillRect(wx + 7, wy, 2, 20);
                g.fillRect(wx, wy + 9, 16, 2);
            }
        }

        // main entrance
        g.fillStyle(0x0d0d0d, 1);
        g.fillRoundedRect(px + bW / 2 - 16, groundY - TS * 2, 32, TS * 2, 8);
        // entrance steps
        g.fillStyle(s.accent, 0.4);
        g.fillRect(px + bW / 2 - 22, groundY - 10, 44, 10);
        g.fillRect(px + bW / 2 - 18, groundY - 18, 36, 8);

        // crest / logo badge
        g.fillStyle(0x000000, 0.4);
        g.fillCircle(px + bW / 2, by + TS * 0.9, 24);
        g.fillStyle(s.accent, 1);
        g.fillCircle(px + bW / 2, by + TS * 0.9, 22);
        scene.add.text(px + bW / 2, by + TS * 0.9, s.letter, {
            fontSize: '13px', fill: '#fff',
            fontFamily: FONT, fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2,
        }).setOrigin(0.5);

        // info card above building
        const cardX = px + bW / 2;
        const cardY = by - (s.style === 'university' ? TS * 2.2 : TS * 3.2);

        const cardBg = scene.add.graphics();
        cardBg.fillStyle(0x000000, 0.65);
        cardBg.fillRoundedRect(cardX - 90, cardY - 52, 180, 56, 8);
        cardBg.lineStyle(1, s.accent, 0.5);
        cardBg.strokeRoundedRect(cardX - 90, cardY - 52, 180, 56, 8);

        scene.add.text(cardX, cardY - 44, s.short, {
            fontSize: '14px', fill: s.labelColor,
            fontFamily: FONT, fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2,
        }).setOrigin(0.5, 0);

        scene.add.text(cardX, cardY - 26, s.degree, {
            fontSize: '10px', fill: '#aaccff',
            fontFamily: FONT,
            stroke: '#000', strokeThickness: 2,
        }).setOrigin(0.5, 0);

        scene.add.text(cardX, cardY - 10, `${s.year}  ·  ${s.grade}`, {
            fontSize: '9px', fill: '#ffdd88',
            fontFamily: FONT,
            stroke: '#000', strokeThickness: 2,
        }).setOrigin(0.5, 0);
    });
}