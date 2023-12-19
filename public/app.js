const testResultTable = document.getElementById("testResultTable");
const examinationResultTable = document.getElementById("examinationResultTable");
let hasta;

let normalMuayeneSonuclari = {
    "Baş ve Boyun Muayenesi": [
        { "parametre": "FM yapıldı", "sonuc": "Baş ve boyun bölgesinde herhangi bir anormallik gözlenmedi." }
    ],
    "Göğüs Muayenesi": [
        { "parametre": "FM yapıldı", "sonuc": "Göğüs bölgesinde herhangi bir şekil bozukluğu veya kitle tespit edilmedi.Solunum sesleri normal." }
    ],
    "Karın Muayenesi": [
        { "parametre": "FM yapıldı", "sonuc": "Karın bölgesinde geniş çaplı hassasiyet gözlemlendi. Defans+rebound tespit edildi. Karın bölgesine hafif basınç uygulanmasının ardından ağrıda artış gözlendi." }
    ],
    "Kardiyovasküler Muayene": [
        { "parametre": "FM yapıldırı", "sonuc": "Kalp atışları düzenli ve ritmiktir, üfürm yok. Nabız normal hızda ve güçlüdür." }
    ],
    "Solunum Sistemi Muayenesi": [
        { "parametre": "FM yapıldı", "sonuc": "Solunum sistemi normal, ral ronküs yok, hihtsek." }
    ],
    "Genitoüriner Muayene": [
        { "parametre": "FM yapıldı", "sonuc": "Genital bölgede herhangi bir anormallik veya enfeksiyon belirtisi gözlenmedi." }
    ],
    "Müsküloskeletal Muayene": [
        { "parametre": "FM yapıldı", "sonuc": "Kas ve eklem hareketleri normal. Hiçbir ağrı, hassasiyet veya kısıtlama gözlenmedi." }
    ],
    "Dermatolojik Muayene": [
        { "parametre": "FM yapıldı", "sonuc": "Cilt normal renkte ve dokuda. Herhangi bir döküntü, leke veya yara yoktur." }
    ],
    "Nörolojik Muayene": [
        { "parametre": "FM yapıldı", "sonuc": "Sinir sistemi normal. Bilinç açık, refleksler normal ve motor beceriler sağlamdır." }
    ],
    "Göz Muayenesi": [
        { "parametre": "FM yapıldı", "sonuc": "Gözlerde herhangi bir kızarıklık, şişlik veya görme sorunu gözlenmedi." }
    ],
    "Kulak Burun Boğaz Muayenesi": [
        { "parametre": "FM yapıldı", "sonuc": "Kulaklar temiz, burun normal ve boğazda herhangi bir kızarıklık, şişlik veya akıntı yoktur." }
    ],
    /* İhtiyacınıza göre ek muayene adlarını ve örnek sonuçları buraya ekleyin */
};

document.querySelectorAll('.butonlar button').forEach(function (button) {
    button.addEventListener('click', function () {
        toggleSecenek(this.getAttribute('data-secenek'));
    });
});

function getRandomPatient() {
    // Daha önce başlatılmış bir timer varsa durdur
    stopTimer();
    resetTimer();

    fetch('/getRandomPatient')
        .then(response => response.json())
        .then(patient => {
            hasta = patient;
            displayPatientInfo(hasta);
            // Yeni hasta geldiğinde timer'ı başlat
            startTimer();
        })
        .catch(error => console.error('Error:', error));
}

function findPatientById(patientId) {
    return patientsDatabase.find(patient => patient.id === patientId);
}

function displayPatientInfo(patient) {
    const patientIdInput = document.getElementById("patientId");
    const patientDetails = document.getElementById("patientDetails");
    const testResultTable = document.getElementById("testResultTable");
    const examinationResultTable = document.getElementById("examinationResultTable");

    // Eski hastanın verilerini temizle
    patientDetails.innerHTML = "";
    testResultTable.innerHTML = "";
    examinationResultTable.innerHTML = "";

    monitor("stop",0,0,0,0);

    if (patient) {
        patientIdInput.value = patient.id;
        getPatientInfo();
    } else {
        patientDetails.innerHTML = "Hasta bulunamadı.";
    }
}

function findTestResult(patientId, testName) {
    return patient ? hasta.testResults[testName] || null : null;
}

function getPatientInfo() {
    resetTestOptions();
    displayPatientDetails(hasta);
}

