-- Tabel Syahriah (Pembayaran Bulanan Wajib)
CREATE TABLE IF NOT EXISTS syahriah (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    santri_id INTEGER NOT NULL,
    bulan TEXT NOT NULL, -- Format: YYYY-MM (contoh: 2026-02)
    nominal INTEGER NOT NULL, -- Dalam Rupiah
    status TEXT CHECK(status IN ('lunas', 'belum')) DEFAULT 'belum',
    tanggal_bayar DATETIME,
    metode_bayar TEXT, -- Tunai / Transfer / dll
    catatan TEXT,
    FOREIGN KEY (santri_id) REFERENCES santri(id)
);

-- Tabel Infaq (Sumbangan Sukarela)
CREATE TABLE IF NOT EXISTS infaq (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_pemberi TEXT NOT NULL, -- Bisa santri atau umum
    nominal INTEGER NOT NULL, -- Dalam Rupiah
    kategori TEXT, -- Operasional / Pembangunan / Kegiatan / dll
    tanggal DATETIME DEFAULT CURRENT_TIMESTAMP,
    metode TEXT, -- Tunai / Transfer / dll
    catatan TEXT
);

-- Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_syahriah_santri ON syahriah(santri_id);
CREATE INDEX IF NOT EXISTS idx_syahriah_bulan ON syahriah(bulan);
CREATE INDEX IF NOT EXISTS idx_infaq_tanggal ON infaq(tanggal);
