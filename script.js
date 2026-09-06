const OPCJE_STOPNIE_SKROCONE = [
  { val: "", txt: "-- Brak stopnia --" },
  { val: "mł.", txt: "mł. (młodzik)" },
  { val: "och.", txt: "och. (ochotniczka)" },
  { val: "wyw.", txt: "wyw. (wywiadowca)" },
  { val: "trop.", txt: "trop. (tropicielka)" },
  { val: "odkr.", txt: "odkr. (odkrywca)" },
  { val: "pion.", txt: "pion. (pionierka)" },
  { val: "ćw.", txt: "ćw. (ćwik)" },
  { val: "sam.", txt: "sam. (samarytanka)" },
  { val: "HO", txt: "HO (harcerz orli / harcerka orla)" },
  { val: "HR", txt: "HR (harcerz Rzeczypospolitej / harcerka Rzeczypospolitej)" },
  { val: "pwd.", txt: "pwd. (przewodnik / przewodniczka)" },
  { val: "phm.", txt: "phm. (podharcmistrz / podharcmistrzyni)" },
  { val: "hm.", txt: "hm. (harcmistrz / harcmistrzyni)" }
];

const OPCJE_STOPNIE_PELNE = [
  { val: "mł.", txt: "mł. (młodzik)" },
  { val: "och.", txt: "och. (ochotniczka)" },
  { val: "wyw.", txt: "wyw. (wywiadowca)" },
  { val: "trop.", txt: "trop. (tropicielka)" },
  { val: "odkr.", txt: "odkr. (odkrywca)" },
  { val: "pion.", txt: "pion. (pionierka)" },
  { val: "ćw.", txt: "ćw. (ćwik)" },
  { val: "sam.", txt: "sam. (samarytanka)" },
  { val: "HO", txt: "HO (harcerz orli / harcerka orla)" },
  { val: "HR", txt: "HR (harcerz Rzeczypospolitej / harcerka Rzeczypospolitej)" },
  { val: "pwd.", txt: "pwd. (przewodnik / przewodniczka)" },
  { val: "phm.", txt: "phm. (podharcmistrz / podharcmistrzyni)" },
  { val: "hm.", txt: "hm. (harcmistrz / harcmistrzyni)" }
];

const OPCJE_FUNKCJE = [
  { val: "zastępowego", txt: "zastępowego" },
  { val: "zastępową", txt: "zastępową" },
  { val: "podzastępowego", txt: "podzastępowego" },
  { val: "podzastępową", txt: "podzastępową" },
  { val: "przybocznego", txt: "przybocznego" },
  { val: "przyboczną", txt: "przyboczną" },
  { val: "drużynowego", txt: "drużynowego" },
  { val: "drużynową", txt: "drużynową" },
  { val: "kronikarza", txt: "kronikarza" },
  { val: "kronikarkę", txt: "kronikarkę" },
  { val: "skarbnika", txt: "skarbnika" },
  { val: "skarbniczkę", txt: "skarbniczkę" },
  { val: "proporczykowego", txt: "proporczykowego" },
  { val: "proporczykową", txt: "proporczykową" },
  { val: "sprzętowego", txt: "sprzętowego" },
  { val: "sprzętową", txt: "sprzętową" },
  { val: "kwatermistrza", txt: "kwatermistrza" },
  { val: "kwatermistrzynię", txt: "kwatermistrzynię" },
  { val: "członka Rady Drużyny", txt: "członka Rady Drużyny" },
  { val: "członkinię Rady Drużyny", txt: "członkinię Rady Drużyny" },
  { val: "INNA", txt: "-- Wpisz własną funkcję --" }
];

let rozkazData = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };

const nazwyKategorii = {
  1: "1. Wyjątki z rozkazów",
  2: "2. Uchwały, zarządzenia, decyzje",
  3: "3. Mianowania",
  4: "4. Zwolnienia",
  5: "5. Stopnie, sprawności, odznaki",
  6: "6. Pochwały",
  7: "7. Nagany",
  8: "8. Skargi, wnioski, zażalenia, raport karny"
};

function inicjalizujSelecty() {
  document.querySelectorAll('.select-stopien').forEach(sel => {
    sel.innerHTML = OPCJE_STOPNIE_SKROCONE.map(o => `<option value="${o.val}">${o.txt}</option>`).join('');
  });

  document.querySelectorAll('.select-stopien-pelny').forEach(sel => {
    sel.innerHTML = OPCJE_STOPNIE_PELNE.map(o => `<option value="${o.val}">${o.txt}</option>`).join('');
  });

  document.querySelectorAll('.select-funkcja').forEach(sel => {
    sel.innerHTML = OPCJE_FUNKCJE.map(o => `<option value="${o.val}">${o.txt}</option>`).join('');
    sel.addEventListener('change', obslozInnaFunkcje);
  });
}