function displayPatientDetails(patient) {
    const patientDetails = document.getElementById("patientDetails");

    if (patient) {
        patientDetails.innerHTML = `
            <p><strong>Adı Soyadı: </strong>${patient.name}</p>
            <p><strong>Yaş: </strong>${patient.yas}</p>
            <p><strong>Şikayet: </strong>${patient.sikayet}</p>
            <br>
            <p><strong>112: </strong>${patient.paramedik}</p>
        `;
    } else {
        patientDetails.innerHTML = "Hasta bulunamadı.";
    }
}
let selectedAnamnez = [];
let anamnezNames = [
    "Hastalık Başlangıcı",
    "Şu Anki Şikayetleriniz",
    "Alerji",
    "İlaçlar",
    "Özgeçmiş",
    "Görmeyi sorgula",
    "Kardiyak sorgula",
    "Solunum sistemini sorgula",
    "Sindirim sistemini sorgula",
    "Üriner sistemi sorgula",
    "Nörolojik sistemi sorgula",
    "Hematolojik sorgula",
    "Endokrin sorgula",
    "Döküntü sorgula",
    "İskelet sistemini sorgula"
    /* İhtiyacınıza göre ek anamnez adlarını buraya ekleyin */
];
let anamnezNormalCevaplar = {
    "Hastalık Başlangıcı": "Hastalığımın başlangıcı ile ilgili özel bir tarih veya olay hatırlamıyorum.",
    "Şu Anki Şikayetleriniz": "Şu anda genellikle baş ağrısı ve halsizlik şikayetlerim var.",
    "Alerji": "Genellikle polenlere karşı hafif bir alerjim var.",
    "İlaçlar": "Şu anda düzenli olarak tansiyon ilacı kullanıyorum.",
    "Özgeçmiş": "Daha önce geçirdiğim apandisit ameliyatı haricinde önemli bir rahatsızlığım olmadı.",
    "Görmeyi sorgula": "Gözlerimde herhangi bir sorun yok, net görüyorum.",
    "Kardiyak sorgula": "Göğüs ağrım yok, nefes darlığım yok, çarpıntım yok.",
    "Solunum sistemini sorgula": "Genellikle düzenli olarak nefes alıyorum, herhangi bir zorluk yaşamıyorum.",
    "Sindirim sistemini sorgula": "Sindirim sistemim genellikle sağlıklı, düzenli bir şekilde besleniyorum.",
    "Üriner sistemi sorgula": "Üriner sistemimde genellikle herhangi bir sorun yaşamıyorum.",
    "Nörolojik sistemi sorgula": "Sinir sistemim genellikle sağlıklı, baş ağrısı veya baş dönmesi yaşamıyorum.",
    "Hematolojik sorgula": "Kan değerlerim genellikle normal, herhangi bir anormallik yok.",
    "Endokrin sorgula": "Endokrin sistemim genellikle sağlıklı, şu anda herhangi bir hormon tedavisi almıyorum.",
    "Döküntü sorgula": "Şu anda herhangi bir cilt döküntüm yok, cildim genellikle sağlıklı.",
    "İskelet sistemini sorgula": "İskelet sistemimde genellikle herhangi bir problem yok, kemik sağlığım iyi."
    /* İhtiyacınıza göre ek anamnez adlarını ve örnek cevapları buraya ekleyin */
};

let selectedTests = [];
let testNames = [
    "Tam Kan Sayımı",
    "KCFT",
    "BFT",
    "Elektrolitler",
    "Lipit Paneli",
    "Biyokimya",
    "Koagülasyon",
    "Kardiyak Enzimler",
    "Kan Gazı",
    /* Add other test names here if needed */
];

let selectedMuayene = [];
let muayeneNames = [
    "Baş ve Boyun Muayenesi",
    "Göğüs Muayenesi",
    "Karın Muayenesi",
    "Kardiyovasküler Muayene",
    "Solunum Sistemi Muayenesi",
    "Genitoüriner Muayene",
    "Müsküloskeletal Muayene",
    "Dermatolojik Muayene",
    "Nörolojik Muayene",
    "Göz Muayenesi",
    "Kulak Burun Boğaz Muayenesi"
    /* İhtiyacınıza göre ek fiziksel muayene adlarını buraya ekleyin */
];


