# aislop-vs-noslop

Perbandingan side-by-side dua landing page untuk produk yang sama, dibuat dengan
pendekatan berbeda. Tujuannya: menunjukkan apa yang berubah ketika skill antislop
diterapkan pada design dan copy.

## Apa ini

Dua versi landing page untuk produk fiktif "AiSlop", asisten AI untuk tim produk:

- **`aislop/`** dibangun tanpa filter antislop. Berisi pola khas halaman AI generik:
  gradient ungu-pink, glassmorphism, emoji sebagai ikon, statistik karangan,
  testimonial fiktif, chat widget palsu.
- **`noslop/`** dibangun dengan skill antislop-ui. Konten sama, design berbeda:
  palette paper hangat, serif Georgia, motion terbatas, sudut tajam, tanpa
  glassmorphism, tanpa emoji icon.

## Perbedaan design

| Aspek | aislop | noslop |
|---|---|---|
| Warna | Gradient ungu-pink-biru | Paper hangat + tinta + aksen rust |
| Tipografi | Inter sans default | Georgia serif + system sans body |
| Sudut | Rounded, glassmorphism | Tajam (radius 0) |
| Motion | Fade-up, float, bounce, pulse, counter | Hover + transisi toggle saja |
| Ikon | Emoji (rocket, robot, bolt, brain, chart) | Tanpa ikon generik |
| Fitur | 6 kartu identik dengan emoji | Definition list, tanpa kartu |
| Stats | 4 counter animasi | 4 slot statis |
| Pricing | 3 kolom dengan badge "Most Popular" | List vertikal tanpa highlight |
| Widget | Chat widget palsu | Dihapus |
| Footer | 4 kolom + socials mati | Minimal, link on-page nyata |
| Bahasa | English | Indonesian (Jabodetabek profesional) |
| Toggle tema | Tidak ada | Light/dark berfungsi |

## Struktur

```
aislop-vs-noslop/
├── aislop/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── noslop/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── CODEBUDDY.md
└── README.md
```

## Cara pakai

Buka `aislop/index.html` dan `noslop/index.html` di browser. Bandingkan
berdampingan untuk melihat perbedaan design dengan konten yang sama.

## Presentasi

Slide perbandingan lengkap:
https://docs.google.com/presentation/d/1KV3enkmzyqT7SiqpeXNFLPKwjkb18c8YT5rcJiXkCuA/edit?usp=sharing

## Skill antislop

Skill antislop dipasang di `.codebuddy/skills/` (tidak di-commit, ada di
.gitignore). CodeBuddy Code me-load otomatis saat sesi dimulai.

Cara pasang via plugin marketplace:

```
/plugin marketplace add https://github.com/miqdadbadjuber/anti-slop
/plugin install antislop@anti-slop
```
