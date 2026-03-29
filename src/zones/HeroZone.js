import { TS, COLORS } from '../constants.js';

export function buildHeroZone(scene, H) {
    const midY = H * 0.42;

    // decorative border
    const g = scene.add.graphics();
    g.lineStyle(1, 0x00ff88, 0.25);
    g.strokeRect(TS * 1.5, midY - 140, TS * 16, 200);
    g.lineStyle(3, 0x00ff88, 0.8);
    [[TS * 1.5, midY - 140], [TS * 17.5, midY - 140],
    [TS * 1.5, midY + 60], [TS * 17.5, midY + 60]
    ].forEach(([cx, cy]) => g.strokeRect(cx - 4, cy - 4, 12, 12));

    scene.add.text(TS * 2, midY - 120, '// hello world', {
        fontSize: '12px', fill: '#00ff88',
        fontFamily: 'Courier New'
    });

    scene.add.text(TS * 2, midY - 92, 'SUMEDH BAMANE', {
        fontSize: '44px', fill: '#ffffff',
        fontFamily: 'Courier New', fontStyle: 'bold',
        stroke: '#000000', strokeThickness: 7
    });

    scene.add.text(TS * 2, midY - 36, 'AI  ENGINEER   ·   DATA  SCIENTIST', {
        fontSize: '20px', fill: '#00ff88',
        fontFamily: 'Courier New',
        stroke: '#000000', strokeThickness: 3
    });

    scene.add.text(TS * 2, midY + 2,
        'Barcelona, Spain   ·   AWS AI Practitioner   ·   MSc Big Data & AI', {
        fontSize: '12px', fill: '#7799cc',
        fontFamily: 'Courier New'
    });

    const prompt = scene.add.text(TS * 2, midY + 44,
        '▶  walk right to explore', {
        fontSize: '12px', fill: '#445566',
        fontFamily: 'Courier New'
    });
    scene.tweens.add({
        targets: prompt, alpha: 0.15,
        duration: 900, yoyo: true, repeat: -1
    });

    // animated gold coins
    for (let i = 0; i < 8; i++) {
        const cx = TS * (12 + i * 2.2);
        const cy = H - TS * 3.5;
        const coin = scene.add.graphics();
        coin.fillStyle(0xFFD700, 1);
        coin.fillCircle(0, 0, 7);
        coin.fillStyle(0xFFC200, 1);
        coin.fillCircle(-1, -2, 3);
        coin.x = cx; coin.y = cy;
        scene.tweens.add({
            targets: coin, y: cy - 14,
            duration: 500, yoyo: true,
            repeat: -1, delay: i * 110,
            ease: 'Sine.easeInOut'
        });
    }
}