#   QUIZsy-App

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

Aplikasi kuis interaktif berbasis web yang dibangun menggunakan **React.js** dan **Tailwind CSS**. Proyek ini dikembangkan sebagai bagian dari seleksi magang mandiri untuk mendemonstrasikan kemampuan *Frontend Development*, integrasi API, dan manajemen *state*.

## Fitur Utama

Aplikasi ini memenuhi seluruh kriteria teknis yang diminta, antara lain:

* **Sistem Login Sederhana**: Pengguna memasukkan nama sebelum memulai kuis untuk personalisasi hasil akhir
* **Integrasi OpenTDB API**: Mengambil soal secara dinamis dari *Open Trivia Database*
* **Single-Question Interface**: Menampilkan satu soal per halaman dengan transisi otomatis ke soal berikutnya setelah jawaban dipilih
* **Real-time Timer**: Dilengkapi dengan batas waktu pengerjaan. Jika waktu habis, kuis otomatis ditutup dan menampilkan hasil
* **Auto-Resume (LocalStorage)**: Progres kuis (soal terakhir, skor, dan sisa waktu) tersimpan secara otomatis. Pengguna dapat melanjutkan kuis meskipun browser tertutup atau di-refresh
* **Statistik Lengkap**: Menampilkan jumlah jawaban benar dan jumlah jawaban salah
* **Desain Responsif**: Tampilan yang optimal baik di perangkat mobile maupun desktop menggunakan Tailwind CSS

## 🛠️ Teknologi yang Digunakan

* **Framework**: React (Vite)
* **Styling**: Tailwind CSS
* **State Management**: React Hooks (`useState`, `useEffect`)
* **Data Source**: [Open Trivia DB API](https://opentdb.com/)
* **Deployment**: [Sebutkan platform jika kamu deploy, misal: Vercel / Netlify / GitHub Pages]

## 📦 Cara Menjalankan Project

1.  **Clone Repository**
    ```bash
    git clone https://github.com/moonux304/QUIZsy.git
    cd nama-repo
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
