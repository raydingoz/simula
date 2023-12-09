// index.js

const express = require('express');
const app = express();
const port = 3000;

const patientsDatabase = [
    {
        "id": 1,
        "name": "Ahmet Yılmaz",
        "birthDate": "1990-05-15",
        "testResults": {
            "tamKanSayimi": [
                { "parametre": "RBC", "sonuc": "5" },
                { "parametre": "HGB", "sonuc": "13" },
                { "parametre": "PLT", "sonuc": "140" }
            ],
            "biyokimya": [
                { "parametre": "Glukoz", "sonuc": "90" },
                { "parametre": "ALT", "sonuc": "25" },
                { "parametre": "AST", "sonuc": "30" }
            ]
        },
        "examinationResults": {
            "karinMuayenesi": [
                { "parametre": "Karaciğer", "sonuc": "Normal" },
                { "parametre": "Dalak", "sonuc": "Normal" }
            ],
            "nörolojikMuayene": [
                { "parametre": "Refleks", "sonuc": "Normal" },
                { "parametre": "Bilinç", "sonuc": "Normal" }
            ]
        }
    },
    {
        "id": 2,
        "name": "Ayşe Demir",
        "birthDate": "1985-12-28",
        "testResults": {
            "tamKanSayimi": [
                { "parametre": "RBC", "sonuc": "4.8" },
                { "parametre": "HGB", "sonuc": "12.5" },
                { "parametre": "PLT", "sonuc": "150" }
            ],
            "biyokimya": [
                { "parametre": "Glukoz", "sonuc": "95" },
                { "parametre": "ALT", "sonuc": "30" },
                { "parametre": "AST", "sonuc": "35" }
            ]
        },
        "examinationResults": {
            "karinMuayenesi": [
                { "parametre": "Karaciğer", "sonuc": "Normal" },
                { "parametre": "Dalak", "sonuc": "Hafif büyümüş" }
            ],
            "nörolojikMuayene": [
                { "parametre": "Refleks", "sonuc": "Normal" },
                { "parametre": "Bilinç", "sonuc": "Normal" }
            ]
        }
    }
    // Diğer hastalar buraya eklenir
]



app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/getRandomPatient', (req, res) => {
    const randomIndex = Math.floor(Math.random() * patientsDatabase.length);
    const randomPatient = patientsDatabase[randomIndex];

    if (randomPatient) {
        res.json(randomPatient);
    } else {
        res.json({ error: 'Hasta bulunamadı.' });
    }
});

app.get('/getPatientInfo/:patientId', (req, res) => {
    const patientId = parseInt(req.params.patientId);
    const patient = findPatientById(patientId);

    if (patient) {
        res.json(patient);
    } else {
        res.status(404).json({ error: 'Hasta bulunamadı.' });
    }
});

app.get('/getExaminationResult/:patientId/:examinationName', (req, res) => {
    const patientId = parseInt(req.params.patientId);
    const examinationName = req.params.examinationName;
    const result = findExaminationResult(patientId, examinationName);

    if (result !== null) {
        res.json(result);
    } else {
        res.status(404).json({ error: 'Sonuç bulunamadı.' });
    }
});

app.get('/getTestResult/:patientId/:testName', (req, res) => {
    const patientId = parseInt(req.params.patientId);
    const testName = req.params.testName;
    const result = findTestResult(patientId, testName);

    if (result !== null) {
        res.json(result);
    } else {
        res.status(404).json({ error: 'Sonuç bulunamadı.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

function findPatientById(patientId) {
    return patientsDatabase.find(patient => patient.id === patientId);
}

function findTestResult(patientId, testName) {
    const patient = findPatientById(patientId);
    return patient ? patient.testResults[testName] || null : null;
}

function findExaminationResult(patientId, testName) {
    const patient = findPatientById(patientId);
    return patient ? patient.examinationResults[testName] || null : null;
}
