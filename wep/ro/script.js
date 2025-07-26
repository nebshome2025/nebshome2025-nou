const questionsData = [
    {
        q: "Cum îți petreci de obicei weekendurile?",
        a: [
            "Le petrec activ, cu prieteni, evenimente sau explorând orașul.",
            "Prefer să stau cu familia, într-o atmosferă liniștită acasă.",
            "Ies în natură pentru a mă reîncărca și a mă conecta cu mine.",
            "Fac curățenie, citesc și mă dezvolt personal.",
            "Îmi place să fiu singur, să reflectez și să îmi reîncarc energia."
        ]
    },
    // Adaugă aici restul întrebărilor până la 10
];

const weights = ['explorer', 'family', 'dreamer', 'minimal', 'introvert'];

window.onload = () => {
    const questionsDiv = document.getElementById("questions");
    questionsData.forEach((q, i) => {
        const block = document.createElement("div");
        block.innerHTML = `<p><strong>${i + 1}. ${q.q}</strong></p>` +
            q.a.map((ans, idx) =>
                `<label><input type="radio" name="q${i}" value="${idx}" required> ${ans}</label><br>`
            ).join('');
        questionsDiv.appendChild(block);
    });
};

// Funcția chemată din HTML pentru calcularea profilului
function calculeazaProfil() {
    let score = [0, 0, 0, 0, 0];
    for (let i = 0; i < questionsData.length; i++) {
        const val = document.querySelector(`input[name="q${i}"]:checked`);
        if (!val) {
            return null; // întrebări incomplete
        }
        score[parseInt(val.value)]++;
    }
    const maxIndex = score.indexOf(Math.max(...score));
    return weights[maxIndex];
}