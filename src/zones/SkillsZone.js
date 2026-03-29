import { TS } from '../constants.js';

export function buildSkillsZone(scene, H, platforms) {
    const startX = TS * 26;
    const groundY = H - TS;

    scene.add.text(startX, groundY - TS * 10, '⚙  SKILLS', {
        fontSize: '24px', fill: '#ffdd00',
        fontFamily: 'Courier New', fontStyle: 'bold',
        stroke: '#000', strokeThickness: 5
    });

    const skills = [
        {
            label: 'ML & AI', x: 0, h: 4,
            color: 0x1565C0, top: 0x42A5F5,
            tools: ['PyTorch', 'TensorFlow', 'Sklearn'],
            icon: 'brain'
        },
        {
            label: 'MLOps', x: 4, h: 5.5,
            color: 0x1B5E20, top: 0x66BB6A,
            tools: ['Docker', 'MLflow', 'CI/CD'],
            icon: 'gear'
        },
        {
            label: 'Data Eng', x: 8, h: 3,
            color: 0x4A148C, top: 0xAB47BC,
            tools: ['DuckDB', 'AWS', 'FastAPI'],
            icon: 'db'
        },
        {
            label: 'LLM / RAG', x: 12, h: 5.5,
            color: 0xB71C1C, top: 0xEF5350,
            tools: ['LangChain', 'ChromaDB', 'HuggingFace'],
            icon: 'brain'
        },
        {
            label: 'CV / NLP', x: 16, h: 4,
            color: 0xE65100, top: 0xFF7043,
            tools: ['OpenCV', 'spaCy', 'NLTK'],
            icon: 'eye'
        },
        {
            label: 'Cloud', x: 20, h: 3,
            color: 0x006064, top: 0x00ACC1,
            tools: ['AWS S3', 'EC2', 'RDS'],
            icon: 'cloud'
        },
        {
            label: 'Databases', x: 24, h: 4.5,
            color: 0x37474F, top: 0x78909C,
            tools: ['MongoDB', 'DuckDB', 'MySQL'],
            icon: 'db'
        },
        {
            label: 'Viz & BI', x: 28, h: 3.5,
            color: 0x880E4F, top: 0xEC407A,
            tools: ['Power BI', 'Tableau', 'Seaborn'],
            icon: 'chart'
        },
    ];

    skills.forEach(s => {
        const px = startX + s.x * TS;
        const py = groundY - s.h * TS;
        const pw = TS * 3;
        const ph = TS * 0.65;

        const g = scene.add.graphics();

        // shadow
        g.fillStyle(0x000000, 0.3);
        g.fillRect(px + 4, py + 4, pw, ph);

        // platform body
        g.fillStyle(s.color, 1);
        g.fillRect(px, py, pw, ph);

        // top highlight
        g.fillStyle(s.top, 1);
        g.fillRect(px, py, pw, 5);

        // right edge shadow
        g.fillStyle(0x000000, 0.3);
        g.fillRect(px + pw - 4, py, 4, ph);

        // stem to ground
        g.fillStyle(s.color, 0.4);
        g.fillRect(px + pw / 2 - 3, py + ph, 6, groundY - py - ph);

        // draw icon on platform
        _drawIcon(g, s.icon, px + pw / 2, py + ph / 2, s.top);

        // physics body
        const body = scene.add.rectangle(
            px + pw / 2, py + ph / 2, pw, ph
        ).setVisible(false);
        scene.physics.add.existing(body, true);
        platforms.add(body);

        // skill label
        scene.add.text(px + pw / 2, py - 12, s.label, {
            fontSize: '11px', fill: '#ffffff',
            fontFamily: 'Courier New', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5, 1);

        // tools list — pill tags
        s.tools.forEach((tool, ti) => {
            const tagX = px + pw / 2 + (ti - 1) * 44;
            const tagY = py - 28;
            const tg = scene.add.graphics();
            tg.fillStyle(s.color, 0.8);
            tg.fillRoundedRect(tagX - 18, tagY - 8, 36, 14, 4);
            scene.add.text(tagX, tagY, tool, {
                fontSize: '7px', fill: '#ffffff',
                fontFamily: 'Courier New'
            }).setOrigin(0.5);
        });
    });
}

function _drawIcon(g, type, cx, cy, color) {
    g.fillStyle(0xffffff, 0.15);
    switch (type) {
        case 'brain':
            g.fillCircle(cx - 4, cy, 5);
            g.fillCircle(cx + 4, cy, 5);
            g.fillRect(cx - 2, cy - 2, 4, 6);
            break;
        case 'gear':
            g.fillCircle(cx, cy, 5);
            g.fillStyle(0x000000, 0.3);
            g.fillCircle(cx, cy, 2);
            break;
        case 'db':
            g.fillEllipse(cx, cy - 3, 12, 5);
            g.fillRect(cx - 6, cy - 3, 12, 7);
            g.fillEllipse(cx, cy + 4, 12, 5);
            break;
        case 'eye':
            g.fillEllipse(cx, cy, 14, 8);
            g.fillStyle(0x000000, 0.4);
            g.fillCircle(cx, cy, 3);
            break;
        case 'cloud':
            g.fillCircle(cx - 4, cy + 2, 5);
            g.fillCircle(cx + 4, cy + 2, 5);
            g.fillCircle(cx, cy - 1, 6);
            g.fillRect(cx - 8, cy + 2, 16, 5);
            break;
        case 'chart':
            g.fillRect(cx - 6, cy + 1, 4, 5);
            g.fillRect(cx - 1, cy - 3, 4, 9);
            g.fillRect(cx + 4, cy - 1, 4, 7);
            break;
    }
}