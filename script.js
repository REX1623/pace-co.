const produk = [
  // --- KATEGORI 1: DAILY TRAINER (5 PRODUK) ---
  {
    id: 1,
    nama: "Nike Air Zoom Pegasus 41 - Baltic Blue",
    kategori: "daily",
    harga: 2099000,
    gambar: "./images/Nike Air Zoom Pegasus 41.jpg"
  },
  {
    id: 2,
    nama: "ASICS Gel-Nimbus 26",
    kategori: "daily",
    harga: 2499000,
    gambar: "./images/ASICS Gel-Nimbus 26.jpg"
  },
  {
    id: 3,
    nama: "Adidas Adizero Boston 12",
    kategori: "daily",
    harga: 2299000,
    gambar: "./images/Adidas Adizero Boston 12.jpg"
  },
  {
    id: 4,
    nama: "Ortuseight Hyperblast 2.0 - Neon Cyan",
    kategori: "daily",
    harga: 599000,
    gambar: "./images/Ortuseight Hyperblast 2.0.jpg"
  },
  {
    id: 5,
    nama: "910 Nineten Haze Vision - White/Gold",
    kategori: "daily",
    harga: 649000,
    gambar: "./images/910 Nineten Haze Vision.jpg"
  },

  // --- KATEGORI 2: CARBON / RACE SHOE (5 PRODUK) ---
  {
    id: 6,
    nama: "ASICS Metaspeed Edge Paris",
    kategori: "carbon",
    harga: 3899000,
    gambar: "./images/ASICS Metaspeed Edge Paris.jpg"
  },
  {
    id: 7,
    nama: "Adidas Adios Pro 3",
    kategori: "carbon",
    harga: 3399000,
    gambar: "./images/Adidas Adios Pro 3.jpg"
  },
  {
    id: 8,
    nama: "Nike Vaporfly 3",
    kategori: "carbon",
    harga: 3899000,
    gambar: "./images/Nike Vaporfly 3.jpg"
  },
  {
    id: 9,
    nama: "Ortuseight Solar Pack Carbon",
    kategori: "carbon",
    harga: 1299000,
    gambar: "./images/Ortuseight Solar Pack Carbon.jpg"
  },
  {
    id: 10,
    nama: "910 Nineten Geist Ekiden",
    kategori: "carbon",
    harga: 999000,
    gambar: "./images/910 Nineten Geist Ekiden.jpg"
  },

  // --- KATEGORI 3: APPAREL & AKSESORIS (5 PRODUK) ---
  {
    id: 11,
    nama: "Pace & Co. Elite Pro Singlet",
    kategori: "apparel",
    harga: 275000,
    gambar: "./images/Elite Pro Singlet.jpg"
  },
  {
    id: 12,
    nama: "ASICS Performance Running Socks (3-Pack)",
    kategori: "apparel",
    harga: 150000,
    gambar: "./images/ASICS Performance Running Socks.jpg"
  },
  {
    id: 13,
    nama: "Nike Dri-FIT Challenger Running Shorts",
    kategori: "apparel",
    harga: 599000,
    gambar: "./images/Nike Dri-FIT Challenger Running Shorts.jpg"
  },
  {
    id: 14,
    nama: "Ortuseight Running Cap - Black",
    kategori: "apparel",
    harga: 139000,
    gambar: "./images/Ortuseight Running Cap - Black.jpg"
  },
  {
    id: 15,
    nama: "Adidas Running Waist Bag",
    kategori: "apparel",
    harga: 350000,
    gambar: "./images/Adidas Running Waist Bag.jpg"
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

  // Membuat string rincian pesan secara langsung dari data keranjang yang valid
  let rincianPesanan = "";
  let totalBelanja = 0;

  keranjang.forEach((item, index) => {
    const data = produk.find(x => x.id === item.id);
    if (data) {
      const subtotal = data.harga * item.jumlah;
      totalBelanja += subtotal;
      rincianPesanan += `• ${data.nama} (${item.jumlah} pcs) - ${formatRupiah(subtotal)}%0A`;
    }
  });

  // Menyusun format pesan lengkap agar terbaca sempurna oleh WhatsApp
  let pesanFinal = "Halo Pace & Co., saya ingin memesan produk berikut:%0A%0A" + 
                   rincianPesanan + 
                   "%0ATotal Keseluruhan: " + formatRupiah(totalBelanja) + 
                   "%0A%0ANama:%0AAlamat Lengkap & Ukuran (Size):%0ACatatan:";

  const nomorWhatsApp = "6281515453116"; 

  window.open(
    "https://wa.me/" + nomorWhatsApp + "?text=" + pesanFinal,
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