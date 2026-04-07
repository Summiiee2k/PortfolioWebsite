import { TS, FONT } from '../constants.js';

export function buildHeroZone(scene, H) {
    const midY = H * 0.42;

    // decorative border
    const g = scene.add.graphics();
    g.lineStyle(1, 0x00ff88, 0.25);
    g.strokeRect(TS * 1.5, midY - 140, TS * 19, 200);
    g.lineStyle(3, 0x00ff88, 0.8);
    [[TS * 1.5, midY - 140], [TS * 20.5, midY - 140],
    [TS * 1.5, midY + 60], [TS * 20.5, midY + 60]
    ].forEach(([cx, cy]) => g.strokeRect(cx - 4, cy - 4, 12, 12));


    scene.add.text(TS * 2, midY - 92, 'SUMEDH BAMANE', {
        fontSize: '44px', fill: '#ffffff',
        fontFamily: FONT, fontStyle: 'bold',
        stroke: '#000000', strokeThickness: 7
    });

    scene.add.text(TS * 2, midY - 36, 'AI ENGINEER · DATA SCIENTIST · ML ENGINEER', {
        fontSize: '20px', fill: '#00ff88',
        fontFamily: FONT,
        stroke: '#000000', strokeThickness: 3
    });

    scene.add.text(TS * 2, midY + 2,
        'Barcelona, Spain   ·   AWS AI Practitioner   ·   MSc Big Data & AI', {
        fontSize: '12px', fill: '#7799cc',
        fontFamily: FONT
    });

    const prompt = scene.add.text(TS * 2, midY + 44,
        '▶  walk right to explore', {
        fontSize: '12px', fill: '#445566',
        fontFamily: FONT
    });
    scene.tweens.add({
        targets: prompt, alpha: 0.15,
        duration: 900, yoyo: true, repeat: -1
    });
    scene.add.text(TS * 2, midY + 100,
        'USE THE ARROW KEYS ON KEYBOARD TO MOVE', {
        fontSize: '18px', fill: '#fce300ff',
        fontFamily: FONT
    });
    scene.add.text(TS * 2, midY + 140,
        'Use down arrow key to expand sections wherever prompted', {
        fontSize: '10px', fill: '#fce300ff',
        fontFamily: FONT
    });
    scene.add.text(TS * 2, midY + 180,
        'Turn on the music from top left for more immerison :D', {
        fontSize: '8.8px', fill: '#fce300ff',
        fontFamily: FONT
    });




    buildStarNPC(scene, H);
}
// ── Star NPC guide ──────────────────────────────────────────────
export function buildStarNPC(scene, H) {
    const groundY = H - TS;
    const npcX = TS * 7;
    const npcY = groundY - TS * 1.5;

    // star body — drawn as a proper 5-point star
    const star = scene.add.graphics();

    function drawStar(g, cx, cy, outerR, innerR, alpha) {
        g.clear();
        g.fillStyle(0xFFD700, alpha);
        const points = [];
        for (let i = 0; i < 10; i++) {
            const angle = (i * Math.PI / 5) - Math.PI / 2;
            const r = i % 2 === 0 ? outerR : innerR;
            points.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
        }
        g.fillPoints(points, true);
        // star outline
        g.lineStyle(2, 0xFFA000, 1);
        g.strokePoints(points, true);
        // eyes
        g.fillStyle(0x000000, 0.8);
        g.fillCircle(cx - 6, cy - 4, 3);
        g.fillCircle(cx + 6, cy - 4, 3);
        // smile
        g.lineStyle(2, 0x000000, 0.8);
        g.beginPath();
        g.arc(cx, cy + 2, 7, 0.3, Math.PI - 0.3, false);
        g.strokePath();
    }

    drawStar(star, npcX, npcY, 22, 10, 1);

    // float animation
    scene.tweens.add({
        targets: star, y: '-=10',
        duration: 800, yoyo: true, repeat: -1,
        ease: 'Sine.easeInOut',
    });

    // glow effect
    const glow = scene.add.graphics();
    scene.tweens.add({
        targets: { t: 0 }, t: 1,
        duration: 1200, yoyo: true, repeat: -1,
        onUpdate: tw => {
            glow.clear();
            glow.fillStyle(0xFFD700, 0.08 + tw.getValue() * 0.12);
            glow.fillCircle(npcX, npcY, 36);
        }
    });

    // speech bubble
    const bubX = npcX + 40;
    const bubY = npcY - 50;
    const bubW = 220;
    const bubH = 64;

    const bubG = scene.add.graphics();
    bubG.fillStyle(0xffffff, 0.96);
    bubG.fillRoundedRect(bubX, bubY, bubW, bubH, 8);
    bubG.fillStyle(0xffffff, 0.96);
    bubG.fillTriangle(bubX, bubY + 20, bubX - 16, bubY + 30, bubX, bubY + 40);
    bubG.lineStyle(2, 0xFFD700, 0.8);
    bubG.strokeRoundedRect(bubX, bubY, bubW, bubH, 8);

    const bubText = scene.add.text(bubX + bubW / 2, bubY + 10,
        "HEY THERE VISITOR! \n WELCOME TO SUMEDH'S JOURNEY", {
        fontSize: '7px', fill: '#111122',
        fontFamily: FONT,
        align: 'center', lineSpacing: 8,
    }
    ).setOrigin(0.5, 0);

    // blinking cursor
    const cursor = scene.add.text(
        bubX + bubW / 2, bubY + 44,
        '> PRESS -> TO START', {
        fontSize: '6px', fill: '#00aa66',
        fontFamily: '"Press Start 2P", monospace',
        align: 'center',
    }
    ).setOrigin(0.5, 0);
    scene.tweens.add({
        targets: cursor, alpha: 0.1,
        duration: 600, yoyo: true, repeat: -1,
    });

    // hide NPC and bubble when player walks far enough
    scene.time.addEvent({
        delay: 200, loop: true,
        callback: () => {
            if (!scene.player) return;
            const visible = scene.player.x < TS * 14;
            star.setVisible(visible);
            glow.setVisible(visible);
            bubG.setVisible(visible);
            bubText.setVisible(visible);
            cursor.setVisible(visible);
        }
    });
}