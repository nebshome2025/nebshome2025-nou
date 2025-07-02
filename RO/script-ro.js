const questionsData = [
    {
        "q": "Cum îți petreci de obicei weekendul?",
        "a": [
            "Îl petrec activ, mă întâlnesc cu prieteni, particip la evenimente sau explorez orașul.",
            "Este important pentru mine să petrec timp cu familia într-o atmosferă liniștită acasă.",
            "Încerc să ies în natură pentru a mă reîncărca și a găsi echilibrul interior.",
            "Weekendul e momentul pentru ordine, dezvoltare personală și citit în liniște.",
            "Prefer singurătatea, ca să-mi clarific obiectivele și să-mi recuperez energia."
        ]
    },
    {
        "q": "Ce este cel mai important pentru tine într-o locuință?",
        "a": [
            "Localizarea convenabilă, apropierea de muncă și infrastructură sunt prioritare.",
            "Apreciez spațiul generos și libertatea de mișcare în locuință.",
            "Legătura cu natura — verdeață, aer curat și lumină naturală.",
            "Funcționalitatea — fiecare element al casei trebuie să fie util și practic.",
            "Liniștea și intimitatea, ca să mă simt în siguranță și în echilibru."
        ]
    },
    {
        "q": "Ce stil de design te atrage cel mai mult?",
        "a": [
            "Stilul modern, cu linii curate și soluții tehnologice mă inspiră.",
            "Stilul clasic, cu elemente tradiționale și materiale nobile.",
            "Stilul eco, cu materiale naturale și multe plante vii, aduce armonie.",
            "Minimalismul mă ajută să mă concentrez și să evit zgomotul vizual.",
            "Îmi place stilul loft — spațiu deschis, creativ și estetică industrială."
        ]
    },
    {
        "q": "Ce te irită cel mai mult?",
        "a": [
            "Mă plictisesc ușor, am nevoie constantă de activitate și noutate.",
            "Dezordinea mă stresează, am nevoie de curățenie și organizare.",
            "Zgomotul îmi afectează confortul, caut liniște.",
            "Haosul în viață și spațiu mă destabilizează, am nevoie de control.",
            "Limitările și regulile îmi afectează libertatea, vreau să am opțiuni."
        ]
    },
    {
        "q": "Unde ți-ar plăcea cel mai mult să locuiești?",
        "a": [
            "Chiar în centrul orașului, în mijlocul acțiunii și energiei.",
            "Într-un cartier liniștit, cu infrastructură bună, potrivit pentru familie.",
            "În afara orașului, aproape de natură și departe de agitație.",
            "Într-o garsonieră compactă, unde totul e la îndemână și eficient.",
            "Într-o casă cu birou propriu și spațiu pentru muncă liniștită."
        ]
    },
    {
        "q": "Ce îți cere cel mai mult activitatea ta?",
        "a": [
            "Activitate fizică, deplasare și interacțiune constantă cu oamenii.",
            "Stabilitate, structură clară și predictibilitate.",
            "Inspirație, creativitate și libertate în gândire.",
            "Organizare și gândire sistemică pentru a controla procesele.",
            "Concentrare profundă și izolare pentru lucru eficient."
        ]
    },
    {
        "q": "Cum te raportezi la vecini?",
        "a": [
            "Sunt neutru, important e să nu ne deranjăm.",
            "Apreciez vecinii prietenoși și relațiile sociale apropiate.",
            "Prefer interacțiuni limitate și intimitate în spațiul meu.",
            "Vreau liniște și respect pentru spațiul personal.",
            "Mi-ar plăcea să nu am vecini, să controlez complet mediul meu."
        ]
    },
    {
        "q": "Despre ce casă visezi?",
        "a": [
            "Cu o priveliște panoramică, care inspiră în fiecare dimineață.",
            "Cu spațiu dedicat copiilor, jocurilor și vieții de familie.",
            "Cu grădină proprie, unde să cresc plante și să mă relaxez.",
            "Cu mobilier minim și spațiu maxim pentru claritate și ordine.",
            "Cu bibliotecă sau colț confortabil pentru lectură și reflecție."
        ]
    },
    {
        "q": "Cum alegi mobilierul?",
        "a": [
            "Urmăresc tendințele actuale — vreau stil și modernitate.",
            "Confortul și ergonomia sunt cele mai importante pentru mine.",
            "Prefer mobilier din materiale naturale, ecologice.",
            "Apreciez utilitatea — fiecare obiect trebuie să aibă o funcție clară.",
            "Caut obiecte unice, personalizate, cu caracter."
        ]
    },
    {
        "q": "Care este scopul tău principal în viață?",
        "a": [
            "Să am succes, recunoaștere și să îmi împlinesc ambițiile.",
            "Să construiesc o familie unită și iubitoare.",
            "Să găsesc armonia interioară și echilibrul personal.",
            "Să aduc ordine în toate aspectele vieții mele.",
            "Să mă dezvolt continuu, să învăț și să evoluez ca persoană."
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