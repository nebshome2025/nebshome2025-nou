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
    {
        q: "Ce e important pentru tine într-o locuință?",
        a: [
            "Locație convenabilă, aproape de serviciu și de tot ce am nevoie.",
            "Spațiu generos și libertate de mișcare în interior.",
            "Conexiunea cu natura – lumină naturală, verdeață, aer curat.",
            "Funcționalitate maximă – totul bine organizat și util.",
            "Liniște și intimitate, să mă simt în siguranță și pace."
        ]
    },
    {
        q: "Ce stil ți se potrivește cel mai mult?",
        a: [
            "Modern, cu linii curate și soluții tehnologice inteligente.",
            "Clasic, cu materiale nobile și un aer tradițional.",
            "Eco – materiale naturale, plante vii, armonie cu natura.",
            "Minimalist – ordine vizuală și spațiu pentru claritate mentală.",
            "Loft – spațiu creativ, deschis, cu estetică industrială."
        ]
    },
    {
        q: "Ce te deranjează cel mai mult?",
        a: [
            "Rutina și plictiseala – am nevoie de activitate și varietate.",
            "Dezordinea – mă stresează, vreau curățenie și organizare.",
            "Zgomotul – îmi afectează starea, prefer liniștea.",
            "Haosul – am nevoie de control și structură.",
            "Restricțiile – îmi place libertatea deplină."
        ]
    },
    {
        q: "Unde ți-ar plăcea cel mai mult să locuiești?",
        a: [
            "În centrul orașului, în mijlocul acțiunii.",
            "Într-un cartier liniștit, potrivit pentru familie.",
            "La marginea orașului sau în natură, cu aer curat.",
            "Într-un studio compact și eficient.",
            "Într-o casă cu birou propriu și colț de liniște."
        ]
    },
    {
        q: "Munca ta necesită mai mult:",
        a: [
            "Mișcare, interacțiune și activitate constantă.",
            "Stabilitate, reguli clare și predictibilitate.",
            "Creativitate, libertate și soluții originale.",
            "Organizare, planificare și sistematizare.",
            "Concentrare profundă și lucru în liniște."
        ]
    },
    {
        q: "Cum te raportezi la vecini?",
        a: [
            "Neutră – important e să nu mă deranjeze.",
            "Îmi place să am vecini prietenoși, relații sociale.",
            "Prefer intimitatea și puțină interacțiune.",
            "Vreau doar liniște și respectarea limitelor personale.",
            "Ideal – fără vecini, control total al spațiului meu."
        ]
    },
    {
        q: "Casa ta de vis trebuie să aibă:",
        a: [
            "Priveliște panoramică – inspirație și deschidere.",
            "Spațiu de joacă pentru copii și familie.",
            "Grădină sau terasă verde – relaxare în aer liber.",
            "Cât mai puțin mobilier – spațiu liber, claritate.",
            "Bibliotecă sau colț personal pentru studiu/reflecție."
        ]
    },
    {
        q: "Cum alegi mobilierul?",
        a: [
            "Urmăresc ultimele tendințe – modern și stilat.",
            "Confortul și ergonomia sunt cele mai importante.",
            "Prefer materiale naturale și ecologice.",
            "Practic – totul trebuie să aibă un scop clar.",
            "Unic și personalizat – vreau caracter și originalitate."
        ]
    },
    {
        q: "Care e scopul tău principal în viață?",
        a: [
            "Succes, recunoaștere și împlinirea ambițiilor.",
            "Familie puternică, dragoste și siguranță.",
            "Armonie interioară și echilibru sufletesc.",
            "Ordine în toate domeniile vieții.",
            "Evoluție continuă și dezvoltare personală."
        ]
    }
];

const weights = ['explorer', 'family', 'dreamer', 'minimal', 'introvert'];

window.onload = () => {
    const form = document.getElementById("testForm");
    const questionsDiv = document.getElementById("questions");

    // Generare întrebări
    questionsData.forEach((q, i) => {
        const block = document.createElement("div");
        block.innerHTML = `<p><strong>${i + 1}. ${q.q}</strong></p>` +
            q.a.map((ans, idx) =>
                `<label><input type="radio" name="q${i}" value="${idx}" required> ${ans}</label><br>`
            ).join('');
        questionsDiv.appendChild(block);
    });

    // Trimitere formular
    form.onsubmit = function (e) {
        e.preventDefault();

        // Calculează profilul
        let score = [0, 0, 0, 0, 0];
        for (let i = 0; i < 10; i++) {
            const val = parseInt(document.querySelector(`input[name="q${i}"]:checked`).value);
            score[val]++;
        }
        const maxIndex = score.indexOf(Math.max(...score));
        const profile = weights[maxIndex];

        // Generează session_id
        const sessionId = crypto.randomUUID();

        // Trimite date la Make
        fetch("https://hook.eu2.make.com/a6qpye9nylq8ny9dym7q2xy8w8g85b9v", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                profile: profile,
                lang: "ro",
                session_id: sessionId
            })
        }).then(() => {
            // Redirecționează la Lemon
            const base = "https://nebshome-test.lemonsqueezy.com/buy/052e7ec5-1de0-498f-a838-0fd476694ebf";
            const u = new URL(base);
            u.searchParams.set("checkout[custom][session_id]", sessionId);
            u.searchParams.set("checkout[custom][profile]", profile);
            u.searchParams.set("checkout[custom][lang]", "ro");
            window.location.href = u.toString();
        }).catch(err => {
            console.error("Eroare trimitere la Make:", err);
            alert("A apărut o problemă. Încearcă din nou.");
        });
    };
};