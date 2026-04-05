import { TS, FONT } from '../constants.js';

export function buildProjectsZone(scene, H, platforms, pipeZones, projects) {
    const startX = TS * 265;
    const groundY = H - TS;

    scene.add.text(startX, groundY - TS * 11, '🟢  PROJECTS — ENTER THE PIPES', {
        fontSize: '22px', fill: '#ffdd00',
        fontFamily: FONT, fontStyle: 'bold',
        stroke: '#000', strokeThickness: 5
    });

    scene.add.text(startX, groundY - TS * 9.2,
        'Walk up to a pipe and press  ↓  to enter', {
        fontSize: '12px', fill: '#667788',
        fontFamily: FONT
    });

    projects.forEach((proj, i) => {
        const px = startX + i * TS * 9;
        const pipeH = TS * 2.5;
        const pipeW = TS * 2.8;
        const pipeTopY = groundY - pipeH;

        const col = proj.pipeColor;
        const colObj = Phaser.Display.Color.IntegerToColor(col);
        const light = colObj.clone().lighten(25).color;
        const dark = colObj.clone().darken(35).color;

        const g = scene.add.graphics();

        // shadow
        g.fillStyle(0x000000, 0.3);
        g.fillRect(px + 6, pipeTopY + 6, pipeW, pipeH);

        // pipe body
        g.fillStyle(col, 1);
        g.fillRect(px, pipeTopY, pipeW, pipeH);

        // left shine
        g.fillStyle(light, 0.45);
        g.fillRect(px + 4, pipeTopY, 9, pipeH);

        // right shadow
        g.fillStyle(dark, 0.55);
        g.fillRect(px + pipeW - 10, pipeTopY, 10, pipeH);

        // pipe lip
        const lipX = px - 8;
        const lipW = pipeW + 16;
        const lipH = 20;
        const lipY = pipeTopY - lipH + 2;

        g.fillStyle(col, 1);
        g.fillRect(lipX, lipY, lipW, lipH);
        g.fillStyle(light, 0.6);
        g.fillRect(lipX, lipY, lipW, 5);
        g.fillStyle(light, 0.35);
        g.fillRect(lipX + 3, lipY + 5, 9, lipH - 5);
        g.fillStyle(dark, 0.5);
        g.fillRect(lipX + lipW - 9, lipY, 9, lipH);

        // ── PIPE COLLIDER — solid top so player can stand on it
        const pipeLip = scene.add.rectangle(
            px + pipeW / 2,
            pipeTopY - lipH / 2,
            pipeW + 16,
            lipH,
        ).setVisible(false);
        scene.physics.add.existing(pipeLip, true);
        platforms.add(pipeLip);

        // ── PIPE COLLIDER: full body (blocks passing through from below)
        const pipeBody = scene.add.rectangle(
            px + pipeW / 2,
            pipeTopY + pipeH / 2,
            pipeW,
            pipeH,
        ).setVisible(false);
        scene.physics.add.existing(pipeBody, true);
        platforms.add(pipeBody);

        // label above
        scene.add.text(px + pipeW / 2, pipeTopY - lipH - 12, proj.pipeLabel, {
            fontSize: '11px', fill: '#ffffff',
            fontFamily: FONT, fontStyle: 'bold',
            align: 'center', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5, 1);

        // number badge
        const nbg = scene.add.graphics();
        nbg.fillStyle(0x000000, 0.45);
        nbg.fillCircle(px + pipeW / 2, pipeTopY + 28, 15);
        scene.add.text(px + pipeW / 2, pipeTopY + 28, String(i + 1), {
            fontSize: '14px', fill: '#ffffff',
            fontFamily: FONT, fontStyle: 'bold'
        }).setOrigin(0.5);

        // trigger zone — player must stand ON pipe lip and press ↓
        const zone = scene.add.zone(
            px + pipeW / 2,
            pipeTopY - lipH,
            pipeW + TS,
            TS * 2
        ).setOrigin(0.5, 0);
        scene.physics.add.existing(zone, true);
        zone.projectData = proj;
        pipeZones.push(zone);
    });
}