// ==========================================
// 1. STATİK MƏLUMATLAR VƏ İLKLƏNDİRMƏ
// ==========================================

const USERS = {
    // Adminlər (Komissiya üzvləri)
    "Kamal Quliyev": { role: "admin", name: "Kamal Quliyev", pass: "admin77" },
    "Nərmin Əliyeva": { role: "admin", name: "Nərmin Əliyeva", pass: "admin77" },
    "Vüqar Həsənov": { role: "admin", name: "Vüqar Həsənov", pass: "admin77" },

    // İşçilər
    "Kənan Məmmədov": { role: "hik-sədri", name: "Kənan Məmmədov", pass: "123456" },
    "Elvin Əliyev": { role: "sosial-məsələlər-üzrə-mütəxəssis", name: "Elvin Əliyev", pass: "123456" },
    "Leyla Vəliyeva": { role: "mədəni-kütləvi-işlər-üzrə-təşkilatçı", name: "Leyla Vəliyeva", pass: "123456" },
    "Rəşad Quliyev": { role: "əmək-mühafizəsi-üzrə-inspektor", name: "Rəşad Quliyev", pass: "123456" },
    "Aysel Həsənova": { role: "mühasib-xəzinədar", name: "Aysel Həsənova", pass: "123456" },
    "Tural İbrahimov": { role: "gənclər-komitəsinin-sədri", name: "Tural İbrahimov", pass: "123456" },
    "Nigar Abbasova": { role: "kadrlar-və-sənədlərlə-iş-üzrə-katib", name: "Nigar Abbasova", pass: "123456" },
    "Kamran Mehdiyev": { role: "idman-və-sağlamlıq-üzrə-koordinator", name: "Kamran Mehdiyev", pass: "123456" },
    "Günel Rəhimova": { role: "hüquqi-məsələlər-üzrə-hüquqşünas", name: "Günel Rəhimova", pass: "123456" },
    "Orxan Səfərov": { role: "xarici-əlaqələr-və-təchizat-mütəxəssisi", name: "Orxan Səfərov", pass: "123456" }
};

const ANNUAL_BUDGET = 50000.00;
let currentUser = null;
let applications = JSON.parse(localStorage.getItem("hik_applications")) || [];

document.addEventListener("DOMContentLoaded", () => {
    // Formların hadisə dinləyicilərini bağlayırıq
    document.getElementById("login-form").addEventListener("submit", handleLogin);
    document.getElementById("application-form").addEventListener("submit", handleApplicationSubmit);
});

// ==========================================
// 2. GİRİŞ VƏ ÇIXIŞ (AUTH) MƏNTİQİ
// ==========================================

function handleLogin(e) {
    e.preventDefault();
    
    // İstifdəçinin daxil etdiyi mətni alırıq və kənar boşluqları təmizləyirik
    const inputName = document.getElementById("fin-input").value.trim();
    const password = document.getElementById("password-input").value;
    const errorMsg = document.getElementById("login-error");
    
    // USERS obyektindəki açarları (keys) yoxlayırıq. 
    // toLowerCase() istifadə edərək böyük/kiçik hərf fərqini aradan qaldırırıq.
    const userKey = Object.keys(USERS).find(key => key.toLowerCase() === inputName.toLowerCase());
    
    if (userKey && USERS[userKey].pass === password) {
        currentUser = { fin: userKey, ...USERS[userKey] };
        errorMsg.style.display = "none";
        document.getElementById("login-form").reset();
        showPortal();
    } else {
        errorMsg.style.display = "block";
        errorMsg.innerText = "İstifadəçi adı və ya şifrə yanlışdır!";
    }
}

function showPortal() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("portal-navigation").style.display = "block";
    document.getElementById("user-display-name").innerText = currentUser.name;
    
    // Əgər rol "admin"dirsə, admin paneli açılır, əks halda işçi paneli
    if (currentUser.role === "admin") {
        document.getElementById("admin-section").style.display = "block";
        document.getElementById("worker-section").style.display = "none";
        updateAdminPanel();
    } else {
        // Digər bütün rollar (hik-sədri, mütəxəssis və s.) işçi hesab olunur
        document.getElementById("worker-section").style.display = "block";
        document.getElementById("admin-section").style.display = "none";
        updateWorkerPanel();
    }
}

