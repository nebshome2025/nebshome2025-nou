/* ====== CONFIG ====== */
const WEBHOOK_URL = "https://hook.eu2.make.com/a6qpye9nylq8ny9dym7q2xy8w8g85b9v";
const LANG = "ro";

const PROFILES = [
    "explorer",   // 0
    "family",     // 1
    "dreamer",    // 2
    "minimal",    // 3
    "introvert",  // 4
    "luxury",     // 5
    "practical"   // 6
];

// Întrebările și opțiunile (exemplu, adaptează după nevoie)
const questionsData = [
    {
        q: "Cum îți petreci weekendurile?",
        a: [
            "Activ, descopăr orașul",
            "Cu familia",
            "În natură",
            "Fac curățenie/organizare",
            "Singur, relaxare acasă"
        ]
    },
    {
        q: "Ce e important într-o locuință?",
        a: [
            "Locația centrală",
            "Spațiul pentru familie",
            "Apropierea de natură",
            "Funcționalitatea",
            "Liniștea"
        ]
    },
    {
        q: "Stil preferat?",
        a: [
            "Modern/tehnologic",
            "Clasic",
            "Eco",
            "Minimalist",
            "Loft/industrial"
        ]
    },
    {
        q: "Ce te deranjează?",
        a: [
            "Rutina",
            "Dezordinea",
            "Zgomotul",
            "Haosul",
            "Restricțiile"
        ]
    },
    {
        q: "Unde ai locui?",
        a: [
            "Centru vibrant",
            "Cartier liniștit",
            "Marginea/natură",
            "Studio eficient",
            "Casă cu birou"
        ]
    },
    {
        q: "Munca necesită mai mult:",
        a: [
            "Mişcare",
            "Stabilitate",
            "Creativitate",
            "Organizare",
            "Concentrare"
        ]
    },
    {
        q: "Relația cu vecinii?",
        a: [
            "Neutră",
            "Prietenoși",
            "Intimitate",
            "Doar liniște",
            "Ideal fără vecini"
        ]
    },
    {
        q: "Casa de vis:",
        a: [
            "Priveliște",
            "Copii/familie",
            "Grădină/terasă",
            "Puțin mobilier",
            "Colț personal"
        ]
    },
    {
        q: "Cum alegi mobilierul?",
        a: [
            "După tendințe",
            "Confort",
            "Materiale naturale",
            "Practic",
            "Unic/personalizat"
        ]
    },
    {
        q: "Scop principal în viață?",
        a: [
            "Succes",
            "Familie",
            "Armonie",
            "Ordine",
            "Evoluție"
        ]
    }
];

/* 
    weights7[questionIndex][optionIndex] = [exp,fam,dre,min,int,lux,pra]
*/
const weights7 = [
    [
        [5,0,0,0,0,1,0],
        [0,5,0,0,0,0,1],
        [0,0,5,0,0,0,0],
        [0,0,0,4,0,0,2],
        [0,0,0,0,5,0,0],
    ],
    [
        [4,0,0,0,0,1,1],
        [0,3,0,1,0,0,2],
        [0,0,5,0,0,0,0],
        [0,0,0,5,0,0,2],
        [0,0,0,0,5,0,0],
    ],
    [
        [4,0,0,0,0,2,0],
        [0,1,0,0,0,4,0],
        [0,0,5,0,0,0,0],
        [0,0,0,5,0,0,0],
        [2,0,0,0,0,2,0],
    ],
    [
        [0,0,0,0,0,0,0],
        [0,0,0,4,0,0,2],
        [0,0,0,0,5,0,0],
        [0,4,0,1,0,0,2],
        [3,0,0,0,0,0,0],
    ],
    [
        [5,0,0,0,0,1,0],
        [0,5,0,0,0,0,0],
        [0,0,5,0,0,0,0],
        [0,0,0,5,0,0,2],
        [0,0,0,0,5,0,0],
    ],
    [
        [4,0,0,0,0,1,0],
        [0,4,0,2,0,0,1],
        [0,0,4,0,0,1,0],
        [0,0,0,5,0,0,2],
        [0,0,0,0,5,0,0],
    ],
    [
        [0,0,0,0,0,0,0],
        [2,3,0,0,0,0,0],
        [0,0,0,0,5,0,0],
        [0,0,0,0,5,0,0],
        [3,0,0,0,1,0,0],
    ],
    [
        [3,0,0,0,0,2,0],
        [0,5,0,0,0,0,0],
        [0,0,5,0,0,0,0],
        [0,0,0,5,0,0,2],
        [0,0,0,0,4,0,0],
    ],
    [
        [3,0,0,0,0,2,0],
        [0,2,0,0,0,0,3],
        [0,0,4,0,0,0,1],
        [0,0,0,5,0,0,2],
        [0,0,0,0,0,3,2],
    ],
    [
        [4,0,0,0,0,2,0],
        [0,5,0,0,0,0,0],
        [0,0,5,0,0,0,0],
        [0,0,0,5,0,0,2],
        [0,0,0,0,4,0,1],
    ],
];

/* ====== LOGICĂ TEST ====== */
window.onload = () => {
    const form = document.getElementById("testForm");
    const questionsDiv = document.getElementById("questions");

    questionsData.forEach((q, i) => {
        const block = document.createElement("div");
        block.innerHTML =
            `<p><strong>${i + 1}. ${q.q}</strong></p>` +
            q.a.map((ans, idx) =>
                `<label><input type="radio" name="q${i}" value="${idx}" required> ${ans}</label><br>`
            ).join('');
        questionsDiv.appendChild(block);
    });

    form.onsubmit = async (e) => {
        e.preventDefault();

        const score = Array(PROFILES.length).fill(0);

        for (let i = 0; i < questionsData.length; i++) {
            const val = parseInt(document.querySelector(`input[name="q${i}"]:checked`).value, 10);
            const w = weights7[i][val];
            for (let p = 0; p < PROFILES.length; p++) {
                score[p] += w[p];
            }
        }

        const maxScore = Math.max(...score);
        const maxIndex = score.indexOf(maxScore);
        const profile = PROFILES[maxIndex];

        const sessionId = crypto.randomUUID();

        try {
            await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ profile, lang: LANG, session_id: sessionId })
            });
        } catch (_) {
            console.warn("Webhook Make a eșuat (continui la checkout)");
        }

        const base = "https://nebshome-test.lemonsqueezy.com/buy/052e7ec5-1de0-498f-a838-0fd476694ebf";
        const u = new URL(base);
        u.searchParams.set("checkout[custom][session_id]", sessionId);
        u.searchParams.set("checkout[custom][profile]", profile);
        u.searchParams.set("checkout[custom][lang]", LANG);
        window.location.href = u.toString();
    };
};