let selectedMudahale = [];
let MudahaleNames = [
    "Monitorize Et",
    "IV mayi başla",
    /* İhtiyacınıza göre ek fiziksel muayene adlarını buraya ekleyin */
];
// Burada secenekAdi'yi tanımlayın
var secenekAdi;

document.querySelectorAll('.butonlar button').forEach(function (button) {
    button.addEventListener('click', function () {
        secenekAdi = this.innerText.toLowerCase(); // veya başka bir özellikten isim alınabilir
        toggleSecenek(secenekAdi);
    });
});

var secenek = document.querySelector('.' + secenekAdi);

if (secenek) {
    // İlgili seçeneği göster
    secenek.classList.add('show');
} else {
    console.error('Secenek bulunamadı:', secenekAdi);
}

function mudahale() {
    const mudahaleSelect = document.getElementById("mudahaleSelect");
    const selectedMudahaleN = mudahaleSelect.value;

    // Seçilen test daha önce seçilmiş mi kontrol et
    if (selectedMudahale.includes(selectedMudahaleN)) {
        alert("Bu test daha önce seçildi.");
        return;
    }

    if (selectedMudahaleN == "Monitorize Et") {
        //ekg, nabiz, sat ,dta,sta
        monitor(hasta.vitals.ekg, hasta.vitals.nabız, hasta.vitals.sat, hasta.vitals.sistolik, hasta.vitals.diastolik,);
    }
    selectedMudahale.push(selectedMudahaleN);
    updateMudahaleNameSelect(MudahaleNames);


    var secenek = document.querySelector('.müdahale');
    var arkaPlan = document.querySelector('.arka-plan-koyu');
    secenek.classList.remove('show');
    arkaPlan.classList.remove('arka-plan-koyu-show');

}


function getTestResult() {
    const patientId = document.getElementById("patientId").value;
    const testNameSelect = document.getElementById("testNameSelect");
    const testResultTable = document.getElementById("testResultTable");

    const selectedTestName = testNameSelect.value;

    // Seçilen test daha önce seçilmiş mi kontrol et
    if (selectedTests.includes(selectedTestName)) {
        alert("Bu test daha önce seçildi.");
        return;
    }
    selectedTests.push(selectedTestName);
    updateTestNameSelect(testNames);
    appendToResultTable(hasta.testResults[selectedTestName], testResultTable, selectedTestName);



    var secenek = document.querySelector('.laboratuar');
    secenek.classList.remove('show');
    var arkaPlan = document.querySelector('.arka-plan-koyu');
    arkaPlan.classList.remove('arka-plan-koyu-show');
}

function appendToResultTable(result, table, testName) {
    // Başlık ekle
    const headerRow = table.insertRow(table.rows.length);
    const headerCell = headerRow.insertCell();
    headerCell.colSpan = 2; // İki sütunu kaplaması için
    headerCell.textContent = testName;
    headerCell.classList.add('HeaderCell');


    // Sonuçları ekleyin
    const newRow = table.insertRow(table.rows.length);

    for (const data of result) {
        const newCell = newRow.insertCell();
        newCell.textContent = `${data.parametre}: ${data.sonuc}`;
    }
}

/*
function getExaminationResult() {
    const patientId = document.getElementById("patientId").value;
    const examinationNameSelect = document.getElementById("examinationNameSelect");
    const examinationResultTable = document.getElementById("examinationResultTable");

    const selectedExaminationName = examinationNameSelect.value;

    fetch(`/getExaminationResult/${patientId}/${selectedExaminationName}`)
        .then(response => response.json())
        .then(result => displayResultTable(result, examinationResultTable))
        .catch(error => console.error('Error:', error));

    var secenek = document.querySelector('.muayene');
    secenek.classList.remove('show');
}
*/

function getExaminationResult() {
    const patientId = document.getElementById("patientId").value;
    const examinationNameSelect = document.getElementById("examinationNameSelect");
    const examinationResultTable = document.getElementById("examinationResultTable");

    const selectedExaminationName = examinationNameSelect.value;

    // Seçilen test daha önce seçilmiş mi kontrol et
    if (selectedMuayene.includes(selectedExaminationName)) {
        alert("Bu test daha önce seçildi.");
        return;
    }

    const result = hasta.examinationResults[selectedExaminationName];
    selectedMuayene.push(selectedExaminationName);
    updateMuayeneNameSelect(muayeneNames);
    console.log(result);

    if (result !== undefined) {
        appendToResultTable(result, examinationResultTable, selectedExaminationName);
    } else {
        const defaultResult = normalMuayeneSonuclari[selectedExaminationName];
        appendToResultTable(defaultResult, examinationResultTable, selectedExaminationName);


    }

    var secenek = document.querySelector('.muayene');
    var arkaPlan = document.querySelector('.arka-plan-koyu');
    secenek.classList.remove('show');
    arkaPlan.classList.remove('arka-plan-koyu-show');
}

