function prosesLogin() {
    const emailInput = document.getElementById('email').value;
    const passInput = document.getElementById('password').value;
    const user = dataPengguna.find(u => u.email === emailInput && u.password === passInput);

    if (user) {
        localStorage.setItem('namaUser', user.nama);
        window.location.href = "dashboard.html";
    } else {
        alert("email/password yang anda masukkan salah");
    }
}

function openModal(judul) {
    document.getElementById('modalTitle').innerText = judul;
    document.getElementById('modalBox').style.display = "block";
}

function closeModal() {
    document.getElementById('modalBox').style.display = "none";
}

function setGreeting() {
    const jam = new Date().getHours();
    const nama = localStorage.getItem('namaUser') || "User";
    let ucapan = "";
    if (jam >= 5 && jam < 12) {
        ucapan = "Selamat Pagi";
    } else if (jam >= 12 && jam < 15) {
        ucapan = "Selamat Siang";
    } else if (jam >= 15 && jam < 18) {
        ucapan = "Selamat Sore";
    } else {
        ucapan = "Selamat Malam";
    }

    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        greetingElement.innerText = `${ucapan}, ${nama}`;
    }
}

function cariTracking() {
    const noDO = document.getElementById('inputDO').value;
    const data = dataTracking[noDO]; 

    if (data) {
        document.getElementById('hasilTracking').style.display = "block";
        document.getElementById('trackNama').innerText = data.nama;
        document.getElementById('trackStatus').innerText = data.status;
        document.getElementById('trackEkspedisi').innerText = data.ekspedisi;
        document.getElementById('trackTgl').innerText = data.tanggalKirim;
        document.getElementById('trackPaket').innerText = data.paket;
        document.getElementById('trackTotal').innerText = data.total;

        const bar = document.getElementById('progressBar');
        if (data.status === "Selesai Antar") {
            bar.style.width = "100%";
            bar.style.backgroundColor = "#4caf50";
        } else {
            bar.style.width = "60%";
            bar.style.backgroundColor = "#ff9800";
        }
    } else {
        alert("Nomor Delivery Order tidak ditemukan!");
    }
}

function renderStok() {
    const tbody = document.querySelector("#tabelBahanAjar tbody");
    if (!tbody) return;

    tbody.innerHTML = ""; 
    dataBahanAjar.forEach(item => {
        const row = `<tr>
            <td><img src="${item.cover}" width="50" alt="cover"></td>
            <td>${item.kodeBarang}</td>
            <td>${item.namaBarang}</td>
            <td>${item.edisi}</td>
            <td>${item.stok}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function tambahBaris() {
    const table = document.getElementById("tabelBahanAjar").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    newRow.innerHTML = `
        <td>(Baru)</td>
        <td><input type="text" placeholder="Kode"></td>
        <td><input type="text" placeholder="Nama Barang"></td>
        <td><input type="text" placeholder="Edisi"></td>
        <td><input type="number" placeholder="Stok"></td>
    `;
}