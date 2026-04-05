import { TS, FONT } from '../constants.js';

const SKILLS = [
    {
        label: 'ML & AI',
        tools: ['PyTorch', 'TensorFlow', 'Sklearn', 'HuggingFace'],
        proficiency: 0.90,
        color: 0x1565C0, top: 0x42A5F5, frame: 0x8B6914,
        icon: 'brain', x: 0, h: 5,
    },
    {
        label: 'MLOps',
        tools: ['Docker', 'MLflow', 'CI/CD', 'FastAPI'],
        proficiency: 0.80,
        color: 0x1B5E20, top: 0x66BB6A, frame: 0x6D4C2A,
        icon: 'gear', x: 7, h: 6.5,
    },
    {
        label: 'Data Eng',
        tools: ['DuckDB', 'AWS S3', 'PySpark', 'Pandas'],
        proficiency: 0.75,
        color: 0x4A148C, top: 0xAB47BC, frame: 0x6D4C2A,
        icon: 'db', x: 14, h: 4.5,
    },
    {
        label: 'LLM / RAG',
        tools: ['LangChain', 'ChromaDB', 'Embeddings', 'CrewAI'],
        proficiency: 0.85,
        color: 0xB71C1C, top: 0xEF5350, frame: 0x8B6914,
        icon: 'chat', x: 21, h: 6.5,
    },
    {
        label: 'CV / NLP',
        tools: ['OpenCV', 'spaCy', 'NLTK', 'Transformers'],
        proficiency: 0.78,
        color: 0xE65100, top: 0xFF7043, frame: 0x6D4C2A,
        icon: 'eye', x: 28, h: 5,
    },
    {
        label: 'Cloud',
        tools: ['AWS EC2', 'S3', 'RDS', 'Lambda'],
        proficiency: 0.70,
        color: 0x006064, top: 0x00ACC1, frame: 0x8B6914,
        icon: 'cloud', x: 35, h: 4,
    },
    {
        label: 'Databases',
        tools: ['MongoDB', 'DuckDB', 'MySQL', 'Postgres'],
        proficiency: 0.72,
        color: 0x37474F, top: 0x78909C, frame: 0x6D4C2A,
        icon: 'db', x: 42, h: 5.5,
    },
    {
        label: 'Viz & BI',
        tools: ['Power BI', 'Tableau', 'Seaborn', 'Streamlit'],
        proficiency: 0.82,
        color: 0x880E4F, top: 0xEC407A, frame: 0x8B6914,
        icon: 'chart', x: 49, h: 4,
    },
];

export function buildSkillsZone(scene, H, platforms) {
    const startX = TS * 120;
    const groundY = H - TS;

    scene.add.text(startX, groundY - TS * 12, '>> SKILLS', {
        fontSize: '18px', fill: '#FFDD00',
        fontFamily: FONT,
        stroke: '#000', strokeThickness: 4,
    });

    SKILLS.forEach(s => {
        _buildPlacard(scene, startX + s.x * TS, groundY, s, platforms);
    });
}