function displayResultTable(result, tableElement) {
    if (result !== null) {
        const resultTable = generateResultTable(result);
        tableElement.innerHTML = resultTable;
    } else {
        tableElement.innerHTML = "Sonuç bulunamadı.";
    }
}

function generateResultTable(result) {
    if (!result || result.length === 0) {
        return "";
    }

    const tableRows = result.map(item => `<tr><td>${item.parametre}</td><td>${item.sonuc}</td></tr>`).join('');
    const resultTable = `<table><thead><tr><th>Parametre</th><th>Sonuç</th></tr></thead><tbody>${tableRows}</tbody></table>`;

    return resultTable;
}

// Timer için başlangıç zamanı

let hours = 0;
let minutes = 0;
let seconds = 0;

let timerInterval;

function startTimer() {
    // Eğer daha önce bir timer başlatılmışsa, mevcut timer'ı temizle
    stopTimer();

    // Timer başlatma kodu buraya gelecek
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    // Eğer bir timer varsa, temizle
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}

function resetTimer() {
    // Timer'ı sıfırla
    seconds = 0;
}

function updateTimer() {
    const timerElement = document.getElementById("timer");

    // Zamanı güncelle
    seconds++;

    // Saat, dakika ve saniye değerlerini hesapla
    hours = Math.floor(seconds / 3600);
    minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Saat, dakika ve saniyeyi ekrana yazdır
    timerElement.textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(remainingSeconds);
}

// Saat, dakika veya saniye 10'dan küçükse önüne 0 ekleyen yardımcı fonksiyon
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function finishCase() {
    // Timer'ı durdur
    stopTimer();

    // Kullanıcının seçtiği tanı
    const selectedDiagnosis = document.getElementById("diagnosisSelect").value;

    // Doğru tanıyı fetch ile sunucudan al
    const patientId = document.getElementById("patientId").value;

    fetch(`/getCorrectDiagnosis/${patientId}`)
        .then(response => response.json())
        .then(data => {
            const correctDiagnosis = data.correctDiagnosis;

            if (selectedDiagnosis === correctDiagnosis) {
                // Başarılı pop-up göster
                const elapsedTime = seconds;
                const resultPopup = document.createElement('div');
                resultPopup.id = 'finishPopup';
                resultPopup.innerHTML = `
                    <p>Tebrikler! Doğru tanıyı seçtiniz: ${selectedDiagnosis}</p>
                    <p>Toplam geçen süre: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(elapsedTime % 60)}</p>
                    <button onclick="closeFinishPopup()">Tamam</button>
                `;
                document.body.appendChild(resultPopup);
                resultPopup.style.display = 'block';

                // Yeni vaka için hazırlıkları yap
                stopTimer();
                resetTimer();
                closeFinishModal();
                getRandomPatient();

            } else {
                // Yanlış tanı uyarısı
                alert("Üzgünüm, yanlış tanı seçtiniz. Devam ediyoruz.");

                // Timer'ı sıfırla ve devam et
                resetTimer();
                startTimer();
                closeFinishModal();
            }
        })
        .catch(error => console.error('Error:', error));
}

function closeFinishPopup() {
    const finishPopup = document.getElementById('finishPopup');
    if (finishPopup) {
        finishPopup.style.display = 'none';
        document.body.removeChild(finishPopup);
    }

    const finishPop = document.getElementById("finishPopup");
    if (finishPop) {
        finishPop.innerHTML = "";
    }
}
/*
function openFinishModal() {
    const finishModal = document.getElementById("finishModal");
    const diagnosisSelect = document.getElementById("diagnosisSelect");

    // Tanıları dropdown listesine ekle (önceki içeriği temizle)
    diagnosisSelect.innerHTML = "";
    const diagnoses = ["Migren", "Akut Apandisit", "Akut Apandisit"]; // Örnek tanılar, gerçek verileri ekleyin
    diagnoses.forEach(diagnosis => {
        const option = document.createElement("option");
        option.value = diagnosis;
        option.text = diagnosis;
        diagnosisSelect.add(option);
    });
    // Modalı göster
    finishModal.style.display = "block";
}
*/

