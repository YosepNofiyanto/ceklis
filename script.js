document.addEventListener("DOMContentLoaded", () => {
    const username = "yosep";
    const password = "yosep131182";

    const loginPage = document.getElementById("loginPage");
    const mainPage = document.getElementById("mainPage");
    const loginForm = document.getElementById("loginForm");
    const formPage = document.getElementById("formPage");
    const dashboardPage = document.getElementById("dashboardPage");
    const ceklisForm = document.getElementById("ceklisForm");
    const dashboardTable = document.querySelector("#dashboardTable tbody");
    const filterTanggal = document.getElementById("filterTanggal");
    const filterBtn = document.getElementById("filterBtn");
    const formBtn = document.getElementById("formBtn");
    const dashboardBtn = document.getElementById("dashboardBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    // Retrieve saved data
    let ceklisData = JSON.parse(localStorage.getItem("ceklisData")) || [];

    // Render dashboard data
    const renderDashboard = (data) => {
        dashboardTable.innerHTML = "";
        data.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.tanggal}</td>
                <td>${item.dilakukanOleh}</td>
                <td>${item.noPolisi || "-"}</td>
                <td>${item.namaSopir || "-"}</td>
                <td>${item.noBuntut || "-"}</td>
                <td>${item.statusSegel}</td>
                <td>${item.keterangan || "-"}</td>
                <td><button class="deleteBtn" data-index="${index}">Hapus</button></td>
            `;
            dashboardTable.appendChild(row);
        });

        // Add delete functionality
        document.querySelectorAll(".deleteBtn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                ceklisData.splice(index, 1);
                localStorage.setItem("ceklisData", JSON.stringify(ceklisData));
                renderDashboard(ceklisData);
            });
        });
    };

    // Save form data
    ceklisForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const tanggal = document.getElementById("tanggal").value;
        const dilakukanOleh = document.getElementById("dilakukanOleh").value;
        const noPolisi = document.getElementById("noPolisi").value || null;
        const namaSopir = document.getElementById("namaSopir").value || null;
        const noBuntut = document.getElementById("noBuntut").value || null;
        const statusSegel = document.getElementById("statusSegel").value;
        const keterangan = document.getElementById("keterangan").value || null;

        ceklisData.push({ tanggal, dilakukanOleh, noPolisi, namaSopir, noBuntut, statusSegel, keterangan });
        localStorage.setItem("ceklisData", JSON.stringify(ceklisData));
        ceklisForm.reset();
        alert("Data berhasil disimpan!");
    });

    // Filter dashboard data by date
    filterBtn.addEventListener("click", () => {
        const filterDate = filterTanggal.value;
        const filteredData = ceklisData.filter(item => item.tanggal === filterDate);
        renderDashboard(filteredData);
    });

    // Switch pages
    formBtn.addEventListener("click", () => {
        formPage.style.display = "block";
        dashboardPage.style.display = "none";
    });

    dashboardBtn.addEventListener("click", () => {
        formPage.style.display = "none";
        dashboardPage.style.display = "block";
        renderDashboard(ceklisData);
    });

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        location.reload();
    });

    // Handle login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputUsername = document.getElementById("username").value;
        const inputPassword = document.getElementById("password").value;

        if (inputUsername === username && inputPassword === password) {
            localStorage.setItem("isLoggedIn", true);
            loginPage.style.display = "none";
            mainPage.style.display = "block";
        } else {
            alert("Username atau password salah!");
        }
    });

    // Persist login state
    if (localStorage.getItem("isLoggedIn")) {
        loginPage.style.display = "none";
        mainPage.style.display = "block";
    }
});