function _buildPlacard(scene, px, groundY, s, platforms) {
    const pW = TS * 5.5;
    const pH = TS * 4.5;
    const py = groundY - s.h * TS - pH;
    const g = scene.add.graphics();

    // ── wooden post ──
    g.fillStyle(s.frame, 1);
    g.fillRect(px + pW / 2 - 5, py + pH, 10, groundY - py - pH);
    g.fillStyle(Phaser.Display.Color.IntegerToColor(s.frame).lighten(20).color, 1);
    g.fillRect(px + pW / 2 - 2, py + pH, 4, groundY - py - pH);

    // ── placard shadow ──
    g.fillStyle(0x000000, 0.35);
    g.fillRect(px + 5, py + 5, pW, pH);

    // ── wooden frame outer ──
    g.fillStyle(s.frame, 1);
    g.fillRect(px, py, pW, pH);

    // ── wooden frame inner border ──
    const frameInset = 6;
    g.fillStyle(Phaser.Display.Color.IntegerToColor(s.frame).lighten(25).color, 1);
    g.fillRect(px + frameInset - 2, py + frameInset - 2,
        pW - (frameInset - 2) * 2, pH - (frameInset - 2) * 2);

    // ── coloured content background ──
    g.fillStyle(s.color, 1);
    g.fillRect(px + frameInset, py + frameInset,
        pW - frameInset * 2, pH - frameInset * 2);

    // ── top accent strip ──
    g.fillStyle(s.top, 1);
    g.fillRect(px + frameInset, py + frameInset,
        pW - frameInset * 2, 8);

    // ── right shadow ──
    g.fillStyle(0x000000, 0.25);
    g.fillRect(px + pW - frameInset - 6, py + frameInset + 8,
        6, pH - frameInset * 2 - 8);

    // ── icon ──
    _drawIcon(g, s.icon, px + pW / 2, py + frameInset + 28, s.top);

    // ── nail holes ── (decorative detail)
    g.fillStyle(0x5D4037, 1);
    const nails = [[px + 8, py + 8], [px + pW - 12, py + 8],
    [px + 8, py + pH - 12], [px + pW - 12, py + pH - 12]];
    nails.forEach(([nx, ny]) => {
        g.fillCircle(nx, ny, 3);
        g.fillStyle(0x795548, 1);
        g.fillCircle(nx, ny, 2);
        g.fillStyle(0x5D4037, 1);
    });

    // ── physics collider on placard top ──
    const body = scene.add.rectangle(
        px + pW / 2, py + pH / 2, pW, pH
    ).setVisible(false);
    scene.physics.add.existing(body, true);
    platforms.add(body);

    // ── title ──
    scene.add.text(px + pW / 2, py + frameInset + 52, s.label, {
        fontSize: '9px', fill: '#ffffff',
        fontFamily: FONT,
        align: 'center', stroke: '#000', strokeThickness: 3,
    }).setOrigin(0.5, 0);

    // ── divider ──
    const dg = scene.add.graphics();
    dg.lineStyle(1, s.top, 0.7);
    dg.lineBetween(
        px + frameInset + 8, py + frameInset + 72,
        px + pW - frameInset - 8, py + frameInset + 72
    );

    // ── tools list ──
    s.tools.forEach((tool, ti) => {
        scene.add.text(
            px + pW / 2,
            py + frameInset + 78 + ti * 16,
            '> ' + tool, {
            fontSize: '7px', fill: '#ddeeff',
            fontFamily: FONT,
            stroke: '#000', strokeThickness: 2,
        }
        ).setOrigin(0.5, 0);
    });

    // ── proficiency bar ──
    const barY = py + pH - frameInset - 16;
    const barW = pW - frameInset * 2 - 10;
    const barX = px + frameInset + 5;
    // bar track
    g.fillStyle(0x000000, 0.5);
    g.fillRect(barX, barY, barW, 8);
    // bar fill — pixel blocks
    const filledW = Math.floor(barW * s.proficiency / 4) * 4;
    for (let b = 0; b < filledW; b += 5) {
        g.fillStyle(s.top, 1);
        g.fillRect(barX + b, barY, 4, 8);
    }
    // bar label
    scene.add.text(
        px + pW / 2,
        barY - 12,
        Math.round(s.proficiency * 100) + '%', {
        fontSize: '6px', fill: '#aaaacc',
        fontFamily: FONT,
    }
    ).setOrigin(0.5, 0);
}

function _drawIcon(g, type, cx, cy, color) {
    g.fillStyle(color, 0.7);
    const s = 8;
    switch (type) {
        case 'brain':
            g.fillCircle(cx - s / 2, cy, s); g.fillCircle(cx + s / 2, cy, s);
            g.fillRect(cx - 3, cy - 4, 6, 10);
            break;
        case 'gear':
            g.fillCircle(cx, cy, s + 2);
            g.fillStyle(0x000000, 0.4); g.fillCircle(cx, cy, 4);
            break;
        case 'db':
            g.fillEllipse(cx, cy - s / 2, s * 2, s * 0.7);
            g.fillRect(cx - s, cy - s / 2, s * 2, s);
            g.fillEllipse(cx, cy + s / 2, s * 2, s * 0.7);
            break;
        case 'chat':
            g.fillRoundedRect(cx - s, cy - s, s * 2, s * 1.4, 4);
            g.fillTriangle(cx - 4, cy + 4, cx + 4, cy + 4, cx - 6, cy + s);
            break;
        case 'eye':
            g.fillEllipse(cx, cy, s * 2.2, s * 1.2);
            g.fillStyle(0x000000, 0.5); g.fillCircle(cx, cy, 4);
            break;
        case 'cloud':
            g.fillCircle(cx - s / 2, cy + 2, s * 0.7);
            g.fillCircle(cx + s / 2, cy + 2, s * 0.7);
            g.fillCircle(cx, cy - 2, s);
            g.fillRect(cx - s, cy + 2, s * 2, s * 0.7);
            break;
        case 'chart':
            g.fillRect(cx - s, cy + s / 2, s * 0.6, s / 2);
            g.fillRect(cx - s * 0.3, cy - s / 2, s * 0.6, s * 1.5);
            g.fillRect(cx + s * 0.4, cy, s * 0.6, s);
            break;
    }
}