function openFinishModal() {
    const finishModal = document.getElementById("finishModal");

    // Tanıları dropdown listesine ekle (önceki içeriği temizle)
    /*
    const categories = {
        "Baş Ağrıları": ["Migren", "Gerilim Tipi Baş Ağrısı"],
        "Karın Ağrıları": ["Akut Apandisit", "Ülser", "Gastrit"],
        "Boğaz Problemleri": ["Akut Tonsilit", "Faranjit", "Larenjit"],
        // Diğer kategorileri ekleyin
    };
    */

    const categories = {
        "Nörolojik Sorunlar": [
            "Migren",
            "İnme (Felç)",
            "Epilepsi",
            "Beyin Tümörleri",
            "Meningit",
            "Travmatik Beyin Hasarı",
            "Guillain-Barré Sendromu",
            "Multiple Skleroz",
            "Beyin Kanaması",
            "Beyin Anevrizması",
            "Beyin Enfeksiyonları"
        ],
        "Kardiyovasküler Sorunlar": [
            "Akut Miyokard Enfarktüsü",
            "Aritmiler",
            "Aort Anevrizması",
            "Kalp Yetmezliği",
            "Hipertansiyon Krizi",
            "Perikardit",
            "Aort Koarktasyonu",
            "Akut Koroner Sendrom",
            "Pulmoner Emboli",
            "Aort Diseksiyonu"
        ],
        "Solunum Sorunları": [
            "Akut Solunum Sıkıntısı Sendromu (ARDS)",
            "Astım Atağı",
            "Pnömoni",
            "Pnömotoraks",
            "Obstrüktif Uyku Apnesi",
            "Akciğer Kanseri",
            "Pulmoner Hipertansiyon",
            "KOAH",
            "Akut Bronşit",
            "Pleural Efüzyon"
        ],
        "Gastroenterolojik Sorunlar": [
            "Akut Apandisit",
            "Ülser",
            "Gastroenterit",
            "Kolesistit",
            "Bağırsak Torsiyonu",
            "Pankreatit",
            "Divertikülit",
            "Ülseratif Kolit",
            "Crohn Hastalığı",
            "Gastroözofageal Reflü"
        ],
        "Endokrin ve Metabolik Sorunlar": [
            "Diyabet Ketoasidozu",
            "Tiroid Krizi",
            "Addison Krizi",
            "Cushing Sendromu",
            "Hipoglisemi",
            "Metabolik Asidoz",
            "Akromegali",
            "Feokromasitoma",
            "Hipertiroidizm",
            "Hipotiroidizm"
        ],
        "Ürolojik Sorunlar": [
            "Böbrek Taşı Krizi",
            "İdrar Yolu Enfeksiyonu",
            "Akut Glomerülonefrit",
            "Testis Torsiyonu",
            "Üriner Retansiyon",
            "Üretral Tıkanıklık",
            "BPH (Benign Prostat Hiperplazisi) Krizi",
            "Renal Kolik",
            "İmpotans Krizi",
            "Over Kist Rüptürü"
        ],
        "Travma ve Acil Cerrahi": [
            "Multiple Yaralanmalar",
            "Yüksekten Düşme",
            "Trafik Kazası",
            "Açık Kırıklar",
            "Bıçak Yarası",
            "Yanık",
            "Kompartman Sendromu",
        ],
        "Nefrolojik Sorunlar": [
            "Akut Böbrek Hasarı",
            "Glomerülonefrit",
            "Hemolitik Üremik Sendrom",
            "Böbrek Kisti Rüptürü",
            "Nefrotik Sendrom",
            "Renal Arter Tıkanıklığı",
            "Akut Tubüler Nekroz",
            "Böbrek Yetmezliği",
            "Renal Artery Diseksiyonu",
            "Hidronefroz"
        ],
        "Hematolojik ve Onkolojik Sorunlar": [
            "Kemik İliği Yetmezliği",
            "Trombositopeni",
            "Kanser İle İlgili Acil Durumlar",
            "Dissemine İntravasküler Koagülasyon (DIC)",
            "Akut Leukemi Krizi",
            "Lenfoma Krizi",
            "Akut Hemolitik Anemi",
            "Myeloproliferatif Bozukluklar",
            "Tromboembolizm",
            "Sepsis"
        ],
        "Psikiyatrik ve Nörolojik Krizler": [
            "Şiddetli Depresyon Krizi",
            "Akut Psikotik Atak",
            "Bipolar Bozukluk Krizi",
            "Panik Atak",
            "Şiddetli Anksiyete Bozukluğu Krizi",
            "Şizofreni Akut Alevlenme",
            "Benzodiazepin Entoksikasyonu",
            "Trisiklik Antidepresan Entoksikasyonu",
            "Alkol Entoksikasyonu",
            "Uyuşturucu Zehirlenmesi"
        ],
        // Dilerseniz daha fazla kategori ve tanı ekleyebilirsiniz.
    };

    // Kategorilere göre açılıp kapanma durumu
    const categoryState = {};

    // Sayfa yüklendiğinde kategorileri kapalı olarak başlat
    for (const category in categories) {
        categoryState[category] = false;
    }

    function toggleCategory(categoryName) {
        categoryState[categoryName] = !categoryState[categoryName];
        renderDiagnoses();
    }

    function renderDiagnoses() {
        const diagnosisSelect = document.getElementById("diagnosisSelect");
        diagnosisSelect.innerHTML = "";

        for (const category in categories) {
            const optgroup = document.createElement("optgroup");
            optgroup.label = category;

            if (categoryState[category]) {
                categories[category].forEach(diagnosis => {
                    const option = document.createElement("option");
                    option.value = diagnosis;
                    option.text = diagnosis;
                    optgroup.appendChild(option);
                });
            }

            diagnosisSelect.add(optgroup);
        }
    }

    // Kategoriye tıklanınca durumu değiştirmek için event listener ekle
    const diagnosisContainer = document.getElementById("diagnosisContainer");

    // "click" eventinin yanı sıra "touchstart" eventini de dinle
    diagnosisContainer.addEventListener("click", handleDiagnosisClick);

    function handleDiagnosisClick(event) {
        const clickedElement = event.target;

        // Eğer tıklanan element bir "optgroup" içeriyorsa
        if (clickedElement.tagName === "OPTGROUP") {
            const clickedCategory = clickedElement.label;
            if (clickedCategory) {
                toggleCategory(clickedCategory);
            }
        }
    }

    // Tanıları render et
    renderDiagnoses();

    // Modalı göster
    finishModal.style.display = "block";
}




