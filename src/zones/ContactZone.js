import { TS, FONT } from '../constants.js';

const CONTACTS = [
    {
        icon: '📧',
        label: 'sumedhbamane8338@gmail.com',
        url: 'mailto:sumedhbamane8338@gmail.com',
        color: '#ff9966'
    },
    {
        icon: '💼',
        label: 'linkedin.com/in/sumedh-bamane-494191162',
        url: 'https://linkedin.com/in/sumedh-bamane-494191162',
        color: '#66aaff'
    },
    {
        icon: '🐙',
        label: 'github.com/Summiiee2k',
        url: 'https://github.com/Summiiee2k',
        color: '#aaffaa'
    },
    {
        icon: '📍',
        label: 'Barcelona, Spain',
        url: null,
        color: '#ffddaa'
    },
];

export function buildContactZone(scene, H) {
    const startX = TS * 299;
    const groundY = H - TS;
    const g = scene.add.graphics();

    // castle shadow
    g.fillStyle(0x000000, 0.3);
    g.fillRect(startX + 8, groundY - TS * 5 + 8, TS * 8, TS * 5);

    // main body
    g.fillStyle(0x78909C, 1);
    g.fillRect(startX, groundY - TS * 5, TS * 8, TS * 5);

    // stone lines
    g.lineStyle(1, 0x546E7A, 0.4);
    for (let r = 0; r < 5; r++)
        g.lineBetween(startX, groundY - r * TS, startX + TS * 8, groundY - r * TS);
    for (let c = 0; c < 8; c++)
        g.lineBetween(startX + c * TS, groundY - TS * 5, startX + c * TS, groundY);

    // towers
    g.fillStyle(0x607D8B, 1);
    g.fillRect(startX - TS, groundY - TS * 7, TS * 2.5, TS * 7);
    g.fillRect(startX + TS * 5.5, groundY - TS * 7, TS * 2.5, TS * 7);

    // battlements
    g.fillStyle(0x78909C, 1);
    for (let i = 0; i < 4; i++)
        g.fillRect(startX + i * TS * 2, groundY - TS * 6, TS * 1.1, TS);
    g.fillStyle(0x607D8B, 1);
    for (let i = 0; i < 2; i++) {
        g.fillRect(startX - TS + i * TS, groundY - TS * 8, TS * 0.9, TS);
        g.fillRect(startX + TS * 5.5 + i * TS, groundY - TS * 8, TS * 0.9, TS);
    }

    // gate
    g.fillStyle(0x1a1a2e, 1);
    g.fillRoundedRect(startX + TS * 2.8, groundY - TS * 2.8, TS * 2.4, TS * 2.8, 20);
    g.fillStyle(0x37474F, 1);
    for (let b = 0; b < 4; b++)
        g.fillRect(startX + TS * 3 + b * 10, groundY - TS * 2.6, 3, TS * 2.4);

    // tower windows
    g.fillStyle(0xFFE082, 0.85);
    g.fillRoundedRect(startX - TS * 0.4, groundY - TS * 5.5, TS * 0.8, TS * 1.1, 8);
    g.fillRoundedRect(startX + TS * 6.6, groundY - TS * 5.5, TS * 0.8, TS * 1.1, 8);
    g.fillRoundedRect(startX + TS * 3.4, groundY - TS * 4.8, TS * 1.2, TS * 1.4, 10);

    // flag
    g.fillStyle(0xBDBDBD, 1);
    g.fillRect(startX + TS * 4, groundY - TS * 11, 3, TS * 4);
    g.fillStyle(0xFF1744, 1);
    g.fillTriangle(
        startX + TS * 4 + 3, groundY - TS * 11,
        startX + TS * 4 + 3, groundY - TS * 9,
        startX + TS * 4 + 32, groundY - TS * 10
    );

    // header
    scene.add.text(startX + TS * 4, groundY - TS * 13.5,
        '[ GET IN TOUCH ]', {
        fontSize: '22px', fill: '#ffdd00',
        fontFamily: FONT, fontStyle: 'bold',
        stroke: '#000', strokeThickness: 5
    }
    ).setOrigin(0.5);

    // clickable contact links
    CONTACTS.forEach((c, i) => {
        const ty = groundY - TS * 17 + i * 32;

        const bg = scene.add.graphics();
        bg.fillStyle(0x000000, 0.45);
        bg.fillRoundedRect(startX - TS * 1.5, ty - 6, TS * 14, 26, 5);

        const txt = scene.add.text(
            startX - TS * 0.8, ty,
            `${c.icon}  ${c.label}`, {
            fontSize: '13px', fill: c.color,
            fontFamily: FONT,
            stroke: '#000', strokeThickness: 2
        }
        );

        if (c.url) {
            txt.setInteractive({ useHandCursor: true });
            txt.on('pointerover', () => {
                txt.setStyle({ fill: '#ffffff' });
                bg.clear();
                bg.fillStyle(0x223344, 0.7);
                bg.fillRoundedRect(startX - TS * 1.5, ty - 6, TS * 14, 26, 5);
            });
            txt.on('pointerout', () => {
                txt.setStyle({ fill: c.color });
                bg.clear();
                bg.fillStyle(0x000000, 0.45);
                bg.fillRoundedRect(startX - TS * 1.5, ty - 6, TS * 14, 26, 5);
            });
            txt.on('pointerup', () => {
                window.open(c.url, '_blank');
            });
        }
    });
}