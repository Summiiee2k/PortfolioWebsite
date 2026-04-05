import { TS, FONT } from '../constants.js';

export function buildEasterEggZone(scene, H) {
    const startX = TS * 550;
    const groundY = H - TS;

    // ── confetti particles
    for (let i = 0; i < 50; i++) {
        const cx = startX + Phaser.Math.Between(0, TS * 40);
        const cy = Phaser.Math.Between(40, H * 0.7);
        const colors = [0xFF5252, 0xFFD740, 0x69F0AE, 0x40C4FF, 0xFF6E40, 0xE040FB];
        const piece = scene.add.rectangle(
            cx, cy,
            Phaser.Math.Between(4, 10),
            Phaser.Math.Between(4, 10),
            colors[i % colors.length], 0.8
        );
        scene.tweens.add({
            targets: piece,
            y: piece.y + Phaser.Math.Between(100, 250),
            x: piece.x + Phaser.Math.Between(-50, 50),
            alpha: 0,
            duration: Phaser.Math.Between(3000, 7000),
            repeat: -1,
            delay: Phaser.Math.Between(0, 3000),
        });
    }
    scene.add.text(startX - TS * 25, groundY - TS * 6,
        'CONSIDER THIS AS A FINAL WARNING!', {
        fontSize: '18px', fill: '#ffdd00',
        fontFamily: FONT, fontStyle: 'bold',
        stroke: '#000', strokeThickness: 4,
        align: 'center', lineSpacing: 8,
    }
    ).setOrigin(0.5, 1);

    scene.add.text(startX - TS * 75, groundY - TS * 6,
        'YO! YOU GOOD BRO?', {
        fontSize: '18px', fill: '#ffdd00',
        fontFamily: FONT, fontStyle: 'bold',
        stroke: '#000', strokeThickness: 4,
        align: 'center', lineSpacing: 8,
    }
    ).setOrigin(0.5, 1);

    scene.add.text(startX - TS * 115, groundY - TS * 6,
        'DID YOU JUST SERIOUSLY GO PAST THE CASTLE?', {
        fontSize: '18px', fill: '#ffdd00',
        fontFamily: FONT, fontStyle: 'bold',
        stroke: '#000', strokeThickness: 4,
        align: 'center', lineSpacing: 8,
    }
    ).setOrigin(0.5, 1);

    // ── photo frame
    const frameX = startX + TS * 4;
    const frameY = groundY - TS * 11;
    const fW = TS * 8;
    const fH = TS * 8;
    const g = scene.add.graphics();

    // golden frame border
    g.fillStyle(0xFFD700, 1);
    g.fillRect(frameX - 10, frameY - 10, fW + 20, fH + 20);
    g.fillStyle(0xFFA000, 1);
    g.fillRect(frameX - 7, frameY - 7, fW + 14, fH + 14);

    // check if photo loaded, else show placeholder
    const photoKey = scene.textures.exists('easter_photo')
        ? 'easter_photo' : null;

    if (photoKey) {
        scene.add.image(frameX + fW / 2, frameY + fH / 2, 'easter_photo')
            .setDisplaySize(fW, fH)
            .setOrigin(0.5);
    } else {
        // placeholder
        g.fillStyle(0x1a1a2e, 1);
        g.fillRect(frameX, frameY, fW, fH);
        g.fillStyle(0x4444aa, 0.4);
        g.fillCircle(frameX + fW / 2, frameY + fH * 0.35, 55);
        g.fillRoundedRect(frameX + fW / 2 - 60, frameY + fH * 0.55, 120, 90, 12);
        scene.add.text(frameX + fW / 2, frameY + fH / 2, '📸\nADD YOUR\nPHOTO HERE', {
            fontSize: '9px', fill: '#445566',
            fontFamily: FONT,
            align: 'center', lineSpacing: 10,
        }).setOrigin(0.5);
    }

    // ── speech bubble ─────────────────────────────────────────────────
    const bubText = "YOU HAPPY THAT YOU\nFOUND THIS EASTER EGG?!";
    const bubCX = frameX + fW / 2;   // centred on frame
    const bubY = frameY - 80;
    const bubW = 420;
    const bubH = 72;
    const bubBg = scene.add.graphics();

    bubBg.fillStyle(0xffffff, 0.96);
    bubBg.fillRoundedRect(bubCX - bubW / 2, bubY - bubH / 2, bubW, bubH, 10);

    // tail pointing down to photo
    bubBg.fillTriangle(
        bubCX - 14, bubY + bubH / 2,
        bubCX + 14, bubY + bubH / 2,
        bubCX, bubY + bubH / 2 + 20
    );

    bubBg.lineStyle(2, 0xFFD700, 0.9);
    bubBg.strokeRoundedRect(bubCX - bubW / 2, bubY - bubH / 2, bubW, bubH, 10);

    scene.add.text(bubCX, bubY, bubText, {
        fontSize: '10px', fill: '#111122',
        fontFamily: FONT,
        align: 'center', lineSpacing: 8,
        wordWrap: { width: bubW - 24 },
    }).setOrigin(0.5);
    // ── achievement popup (slides in when player enters zone)
    const achBg = scene.add.graphics().setScrollFactor(0).setDepth(50);
    achBg.fillStyle(0xFFD700, 0.95);
    achBg.fillRoundedRect(
        scene.scale.width / 2 - 180,
        -80, 360, 68, 10
    );

    const achText = scene.add.text(
        scene.scale.width / 2, -46,
        '🏆 EXPLORER UNLOCKED!\nYou found the Easter Egg!', {
        fontSize: '9px', fill: '#111111',
        fontFamily: FONT,
        align: 'center', lineSpacing: 6,
    }
    ).setOrigin(0.5).setScrollFactor(0).setDepth(51);

    // ── REWARD BUTTON
    const btnX = startX + TS * 17;
    const btnY = groundY - TS * 5;
    const btnW = TS * 10;
    const btnH = TS * 2.5;

    const btnG = scene.add.graphics();

    // button shadow
    btnG.fillStyle(0x000000, 0.4);
    btnG.fillRoundedRect(btnX + 4, btnY + 4, btnW, btnH, 8);

    // button body — shiny gold/green
    btnG.fillStyle(0xFFD700, 1);
    btnG.fillRoundedRect(btnX, btnY, btnW, btnH, 8);

    // button top highlight
    btnG.fillStyle(0xffffff, 0.25);
    btnG.fillRoundedRect(btnX + 4, btnY + 4, btnW - 8, btnH / 2 - 4, 6);

    // button border
    btnG.lineStyle(3, 0xFFA000, 1);
    btnG.strokeRoundedRect(btnX, btnY, btnW, btnH, 8);

    // button text
    scene.add.text(btnX + btnW / 2, btnY + btnH / 2,
        '🎁 CLAIM YOUR REWARD!', {
        fontSize: '9px', fill: '#1a0a00',
        fontFamily: FONT,
        align: 'center',
        stroke: '#FFA000', strokeThickness: 1,
    }
    ).setOrigin(0.5);

    // pulse animation on button
    // scene.tweens.add({
    //     targets: btnG,
    //     scaleX: 1.03, scaleY: 1.03,
    //     duration: 700, yoyo: true, repeat: -1,
    //     ease: 'Sine.easeInOut',
    // });

    // button click zone — interactive
    const btnZone = scene.add.rectangle(
        btnX + btnW / 2, btnY + btnH / 2, btnW, btnH
    ).setInteractive({ useHandCursor: true });

    btnZone.on('pointerover', () => {
        btnG.clear();
        btnG.fillStyle(0x000000, 0.4);
        btnG.fillRoundedRect(btnX + 4, btnY + 4, btnW, btnH, 8);
        btnG.fillStyle(0xFFC107, 1);
        btnG.fillRoundedRect(btnX, btnY, btnW, btnH, 8);
        btnG.lineStyle(3, 0xFF8F00, 1);
        btnG.strokeRoundedRect(btnX, btnY, btnW, btnH, 8);
    });

    btnZone.on('pointerout', () => {
        btnG.clear();
        btnG.fillStyle(0x000000, 0.4);
        btnG.fillRoundedRect(btnX + 4, btnY + 4, btnW, btnH, 8);
        btnG.fillStyle(0xFFD700, 1);
        btnG.fillRoundedRect(btnX, btnY, btnW, btnH, 8);
        btnG.fillStyle(0xffffff, 0.25);
        btnG.fillRoundedRect(btnX + 4, btnY + 4, btnW - 8, btnH / 2 - 4, 6);
        btnG.lineStyle(3, 0xFFA000, 1);
        btnG.strokeRoundedRect(btnX, btnY, btnW, btnH, 8);
    });

    btnZone.on('pointerup', () => {
        _triggerRickRoll(scene);
    });

    // ── trigger achievement when player enters zone
    scene.time.addEvent({
        delay: 200, loop: true,
        callback: () => {
            if (!scene.player) return;
            const dist = Math.abs(scene.player.x - (startX + TS * 10));
            if (dist < TS * 8 && !scene._easterTriggered) {
                scene._easterTriggered = true;
                scene.tweens.add({
                    targets: [achBg, achText],
                    y: '+=' + 100,
                    duration: 600, ease: 'Back.easeOut',
                });
                scene.time.delayedCall(3500, () => {
                    scene.tweens.add({
                        targets: [achBg, achText],
                        y: '-=' + 100,
                        duration: 400, ease: 'Back.easeIn',
                    });
                });
            }
        },
    });



    // ── hard wall
    const wall = scene.add.rectangle(
        startX + TS * 38, H / 2, TS, H * 3
    ).setVisible(false);
    scene.physics.add.existing(wall, true);
    scene.platforms.add(wall);

    // visual wall
    const wg = scene.add.graphics();
    wg.fillStyle(0x37474F, 1);
    wg.fillRect(startX + TS * 37.5, 0, TS * 1.2, H);
    wg.fillStyle(0x546E7A, 1);
    for (let y = 0; y < H; y += TS) {
        wg.fillRect(startX + TS * 37.5, y, TS * 1.2, 6);
    }
    scene.add.text(startX + TS * 38, H * 0.35, 'THE\nEND', {
        fontSize: '11px', fill: '#ffffff',
        fontFamily: FONT,
        align: 'center', stroke: '#000', strokeThickness: 3,
    }).setOrigin(0.5);
}

