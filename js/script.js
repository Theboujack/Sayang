const photos = document.querySelectorAll('.photo');
const nextBtn = document.getElementById('nextBtn');
const hintText = document.querySelector('.hint'); // Ambil elemen tulisan "Pencet yang"
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let currentIndex = 0;
let particles = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Event Listener untuk Tombol Next
nextBtn.addEventListener('click', () => {
  if (currentIndex < photos.length) {
    // Tampilkan foto berikutnya
    photos[currentIndex].classList.add('show');
    currentIndex++;

    // Jika semua foto sudah muncul
    if (currentIndex === photos.length) {
      hintText.textContent = "Pencet sekali lagi yang"; // Ubah teks hint
      nextBtn.style.backgroundColor = "blue"; // Ubah warna tombol menjadi biru
      nextBtn.style.color = "white"; // Opsional: ubah warna teks pada tombol
    }
  } else if (currentIndex === photos.length) {
    // Jika semua foto sudah muncul, mulai partikel kupu-kupu
    startParticles();
    nextBtn.disabled = true; // Nonaktifkan tombol
  }
});

// Fungsi untuk Membuat Partikel Kupu-Kupu
function startParticles() {
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 2,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 - 1.5,
      color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
    });
  }
  animateParticles();
}

// Fungsi untuk Menggambar Kupu-Kupu
function drawButterfly(ctx, x, y, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();

  // Sayap kiri atas
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size * 2, y - size, x - size * 2, y + size, x, y + size);

  // Sayap kanan atas
  ctx.bezierCurveTo(x + size * 2, y + size, x + size * 2, y - size, x, y);

  // Sayap kiri bawah
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size * 1.5, y, x - size * 1.5, y + size * 2, x, y + size);

  // Sayap kanan bawah
  ctx.bezierCurveTo(x + size * 1.5, y + size * 2, x + size * 1.5, y, x, y);

  ctx.closePath();
  ctx.fill();
}

// Fungsi Animasi Partikel
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // Gambar partikel berbentuk kupu-kupu
    drawButterfly(ctx, particle.x, particle.y, particle.size, particle.color);

    // Hapus partikel jika keluar dari layar
    if (
      particle.x < 0 ||
      particle.x > canvas.width ||
      particle.y < 0 ||
      particle.y > canvas.height
    ) {
      particles.splice(index, 1);
    }
  });

  if (particles.length > 0) {
    requestAnimationFrame(animateParticles);
  }
}