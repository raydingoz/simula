const testResultTable = document.getElementById("testResultTable");
const examinationResultTable = document.getElementById("examinationResultTable");

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
            displayPatientInfo(patient);
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

    if (patient) {
        patientIdInput.value = patient.id;
        getPatientInfo();
    } else {
        patientDetails.innerHTML = "Hasta bulunamadı.";
    }
}

function findTestResult(patientId, testName) {
    const patient = findPatientById(patientId);
    return patient ? patient.testResults[testName] || null : null;
}

function getPatientInfo() {
    const patientId = document.getElementById("patientId").value;
    const patientDetails = document.getElementById("patientDetails");
    resetTestOptions();

    fetch(`/getPatientInfo/${patientId}`)
        .then(response => response.json())
        .then(patient => displayPatientDetails(patient))
        .catch(error => console.error('Error:', error));
}

function displayPatientDetails(patient) {
    const patientDetails = document.getElementById("patientDetails");

    resetTestOptions();
    if (patient) {
        patientDetails.innerHTML = `
            <p><strong>Adı Soyadı:</strong> ${patient.name}</p>
            <p><strong>Yaş:</strong> ${patient.yas}</p>
        `;
    } else {
        patientDetails.innerHTML = "Hasta bulunamadı.";
    }
}

let selectedTests = [];
let testNames = ["Tam Kan Sayımı", "Biyokimya", /* Diğer test adı seçeneklerini buraya ekleyebilirsiniz */];

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

    fetch(`/getTestResult/${patientId}/${selectedTestName}`)
        .then(response => response.json())
        .then(result => {
            // Daha önce seçilen testleri güncelle
            selectedTests.push(selectedTestName);
            updateTestNameSelect(testNames);
            appendToResultTable(result, testResultTable, selectedTestName);
        })
        .catch(error => console.error('Error:', error));

    var secenek = document.querySelector('.laboratuar');
    secenek.classList.remove('show');
}

function appendToResultTable(result, table, testName) {
    // Başlık ekle
    const headerRow = table.insertRow(table.rows.length);
    const headerCell = headerRow.insertCell();
    headerCell.colSpan = 2; // İki sütunu kaplaması için
    headerCell.textContent = testName;

    // Sonuçları ekleyin
    const newRow = table.insertRow(table.rows.length);

    for (const data of result) {
        const newCell = newRow.insertCell();
        newCell.textContent = `${data.parametre}: ${data.sonuc}`;
    }
}

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

// Diğer kodlar...

// Timer'ı güncelleme fonksiyonu
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
}

function openFinishModal() {
    const finishModal = document.getElementById("finishModal");
    const diagnosisSelect = document.getElementById("diagnosisSelect");

    // Tanıları dropdown listesine ekle (önceki içeriği temizle)
    diagnosisSelect.innerHTML = "";
    const diagnoses = ["Tanı 1", "Tanı 2", "Tanı 3"]; // Örnek tanılar, gerçek verileri ekleyin
    diagnoses.forEach(diagnosis => {
        const option = document.createElement("option");
        option.value = diagnosis;
        option.text = diagnosis;
        diagnosisSelect.add(option);
    });

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
    selectedTests = [];
    updateTestNameSelect(testNames);
}

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


getRandomPatient();
