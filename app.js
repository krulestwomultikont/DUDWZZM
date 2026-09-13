// ==========================================================================
// MAPOWANIE STATUSÓW
// ==========================================================================
const statusMap = {
  "Obowiązujący": "status-active",
  "Akt utracił moc": "status-repealed"
};

// ==========================================================================
// BAZA DANYCH DZIENNIKA URZĘDOWEGO DWZZM
// ==========================================================================
const dwzzmDb = {
  "2025": [
    { pos: 2, title: "Uchwała Intergalaktycznego Trybunału Sprawiedliwości Multikont nr 1/25 z 23.04.2025 r.", date: "2025-04-23", status: "Obowiązujący", pdfImg: "wyrokITSM.png" },
    { pos: 1, title: "Konwencja o ochronie mediów Multikont z 22.01.2025 r.", date: "2025-01-22", status: "Obowiązujący", pdfImg: "dwzzmkonw.png" }
  ],
  "2024": [
    { pos: 8, title: "Konwencja o przeciwdziałaniu naruszeniom prawa Multikont z 13.12.2024 r.", date: "2024-12-13", status: "Obowiązujący", pdfImg: "dwzzmkonw.png" },
    { pos: 7, title: "Rozporządzenie Prezydenta DWZZM z 12.12.2024 r. Statut Intergalaktycznego Trybunału Sprawiedliwości Multikont", date: "2024-12-12", status: "Obowiązujący", pdfImg: "dwzzm.png" },
    { pos: 6, title: "Karta Praw Podstawowych Multikont z 30.10.2024 r.", date: "2024-10-30", status: "Obowiązujący", pdfImg: "dwzzmkonw.png" },
    { pos: 5, title: "Konstytucja DWZZM z 03.10.2024 r.", date: "2024-10-03", status: "Obowiązujący", pdfImg: "dwzzm.png" },
    { pos: 4, title: "II Traktat Tarkwinogrodzki o DWZZM z 15.09.2024 r.", date: "2024-09-15", status: "Obowiązujący", pdfImg: "dwzzmkonw.png" },
    { pos: 3, title: "Konwencja o międzynarodowym certyfikacie prawdziwości Multikonta z 11.06.2024 r.", date: "2024-06-11", status: "Obowiązujący", pdfImg: "dwzzmkonw.png" },
    { pos: 2, title: "Wyrok Międzynarodowego Trybunału Sprawiedliwości Multikont z 23.05.2024 r. w sprawie szkodliwej działalności fejk kont i altkont", date: "2024-06-11", status: "Obowiązujący", pdfImg: "wyrokITSM.png" },
    { pos: 1, title: "Rozporządzenie Prezydium DWZZM z 16.05.2024 r. o Ponadnarodowym Rzeczniku Praw Multikont", date: "2024-05-16", status: "Obowiązujący", pdfImg: "dwzzm.png" }
  ],
  "2023": [
    { pos: 3, title: "Konwencja o zwalczaniu szkodliwej działalności fejk kont i altkont z 29.11.2023 r.", date: "2023-11-29", status: "Obowiązujący", pdfImg: "dwzzmkonw.png" },
    { pos: 2, title: "Rozporządzenie Prezydium DWZZM z 27.11.2023 r. Statut Międzynarodowego Trybunału Sprawiedliwości Multikont", date: "2023-11-27", status: "Akt utracił moc", pdfImg: "dwzzm.png" },
    { pos: 1, title: "Traktat o DWZZM z 22.02.2023 r.", date: "2023-02-22", status: "Akt utracił moc", pdfImg: "dwzzmkonw.png" }
  ]
};

let currentTab = "2025";

function renderTableHtml(items, yearLabel) {
  return `
    <article class="item-card">
      <header class="item-header">
        <span class="item-sig">${yearLabel}</span>
        <span class="badge-grand">Liczba pozycji: ${items.length}</span>
      </header>
      <div class="item-body">
        <div class="table-responsive">
          <table class="official-table">
            <thead>
              <tr>
                <th style="width: 60px; text-align: center;">Pozycja</th>
                <th>Tytuł aktu</th>
                <th style="width: 120px; text-align: center;">Data ogłoszenia</th>
                <th style="width: 160px; text-align: center;">Status aktu</th>
                <th style="width: 90px; text-align: center;">Pliki</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => {
                const statusClass = statusMap[item.status] || "status-active";
                const itemYear = item.year || currentTab;

                return `
                <tr>
                  <td style="text-align: center;"><strong>${item.pos}</strong></td>
                  <td style="color: #f1f3f5; font-weight: 500; text-align: justify;">${item.title}</td>
                  <td style="text-align: center; color: #d1d5db;">${item.date}</td>
                  <td style="text-align: center; vertical-align: middle;">
                    <span class="badge-status ${statusClass}">${item.status}</span>
                  </td>
                  <td style="text-align: center;">
                    <div class="file-icons">
                      ${item.pdfImg ? `
                        <a href="${itemYear}/DUDWZZM${itemYear}poz${item.pos}.pdf" target="_blank" title="Pobierz plik PDF" class="file-link">
                          <img src="${item.pdfImg}" alt="Plik PDF" class="legacy-icon">
                        </a>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `}).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  `;
}

function generateTabs() {
  const container = document.getElementById("tabsBarContainer");
  if (!container) return;
  const years = Object.keys(dwzzmDb).sort((a, b) => b - a);
  container.innerHTML = years.map(year => `
    <button class="tab-button ${year === currentTab ? 'active' : ''}" onclick="loadTab('${year}', this)">Rocznik ${year}</button>
  `).join('');
}

function loadTab(year, btnElement) {
  currentTab = year;
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  const container = document.getElementById("contentContainer");
  if (!container) return;

  const items = dwzzmDb[year] || [];
  container.innerHTML = renderTableHtml(items, `Dziennik Urzędowy DWZZM z ${year} r.`);
}

function hasMatch(val, query) {
  if (!val) return false;
  return String(val).toLowerCase().includes(query);
}

function handleSearch() {
  const input = document.getElementById("registrySearch");
  const container = document.getElementById("contentContainer");
  if (!input || !container) return;
  
  const query = input.value.trim().toLowerCase();

  if (!query) {
    const activeBtn = Array.from(document.querySelectorAll('.tab-button')).find(b => b.textContent.includes(currentTab));
    loadTab(currentTab, activeBtn);
    return;
  }

  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

  let matches = [];
  Object.keys(dwzzmDb).forEach(year => {
    dwzzmDb[year].forEach(item => {
      if (
        hasMatch(item.pos, query) ||
        hasMatch(item.title, query) ||
        hasMatch(item.date, query) ||
        hasMatch(item.status, query)
      ) {
        matches.push({ ...item, year });
      }
    });
  });

  if (matches.length === 0) {
    container.innerHTML = `<div class="search-no-results">Nie odnaleziono aktów prawnych dla frazy: <strong>${query}</strong>.</div>`;
    return;
  }

  container.innerHTML = renderTableHtml(matches, `Wyniki wyszukiwania we wszystkich rocznikach (Trafień: ${matches.length})`);
}

function clearSearch() {
  const input = document.getElementById("registrySearch");
  if (input) {
    input.value = "";
    const targetBtn = Array.from(document.querySelectorAll('.tab-button')).find(b => b.textContent.includes(currentTab));
    if (targetBtn) targetBtn.classList.add('active');
    loadTab(currentTab, targetBtn);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  generateTabs();
  loadTab('2025', document.querySelector('.tab-button'));
});