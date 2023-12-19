// index.js

const express = require('express');
const app = express();
const port = 3000;

const patientsDatabase = [
    
        {
        "id": 1,
        "name": "Yaşar Yaşamaz",
        "yas": 32,
        "cinsiyet": "Erkek",
        "sikayet": "Şiddetli karın ağrısı",
        "correctDiagnosis": "Akut Apandisit",
        "paramedik": "Ahmet Yılmaz, 32 yaşında erkek hasta, acile şiddetli karın ağrısı ile başvurdu. Bilinci açık olup, önceki sağlık geçmişi ve ilaç kullanımı hakkında bilgi alınamadı. Vital bulguları incelendiğinde, kan basıncı 130/85 mmHg, kalp atış hızı 110 bpm, solunum hızı 20 nefes/dakika, vücut sıcaklığı 38.0°C ve oksijen saturasyonu ise 98% olarak ölçüldü. Hastanın solunum, dolaşım ve diğer vital bulguları şu anda stabil.",
        "ipucu": "Hasta, şiddetli karın ağrısı şikayeti ile başvurdu. Fizik muayene ve tetkikler, akut apandisit şüphesini doğruladı. Acil cerrahi müdahale gerekiyor. Hasta IV sıvı replasman ve antibiyotik tedavisi alacak, acil apandektomi planlandı.",
        "vitals": {
            "nabız": 110,
            "sistolik": 130,
            "diastolik": 85,
            "solunum": 20,
            "ates": 38.0,
            "sat": 98,
            "ekg": "sinus"
        },
        "goruntuleme": {
            "emergencyBrainCT": "Acil durumda beyin taraması yapıldı. Herhangi bir acil duruma işaret eden bulgular tespit edilmedi.",
            "chestXRay": "Akciğerlerin durumunu değerlendirmek amacıyla acil röntgen çekildi. Normal sonuçlar elde edildi.",
            "abdominalCT": "Karın bölgesinin acil BT taraması yapıldı. Acil bir duruma işaret eden bulgular saptanmadı.",
            "traumaUS": "Travma sonucu oluşan iç yaralanmaları değerlendirmek amacıyla ultrasonografi (USG) yapıldı.",
            "emergencyMR": "Acil durumda manyetik rezonans (MR) görüntüleme yapıldı. Anormallik tespit edilmedi.",
            "thoracicCTAngiography": "Göğüs bölgesindeki damarları değerlendirmek amacıyla acil BT anjiyografi yapıldı. Anormallik tespit edilmedi.",
            "emergencyBreastUS": "Acil durumda meme ultrasonografi (USG) taraması gerçekleştirildi. Anormallik tespit edilmedi.",
            "pelvicCT": "Pelvik bölgenin acil BT taraması yapıldı. Acil bir duruma işaret eden bulgular saptanmadı.",
            "traumaCranialCT": "Kafa travması sonucu oluşan potansiyel beyin hasarını değerlendirmek amacıyla acil kranial BT taraması yapıldı.",
            "emergencySpinalCordMRI": "Acil durumda spinal kord hasarını değerlendirmek amacıyla manyetik rezonans (MR) görüntüleme yapıldı.",
            "abdominalAngiography": "Beyin kan damarlarındaki anormallikleri değerlendirmek amacıyla acil abdominal anjiyografi yapıldı."
        },
        "testResults": {
            "Tam Kan Sayımı": [
                { "parametre": "WBC", "sonuc": 12 },
                { "parametre": "HGB", "sonuc": 12 },
                { "parametre": "PLT", "sonuc": 150 },
                { "parametre": "RBC", "sonuc": 4.5 },
                { "parametre": "HTC", "sonuc": 42 }
            ],
            "KCFT": [
                { "parametre": "ALT", "sonuc": 45 },
                { "parametre": "AST", "sonuc": 40 },
                { "parametre": "GGT", "sonuc": 30 },
                { "parametre": "T/D", "sonuc": "1,5/1,2" }
            ],
            "BFT": [
                { "parametre": "creatinine", "sonuc": 0.8 },
                { "parametre": "bloodUreaNitrogen", "sonuc": 15 },
                { "parametre": "uricAcid", "sonuc": 4.5 }
            ],
            "Elektrolitler": [
                { "parametre": "sodium", "sonuc": 140 },
                { "parametre": "potassium", "sonuc": 4.2 },
                { "parametre": "calcium", "sonuc": 9.0 },
                { "parametre": "magnesium", "sonuc": 2.0 },
                { "parametre": "phosphorus", "sonuc": 3.5 }
            ],
            "Lipit Paneli": [
                { "parametre": "totalCholesterol", "sonuc": 180 },
                { "parametre": "hdlCholesterol", "sonuc": 45 },
                { "parametre": "ldlCholesterol", "sonuc": 120 },
                { "parametre": "triglycerides", "sonuc": 80 }
            ],
            "Biyokimya": [
                { "parametre": "Glukoz", "sonuc": 120 },
                { "parametre": "totalProtein", "sonuc": 7.0 },
                { "parametre": "albumin", "sonuc": 4.0 },
                { "parametre": "globulin", "sonuc": 3.0 }
            ],
            "Koagülasyon": [
                { "parametre": "PT", "sonuc": 14 },
                { "parametre": "INR", "sonuc": 1.2 }
            ],
            "Kardiyak Enzimler": [
                { "parametre": "troponin", "sonuc": 0.05 },
                { "parametre": "CK-MB", "sonuc": 80 }
            ],
            "Kan Gazı": [
                { "parametre": "pH", "sonuc": 7.4 },
                { "parametre": "pCO2", "sonuc": 40 },
                { "parametre": "pO2", "sonuc": 95 },
                { "parametre": "bicarbonate", "sonuc": 24 }
            ]
        },
        "examinationResults": {
            "Karın Muayenesi": [
                { "parametre": "FM yapıldı", "sonuc": "Geniş çaplı hassasiyet, defans+rebound mevcut. Karnı sağ alt bölgesine hafif basınç uygulanmasının ardından ağrıda artış gözlendi" }
            ]
        },
        "treatments": {
            // Tedavi detayları
        },
    },
        {
        "id": 2,
        "name": "Zeynep Yılmaz",
        "yas": 28,
        "cinsiyet": "Kadın",
        "sikayet": "Baş ağrısı ve bulantı",
        "correctDiagnosis": "Migren",
        "paramedik": "Zeynep Yılmaz, 28 yaşında kadın, baş ağrısı ve bulantı şikayeti ile geldi. Hastanın solunum, dolaşım ve diğer vital bulguları şu anda stabil.",
        "ipucu": "Hasta migren atağı geçiriyor. Ağrı kontrolü ve dinlenme önerilir. Gerekirse migren ilaçları verilebilir.",
        "vitals": {
            "nabız": 90,
            "sistolik": 120,
            "diastolik": 80,
            "solunum": 18,
            "ates": 37.5,
            "sat": 99,
            "ekg": "af"
        },
        "testResults": {
            "Tam Kan Sayımı": [
                { "parametre": "WBC", "sonuc": 8 },
                { "parametre": "HGB", "sonuc": 14 },
                { "parametre": "PLT", "sonuc": 200 },
                { "parametre": "RBC", "sonuc": 5.2 },
                { "parametre": "HTC", "sonuc": 40 }
            ],
            "KCFT": [
                { "parametre": "ALT", "sonuc": 30 },
                { "parametre": "AST", "sonuc": 25 },
                { "parametre": "GGT", "sonuc": 20 },
                { "parametre": "T/D", "sonuc": "1.2/1.0" }
            ],
            "BFT": [
                { "parametre": "Kreatin", "sonuc": 0.9 },
                { "parametre": "BUN", "sonuc": 18 },
            ],
            "Elektrolitler": [
                { "parametre": "Sodyum", "sonuc": 138 },
                { "parametre": "Potasyum", "sonuc": 4.0 },
                { "parametre": "Kalsiyum", "sonuc": 9.2 },
            ],
            "Lipit Paneli": [
                { "parametre": "Total Kolesterol", "sonuc": 190 },
                { "parametre": "HDL", "sonuc": 50 },
                { "parametre": "LDL", "sonuc": 130 },
                { "parametre": "Trigliserit", "sonuc": 85 }
            ],
            "Biyokimya": [
                { "parametre": "Glukoz", "sonuc": 110 },
                { "parametre": "totalProtein", "sonuc": 7.5 },
                { "parametre": "Albumin", "sonuc": 4.2 },
            ],
            "Koagülasyon": [
                { "parametre": "PT", "sonuc": 13 },
                { "parametre": "INR", "sonuc": 1.1 }
            ],
            "Kardiyak Enzimler": [
                { "parametre": "Troponin", "sonuc": 0.03 },
                { "parametre": "CK-MB", "sonuc": 65 }
            ],
            "Kan Gazı": [
                { "parametre": "pH", "sonuc": 7.38 },
                { "parametre": "pCO2", "sonuc": 42 },
                { "parametre": "pO2", "sonuc": 98 },
                { "parametre": "HCO3", "sonuc": 26 }
            ]
        },
        "goruntuleme": {},
        "examinationResults": {
            "Baş Muayenesi": [
                { "parametre": "FM yapıldı", "sonuc": "Ağrılı nokta: alın ve şakak bölgesi. Göz muayenesinde anormallik yok." }
            ],
            "Nörolojik Muayene": [
                { "parametre": "FM yapıldı", "sonuc": "Nörolojik muayene doğal, laterazan bulgu saptanmadı, gks 15 " },
            ]
        },
        "treatments": {
            "Acil Müdahale": "Ağrı kontrolü için analjezik verildi. Dinlenmesi önerildi."
        }
    }
    // Diğer hastalar buraya eklenir
]



