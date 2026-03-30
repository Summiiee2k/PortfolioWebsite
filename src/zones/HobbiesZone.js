import { TS } from '../constants.js';

const HOBBIES = [
    {
        icon: '🎮',
        label: 'GAMING',
        desc: 'Where it all started.\nUnity → AI engineer.',
        color: 0x1a237e, accent: 0x3949AB,
        x: 0,
    },
    {
        icon: '✈️',
        label: 'TRAVELLING',
        desc: 'India → Barcelona.\nAlways exploring.',
        color: 0x004D40, accent: 0x00897B,
        x: 6,
    },
    {
        icon: '⚽',
        label: 'FOOTBALL',
        desc: 'Playing &  watching.\nForça Barça! 🔵🔴',
        color: 0x1565C0, accent: 0xA50044,
        x: 12,
    },
    {
        icon: '🏋️',
        label: 'GYM',
        desc: 'Consistency.\nSame as ML training.',
        color: 0xBF360C, accent: 0xFF5722,
        x: 18,
    },
    {
        icon: '🎵',
        label: 'MUSIC',
        desc: 'Lo-fi while coding.\nAlways in the zone.',
        color: 0x4A148C, accent: 0x9C27B0,
        x: 24,
    },
];

export function buildHobbiesZone(scene, H) {
    const startX = TS * 224;
    const groundY = H - TS;

    scene.add.text(startX, groundY - TS * 10, '🎯  HOBBIES', {
        fontSize: '28px', fill: '#ffdd00',
        fontFamily: 'Courier New', fontStyle: 'bold',
        stroke: '#000', strokeThickness: 5,
    });

    HOBBIES.forEach(hob => {
        const px = startX + hob.x * TS;
        const bW = TS * 4;
        const bH = TS * 4;
        const by = groundY - bH;
        const g = scene.add.graphics();

        // shadow
        g.fillStyle(0x000000, 0.3);
        g.fillRect(px + 5, by + 5, bW, bH);

        // body
        g.fillStyle(hob.color, 1);
        g.fillRect(px, by, bW, bH);

        // accent top
        g.fillStyle(hob.accent, 1);
        g.fillRect(px, by, bW, 8);

        // right shadow
        g.fillStyle(0x000000, 0.25);
        g.fillRect(px + bW - 6, by + 8, 6, bH - 8);

        // big icon
        scene.add.text(px + bW / 2, by + bH * 0.28, hob.icon, {
            fontSize: '34px',
        }).setOrigin(0.5);

        // label
        scene.add.text(px + bW / 2, by + bH * 0.58, hob.label, {
            fontSize: '13px', fill: '#ffffff',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3,
            align: 'center',
        }).setOrigin(0.5);

        // desc
        scene.add.text(px + bW / 2, by + bH * 0.74, hob.desc, {
            fontSize: '9px', fill: '#aaccee',
            fontFamily: 'Courier New', align: 'center',
            lineSpacing: 4,
        }).setOrigin(0.5);
    });
}