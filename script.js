const produk = [
  {
    id: 1,
    nama: "Kemeja Batik Pria Slimfit",
    kategori: "kemeja",
    harga: 165000,
    gambar: "./images/Batik Pria Slimfit.jpg"
  },
  {
    id: 2,
    nama: "Blouse Batik Wanita Modern",
    kategori: "blouse",
    harga: 145000,
    gambar: "./images/Batik Wanita Blouse.jpg"
  },
  {
    id: 3,
    nama: "Outer Batik Casual",
    kategori: "outer",
    harga: 175000,
    gambar: "./images/Outer Batik Casual.jpg"
  },
  {
    id: 4,
    nama: "Tunike Batik Panjang",
    kategori: "blouse",
    harga: 185000,
    gambar: "./images/Tunike Batik Panjang.jpg"
  },
  {
    id: 5,
    nama: "Kaos Motif Batik Kontemporer",
    kategori: "kaos",
    harga: 95000,
    gambar: "./images/Kaos Motif Batik Kontemporer.jpg"
  },
  {
    id: 6,
    nama: "Kemeja Batik Premium",
    kategori: "kemeja",
    harga: 220000,
    gambar: "./images/Kemeja Batik Premium.jpg"
  }
];

let keranjang = [];

const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(angka);
};

function tampilProduk(kategori = "semua", kataKunci = "") {
  const list = document.getElementById("productList");

  const hasil = produk.filter(item => {
    const cocokKategori =
      kategori === "semua" || item.kategori === kategori;

    const cocokCari =
      item.nama.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.kategori.toLowerCase().includes(kataKunci.toLowerCase());

    return cocokKategori && cocokCari;
  });

  if (hasil.length === 0) {
    list.innerHTML = `
      <div class="empty">
        Produk tidak ditemukan.
      </div>
    `;
    return;
  }

  list.innerHTML = hasil.map(item => `
    <div class="product">
      <img src="${item.gambar}" alt="${item.nama}">
      <div class="product-info">
        <h3>${item.nama}</h3>
        <small>${item.kategori.toUpperCase()}</small>
        <div class="price">${formatRupiah(item.harga)}</div>
        <button class="add-btn" onclick="tambahKeranjang(${item.id})">
          + Keranjang
        </button>
      </div>
    </div>
  `).join("");
}

function tambahKeranjang(id) {
  const item = keranjang.find(x => x.id === id);

  if (item) {
    item.jumlah++;
  } else {
    keranjang.push({
      id: id,
      jumlah: 1
    });
  }

  tampilKeranjang();
  updateJumlahKeranjang();
}

function ubahJumlah(index, nilai) {
  keranjang[index].jumlah += nilai;

  if (keranjang[index].jumlah <= 0) {
    keranjang.splice(index, 1);
  }

  tampilKeranjang();
  updateJumlahKeranjang();
}

function hapusProduk(index) {
  keranjang.splice(index, 1);
  tampilKeranjang();
  updateJumlahKeranjang();
}

function updateJumlahKeranjang() {
  const jumlah = keranjang.reduce(
    (total, item) => total + item.jumlah,
    0
  );

  document.getElementById("jumlahKeranjang").textContent = jumlah;
}

function hitungTotal() {
  return keranjang.reduce((total, item) => {
    const data = produk.find(x => x.id === item.id);
    return total + data.harga * item.jumlah;
  }, 0);
}

function tampilKeranjang() {
  const list = document.getElementById("cartList");

  if (keranjang.length === 0) {
    list.innerHTML = `
      <div class="empty">
        Keranjang masih kosong.
      </div>
    `;

    document.getElementById("totalHarga").textContent = "Rp0";
    return;
  }

  list.innerHTML = keranjang.map((item, index) => {
    const data = produk.find(x => x.id === item.id);
    const subtotal = data.harga * item.jumlah;

    return `
      <div class="cart-item">
        <img src="${data.gambar}" alt="${data.nama}">

        <div>
          <h4>${data.nama}</h4>
          <p>${formatRupiah(data.harga)} × ${item.jumlah}</p>

          <div class="quantity">
            <button onclick="ubahJumlah(${index}, -1)">−</button>
            <span>${item.jumlah}</span>
            <button onclick="ubahJumlah(${index}, 1)">+</button>
          </div>

          <p><b>${formatRupiah(subtotal)}</b></p>

          <button class="delete" onclick="hapusProduk(${index})">
            Hapus
          </button>
        </div>
      </div>
    `;
  }).join("");

  document.getElementById("totalHarga").textContent =
    formatRupiah(hitungTotal());
}

function bukaKeranjang() {
  document.getElementById("cartModal").classList.add("show");
  tampilKeranjang();
}

function tutupKeranjang() {
  document.getElementById("cartModal").classList.remove("show");
}

function checkoutWhatsApp() {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  let pesan = "Halo StyleKita, saya ingin memesan batik:%0A%0A";

  keranjang.forEach(item => {
    const data = produk.find(x => x.id === item.id);
    const subtotal = data.harga * item.jumlah;

    pesan +=
      "• " + data.nama +
      " | " + item.jumlah + " pcs" +
      " | " + formatRupiah(subtotal) +
      "%0A";
  });

  pesan +=
    "%0ATotal: " + formatRupiah(hitungTotal()) +
    "%0A%0ANama:%0AAlamat:%0ACatatan:";

  // GANTI NOMOR INI DENGAN NOMOR WHATSAPP TOKO ANDA
  const nomorWhatsApp = "6282274390654";

  window.open(
    "https://wa.me/" + nomorWhatsApp + "?text=" + pesan,
    "_blank"
  );
}

/* PENCARIAN */
document.getElementById("searchInput").addEventListener("input", function () {
  const kata = this.value;
  const kategoriAktif =
    document.querySelector(".filter-btn.active").dataset.category;

  tampilProduk(kategoriAktif, kata);
});

/* FILTER KATEGORI */
document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", function () {

    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.remove("active");
    });

    this.classList.add("active");

    const kata =
      document.getElementById("searchInput").value;

    tampilProduk(this.dataset.category, kata);
  });
});

tampilProduk();
tampilKeranjang();
updateJumlahKeranjang();