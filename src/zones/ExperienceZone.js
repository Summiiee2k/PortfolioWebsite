import { TS } from '../constants.js';

const JOBS = [
    {
        name: 'Boehringer\nIngelheim',
        role: 'Trainee AI Engineer',
        dates: 'Apr 2025 – Mar 2026',
        type: 'large',
        buildingKey: 'office_boehringer',
        logoKey: 'logo_bi',
        logoW: 110, logoH: 62,
        labelColor: '#90CAF9',
        accentColor: '#00e676',
        x: 0,
    },
    {
        name: 'ScoutReach',
        role: 'AI Solution Engineer',
        dates: 'May 2025 – Present',
        type: 'startup',
        buildingKey: 'office_startup',
        logoKey: 'logo_scoutreach',
        logoW: 110, logoH: 30,
        labelColor: '#A5D6A7',
        accentColor: '#ffffff',
        x: 10,
    },
    {
        name: 'SleepLeads',
        role: 'AI Solution Engineer',
        dates: 'Nov 2025 – Present',
        type: 'startup',
        buildingKey: 'office_startup',
        logoKey: 'logo_sleepleads',
        logoW: 56, logoH: 56,
        labelColor: '#FFAB91',
        accentColor: '#ffffff',
        x: 19,
    },
    {
        name: 'Zynga Games',
        role: 'Assoc. Game Producer',
        dates: 'Jun – Aug 2023',
        type: 'games',
        buildingKey: 'office_games',
        logoKey: 'logo_zynga',
        logoW: 110, logoH: 60,
        labelColor: '#CE93D8',
        accentColor: '#ff1744',
        x: 28,
    },
];

export function buildExperienceZone(scene, H) {
    const startX = TS * 128;
    const groundY = H - TS;

    // zone header
    scene.add.text(startX, groundY - TS * 12, '🏢  EXPERIENCE', {
        fontSize: '28px', fill: '#ffdd00',
        fontFamily: 'Courier New', fontStyle: 'bold',
        stroke: '#000', strokeThickness: 5,
    });

    JOBS.forEach(j => {
        const px = startX + j.x * TS;

        // building image dimensions based on type
        const bW = j.type === 'large' ? TS * 7 : TS * 6;
        const bH = j.type === 'large' ? TS * 9 : TS * 7;
        const by = groundY - bH;

        // building sprite — anchored at bottom-left
        const building = scene.add.image(
            px + bW / 2,
            groundY,
            j.buildingKey
        ).setOrigin(0.5, 1).setDisplaySize(bW, bH);

        // dark overlay at bottom of building for ground blend
        const og = scene.add.graphics();
        og.fillStyle(0x000000, 0.15);
        og.fillRect(px, groundY - TS * 0.5, bW, TS * 0.5);

        // logo — positioned on building face
        const logoY = by + bH * 0.18;
        scene.add.image(px + bW / 2, logoY, j.logoKey)
            .setDisplaySize(j.logoW, j.logoH)
            .setOrigin(0.5);

        // info card above building
        const cardCX = px + bW / 2;
        const cardY = by - 16;
        const cardW = Math.max(180, j.name.length * 10 + 40);
        const cardH = 76;

        const cg = scene.add.graphics();
        cg.fillStyle(0x000000, 0.72);
        cg.fillRoundedRect(cardCX - cardW / 2, cardY - cardH, cardW, cardH, 8);
        cg.lineStyle(1, 0x334455, 0.8);
        cg.strokeRoundedRect(cardCX - cardW / 2, cardY - cardH, cardW, cardH, 8);

        // accent top line
        cg.lineStyle(3, Phaser.Display.Color.HexStringToColor(j.accentColor).color, 1);
        cg.lineBetween(cardCX - cardW / 2 + 8, cardY - cardH + 2, cardCX + cardW / 2 - 8, cardY - cardH + 2);

        // company name
        scene.add.text(cardCX, cardY - cardH + 12, j.name, {
            fontSize: '14px', fill: j.labelColor,
            fontFamily: 'Courier New', fontStyle: 'bold',
            align: 'center', stroke: '#000', strokeThickness: 3,
            lineSpacing: 2,
        }).setOrigin(0.5, 0);

        // role
        scene.add.text(cardCX, cardY - cardH + 40, j.role, {
            fontSize: '11px', fill: '#aabbcc',
            fontFamily: 'Courier New', align: 'center',
            stroke: '#000', strokeThickness: 2,
        }).setOrigin(0.5, 0);

        // dates
        scene.add.text(cardCX, cardY - cardH + 56, j.dates, {
            fontSize: '10px', fill: '#ffdd88',
            fontFamily: 'Courier New', align: 'center',
            stroke: '#000', strokeThickness: 2,
        }).setOrigin(0.5, 0);
    });
}