// Modalı kapatan fonksiyon
function closeFinishModal() {
    const finishModal = document.getElementById("finishModal");
    finishModal.style.display = "none";
}

// Test adı seçim listesini güncelleyin
function updateTestNameSelect(testNames) {
    const testNameSelect = document.getElementById("testNameSelect");

    // Seçenekleri temizleyin
    testNameSelect.innerHTML = "";

    // Her bir test adını seçenek olarak ekleyin
    for (const testName of testNames) {
        const option = document.createElement("option");
        option.value = testName;
        option.textContent = testName;

        // Daha önce seçilmiş testse gri renkte ve işlevsiz hale getirin
        if (selectedTests.includes(testName)) {
            option.classList.add("test-option", "disabled-option");
            option.disabled = true;
        }

        testNameSelect.appendChild(option);
    }
}

// Test adı seçim listesini güncelleyin
function updateMuayeneNameSelect(muayeneNames) {
    const x = document.getElementById("examinationNameSelect");

    // Seçenekleri temizleyin
    x.innerHTML = "";

    // Her bir test adını seçenek olarak ekleyin
    for (const secenek of muayeneNames) {
        const option = document.createElement("option");
        option.value = secenek;
        option.textContent = secenek;

        // Daha önce seçilmiş testse gri renkte ve işlevsiz hale getirin
        if (selectedMuayene.includes(secenek)) {
            option.classList.add("test-option", "disabled-option");
            option.disabled = true;
        }

        x.appendChild(option);
    }
}

function updateMudahaleNameSelect(MudahaleNames) {
    const testNameSelect = document.getElementById("mudahaleSelect");

    // Seçenekleri temizleyin
    testNameSelect.innerHTML = "";

    // Her bir test adını seçenek olarak ekleyin
    for (const testName of MudahaleNames) {
        const option = document.createElement("option");
        option.value = testName;
        option.textContent = testName;

        // Daha önce seçilmiş testse gri renkte ve işlevsiz hale getirin
        if (selectedMuayene.includes(testName)) {
            option.classList.add("test-option", "disabled-option");
            option.disabled = true;
        }

        testNameSelect.appendChild(option);
    }
}

