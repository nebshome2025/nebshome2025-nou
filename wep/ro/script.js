const questionsData = [
  {
    q: "1. Prefer o locuinta cu design neconventional, spatii atipice si flexibile, in locul unei compartimentari clasice.",
    a: [
      "1 - Dezacord total",
      "2 - Dezacord",
      "3 - Neutral",
      "4 - Acord",
      "5 - Acord total"
    ]
  },
  {
    q: "2. Sunt deschis sa locuiesc intr-o zona in dezvoltare sau intr-un cartier eclectic, daca proprietatea are personalitate.",
    a: [
      "1 - Dezacord total",
      "2 - Dezacord",
      "3 - Neutral",
      "4 - Acord",
      "5 - Acord total"
    ]
  },
  {
    q: "3. Eficienta energetica, spatiile mari de depozitare si finisajele impecabile sunt criterii eliminatorii pentru mine.",
    a: [
      "1 - Dezacord total",
      "2 - Dezacord",
      "3 - Neutral",
      "4 - Acord",
      "5 - Acord total"
    ]
  },
  {
    q: "4. Am nevoie ca fiecare obiect si zona din casa sa aiba un loc bine definit si organizat strict.",
    a: [
      "1 - Dezacord total",
      "2 - Dezacord",
      "3 - Neutral",
      "4 - Acord",
      "5 - Acord total"
    ]
  },
  {
    q: "5. Imi doresc o zona de zi generoasa (living/terasa) conceptuta special pentru a primi oaspeti si a organiza adunari.",
    a: [
      "1 - Dezacord total",
      "2 - Dezacord",
      "3 - Neutral",
      "4 - Acord",
      "5 - Acord total"
    ]
  },
  {
    q: "6. Prefer sa locuiesc intr-un ansamblu vibrant, aproape de viata urbana, restaurante si evenimente.",
    a: [
      "1 - Dezacord total",
      "2 - Dezacord",
      "3 - Neutral",
      "4 - Acord",
      "5 - Acord total"
    ]
  },
  {
    q: "7. Prioritatea mea principala este un mediu sigur pentru familie, aproape de scoli, parcuri si comunitate.",
    a: [
      "1 - Dezacord total",
      "2 - Dezacord",
      "3 - Neutral",
      "4 - Acord",
      "5 - Acord total"
    ]
  },
  {
    q: "8. Sunt dispus sa fac compromisuri la suprafata casei daca spatiile comune incurajeaza armonia familiei.",
    a: [
      "1 - Dezacord total",
      "2 - Dezacord",
      "3 - Neutral",
      "4 - Acord",
      "5 - Acord total"
    ]
  },
  {
    q: "9. Zgomotul urban, traficul sau lipsa de lumina naturala imi creeaza un disconfort accentuat si stari de stres.",
    a: [
      "1 - Dezacord total",
      "2 - Dezacord",
      "3 - Neutral",
      "4 - Acord",
      "5 - Acord total"
    ]
  },
  {
    q: "10. Sistemele avansate de securitate, izolarea fonica ridicata si intimitatea strict sunt esentiale pentru linistea mea.",
    a: [
      "1 - Dezacord total",
      "2 - Dezacord",
      "3 - Neutral",
      "4 - Acord",
      "5 - Acord total"
    ]
  },
{
    q: "11. Pentru mine, este esențial ca locuința să aibă un spațiu exterior generos (balcon mare, terasă sau grădină).",
    a: [
      "1 - Dezacord total",
      "2 - Dezacord",
      "3 - Neutral",
      "4 - Acord",
      "5 - Acord total"
    ]
  },
  {
    q: "12. Îmi doresc să locuiesc într-un cartier liniștit, cu multe spații verzi, chiar dacă asta înseamnă să fiu mai departe de centru.",
    a: [
      "1 - Dezacord total",
      "2 - Dezacord",
      "3 - Neutral",
      "4 - Acord",
      "5 - Acord total"
    ]
  },
  {
    q: "13. Parcarea, izolația fonică excelentă și spațiile mari de depozitare sunt condiții obligatorii pentru mine.",
    a: [
      "1 - Dezacord total",
      "2 - Dezacord",
      "3 - Neutral",
      "4 - Acord",
      "5 - Acord total"
    ]
  },
  {
    q: "14. Visul meu este să locuiesc într-un apartament modern, cu design deschis (open-space) și multă lumină naturală.",
    a: [
      "1 - Dezacord total",
      "2 - Dezacord",
      "3 - Neutral",
      "4 - Acord",
      "5 - Acord total"
    ]
  },
  {
    q: "15. Aș face compromisuri la suprafața totală a casei pentru a avea o curte privată sau o grădină.",
    a: [
      "1 - Dezacord total",
      "2 - Dezacord",
      "3 - Neutral",
      "4 - Acord",
      "5 - Acord total"
    ]
  },
]; 
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("questions");
  if (!container) return;

  // Generare intrebari in div-ul #questions
  questionsData.forEach((item, index) => {
    const qDiv = document.createElement("div");
    qDiv.style.marginBottom = "20px";
    qDiv.style.textAlign = "left";

    let html = `<p style="font-weight: bold; margin-bottom: 8px;">${item.q}</p>`;

    item.a.forEach((option) => {
      html += `
        <label style="display: block; margin-bottom: 5px; cursor: pointer;">
          <input type="radio" name="q${index + 1}" value="${option}" required style="margin-right: 8px;">
          ${option}
        </label>
      `;
    });

    qDiv.innerHTML = html;
    container.appendChild(qDiv);
  });

  // Trimitere formular
  const form = document.getElementById("testForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("userEmail").value;
      const answers = {};

      questionsData.forEach((_, index) => {
        const selected = document.querySelector(`input[name="q${index + 1}"]:checked`);
        answers[`q${index + 1}`] = selected ? selected.value : "";
      });

      const payload = {
        email: email,
        answers: answers
      };

      // Trimitere date catre MakeWebhook
      fetch("https://hook.eu2.make.com/a6qpye9nylq8ny9dym7q2xy8w8g85b9v", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(() => {
        alert("Răspunsurile au fost trimise cu succes!");
      })
      .catch((err) => {
        console.error("Eroare la trimitere:", err);
      });
    });
  }
});
