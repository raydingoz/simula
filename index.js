// index.js

const express = require('express');
const app = express();
const port = 3000;

const patientsDatabase = [
    {
        "id": 1,
        "name": "Ahmet Yılmaz",
        "yas": "35",
        "correctDiagnosis": "Tanı 1", 
        "testResults": {
            "Tam Kan Sayımı": [
                { "parametre": "RBC", "sonuc": 5 },
                { "parametre": "HGB", "sonuc": 13 },
                { "parametre": "PLT", "sonuc": 140 },
                { "parametre": "MCV", "sonuc": 100 }
            ],
            "Biyokimya": [
                { "parametre": "ALT", "sonuc": 25 },
                { "parametre": "AST", "sonuc": 30 },
                { "parametre": "GLukoz", "sonuc": 120 },
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
        "yas": "35",
        "correctDiagnosis": "Tanı 2", 
        "testResults": {
            "Tam Kan Sayımı": [
                { "parametre": "RBC", "sonuc": "4.8" },
                { "parametre": "HGB", "sonuc": "12.5" },
                { "parametre": "PLT", "sonuc": "150" }
            ],
            "Biyokimya": [
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
    },
  {
        "id": 3,
        "name": "Mehmet Kaya",
      "yas": "37",
      "correctDiagnosis": "Tanı 3", 
      "testResults": {
          "Tam Kan Sayımı": [
              { "parametre": "RBC", "sonuc": "4.5" },
              { "parametre": "HGB", "sonuc": "14" },
              { "parametre": "PLT", "sonuc": "130" }
          ],
          "Biyokimya": [
              { "parametre": "Glukoz", "sonuc": "85" },
              { "parametre": "ALT", "sonuc": "28" },
              { "parametre": "AST", "sonuc": "32" }
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
        "id": 4,
        "name": "Zeynep Öztürk",
        "yas": "28",
        "correctDiagnosis": "Tanı 1", 
        "testResults": {
            "Tam Kan Sayımı": [
                { "parametre": "RBC", "sonuc": "4.2" },
                { "parametre": "HGB", "sonuc": "11.8" },
                { "parametre": "PLT", "sonuc": "160" }
            ],
            "Biyokimya": [
                { "parametre": "Glukoz", "sonuc": "92" },
                { "parametre": "ALT", "sonuc": "22" },
                { "parametre": "AST", "sonuc": "28" }
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
        "id": 5,
        "name": "Fatma Tekin",
        "yas": "42",
        "correctDiagnosis": "Tanı 1", 
        "testResults": {
            "Tam Kan Sayımı": [
                { "parametre": "RBC", "sonuc": "4.3" },
                { "parametre": "HGB", "sonuc": "12" },
                { "parametre": "PLT", "sonuc": "145" }
            ],
            "Biyokimya": [
                { "parametre": "Glukoz", "sonuc": "88" },
                { "parametre": "ALT", "sonuc": "27" },
                { "parametre": "AST", "sonuc": "31" }
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
        "id": 6,
        "name": "Ahmet Can",
        "yas": "32",
        "correctDiagnosis": "Tanı 1", 
        "testResults": {
            "Tam Kan Sayımı": [
                { "parametre": "RBC", "sonuc": "4.9" },
                { "parametre": "HGB", "sonuc": "13.2" },
                { "parametre": "PLT", "sonuc": "155" }
            ],
            "Biyokimya": [
                { "parametre": "Glukoz", "sonuc": "93" },
                { "parametre": "ALT", "sonuc": "28" },
                { "parametre": "AST", "sonuc": "33" }
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
const studentEmergencyPatientsDatabase = [
    {
        "id": 1,
        "name": "Ahmet Yılmaz",
        "age": 32,
        "gender": "Erkek",
        "admissionDate": "2023-06-15T11:20:00",
        "chiefComplaint": "Şiddetli karın ağrısı",
        "correctDiagnosis": "Tanı 1", 
        "vitalBulgular": {
            "kalpAtisHizi": 110,
            "SistolikKanBasinci": 130,
            "DiastolikKanBasinci": 85,
            "solunumHizi": 20,
            "vucutIsisi": 38.0,
            "oksiSat": 98,
        },
        "emergencyTests": {
            "acilGoruntuleme": {
                "acilBeyinBT": "Acil durumda beyin taraması yapıldı. Herhangi bir acil duruma işaret eden bulgular tespit edilmedi.",
                "akcigerRontgeni": "Akciğerlerin durumunu değerlendirmek amacıyla acil röntgen çekildi. Normal sonuçlar elde edildi.",
                "karinBT": "Karın bölgesinin acil BT taraması yapıldı. Acil bir duruma işaret eden bulgular saptanmadı.",
                "travmaUSG": "Travma sonucu oluşan iç yaralanmaları değerlendirmek amacıyla ultrasonografi (USG) yapıldı.",
                "acilMR": "Acil durumda manyetik rezonans (MR) görüntüleme yapıldı. Anormallik tespit edilmedi.",
                "toraksBTAngiografi": "Göğüs bölgesindeki damarları değerlendirmek amacıyla acil BT anjiyografi yapıldı.Anormallik tespit edilmedi",
                "acilMemeUSG": "Acil durumda meme ultrasonografi (USG) taraması gerçekleştirildi. Anormallik tespit edilmedi.",
                "pelvikBT": "Pelvik bölgenin acil BT taraması yapıldı. Acil bir duruma işaret eden bulgular saptanmadı.",
                "travmaCranialCT": "Kafa travması sonucu oluşan potansiyel beyin hasarını değerlendirmek amacıyla acil kranial BT taraması yapıldı.",
                "spinalCordMRI": "Acil durumda spinal kord hasarını değerlendirmek amacıyla manyetik rezonans (MR) görüntüleme yapıldı."
            },
            "bloodTests": {
                "completeBloodCount": {
                    "whiteBloodCellCount": 12000,
                    "hemoglobin": 12,
                    "plateletCount": 150000
                },
                "biochemistry": {
                    "glucose": 120,
                    "liverEnzymes": {
                        "ALT": 45,
                        "AST": 40
                    }
                }
            },
            "urineAnalysis": "Normal",
            "coagulationTests": {
                "PT": 14,
                "INR": 1.2
            },
            "cardiacEnzymes": {
                "troponin": 0.05,
                "creatineKinase": 80
            },
            "thyroidFunctionTests": {
                "TSH": 2.5,
                "T4": 1.2
            },
            "infectiousDiseaseScreening": ["HIV", "Hepatit B", "Hepatit C"],
            "arterialBloodGas": {
                "pH": 7.4,
                "pCO2": 40,
                "pO2": 95,
                "bicarbonate": 24
            }
        },
        "physicalExamination": {
            "karinMuayenesi": {
                "genisCapliHassasiyet": "Geniş çaplı hassasiyet gözlemlendi. Hastanın karın bölgesinde genel bir değerlendirme yapıldı.",
                "rebondHassasiyet": "Rebound tenderness tespit edildi. Karın bölgesine hafif basınç uygulanmasının ardından ağrıda artış gözlendi.",
                "normalBagirsakSesleri": "Normal bağırsak sesleri duyuldu. Stetoskop kullanılarak karın bölgesindeki bağırsak sesleri değerlendirildi."
            },
            "norolojikMuayene": {
                "kranyalSinirler": "Normal",
                "motorFonksiyon": "Normal kuvvet ve kas tonusu gözlendi. Hastanın kas gücü ve tonusu normal sınırlar içerisindedir.",
                "duyusalFonksiyon": "Normal duyu tepkisi gözlendi. Hastanın duyu tepkileri normaldir."
            },
            "solunumMuayenesi": {
                "solunumPaterni": "Normal",
                "akcigerSesleri": "Net",
                "solunumHizi": "16 nefes/dakika",
                "gogusGenisligi": "Simetrik"
            },
            "kardiyovaskularMuayene": {
                "kalpAtisHizi": "Normal",
                "kanBasinci": "120/80 mmHg"
            },
            "kasIskeletMuayenesi": {
                "hareketAraligi": "Normal",
                "kasKuvveti": "Normal",
                "eklemStabilitesi": "Instabilite belirtisi yok",
                "yurume": "Dengeli ve koordineli"
            },
            "dermatolojikMuayene": {
                "ciltRengi": "Normal",
                "lezyonlar": "Yok",
                "sicaklik": "Sıcak",
                "nem": "Normal cilt nemliliği"
            },
            "kulakBurunBogazMuayenesi": {
                "isitme": "Normal",
                "boğazGorunumu": "Normal"
            },
            "gastrointestinalMuayene": {
                "istah": "Normal",
                "dışkıGorunumu": "Normal"
            },
            "urogenitalMuayene": {
                "idrarRengi": "Normal",
                "genitalGorunum": "Normal"
            },
            "psikiyatrikMuayene": {
                "ruhHali": "Normal",
                "dusunceIcerigi": "Normal"
            }
        },
        "preliminaryDiagnosis": "Akut apandisit",
        "treatments": {
            "medications": [
                {
                    "name": "IV Sıvı Replasman",
                    "dosage": "500 mL",
                    "route": "IV",
                    "frequency": "Her 8 saatte bir"
                },
                {
                    "name": "Antibiyotikler",
                    "dosage": "Ceftriaxone 1 g IV",
                    "route": "IV",
                    "frequency": "Günde 2 kez"
                },
                {
                    "name": "Analjezik",
                    "dose": "500 mg",
                    "frequency": "İhtiyaç halinde",
                    "instructions": "Şiddetli ağrılar için kullanılabilir."
                },
                {
                    "name": "Anti-emetik",
                    "dosage": "Ondansetron 8 mg IV",
                    "route": "IV",
                    "frequency": "Günde 3 kez",
                    "instructions": "Mide bulantısı durumunda kullanılabilir."
                },
            ],
            "procedures": ["Acil apandektomi planlandı"]
        },
        "doctorNotes": "Hasta, şiddetli karın ağrısı şikayeti ile başvurdu. Fizik muayene ve tetkikler, akut apandisit şüphesini doğruladı. Acil cerrahi müdahale gerekiyor. Hasta IV sıvı replasman ve antibiyotik tedavisi alacak, acil apandektomi planlandı."
    }

    // Diğer acil hastalar buraya eklenir
]
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




