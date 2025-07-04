const questionsData = [
    {
        "q": "How do you usually spend your weekends?",
        "a": [
            "I spend weekends actively – meeting friends, going to events, or exploring the city.",
            "It's important for me to spend time with my family in a cozy, peaceful home environment.",
            "I try to escape into nature to recharge and reconnect with myself.",
            "Weekends are for cleaning, self-development, and reading in silence.",
            "I prefer solitude to reflect on my goals and regain energy."
        ]
    },
    {
        "q": "What’s important to you in a home?",
        "a": [
            "Convenient location and proximity to work and infrastructure are top priorities.",
            "I value spaciousness and freedom of movement in the house.",
            "Connection with nature — greenery, fresh air, and natural light are key.",
            "Functionality is the most important — every element should be useful.",
            "Silence and privacy make me feel safe and comfortable."
        ]
    },
    {
        "q": "Which style resonates more with you?",
        "a": [
            "Modern style with clean lines and smart tech inspires me.",
            "Classic style with traditional elements and noble materials suits me more.",
            "Eco-style using natural materials and greenery brings me harmony.",
            "Minimalism helps me focus by avoiding visual noise.",
            "I love lofts — open space, creativity, and industrial aesthetics."
        ]
    },
    {
        "q": "What irritates you the most?",
        "a": [
            "I can’t stand boredom — I need constant activity and new experiences.",
            "Mess and disorder stress me out — I strive for tidiness and structure.",
            "Noise disrupts my comfort and focus — I seek peace.",
            "Chaos in life and space destabilizes me — I need control.",
            "Restrictions and limitations suffocate me — I need freedom."
        ]
    },
    {
        "q": "Where would you prefer to live?",
        "a": [
            "Right in the city center — I love being in the middle of the action.",
            "In a quiet residential area with good infrastructure for family life.",
            "In the countryside where I can enjoy nature and silence every day.",
            "In a compact studio where everything is within reach and nothing extra.",
            "In a home with a separate office and space for private work."
        ]
    },
    {
        "q": "Your work mostly requires:",
        "a": [
            "Physical activity, mobility, and constant interaction with people.",
            "Stability, clear structure, and a secure future.",
            "Inspiration, creativity, and out-of-the-box thinking.",
            "Organization and systematic thinking for process control.",
            "Deep concentration and quiet for focused work."
        ]
    },
    {
        "q": "How do you feel about neighbors?",
        "a": [
            "I’m neutral — as long as they don’t disturb me, it's fine.",
            "I want friendly neighbors and social connection nearby.",
            "I prefer limited interaction and privacy in my own space.",
            "What matters most is peace and personal boundaries.",
            "I'd rather live without neighbors to fully control my environment."
        ]
    },
    {
        "q": "You dream of a home that has:",
        "a": [
            "Panoramic views that inspire and create a feeling of openness.",
            "A cozy family area for kids, play, and shared moments.",
            "A personal garden to grow plants and relax outdoors.",
            "Minimal furniture and maximum space for mental clarity.",
            "A library or cozy reading corner for personal growth."
        ]
    },
    {
        "q": "How do you choose furniture?",
        "a": [
            "I follow the latest trends to keep my interior modern and stylish.",
            "Comfort and ergonomics matter most to me.",
            "I go for natural, eco-friendly materials.",
            "I value practicality — each item must serve a purpose.",
            "I look for unique, character-rich pieces."
        ]
    },
    {
        "q": "Your main goal in life?",
        "a": [
            "To achieve success, recognition, and fulfill my ambitions.",
            "To build a strong, loving family and care for each other.",
            "To find inner peace and live in harmony with myself.",
            "To bring order to all areas of life — I need control.",
            "To keep growing, learning, and evolving as a person."
        ]
    }
];

const weights = ['explorer', 'family', 'dreamer', 'minimal', 'introvert'];

window.onload = () => {
    const form = document.getElementById("testForm");
    const questionsDiv = document.getElementById("questions");

    questionsData.forEach((q, i) => {
        const block = document.createElement("div");
        block.innerHTML = `<p><strong>${i + 1}. ${q.q}</strong></p>` + q.a.map((ans, idx) =>
            `<label><input type="radio" name="q${i}" value="${idx}" required> ${ans}</label><br>`
        ).join('');
        questionsDiv.appendChild(block);
    });

    form.onsubmit = function(e) {
        e.preventDefault();
        let score = [0, 0, 0, 0, 0];
        for (let i = 0; i < 10; i++) {
            const val = parseInt(document.querySelector(`input[name="q${i}"]:checked`).value);
            score[val]++;
        }
        const maxIndex = score.indexOf(Math.max(...score));
        const profile = weights[maxIndex];
        window.location.href = `result.html?profile=${profile}`;
    };
};