/*
const emergencyPatientsDatabase = [
    {
        "id": 1,
        "name": "Hüseyin Demir",
        "birthDate": "1980-03-10",
        "emergencyReason": "Şiddetli göğüs ağrısı ve nefes darlığı",
        "triageLevel": "Kırmızı",
        "admissionDate": "2023-06-15T09:30:00",
        "medicalHistory": {
            "chronicConditions": ["Hipertansiyon", "Diyabet"],
            "allergies": ["Aspirin"],
            "medications": ["Hipertansiyon ilacı", "Insulin"]
        },
        "personalHistory": {
            "smoking": "Evet",
            "alcoholConsumption": "Hayır",
            "exerciseFrequency": "Haftada 2 kez"
        },
        "familyHistory": {
            "heartDisease": "Evet",
            "diabetes": "Hayır",
            "cancer": "Hayır"
        },
        "vitalSigns": {
            "heartRate": 110,
            "bloodPressure": "160/90",
            "respiratoryRate": 22,
            "temperature": 38.5
        },
        "emergencyTests": {
            "ekg": "Normal",
            "chestXRay": "Akciğer enfeksiyonu belirtileri",
            "bloodGasAnalysis": {
                "oxygenSaturation": 90,
                "phLevel": 7.35
            }
        },
        "treatments": {
            "medications": ["Nitrogliserin", "Antibiyotik"],
            "procedures": ["Oksijen Tedavisi"]
        },
        "doctorNotes": "Hasta yüksek tansiyon ve diyabet hastasıdır. Akciğer enfeksiyonu belirtileri göstermektedir. Acil tedavi ve gözlem gereklidir."
    },
    // Diğer acil hastalar buraya eklenir
]
*/
/*
const acilTanilar = {
    "acilDurumlar": [
        {
            "id": 1,
            "name": "Myocardial Infarction",
            "description": "Severe chest pain, shortness of breath, nausea, sweating",
            "management": "Administer aspirin, nitroglycerin, oxygen therapy, monitor ECG"
        },
        {
            "id": 2,
            "name": "Akut Apandisit",
            "description": "Sharp pain in the lower right abdomen, nausea, vomiting, fever",
            "management": "Surgical intervention (appendectomy)"
        },
        {
            "id": 3,
            "name": "İnme (Stroke)",
            "description": "Sudden numbness, confusion, trouble speaking, severe headache",
            "management": "Quick assessment, thrombolytic therapy if ischemic stroke"
        },
        {
            "id": 4,
            "name": "Astım Krizi",
            "description": "Wheezing, shortness of breath, chest tightness",
            "management": "Administer bronchodilators, steroids, oxygen therapy"
        },
        {
            "id": 5,
            "name": "Üst Solunum Yolu Enfeksiyonları",
            "description": "Cough, congestion, sore throat, fever",
            "management": "Symptomatic treatment, antibiotics if bacterial infection"
        },
        {
            "id": 6,
            "isim": "Hipoglisemi (Düşük Kan Şekeri)",
            "tanım": "Titreme, terleme, kafa karışıklığı, irritasyon",
            "yönetim": "Glukoz ver, kan şekerini takip et"
        },
        {
            "id": 7,
            "isim": "Pnömotoraks",
            "tanım": "Ani göğüs ağrısı, nefes darlığı, azalmış solunum sesleri",
            "yönetim": "Göğüs tüpü takılması, oksijen tedavisi"
        },
        {
            "id": 8,
            "isim": "Anafilaksi",
            "tanım": "Ürtiker, şişme, nefes almada zorluk, düşük kan basıncı",
            "yönetim": "Epinefrin, antihistaminler ve destekleyici bakım uygula"
        },
        {
            "id": 9,
            "isim": "Karbonmonoksit Zehirlenmesi",
            "tanım": "Baş ağrısı, baş dönmesi, mide bulantısı, kafa karışıklığı",
            "yönetim": "Yüksek akışlı oksijen ver, destekleyici bakım uygula"
        },
        {
            "id": 10,
            "isim": "Akut Glaukom",
            "tanım": "Şiddetli göz ağrısı, bulanık görme, baş ağrısı, mide bulantısı",
            "yönetim": "İlaç ver, cerrahi müdahale için yönlendir"
        },
        {
            "id": 11,
            "isim": "Kafa Travması",
            "tanım": "Bilinç kaybı, kafa karışıklığı, şiddetli baş ağrısı",
            "yönetim": "BT taraması, gerekirse nörocerrahi konsültasyon"
        },
        {
            "id": 12,
            "isim": "Dermatit",
            "tanım": "Kızarık, kaşıntılı döküntü, şişlik, kabarcıklar",
            "yönetim": "Topikal kortikosteroidler, antihistaminler"
        },
        {
            "id": 13,
            "isim": "Akut İdrar Retansiyonu",
            "tanım": "İdrar yapamama, alt karın ağrısı",
            "yönetim": "Kateterizasyon, temel sebebi tedavi et"
        },
        {
            "id": 14,
            "isim": "İntihar Girişimi",
            "tanım": "Kendi kendine zarar verme, aşırı doz, intihar düşünceleri",
            "yönetim": "Psikiyatrik değerlendirme, kriz müdahalesi"
        },
        {
            "id": 15,
            "isim": "Kanama Bozuklukları",
            "tanım": "Aşırı kanama, kolay morarma",
            "yönetim": "Kan transfüzyonu, pıhtılaşma çalışmaları, temel sebebi tedavi et"
        },
        {
            "id": 16,
            "isim": "Alerjik Rinit",
            "tanım": "Burun akıntısı, hapşırma, kaşıntılı gözler, burun tıkanıklığı",
            "yönetim": "Antihistaminler, nazal kortikosteroidler"
        },
        {
            "id": 17,
            "isim": "Anemi Krizi",
            "tanım": "Halsizlik, güçsüzlük, soluk cilt, nefes darlığı",
            "yönetim": "Kan transfüzyonu, temel sebebi tedavi et"
        },
        {
            "id": 18,
            "isim": "Hipertansif Kriz",
            "tanım": "Şiddetli baş ağrısı, göğüs ağrısı, bulanık görme",
            "yönetim": "Antihypertansif ilaçları uygula"
        },
        {
            "id": 19,
            "isim": "Akut Romatizmal Ateş",
            "tanım": "Ateş, eklem ağrısı, döküntü, göğüs ağrısı",
            "yönetim": "Antibiyotikler, anti-enflamatuar ilaçlar"
        },
        {
            "id": 20,
            "isim": "Temporal Arterit",
            "tanım": "Şiddetli baş ağrısı, çene ağrısı, görme sorunları",
            "yönetim": "Yüksek doz kortikosteroidler, ileri değerlendirme için yönlendir"
        }
        // Diğer acil durumlar buraya eklenir
    ]
}

*/


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
        const defaultResult = normalMuayeneSonuclari[examinationName];

        if (defaultResult) {
            res.json(defaultResult);
        } else {
            res.status(404).json({ error: 'Sonuç bulunamadı.' });
        }
    }
});


app.get('/getVitalResult/:patientId/:vitalName', (req, res) => {
    const patientId = parseInt(req.params.patientId);
    const vitalName = req.params.examinationName;
    const result = findVitalResult(patientId, vitalName);

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

app.get('/getCorrectDiagnosis/:patientId', (req, res) => {
    const patientId = parseInt(req.params.patientId);
    const patient = findPatientById(patientId);

    if (patient) {
        res.json({ correctDiagnosis: patient.correctDiagnosis });
    } else {
        res.status(404).json({ error: 'Hasta bulunamadı.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


function findPatientById(patientId) {
    const patient = patientsDatabase.find(patient => patient.id === patientId);
    if (patient) {
        return patient;
    } else {
        return null; // veya başka bir değer döndürebilirsiniz
    }
}

function findTestResult(patientId, testName) {
    const patient = findPatientById(patientId);
    return patient ? patient.testResults[testName] || null : null;
}

function findExaminationResult(patientId, testName) {
    const patient = findPatientById(patientId);
    return patient ? patient.examinationResults[testName] || null : null;
}

function findVitalResult(patientId, vitalName) {
    const patient = findPatientById(patientId);
    return patient ? patient.vitals[vitalName] || null : null;
}