function obslozInnaFunkcje(e) {
  const isMianowanie = e.target.id === 'mianowanieFunkcja';
  const inpInna = document.getElementById(isMianowanie ? 'mianowanieFunkcjaInna' : 'zwolnienieFunkcjaInna');
  if (e.target.value === 'INNA') {
    inpInna.classList.remove('hidden');
  } else {
    inpInna.classList.add('hidden');
  }
}

function zmienFormularz() {
  const typ = document.getElementById('actionType').value;
  ['formMianowanie', 'formZwolnienie', 'formOtwarcieProby', 'formZamkniecieProby', 'formInny'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });

  if (typ === 'mianowanie') document.getElementById('formMianowanie').classList.remove('hidden');
  else if (typ === 'zwolnienie') document.getElementById('formZwolnienie').classList.remove('hidden');
  else if (typ === 'otwarcieProby') document.getElementById('formOtwarcieProby').classList.remove('hidden');
  else if (typ === 'zamkniecieProby') document.getElementById('formZamkniecieProby').classList.remove('hidden');
  else if (typ === 'inny') document.getElementById('formInny').classList.remove('hidden');
}

function pobierzFunkcje(selectId, inputInnaId) {
  const val = document.getElementById(selectId).value;
  if (val === 'INNA') {
    return document.getElementById(inputInnaId).value.trim();
  }
  return val;
}

function laczStopienIOsobe(stopien, osoba) {
  return stopien ? `${stopien} ${osoba}` : osoba;
}

function dodajPunkt() {
  const typ = document.getElementById('actionType').value;

  if (typ === 'mianowanie') {
    const st = document.getElementById('mianowanieStopien').value;
    const os = document.getElementById('mianowanieOsoba').value.trim();
    const fn = pobierzFunkcje('mianowanieFunkcja', 'mianowanieFunkcjaInna');

    if (!os || !fn) return alert('Uzupełnij osobę oraz funkcję.');
    
    const pelnaOsoba = laczStopienIOsobe(st, os);
    rozkazData[3].push(`Mianuję ${pelnaOsoba} na funkcję ${fn}.`);

  } else if (typ === 'zwolnienie') {
    const st = document.getElementById('zwolnienieStopien').value;
    const os = document.getElementById('zwolnienieOsoba').value.trim();
    const fn = pobierzFunkcje('zwolnienieFunkcja', 'zwolnienieFunkcjaInna');
    const dziek = document.getElementById('zwolnienieDziekowanie').value;

    if (!os || !fn) return alert('Uzupełnij osobę oraz funkcję.');

    const pelnaOsoba = laczStopienIOsobe(st, os);
    let zdanie = `Zwalniam ${pelnaOsoba} z funkcji ${fn}`;
    zdanie += (dziek === 'tak') ? ', dziękując za dotychczasową służbę.' : '.';
    rozkazData[4].push(zdanie);

  } else if (typ === 'otwarcieProby') {
    const stAkt = document.getElementById('otwarcieStopienAktualny').value;
    const os = document.getElementById('otwarcieOsoba').value.trim();
    const stOtw = document.getElementById('otwarcieStopienOtwierany').value;
    const opiekun = document.getElementById('otwarcieOpiekun').value.trim();

    if (!os) return alert('Wpisz imię i nazwisko.');

    const pelnaOsoba = laczStopienIOsobe(stAkt, os);
    let zdanie = `Otwieram próbę na stopień ${stOtw}: ${pelnaOsoba}`;
    zdanie += opiekun ? ` (opiekun: ${opiekun}).` : '.';
    rozkazData[2].push(zdanie);

  } else if (typ === 'zamkniecieProby') {
    const stAkt = document.getElementById('zamkniecieStopienAktualny').value;
    const os = document.getElementById('zamkniecieOsoba').value.trim();
    const stZam = document.getElementById('zamkniecieStopienZamykany').value;
    const wynik = document.getElementById('zamkniecieWynik').value;

    if (!os) return alert('Wpisz imię i nazwisko.');

    const pelnaOsoba = laczStopienIOsobe(stAkt, os);
    let zdanie = '';
    if (wynik === 'pozytywny') {
      zdanie = `Zamykam próbę i przyznaję stopień ${stZam}: ${pelnaOsoba}.`;
    } else {
      zdanie = `Zamykam i przerywam próbę na stopień ${stZam}: ${pelnaOsoba}.`;
    }
    rozkazData[5].push(zdanie);

  } else if (typ === 'inny') {
    const kat = document.getElementById('innyKategoria').value;
    const tresc = document.getElementById('innyTresc').value.trim();
    if (!tresc) return alert('Wpisz treść.');

    rozkazData[kat].push(tresc);
    document.getElementById('innyTresc').value = '';
  }

  document.querySelectorAll('#mianowanieOsoba, #zwolnienieOsoba, #otwarcieOsoba, #zamkniecieOsoba').forEach(i => i.value = '');

  odswiezListewpisow();
  aktualizujPodglad();
}

