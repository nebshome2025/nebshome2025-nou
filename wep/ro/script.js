/*
// --- CONFIG ---
const WEBHOOK_URL = "https://hook.eu2.make.com/a6qpye9nylq8ny9dym7q2xy8w8g85b9v";
const LEMON_BUY_URL = "https://nebshome-test.lemonsqueezy.com/buy/052e7ec5-1de0-498f-a838-0fd476694ebf";
const LANG = "ro";

// 7 profiluri (slug = cheile din Sheets: <slug>_ro)
const PROFILES = ["explorer","family","dreamer","minimal","introvert","luxury","practical"];

// Întrebări (varianta lungă)
const QUESTIONS = [
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

// Maparea răspunsurilor la cele 7 profiluri (câte 1 profil pentru fiecare opțiune)
const MAP = [
    ["explorer","family","dreamer","minimal","introvert"],
    ["explorer","family","dreamer","practical","introvert"],
    ["luxury","family","dreamer","minimal","explorer"],
    ["explorer","minimal","introvert","practical","dreamer"],
    ["explorer","family","dreamer","minimal","introvert"],
    ["explorer","family","dreamer","practical","introvert"],
    ["minimal","family","introvert","introvert","dreamer"],
    ["luxury","family","dreamer","minimal","introvert"],
    ["luxury","family","dreamer","practical","explorer"],
    ["luxury","family","dreamer","minimal","explorer"]
];

// --- RENDER întrebări ---
const questionsDiv = document.getElementById("questions");
QUESTIONS.forEach((q,i)=>{
    const b = document.createElement("div");
    b.innerHTML =
        `<p class="q">${i+1}. ${q.q}</p>` +
        q.a.map((ans,idx)=>(
            `<label><input type="radio" name="q${i}" value="${idx}" required> ${ans}</label>`
        )).join("");
    questionsDiv.appendChild(b);
});

// util: ID sesiune
function newId(){
    if (crypto && crypto.randomUUID) return crypto.randomUUID();
    return 's_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8);
}

// --- SUBMIT ---
document.getElementById("testForm").addEventListener("submit", async (e)=>{
    e.preventDefault();

    const score = Object.fromEntries(PROFILES.map(p=>[p,0]));
    const chosen = [];

    for(let i=0;i<QUESTIONS.length;i++){
        const el = document.querySelector(`input[name="q${i}"]:checked`);
        if(!el){ alert("Răspunde la toate întrebările."); return; }
        const idx = parseInt(el.value,10);
        const prof = MAP[i][idx];
        score[prof] += 1;
        chosen.push({q:i, a:idx, prof});
    }

    const max = Math.max(...Object.values(score));
    let winners = PROFILES.filter(p=>score[p]===max);
    if (winners.length>1){
        for(let i=chosen.length-1;i>=0;i--){
            const p = chosen[i].prof;
            if (winners.includes(p)){ winners=[p]; break; }
        }
    }
    const profile = winners[0];

    const session_id = newId();

    try{
        await fetch(WEBHOOK_URL, {
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body: JSON.stringify({ profile, lang: LANG, session_id })
        });
    }catch(_){}

    const u = new URL(LEMON_BUY_URL);
    u.searchParams.set("checkout[custom][session_id]", session_id);
    u.searchParams.set("checkout[custom][profile]", profile);
    u.searchParams.set("checkout[custom][lang]", LANG);
    window.location.href = u.toString();
});