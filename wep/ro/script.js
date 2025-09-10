<<<<<<< HEAD

// -------------------------------
// Test Nebshome (RO) — script.js
// -------------------------------

// 10 întrebări × 5 răspunsuri
=======
>>>>>>> 0f74b898329fb0472d9d393e1b9071e6437ed5f6
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

// 7 profiluri
const PROFILES = ['explorer','family','dreamer','minimal','introvert','luxury','practical'];

// MAP: pentru fiecare întrebare (0..9), fiecare opțiune (0..4) -> profil
const MAP = [
    ['explorer','family','dreamer','minimal','introvert'], // Q1
    ['explorer','family','dreamer','minimal','introvert'], // Q2
    ['dreamer','luxury','minimal','explorer','practical'], // Q3
    ['introvert','minimal','dreamer','practical','family'],// Q4
    ['explorer','family','dreamer','minimal','introvert'], // Q5
    ['practical','family','dreamer','minimal','introvert'],// Q6
    ['introvert','family','practical','introvert','minimal'],// Q7
    ['dreamer','family','dreamer','minimal','introvert'],  // Q8
    ['luxury','family','dreamer','practical','minimal'],   // Q9
    ['explorer','family','dreamer','minimal','introvert'], // Q10
];

// ——— UI render ———
(function renderQuestions(){
    const form = document.getElementById("testForm");
    const qs   = document.getElementById("questions");
    if (!form || !qs) return;

    questionsData.forEach((q, i) => {
        const block = document.createElement("div");
        block.className = "q-block";
        block.innerHTML =
            `<p><strong>${i+1}. ${q.q}</strong></p>` +
            q.a.map((ans, idx) =>
                `<label><input type="radio" name="q${i}" value="${idx}" required> ${ans}</label>`
            ).join('');
        qs.appendChild(block);
    });

    form.addEventListener("submit", onSubmit);
})();

<<<<<<< HEAD
// ——— Submit ———
=======
const PRIORITY = [
    "explorer",
    "family",
    "dreamer",
    "minimal",
    "introvert",
    "luxury",
    "practical"
];
const Q_WEIGHTS = [1,1,1.2,1,1,1,1,1.1,1,1];

function hash32(str){
  let h = 2166136261 >>> 0;
  for (let i=0; i<str.length; i++){
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

>>>>>>> 0f74b898329fb0472d9d393e1b9071e6437ed5f6
async function onSubmit(e){
    e.preventDefault();
    const counts = { explorer:0,family:0,dreamer:0,minimal:0,introvert:0,luxury:0,practical:0 };
    const weighted = { explorer:0,family:0,dreamer:0,minimal:0,introvert:0,luxury:0,practical:0 };
    for (let i=0; i<questionsData.length; i++){
        const picked = document.querySelector(`input[name="q${i}"]:checked`);
        if (!picked) { alert("Răspunde la toate întrebările."); return; }
        const opt = parseInt(picked.value, 10);
        const prof = MAP[i][opt];
<<<<<<< HEAD
        counts[prof]++;
    }
=======
        counts[prof]   = (counts[prof]   || 0) + 1;
        weighted[prof] = (weighted[prof] || 0) + (Q_WEIGHTS[i] || 1);
      }
>>>>>>> 0f74b898329fb0472d9d393e1b9071e6437ed5f6

    const sessionId = (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now());
    const entries = Object.entries(counts).sort((a,b)=>{
      if (b[1] !== a[1]) return b[1] - a[1];
      const wa = weighted[a[0]] || 0, wb = weighted[b[0]] || 0;
      if (wb !== wa) return wb - wa;
      const pa = PRIORITY.indexOf(a[0]), pb = PRIORITY.indexOf(b[0]);
      if (pa !== pb) return pa - pb;
      const ha = hash32(sessionId + ":" + a[0]);
      const hb = hash32(sessionId + ":" + b[0]);
      return ha - hb;
    });
    const profile = entries[0][0];

    try{
        await fetch("https://hook.eu2.make.com/a6qpye9nylq8ny9dym7q2xy8w8g85b9v",{
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body: JSON.stringify({ profile, lang:"ro", session_id: sessionId })
        });
    }catch(err){
        console.error("Eroare trimitere la Make:", err);
    }

    const base = "https://nebshome-test.lemonsqueezy.com/buy/052e7ec5-1de0-498f-a838-0fd476694ebf";
    const u = new URL(base);
    u.searchParams.set("checkout[custom][session_id]", sessionId);
    u.searchParams.set("checkout[custom][profile]",    profile);
    u.searchParams.set("checkout[custom][lang]",       "ro");
    window.location.href = u.toString();
}