// ── RICK ROLL ─────────────────────────────────────────────────────
function _triggerRickRoll(scene) {
    // pause the game
    scene.scene.pause();

    // create overlay
    const overlay = document.createElement('div');
    overlay.id = 'rickroll-overlay';
    overlay.style.cssText = `
    position: fixed; inset: 0;
    background: #000;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: rickIn 0.3s ease;
  `;

    // big text
    const text = document.createElement('div');
    text.style.cssText = `
    font-family: 'Press Start 2P', monospace;
    font-size: clamp(14px, 3vw, 28px);
    color: #FF1744;
    text-align: center;
    line-height: 1.8;
    margin-bottom: 32px;
    padding: 0 20px;
    text-shadow: 0 0 20px #FF1744, 0 0 40px #FF1744;
    animation: rickPulse 1s ease-in-out infinite alternate;
  `;
    text.innerHTML = 'YOU HAVE BEEN<br>RICK ROLLED! <br><span style="font-size:0.6em;color:#ffdd00">There is no reward.</span>';

    // youtube iframe
    const videoWrap = document.createElement('div');
    videoWrap.style.cssText = `
    width: min(800px, 90vw);
    aspect-ratio: 16/9;
    border: 4px solid #FF1744;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 60px #FF1744;
  `;

    const video = document.createElement('video');
    video.src = './/assets//videos//RickRoll.mp4';
    video.style.cssText = 'width:100%;height:100%;object-fit:cover;';
    video.autoplay = true;
    video.controls = true;
    video.loop = true;
    videoWrap.appendChild(video);

    // close button
    const closeBtn = document.createElement('button');
    closeBtn.style.cssText = `
    margin-top: 28px;
    font-family: 'Press Start 2P', monospace;
    font-size: 11px;
    background: transparent;
    border: 2px solid #ff4466;
    color: #ff4466;
    padding: 12px 24px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  `;
    closeBtn.textContent = 'I ACCEPT MY DEFEAT';
    closeBtn.onmouseenter = () => closeBtn.style.background = '#ff4466';
    closeBtn.onmouseleave = () => closeBtn.style.background = 'transparent';
    closeBtn.onclick = () => {
        video.pause();
        video.src = '';
        document.body.removeChild(overlay);
        scene.scene.resume();
    };

    // inject keyframe animations
    if (!document.getElementById('rickroll-styles')) {
        const style = document.createElement('style');
        style.id = 'rickroll-styles';
        style.textContent = `
      @keyframes rickIn {
        from { opacity: 0; transform: scale(0.9); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes rickPulse {
        from { text-shadow: 0 0 20px #FF1744, 0 0 40px #FF1744; }
        to   { text-shadow: 0 0 40px #FF1744, 0 0 80px #FF1744, 0 0 120px #FF1744; }
      }
    `;
        document.head.appendChild(style);
    }

    overlay.appendChild(text);
    overlay.appendChild(videoWrap);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
}