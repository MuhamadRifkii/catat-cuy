# Catat Cuy! 📝

**Catat Cuy!** adalah aplikasi catatan sederhana berbasis web yang memungkinkan pengguna membuat, membaca, memperbarui, dan menghapus catatan mereka. Dibangun menggunakan **React** di frontend, **Express.js** di backend, dan **Sequelize** sebagai ORM untuk database Neon.

## 📋 Fitur

- CRUD catatan (Create, Read, Update, Delete).
- Antarmuka pengguna sederhana dan responsif.
- Backend REST API dengan validasi data.
- Database PostgreSQL menggunakan **Neon**.
- Struktur proyek terorganisir untuk kemudahan pengembangan.

---

## API

Frontend ini menggunakan backend REST API yang dapat ditemukan di repository [catat-cuy-backend](https://github.com/MuhamadRifkii/backend).

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: [React](https://reactjs.org/) dengan [Vite](https://vitejs.dev/).
- **Backend**: [Express.js](https://expressjs.com/).
- **Database**: [PostgreSQL](https://www.postgresql.org/) dengan [Neon](https://neon.tech/).
- **ORM**: [Sequelize](https://sequelize.org/).

---

## ⚡ Cara Menjalankan Proyek

### 1. Clone Repository

```bash
git clone https://github.com/MuhamadRifkii/catat-cuy.git
cd catat-cuy
```

### 2. Install Dependencies

```bash
npm install
# atau #
yarn install
```

### 3. Buat File .env Berisi Environment yang digunakan pada Aplikasi 
```bash
VITE_BASE_URL= # Masukkan url backend disini #
```

### 4. Jalankan Aplikasi

```bash
npm start
# atau #
yarn start
```

### 5. Akses Aplikasi

Buka browser dan akses aplikasi melalui http://localhost:5173.

---

## 📂 Struktur Proyek

```
src/
├── component/            # Komponen komponen yang digunakan di aplikasi.
├── pages/                # Halaman halaman aplikasi.
├── store/                # Action, Action Types, dan Reducer.
├── test/                 # Folder untuk testing Aplikasi.
├── utils/                # Utilitas untuk inisial nama user.
├── App.jsx               # Routing yang ada pada Aplikasi.
├── index.css             # Styling yang digunakan pada Aplikasi.
└── main.jsx              # Titik masuk Aplikasi.
```

---

## 🤝 Kontribusi

Kontribusi sangat diterima pada aplikasi! Untuk memulai:

1. Fork repository ini.
2. Buat branch fitur Anda
   ```bash
   git checkout -b fitur/<Nama Fitur>.
   ```
3. Commit perubahan Anda

   ```bash
   git commit -m 'Menambahkan fitur <Nama Fitur>'.
   ```

4. Push ke branch (git push origin fitur/AmazingFeature)
5. Buat Pull Request.

---

Dibuat dengan ❤️ oleh **Muhamad Rifqi**.
