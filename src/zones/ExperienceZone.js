import { TS } from '../constants.js';

const JOBS = [
    {
        name: 'Boehringer\nIngelheim',
        role: 'Trainee AI Engineer',
        dates: 'Apr 2025 – Mar 2026',
        color: 0x1565C0, accent: 0x42A5F5,
        labelColor: '#90CAF9',
        logoColor: 0x42A5F5,
        logoLetter: 'B',
        x: 0
    },
    {
        name: 'ScoutReach',
        role: 'AI Solution Engineer',
        dates: 'May 2025 – Present',
        color: 0x1B5E20, accent: 0x66BB6A,
        labelColor: '#A5D6A7',
        logoColor: 0x66BB6A,
        logoLetter: 'S',
        x: 9
    },
    {
        name: 'SleepLeads',
        role: 'AI Solution Engineer',
        dates: 'Nov 2025 – Present',
        color: 0xBF360C, accent: 0xFF7043,
        labelColor: '#FFAB91',
        logoColor: 0xFF7043,
        logoLetter: 'SL',
        x: 18
    },
    {
        name: 'Zynga Games',
        role: 'Assoc. Game Producer',
        dates: 'Jun – Aug 2023',
        color: 0x4A148C, accent: 0xAB47BC,
        labelColor: '#CE93D8',
        logoColor: 0xAB47BC,
        logoLetter: 'Z',
        x: 27
    },
];

export function buildExperienceZone(scene, H) {
    const startX = TS * 46;
    const groundY = H - TS;

    scene.add.text(startX, groundY - TS * 11, '🏢  EXPERIENCE', {
        fontSize: '24px', fill: '#ffdd00',
        fontFamily: 'Courier New', fontStyle: 'bold',
        stroke: '#000', strokeThickness: 5
    });

    JOBS.forEach(j => {
        const px = startX + j.x * TS;
        const bW = TS * 6;
        const bH = TS * 6;
        const buildY = groundY - bH;
        const g = scene.add.graphics();

        // shadow
        g.fillStyle(0x000000, 0.35);
        g.fillRect(px + 7, buildY + 7, bW, bH);

        // body
        g.fillStyle(j.color, 1);
        g.fillRect(px, buildY, bW, bH);

        // accent top stripe
        g.fillStyle(j.accent, 1);
        g.fillRect(px, buildY, bW, 10);

        // right edge shadow
        g.fillStyle(0x000000, 0.2);
        g.fillRect(px + bW - 8, buildY + 10, 8, bH - 10);

        // windows — 3×3 grid
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const wx = px + 12 + col * TS * 1.5;
                const wy = buildY + 20 + row * TS * 1.4;
                // window frame
                g.fillStyle(0x000000, 0.4);
                g.fillRect(wx - 1, wy - 1, 15, 15);
                // window glass
                g.fillStyle(0xFFFFDD, 0.75);
                g.fillRect(wx, wy, 13, 13);
                // window shine
                g.fillStyle(0xffffff, 0.5);
                g.fillRect(wx, wy, 5, 5);
            }
        }

        // door
        g.fillStyle(0x0d0d0d, 1);
        g.fillRoundedRect(px + bW / 2 - 11, groundY - TS * 1.6, 22, TS * 1.6, 5);

        // door handle
        g.fillStyle(j.accent, 1);
        g.fillCircle(px + bW / 2 + 7, groundY - TS * 0.8, 3);

        // logo placeholder circle on building face
        const logoX = px + bW / 2;
        const logoY = buildY + bH * 0.28;
        g.fillStyle(0x000000, 0.4);
        g.fillCircle(logoX, logoY, 22);
        g.fillStyle(j.logoColor, 0.9);
        g.fillCircle(logoX, logoY, 20);

        // logo letter
        scene.add.text(logoX, logoY, j.logoLetter, {
            fontSize: j.logoLetter.length > 1 ? '10px' : '14px',
            fill: '#ffffff', fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5);

        // company name — with dark backdrop
        const nameY = buildY - 44;
        const nameBg = scene.add.graphics();
        nameBg.fillStyle(0x000000, 0.6);
        nameBg.fillRoundedRect(px + bW / 2 - 52, nameY - 20, 104, 46, 6);

        scene.add.text(px + bW / 2, nameY, j.name, {
            fontSize: '11px', fill: j.labelColor,
            fontFamily: 'Courier New', fontStyle: 'bold',
            align: 'center', stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5, 1);

        // role
        scene.add.text(px + bW / 2, nameY + 6, j.role, {
            fontSize: '9px', fill: '#aaaaaa',
            fontFamily: 'Courier New', align: 'center'
        }).setOrigin(0.5, 0);

        // dates — shown ABOVE building, clearly visible
        scene.add.text(px + bW / 2, buildY - 56, j.dates, {
            fontSize: '10px', fill: '#ffdd88',
            fontFamily: 'Courier New', align: 'center',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5, 1);
    });
}