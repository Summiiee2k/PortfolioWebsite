export class BiomeManager {
    constructor(scene) {
        this.scene = scene;
        this.W = scene.scale.width;
        this.H = scene.scale.height;

        // sky graphics — redrawn each frame via lerp
        this.skyGraphics = scene.add.graphics()
            .setScrollFactor(0).setDepth(-10);

        // ground overlay for biome tint
        this.groundOverlay = scene.add.graphics()
            .setScrollFactor(0).setDepth(-1);

        // biome definitions — keyed by zone start X in tiles
        this.biomes = [
            { name: 'hero', startTile: 0, sky1: 0x020210, sky2: 0x071535, groundTop: 0x43A047, groundDirt: 0x8B5E3C },
            { name: 'about', startTile: 26, sky1: 0x030318, sky2: 0x0d1a3a, groundTop: 0x388E3C, groundDirt: 0x795548 },
            { name: 'education', startTile: 56, sky1: 0x0d0825, sky2: 0x1a0e3a, groundTop: 0x5E35B1, groundDirt: 0x4527A0 },
            { name: 'skills', startTile: 90, sky1: 0x071520, sky2: 0x0a2535, groundTop: 0x00695C, groundDirt: 0x004D40 },
            { name: 'experience', startTile: 128, sky1: 0x0d0800, sky2: 0x2a1800, groundTop: 0x558B2F, groundDirt: 0x827717 },
            { name: 'projects', startTile: 175, sky1: 0x040010, sky2: 0x0a0025, groundTop: 0x00838F, groundDirt: 0x006064 },
            { name: 'hobbies', startTile: 224, sky1: 0x0a1500, sky2: 0x1a2800, groundTop: 0x689F38, groundDirt: 0x33691E },
            { name: 'contact', startTile: 255, sky1: 0x1a0505, sky2: 0x3d1a00, groundTop: 0x6D4C41, groundDirt: 0x4E342E },
            { name: 'easter', startTile: 282, sky1: 0x1565C0, sky2: 0x42A5F5, groundTop: 0x7CB342, groundDirt: 0xA5D6A7 },
        ];

        this._currentBiome = this.biomes[0];
        this._targetBiome = this.biomes[0];
        this._lerpT = 1;

        // current interpolated values
        this._curSky1 = this.biomes[0].sky1;
        this._curSky2 = this.biomes[0].sky2;
        this._curGrTop = this.biomes[0].groundTop;
        this._curGrDir = this.biomes[0].groundDirt;
    }

    update(scrollX) {
        const TS = 48;
        const tile = scrollX / TS;

        // find which biome we're in
        let active = this.biomes[0];
        for (let i = this.biomes.length - 1; i >= 0; i--) {
            if (tile >= this.biomes[i].startTile) {
                active = this.biomes[i];
                break;
            }
        }

        // trigger transition
        if (active.name !== this._targetBiome.name) {
            this._currentBiome = this._targetBiome;
            this._targetBiome = active;
            this._lerpT = 0;
        }

        // lerp
        this._lerpT = Math.min(1, this._lerpT + 0.012);
        const t = this._ease(this._lerpT);

        this._curSky1 = this._lerpColor(this._currentBiome.sky1, active.sky1, t);
        this._curSky2 = this._lerpColor(this._currentBiome.sky2, active.sky2, t);
        this._curGrTop = this._lerpColor(this._currentBiome.groundTop, active.groundTop, t);
        this._curGrDir = this._lerpColor(this._currentBiome.groundDirt, active.groundDirt, t);

        // redraw sky
        this.skyGraphics.clear();
        this.skyGraphics.fillGradientStyle(
            this._curSky1, this._curSky1,
            this._curSky2, this._curSky2, 1
        );
        this.skyGraphics.fillRect(0, 0, this.W, this.H);

        // redraw ground overlay
        const groundY = this.H - 48;
        this.groundOverlay.clear();
        this.groundOverlay.fillStyle(this._curGrTop, 1);
        this.groundOverlay.fillRect(0, groundY, this.W, 11);
        this.groundOverlay.fillStyle(this._curGrDir, 0.5);
        this.groundOverlay.fillRect(0, groundY + 11, this.W, 37);
    }

    getBiomeName() { return this._targetBiome.name; }

    _ease(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

    _lerpColor(c1, c2, t) {
        const r1 = (c1 >> 16) & 0xff, g1 = (c1 >> 8) & 0xff, b1 = c1 & 0xff;
        const r2 = (c2 >> 16) & 0xff, g2 = (c2 >> 8) & 0xff, b2 = c2 & 0xff;
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);
        return (r << 16) | (g << 8) | b;
    }
}