function logout() {
    currentUser = null;
    document.getElementById("portal-navigation").style.display = "none";
    document.getElementById("worker-section").style.display = "none";
    document.getElementById("admin-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
}

// ==========================================
// 3. İŞÇİ PANELİ FUNKSİYALARI
// ==========================================

function handleApplicationSubmit(e) {
    e.preventDefault();
    
    const helpType = document.getElementById("help-type").value;
    const description = document.getElementById("help-description").value.trim();
    const fileInput = document.getElementById("help-file");
    
    let fileName = "Sənəd yüklənməyib";
    if (fileInput.files.length > 0) {
        fileName = fileInput.files[0].name;
    }
    
    const newApplication = {
        id: "APP-" + Date.now(),
        workerFin: currentUser.name,
        workerName: currentUser.name,
        type: helpType,
        desc: description,
        file: fileName,
        date: new Date().toLocaleDateString("az-AZ"),
        amount: 0.00,
        status: "Gözləmədə"
    };
    
    applications.push(newApplication);
    saveToStorage();
    
    document.getElementById("application-form").reset();
    updateWorkerPanel();
    alert("Müraciətiniz uğurla komissiyaya göndərildi!");
}

function updateWorkerPanel() {
    const tbody = document.getElementById("worker-table-body");
    tbody.innerHTML = ""; 
    
    let totalReceived = 0;
    const myApps = applications.filter(app => app.workerFin === currentUser.fin);
    
    myApps.forEach(app => {
        if (app.status === "Təsdiqləndi") {
            totalReceived += app.amount;
        }
        
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><b>${app.type}</b><br><small>${app.desc}</small></td>
            <td>${app.date}</td>
            <td>${app.status === "Təsdiqləndi" ? app.amount.toFixed(2) + " AZN" : "---"}</td>
            <td><span style="font-weight:bold; color:${getStatusColor(app.status)}">${app.status}</span></td>
        `;
        tbody.appendChild(row);
    });
    
    document.getElementById("worker-received-amt").innerText = totalReceived.toFixed(2);
}

// ==========================================
// 4. ADMİN (KOMİSSİYA) PANELİ FUNKSİYALARI
// ==========================================

function updateAdminPanel() {
    const tbody = document.getElementById("admin-table-body");
    tbody.innerHTML = "";
    
    let totalSpent = 0;
    
    applications.forEach((app) => {
        if (app.status === "Təsdiqləndi") {
            totalSpent += app.amount;
        }
        
        const row = document.createElement("tr");
        
        if (app.status === "Gözləmədə") {
            row.innerHTML = `
                <td>${app.workerName} </td>
                <td><b>${app.type}</b><br><small>${app.desc}</small></td>
                <td><a href="#" onclick="alert('Simulyasiya: ${app.file} faylı açılır...')">📄 ${app.file}</a></td>
                <td>
                    <input type="number" id="amt-${app.id}" min="1" placeholder="Məbləğ" style="width:80px;">
                </td>
                <td>
                    <button onclick="approveApp('${app.id}')" style="background-color:green; color:white; width:auto; padding:5px 10px; margin-right:5px; border:none; cursor:pointer;">Təsdiq</button>
                    <buttn onclick="rejectApp('${app.id}')" style="background-color:red; color:white; width:auto; padding:5px 10px; border:none; cursor:pointer;">İmtina</button>
                </td>
            `;
        } else {
            row.innerHTML = `
                <td>${app.workerName}</td>
                <td><b>${app.type}</b><br><small>${app.desc}</small></td>
                <td>📄 ${app.file}</td>
                <td>${app.amount.toFixed(2)} AZN</td>
                <td><span style="font-weight:bold; color:${getStatusColor(app.status)}">${app.status}</span></td>
            `;
        }
        tbody.appendChild(row);
    });
    
    const budgetLeft = ANNUAL_BUDGET - totalSpent;
    document.getElementById("admin-total-spent").innerText = totalSpent.toFixed(2) + " AZN";
    document.getElementById("admin-budget-left").innerText = budgetLeft.toFixed(2) + " AZN";
}

function approveApp(id) {
    const amtInput = document.getElementById(`amt-${id}`);
    const amount = parseFloat(amtInput.value);
    
    if (isNaN(amount) || amount <= 0) {
        alert("Zəhmət olmasa təyin olunacaq məbləği daxil edin!");
        return;
    }
    
    const app = applications.find(a => a.id === id);
    if (app) {
        app.status = "Təsdiqləndi";
        app.amount = amount;
        saveToStorage();
        updateAdminPanel();
        alert("Müraciət təsdiqləndi.");
    }
}

function rejectApp(id) {
    const app = applications.find(a => a.id === id);
    if (app) {
        app.status = "İmtina edildi";
        app.amount = 0.00;
        saveToStorage();
        updateAdminPanel();
        alert("Müraciət rədd edildi.");
    }
}

function getStatusColor(status) {
    if (status === "Gözləmədə") return "orange";
    if (status === "Təsdiqləndi") return "green";
    if (status === "İmtina edildi") return "red";
    return "black";
}

function saveToStorage() {
    localStorage.setItem("hik_applications", JSON.stringify(applications));

}