function usunWpis(kat, index) {
  rozkazData[kat].splice(index, 1);
  odswiezListewpisow();
  aktualizujPodglad();
}

function odswiezListewpisow() {
  const listaEl = document.getElementById('listaWpisow');
  listaEl.innerHTML = '';
  let czyPuste = true;

  for (let i = 1; i <= 7; i++) {
    rozkazData[i].forEach((wpis, idx) => {
      czyPuste = false;
      const item = document.createElement('div');
      item.className = 'entry-item';
      item.innerHTML = `
        <span><b>${i}.${idx + 1}</b> ${wpis}</span>
        <button class="btn-remove" onclick="usunWpis(${i}, ${idx})">Usuń</button>
      `;
      listaEl.appendChild(item);
    });
  }

  if (czyPuste) {
    listaEl.innerHTML = '<span>Brak dodanych punktów.</span>';
  }
}

function aktualizujPodglad() {
  const jednostkaNadrzedna = document.getElementById('jednostkaNadrzedna').value;
  const jednostka = document.getElementById('jednostka').value;
  const data = document.getElementById('data').value;
  const nrRozkazu = document.getElementById('nrRozkazu').value;
  const podpis = document.getElementById('podpis').value;

  let trescRozkazuHTML = '';

  for (let i = 1; i <= 7; i++) {
    trescRozkazuHTML += `<div><b>${nazwyKategorii[i]}</b></div>`;
    
    if (rozkazData[i].length > 0) {
      rozkazData[i].forEach((wpis, idx) => {
        trescRozkazuHTML += `<div style="padding-left: 20px;">${i}.${idx + 1}. ${wpis}</div>`;
      });
    } else {
      trescRozkazuHTML += `<div style="padding-left: 20px;">---</div>`;
    }
    trescRozkazuHTML += `<br>`;
  }

  trescRozkazuHTML += `
<div><b>${nazwyKategorii[8]}</b></div>
<div style="padding-left: 20px;">8.1. Nie wpłynęły.</div>
  `;

  document.getElementById('podglad').innerHTML = `
<div style="text-align: right;">${data}</div>
<div><b>ZWIĄZEK HARCERSTWA POLSKIEGO</b></div>
${jednostkaNadrzedna ? `<div>${jednostkaNadrzedna}</div>` : ''}
<div>${jednostka}</div>

<h2 style="text-align: center; margin: 25px 0 25px 0;">ROZKAZ ${nrRozkazu}</h2>

${trescRozkazuHTML}

<br><br>
<div style="text-align: right;">
Czuwaj!<br><br>
${podpis}
</div>
  `;
}

function zapiszDoPliku() {
  const stan = {
    jednostkaNadrzedna: document.getElementById('jednostkaNadrzedna').value,
    jednostka: document.getElementById('jednostka').value,
    data: document.getElementById('data').value,
    nrRozkazu: document.getElementById('nrRozkazu').value,
    podpis: document.getElementById('podpis').value,
    rozkazData: rozkazData
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stan, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `rozkaz_${document.getElementById('nrRozkazu').value || 'szkic'}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function wczytajZPliku(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const stan = JSON.parse(e.target.result);
      
      if (stan.jednostkaNadrzedna !== undefined) document.getElementById('jednostkaNadrzedna').value = stan.jednostkaNadrzedna;
      if (stan.jednostka !== undefined) document.getElementById('jednostka').value = stan.jednostka;
      if (stan.data !== undefined) document.getElementById('data').value = stan.data;
      if (stan.nrRozkazu !== undefined) document.getElementById('nrRozkazu').value = stan.nrRozkazu;
      if (stan.podpis !== undefined) document.getElementById('podpis').value = stan.podpis;
      if (stan.rozkazData !== undefined) rozkazData = stan.rozkazData;

      odswiezListewpisow();
      aktualizujPodglad();
      alert('Stan rozkazu został pomyślnie wczytany.');
    } catch (err) {
      alert('Błąd podczas odczytu pliku JSON.');
      console.error(err);
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

document.querySelectorAll('#jednostkaNadrzedna, #jednostka, #data, #nrRozkazu, #podpis').forEach(el => {
  el.addEventListener('input', aktualizujPodglad);
});

inicjalizujSelecty();
odswiezListewpisow();
aktualizujPodglad();