// getTestNames fonksiyonunu güncelleyin
function getTestNames() {
    fetch("/getTestNames")
        .then(response => response.json())
        .then(testNames => {
            updateTestNameSelect(testNames);
        })
        .catch(error => console.error('Error:', error));
}

function resetTestOptions() {
    selectedMudahale = [];
    selectedTests = [];
    selectedMuayene = [];
    updateTestNameSelect(testNames);
    updateMuayeneNameSelect(muayeneNames);
    updateMudahaleNameSelect(MudahaleNames);
}
/*
function toggleSecenek(secenekAdi) {
    // Tüm seçenekleri gizle

    var secenekler = document.querySelectorAll('.secenek');
    secenekler.forEach(function (secenek) {
        secenek.classList.remove('show');
    });

    // İlgili seçeneği göster
    var secenek = document.querySelector('.' + secenekAdi);

    if (secenek) {
        secenek.classList.add('show');



    } else {
        console.error('Secenek bulunamadı:', secenekAdi);
    }
}
*/
function toggleSecenek(secenekAdi) {
    // Tüm seçenekleri gizle
    var secenekler = document.querySelectorAll('.secenek');
    secenekler.forEach(function (secenek) {
        secenek.classList.remove('show');
    });

    // Arka plan koyulaştırmayı yönet
    var arkaPlan = document.querySelector('.arka-plan-koyu');

    if (!arkaPlan) {
        arkaPlan = document.createElement('div');
        arkaPlan.classList.add('arka-plan-koyu');
        document.body.appendChild(arkaPlan);
    }

    // İlgili seçeneği göster
    var secenek = document.querySelector('.' + secenekAdi);

    if (secenek) {
        secenek.classList.add('show');
        arkaPlan.classList.add('arka-plan-koyu-show');
    } else {
        console.error('Secenek bulunamadı:', secenekAdi);
        arkaPlan.classList.remove('arka-plan-koyu-show');
    }
}


getRandomPatient();

function findTestResult(patientId, testName) {
    const patient = hasta;
    return patient ? hasta.testResults[testName] || null : null;
}

function findExaminationResult(patientId, testName) {
    const patient = hasta;
    return patient ? hasta.examinationResults[testName] || null : null;
}

function findVitalResult(patientId, vitalName) {
    const patient = hasta;
    return patient ? patient.vitals[vitalName] || null : null;
}


var nabizInterval;
var satInterval;


function monitor(ekg, nabiz, sat, dta, sta) {
    ekgCiz(ekg);

    var nabizSpan = document.getElementById('nabizSpan');
    var taSpan = document.getElementById('taSpan');
    var satSpan = document.getElementById('satSpan');

    // Clear existing intervals if they exist
    if (nabizInterval) {
        clearInterval(nabizInterval);
    }

    if (satInterval) {
        clearInterval(satInterval);
    }

    if (dta > 0) {
        taSpan.textContent = dta + "/" + sta + " mmHg";
    } else {
        taSpan.textContent = "--/-- mmHg";
    }

    if (sat > 0) {
        satInterval = setInterval(function () {
            var newValue = ((Math.floor(Math.random() * 4) - 2) + sat);
            if (newValue > 100) {
                newValue = 100;
            }
            satSpan.textContent = newValue + "%";
        }, 2000);
    } else {
        satSpan.textContent = "--%";
    }

    nabizInterval = setInterval(myTimer, 1000);

    function myTimer() {
        if (nabiz > 0) {
            if (ekg == "sinus") {
                var yeniNabizDegeri = ((Math.floor(Math.random() * 4) - 2) + nabiz);
                nabizSpan.textContent = yeniNabizDegeri + ' bpm';
            } else if (hasta.vitals.ekg == "af") {
                var yeniNabizDegeri = ((Math.floor(Math.random() * 21) - 10) + nabiz);
                nabizSpan.textContent = yeniNabizDegeri + ' bpm';
            } else {
                var yeniNabizDegeri = ((Math.floor(Math.random() * 2) - 1) + nabiz);
                nabizSpan.textContent = yeniNabizDegeri + ' bpm';
            }
        } else {
            nabizSpan.textContent = "-- bpm";
            clearInterval(nabizInterval);
        }
    }
}