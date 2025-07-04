const questionsData = [
    {
        q: "Ce este cel mai important pentru tine într-o locuință?",
        a: [
            "Să fie aproape de evenimente și oameni activi.",
            "Să fie potrivită pentru toată familia.",
            "Să aibă legătură cu natura.",
            "Să fie simplă și bine organizată.",
            "Să fie retrasă și liniștită."
        ]
    },
    {
        q: "Cum petreci timpul liber cel mai des?",
        a: [
            "Explorând orașul, localuri și spații noi.",
            "Cu familia, acasă sau în excursii.",
            "Visând sau fiind creativ în natură.",
            "Organizând și optimizând lucruri.",
            "Citind sau reflectând în liniște."
        ]
    },
    {
        q: "Care este stilul tău preferat de design?",
        a: [
            "Urban modern, luminat și funcțional.",
            "Cald și primitor, cu multe camere.",
            "Natural, cu plante și lemn.",
            "Minimalist, cu mobilier puțin.",
            "Intim, cu colțuri personale."
        ]
    },
    {
        q: "Cum reacționezi la aglomerație și zgomot?",
        a: [
            "Mă energizează.",
            "Îl tolerez pentru cei dragi.",
            "Îl evit când pot.",
            "Îmi strică echilibrul.",
            "Nu îl suport deloc."
        ]
    },
    {
        q: "Ce rol joacă casa ta pentru tine?",
        a: [
            "Bază între două aventuri.",
            "Centru al vieții de familie.",
            "Spațiu de visare și conectare.",
            "Loc de ordine și eficiență.",
            "Refugiu personal."
        ]
    }
];

const weights = ['explorer', 'family', 'dreamer', 'minimal', 'introvert'];

window.onload = () => {
    const form = document.getElementById("testForm");
    const questionsDiv = document.getElementById("questions");

    questionsData.forEach((q, i) => {
        const block = document.createElement("div");
        block.innerHTML = `
            <p class="question-title"><strong>${i + 1}. ${q.q}</strong></p>
            ${q.a.map((ans, idx) => `
                <label><input type="radio" name="q${i}" value="${idx}" required> ${ans}</label><br>
            `).join("")}
        `;
        questionsDiv.appendChild(block);
    });

    form.onsubmit = function(e) {
        e.preventDefault();
        let score = [0, 0, 0, 0, 0];

        for (let i = 0; i < 5; i++) {
            const val = parseInt(document.querySelector(`input[name="q${i}"]:checked`).value);
            score[val]++;
        }

        const maxIndex = score.indexOf(Math.max(...score));
        const profile = weights[maxIndex];
        window.location.href = `result.html?profile=${profile}`;
    };
};