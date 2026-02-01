-- Tabel Santri (Detail Lengkap)
CREATE TABLE IF NOT EXISTS santri (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    tempat_lahir TEXT,
    tanggal_lahir DATE,
    nama_ibu TEXT,
    kelas TEXT NOT NULL,
    tingkat TEXT CHECK(tingkat IN ('TPQ', 'RTQ', 'Majlis Talim')) DEFAULT 'TPQ',
    status TEXT CHECK(status IN ('aktif', 'non-aktif', 'lulus')) DEFAULT 'aktif',
    tahun_masuk INTEGER NOT NULL,
    tahun_keluar INTEGER,
    foto_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Hafalan
CREATE TABLE IF NOT EXISTS hafalan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    santri_id INTEGER NOT NULL,
    materi TEXT NOT NULL, -- Iqro / Juz Amma / Al-Quran
    keterangan TEXT NOT NULL, -- Halaman / Surah / Ayat
    catatan TEXT,
    tanggal DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (santri_id) REFERENCES santri(id)
);

-- Tabel Absensi
CREATE TABLE IF NOT EXISTS absensi (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    santri_id INTEGER NOT NULL,
    status TEXT CHECK(status IN ('hadir', 'izin', 'sakit', 'alfa')) NOT NULL,
    tanggal DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (santri_id) REFERENCES santri(id)
);

-- Seed Initial Data
INSERT INTO santri (nama, kelas, status) VALUES ('Ahmad Fulan', 'Iqro 4', 'iqro');
INSERT INTO santri (nama, kelas, status) VALUES ('Siti Aisyah', 'Juz 30', 'alquran');
INSERT INTO santri (nama, kelas, status) VALUES ('Muhammad Ali', 'Iqro 2', 'iqro');
