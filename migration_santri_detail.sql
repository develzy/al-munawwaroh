-- Update struktur tabel santri menjadi lebih detail
-- Dengan handling foreign key constraints

-- 1. Nonaktifkan foreign key check sementara
PRAGMA foreign_keys = OFF;

-- 2. Rename tabel lama
ALTER TABLE santri RENAME TO santri_old;

-- 3. Buat tabel baru dengan struktur lengkap
CREATE TABLE santri (
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

-- 4. Migrate data dari tabel lama ke tabel baru
INSERT INTO santri (id, nama, kelas, tahun_masuk, foto_url)
SELECT 
    id, 
    nama, 
    kelas,
    CAST(strftime('%Y', COALESCE(tanggal_masuk, CURRENT_TIMESTAMP)) AS INTEGER) as tahun_masuk,
    foto_url
FROM santri_old;

-- 5. Hapus tabel lama
DROP TABLE santri_old;

-- 6. Aktifkan kembali foreign key check
PRAGMA foreign_keys = ON;

-- 7. Buat index untuk performa
CREATE INDEX IF NOT EXISTS idx_santri_status ON santri(status);
CREATE INDEX IF NOT EXISTS idx_santri_tingkat ON santri(tingkat);
CREATE INDEX IF NOT EXISTS idx_santri_tahun_masuk ON santri(tahun_masuk);
