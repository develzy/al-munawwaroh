-- Tabel Santri
CREATE TABLE IF NOT EXISTS santri (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    kelas TEXT NOT NULL,
    status TEXT CHECK(status IN ('iqro', 'alquran')) NOT NULL,
    tanggal_masuk DATETIME DEFAULT CURRENT_TIMESTAMP
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
