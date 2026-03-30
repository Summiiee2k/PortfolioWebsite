import { TS } from '../constants.js';

export function buildEasterEggZone(scene, H) {
    const startX = TS * 282;
    const groundY = H - TS;

    // sunny sky particles — floating confetti
    for (let i = 0; i < 40; i++) {
        const cx = startX + Phaser.Math.Between(0, TS * 30);
        const cy = Phaser.Math.Between(40, H * 0.7);
        const colors = [0xFF5252, 0xFFD740, 0x69F0AE, 0x40C4FF, 0xFF6E40];
        const col = colors[i % colors.length];
        const piece = scene.add.rectangle(
            cx, cy,
            Phaser.Math.Between(4, 10),
            Phaser.Math.Between(4, 10),
            col, 0.8
        );
        scene.tweens.add({
            targets: piece,
            y: piece.y + Phaser.Math.Between(80, 200),
            x: piece.x + Phaser.Math.Between(-40, 40),
            alpha: 0,
            duration: Phaser.Math.Between(3000, 6000),
            repeat: -1,
            delay: Phaser.Math.Between(0, 3000),
        });
    }

    // photo frame placeholder
    const frameX = startX + TS * 8;
    const frameY = groundY - TS * 9;
    const fW = TS * 6;
    const fH = TS * 7;

    const g = scene.add.graphics();

    // frame shadow
    g.fillStyle(0x000000, 0.4);
    g.fillRect(frameX + 8, frameY + 8, fW, fH);

    // golden frame border
    g.fillStyle(0xFFD700, 1);
    g.fillRect(frameX - 8, frameY - 8, fW + 16, fH + 16);
    g.fillStyle(0xFFA000, 1);
    g.fillRect(frameX - 6, frameY - 6, fW + 12, fH + 12);

    // frame inner
    g.fillStyle(0x1a1a2e, 1);
    g.fillRect(frameX, frameY, fW, fH);

    // placeholder photo — checkerboard pattern
    for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 6; col++) {
            const even = (row + col) % 2 === 0;
            g.fillStyle(even ? 0x2a2a4e : 0x1a1a2e, 1);
            g.fillRect(frameX + col * TS, frameY + row * TS, TS, TS);
        }
    }

    // placeholder silhouette
    g.fillStyle(0x4444aa, 0.6);
    g.fillCircle(frameX + fW / 2, frameY + fH * 0.3, 40);
    g.fillRoundedRect(frameX + fW / 2 - 50, frameY + fH * 0.5, 100, 80, 10);

    // "PHOTO COMING SOON" text in frame
    scene.add.text(frameX + fW / 2, frameY + fH / 2, '📸\nPHOTO\nCOMING SOON', {
        fontSize: '13px', fill: '#aaaacc',
        fontFamily: 'Courier New', align: 'center',
        stroke: '#000', strokeThickness: 2, lineSpacing: 4,
    }).setOrigin(0.5);

    // speech bubble above frame
    const bubbleX = frameX + fW / 2;
    const bubbleY = frameY - 60;
    const bg = scene.add.graphics();
    bg.fillStyle(0xffffff, 0.95);
    bg.fillRoundedRect(bubbleX - 130, bubbleY - 28, 260, 52, 12);
    // bubble tail
    bg.fillTriangle(
        bubbleX - 12, bubbleY + 24,
        bubbleX + 12, bubbleY + 24,
        bubbleX, bubbleY + 42,
    );

    scene.add.text(bubbleX, bubbleY, '😂 You found me!\nCongrats on the dedication!', {
        fontSize: '11px', fill: '#111122',
        fontFamily: 'Courier New', align: 'center',
        lineSpacing: 4,
    }).setOrigin(0.5);

    // achievement popup (slides down after 1 second)
    const achX = startX + TS * 8;
    const ach = scene.add.graphics();
    ach.fillStyle(0xFFD700, 0.95);
    ach.fillRoundedRect(0, 0, 260, 60, 10);
    ach.x = achX - 130;
    ach.y = -80;
    ach.setScrollFactor(0).setDepth(50);

    const achText = scene.add.text(achX, -50, '🏆  EXPLORER UNLOCKED\nYou found the Easter Egg!', {
        fontSize: '12px', fill: '#111111',
        fontFamily: 'Courier New', fontStyle: 'bold',
        align: 'center', lineSpacing: 3,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(51);

    // trigger achievement when player enters zone
    scene.time.addEvent({
        delay: 100,
        loop: true,
        callback: () => {
            if (!scene.player) return;
            const dist = Math.abs(scene.player.x - (startX + TS * 10));
            if (dist < TS * 6 && !scene._easterTriggered) {
                scene._easterTriggered = true;
                scene.tweens.add({
                    targets: [ach, achText],
                    y: '+=' + 100,
                    duration: 600, ease: 'Back.easeOut',
                });
                scene.time.delayedCall(3500, () => {
                    scene.tweens.add({
                        targets: [ach, achText],
                        y: '-=' + 100,
                        duration: 400, ease: 'Back.easeIn',
                    });
                });
            }
        },
    });

    // "YOU'VE REACHED THE END" sign
    scene.add.text(startX + TS * 20, groundY - TS * 6,
        '🎉  YOU REACHED THE END!\nThanks for exploring my world.', {
        fontSize: '18px', fill: '#ffdd00',
        fontFamily: 'Courier New', fontStyle: 'bold',
        stroke: '#000', strokeThickness: 4,
        align: 'center', lineSpacing: 8,
    }
    ).setOrigin(0.5, 1);

    // hard wall — invisible solid barrier
    const wall = scene.add.rectangle(
        startX + TS * 30, H / 2,
        TS, H * 3
    ).setVisible(false);
    scene.physics.add.existing(wall, true);
    scene.platforms.add(wall);

    // visual wall — pixel art barrier
    const wg = scene.add.graphics();
    wg.fillStyle(0x37474F, 1);
    wg.fillRect(startX + TS * 29.5, 0, TS * 1.2, H);
    wg.fillStyle(0x546E7A, 1);
    for (let y = 0; y < H; y += TS) {
        wg.fillRect(startX + TS * 29.5, y, TS * 1.2, 6);
    }
    // "THE END" on wall
    scene.add.text(startX + TS * 30, H * 0.35, 'THE\nEND', {
        fontSize: '16px', fill: '#ffffff',
        fontFamily: 'Courier New', fontStyle: 'bold',
        stroke: '#000', strokeThickness: 3,
        align: 'center',
    }).setOrigin(0.5);
}