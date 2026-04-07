export const TILE = 16;
export const SCALE = Math.max(1.5, Math.min(3, window.innerWidth / 640));
export const TS = Math.round(TILE * SCALE);

export const FONT = '"Press Start 2P", monospace';

export const COLORS = {
    sky1: 0x050510,
    sky2: 0x0d1f4a,
    ground: 0x4CAF50,
    dirt: 0x8B5E3C,
    accent: 0x00ff88,
    yellow: 0xFFDD00,
};

export const PIPE_COLORS = {
    mlops: 0x2E7D32,
    multiagent: 0x6A1B9A,
    vision: 0xBF360C,
    rag: 0x1565C0,
    nlp: 0xF57F17,
};