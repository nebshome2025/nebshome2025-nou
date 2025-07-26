const questionsData = [
    {
        "q": "Cum îți petreci de obicei weekendurile?",
        "a": [
            "Le petrec activ, cu prieteni, evenimente sau explorând orașul.",
            "Prefer să stau cu familia, într-o atmosferă liniștită acasă.",
            "Ies în natură pentru a mă reîncărca și a mă conecta cu mine.",
            "Fac curățenie, citesc și mă dezvolt personal.",
            "Îmi place să fiu singur, să reflectez și să îmi reîncarc energia."
        ]
    },
    {
        "q": "Ce este important pentru tine într-o locuință?",
        "a": [
            "Locația bună, aproape de muncă și infrastructură.",
            "Spațiu larg și libertate de mișcare.",
            "Conexiune cu natura – verdeață, aer curat, lumină naturală.",
            "Funcționalitate – totul să fie util și eficient.",
            "Liniște și intimitate, să mă simt în siguranță și pace."
        ]
    },
    {
        "q": "Ce stil de locuință te atrage cel mai mult?",
        "a": [
            "Modern, cu linii clare și soluții tehnologice.",
            "Clasic, cu tradiții și materiale nobile.",
            "Eco – materiale naturale, plante vii, armonie.",
            "Minimalism – simplitate vizuală, claritate.",
            "Loft – spațiu liber, creativitate și estetică industrială."
        ]
    },
    {
        "q": "Ce te deranjează cel mai mult?",
        "a": [
            "Plictiseala – caut mereu activitate și noutate.",
            "Dezordinea – am nevoie de curățenie și organizare.",
            "Zgomotul – îmi strică confortul, vreau liniște.",
            "Haosul – mă destabilizează, am nevoie de control.",
            "Restricțiile – am nevoie de libertate și alegeri proprii."
        ]
    },
    {
        "q": "Unde ți-ai dori să locuiești?",
        "a": [
            "În centrul orașului, în mijlocul acțiunii.",
            "Într-un cartier liniștit cu infrastructură bună.",
            "În afara orașului, în natură și liniște.",
            "Într-o garsonieră compactă și eficientă.",
            "Într-o casă cu birou propriu pentru muncă liniștită."
        ]
    },
    {
        "q": "Munca ta necesită cel mai mult:",
        "a": [
            "Mișcare, interacțiune și activitate constantă.",
            "Stabilitate, structură și claritate.",
            "Inspirație, creativitate și soluții originale.",
            "Organizare și gândire sistemică.",
            "Concentrare profundă și liniște totală."
        ]
    },
    {
        "q": "Cum te raportezi la vecini?",
        "a": [
            "Neutru – important e să nu deranjeze.",
            "Îmi plac vecinii prietenoși, legături sociale contează.",
            "Prefer comunicarea minimă și intimitatea.",
            "Vreau liniște și respectarea granițelor personale.",
            "Ideal ar fi să nu am deloc vecini."
        ]
    },
    {
        "q": "Casa visurilor tale ar avea:",
        "a": [
            "Priveliște panoramică și spațiu aerisit.",
            "Spațiu de joacă pentru copii și familie.",
            "Grădină proprie pentru relaxare și verdeață.",
            "Cât mai puține obiecte, mai mult spațiu liber.",
            "Bibliotecă sau colț de lectură intim."
        ]
    },
    {
        "q": "Cum alegi mobilierul?",
        "a": [
            "Urmăresc trendurile – vreau un decor modern și stilat.",
            "Confortul și ergonomia sunt prioritare.",
            "Aleg materiale naturale și ecologice.",
            "Practic – totul trebuie să aibă un rost.",
            "Unicitate – vreau obiecte personalizate, cu caracter."
        ]
    },
    {
        "q": "Care este scopul tău principal în viață?",
        "a": [
            "Succes, recunoaștere și realizarea ambițiilor.",
            "O familie puternică și iubitoare.",
            "Armonie interioară și echilibru personal.",
            "Ordine în toate domeniile vieții.",
            "Dezvoltare continuă și învățare personală."
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

    form.onsubmit = function (e) {
        e.preventDefault();
        let score = [0, 0, 0, 0, 0];
        for (let i = 0; i < 10; i++) {
            const val = parseInt(document.querySelector(`input[name="q${i}"]:checked`).value);
            score[val]++;
        }
        const maxIndex = score.indexOf(Math.max(...score));
        const profile = weights[maxIndex];

        localStorage.setItem("profil_nebshome", profile);

        window.location.href = "https://nebshome-test.lemonsqueezy.com/buy/c3e30291-0298-4e83-a0d6-c769adea72fb";
    };
};