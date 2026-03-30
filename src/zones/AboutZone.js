import { TS } from '../constants.js';

const SIGNS = [
    {
        title: 'THE ORIGIN',
        body: 'Started in Game Development —\nUnity, C#, physics engines.\nBuilt games before building AI.',
        color: 0x1a237e, accent: 0x5c6bc0,
    },
    {
        title: 'THE PIVOT',
        body: 'Discovered ML during my BCA.\nRealised I could make things\nthat learn, not just play.',
        color: 0x1b5e20, accent: 0x66bb6a,
    },
    {
        title: 'THE BUILD',
        body: 'Two Masters degrees later —\nRAG systems, MLOps pipelines,\nLLMs running in production.',
        color: 0x4a148c, accent: 0xab47bc,
    },
    {
        title: 'RIGHT NOW',
        body: 'Building AI products in Barcelona.\nOpen to exciting opportunities.\nWalk right to see the work. →',
        color: 0xb71c1c, accent: 0xef5350,
    },
];

export function buildAboutZone(scene, H) {
    const startX = TS * 26;
    const groundY = H - TS;

    // zone header
    scene.add.text(startX, groundY - TS * 10, '👤  ABOUT ME', {
        fontSize: '28px', fill: '#ffdd00',
        fontFamily: 'Courier New', fontStyle: 'bold',
        stroke: '#000', strokeThickness: 5,
    });

    SIGNS.forEach((s, i) => {
        const sx = startX + i * TS * 7;
        const sy = groundY - TS * 7.5;

        const g = scene.add.graphics();

        // sign post
        g.fillStyle(0x8B6914, 1);
        g.fillRect(sx + TS * 1.2, sy + TS * 3.5, 8, groundY - sy - TS * 3.5);

        // sign shadow
        g.fillStyle(0x000000, 0.35);
        g.fillRect(sx + 6, sy + 6, TS * 4, TS * 3.2);

        // sign body
        g.fillStyle(s.color, 1);
        g.fillRect(sx, sy, TS * 4, TS * 3.2);

        // accent top bar
        g.fillStyle(s.accent, 1);
        g.fillRect(sx, sy, TS * 4, 8);

        // right shadow
        g.fillStyle(0x000000, 0.2);
        g.fillRect(sx + TS * 4 - 6, sy + 8, 6, TS * 3.2 - 8);

        // title
        scene.add.text(sx + TS * 2, sy + 20, s.title, {
            fontSize: '13px', fill: '#ffffff',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3,
            align: 'center',
        }).setOrigin(0.5, 0);

        // divider line
        const dg = scene.add.graphics();
        dg.lineStyle(1, s.accent, 0.6);
        dg.lineBetween(sx + 10, sy + 40, sx + TS * 4 - 10, sy + 40);

        // body text
        scene.add.text(sx + TS * 2, sy + 50, s.body, {
            fontSize: '10px', fill: '#ccddee',
            fontFamily: 'Courier New',
            align: 'center',
            lineSpacing: 6,
            wordWrap: { width: TS * 3.6 },
        }).setOrigin(0.5, 0);
    });
}