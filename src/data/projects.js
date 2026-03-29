import { PIPE_COLORS } from '../constants.js';

export const PROJECTS = [
    {
        id: 'mlops',
        pipeLabel: 'MLOps Engine',
        pipeColor: PIPE_COLORS.mlops,
        title: 'End-to-End Dynamic Pricing Engine',
        year: '2026',
        description:
            'Production-grade MLOps system with a self-healing microservice ' +
            'architecture. Drift detector monitors real-time accuracy over a ' +
            'sliding window and autonomously triggers model retraining via ' +
            'FastAPI BackgroundTasks — hot-swapping updated models with zero downtime.',
        metrics: ['18% → 71% Recall', '~77% Accuracy', 'Zero-downtime retraining'],
        stack: ['Python', 'Scikit-learn', 'FastAPI', 'Streamlit', 'Pydantic', 'Docker'],
        github: 'https://github.com/Summiiee2k/EtE_ETL_Dynamic_pricing__ML',
        demo: null,
    },
    {
        id: 'multiagent',
        pipeLabel: 'Multi-Agent AI',
        pipeColor: PIPE_COLORS.multiagent,
        title: 'Multi-Agent AI Article Publisher',
        year: '2026',
        description:
            'Glass-Box Publishing — a Streamlit app using CrewAI to orchestrate ' +
            'autonomous AI agents that collaboratively research, write, and edit ' +
            'blog posts in real-time. Features live agent feedback, monitoring, ' +
            'and interactive configuration.',
        metrics: ['Real-time collaboration', 'Live agent monitoring'],
        stack: ['CrewAI', 'Groq (llama-3.3-70b)', 'Tavily', 'Streamlit', 'Python'],
        github: 'https://github.com/Summiiee2k/Multi_AI_Agent_crew',
        demo: null,
    },
    {
        id: 'vision',
        pipeLabel: 'Computer Vision',
        pipeColor: PIPE_COLORS.vision,
        title: 'Real-time Engagement Analysis System',
        year: '2025',
        description:
            'Low-latency facial engagement model for multi-person detection. ' +
            'Uses CNNs to classify emotional states in real-time video feeds ' +
            'for audience analytics. Built with a Streamlit interface for ' +
            'seamless deployment and live inference.',
        metrics: ['Real-time inference', 'Multi-person detection'],
        stack: ['Python', 'OpenCV', 'TensorFlow', 'Keras', 'Hugging Face', 'Streamlit'],
        github: 'https://github.com/Summiiee2k',
        demo: null,
    },
    {
        id: 'rag',
        pipeLabel: 'RAG System',
        pipeColor: PIPE_COLORS.rag,
        title: 'RAG Document Reader',
        year: '2025',
        description:
            'A Retrieval-Augmented Generation pipeline for chatting with any ' +
            'document. Uses embeddings and a vector database to retrieve ' +
            'contextually relevant chunks and ground LLM responses in source ' +
            'material — eliminating hallucinations.',
        metrics: ['Context-grounded answers', 'Hallucination reduction'],
        stack: ['Python', 'LangChain', 'ChromaDB', 'Hugging Face', 'Streamlit'],
        github: 'https://github.com/Summiiee2k/RAG_Doc_reader',
        demo: null,
    },
    {
        id: 'nlp',
        pipeLabel: 'NLP Pipeline',
        pipeColor: PIPE_COLORS.nlp,
        title: 'Super Sandwich — NLP Pipeline',
        year: '2025',
        description:
            'End-to-end ETL and NLP pipeline processing 500+ customer reviews. ' +
            'Implements Aspect-Based Sentiment Analysis (ABSA) using spaCy and ' +
            'NLTK, categorising feedback into Food, Service, and Ambiance ' +
            'dimensions to surface actionable business insights.',
        metrics: ['500+ reviews processed', 'ABSA across 3 dimensions'],
        stack: ['Python', 'spaCy', 'NLTK', 'DuckDB', 'Pandas'],
        github: 'https://github.com/Summiiee2k/Super_Sandwich',
        demo: null,
    },
];