// public/app.js

function getRandomPatient() {
    fetch('/getRandomPatient')
        .then(response => response.json())
        .then(patient => displayPatientInfo(patient))
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
}function findTestResult(patientId, testName) {
    const patient = findPatientById(patientId);
    return patient ? patient.testResults[testName] || null : null;
}

function getPatientInfo() {
    const patientId = document.getElementById("patientId").value;
    const patientDetails = document.getElementById("patientDetails");

    fetch(`/getPatientInfo/${patientId}`)
        .then(response => response.json())
        .then(patient => displayPatientDetails(patient))
        .catch(error => console.error('Error:', error));
}

function displayPatientDetails(patient) {
    const patientDetails = document.getElementById("patientDetails");

    if (patient) {
        patientDetails.innerHTML = `
            <p><strong>ID:</strong> ${patient.id}</p>
            <p><strong>Adı Soyadı:</strong> ${patient.name}</p>
            <p><strong>Doğum Tarihi:</strong> ${patient.birthDate}</p>
        `;
    } else {
        patientDetails.innerHTML = "Hasta bulunamadı.";
    }
}

function getTestResult() {
    const patientId = document.getElementById("patientId").value;
    const testNameSelect = document.getElementById("testNameSelect");
    const testResultTable = document.getElementById("testResultTable");

    const selectedTestName = testNameSelect.value;

    fetch(`/getTestResult/${patientId}/${selectedTestName}`)
        .then(response => response.json())
        .then(result => displayResultTable(result, testResultTable))
        .catch(error => console.error('Error:', error));
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
