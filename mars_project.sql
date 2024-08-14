-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Agu 2024 pada 16.16
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mars_project`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `keberangkatan`
--

CREATE TABLE `keberangkatan` (
  `id` int(255) NOT NULL,
  `nama_agen_kapal` varchar(255) NOT NULL,
  `perusahaan_agen_kapal` varchar(255) NOT NULL,
  `imo_number` varchar(255) NOT NULL,
  `nama_kapal` varchar(255) NOT NULL,
  `kebangsaan_kapal` varchar(255) NOT NULL,
  `data_cru_indonesia` int(11) NOT NULL,
  `data_cru_asing` int(11) NOT NULL,
  `pelabuhan_asal` varchar(255) NOT NULL,
  `pelabuhan_tujuan` varchar(255) NOT NULL,
  `service_location` varchar(255) NOT NULL,
  `jadwal_keberangkatan` date NOT NULL,
  `tujuan_keberangkatan` varchar(255) NOT NULL,
  `dokument` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Menunggu',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kedatangan`
--

CREATE TABLE `kedatangan` (
  `id` int(255) NOT NULL,
  `nama_agen_kapal` varchar(255) NOT NULL,
  `perusahaan_agen_kapal` varchar(255) NOT NULL,
  `imo_number` int(11) NOT NULL,
  `nama_kapal` varchar(255) NOT NULL,
  `kebangsaan_kapal` varchar(255) NOT NULL,
  `data_cru_indonesia` int(11) NOT NULL,
  `data_cru_asing` int(11) NOT NULL,
  `pelabuhan_asal` varchar(255) NOT NULL,
  `pelabuhan_tujuan` varchar(255) NOT NULL,
  `service_location` varchar(255) NOT NULL,
  `jadwal_kedatangan` date NOT NULL,
  `tujuan_kedatangan` varchar(255) NOT NULL,
  `dokument` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Menunggu',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `count` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `request_register`
--

CREATE TABLE `request_register` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_agen_kapal` varchar(255) NOT NULL,
  `nama_perusahaan` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `no_hp_agen` int(35) NOT NULL,
  `alamat_perusahaan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sign_off`
--

CREATE TABLE `sign_off` (
  `id` int(255) NOT NULL,
  `nama_cru` varchar(255) NOT NULL,
  `no_paspor` varchar(255) NOT NULL,
  `kebangsaan_cru` varchar(255) NOT NULL,
  `tg_rencana_sign_off` date NOT NULL,
  `nama_kapal` varchar(255) NOT NULL,
  `kebangsaan_kapal` varchar(255) NOT NULL,
  `surat` varchar(255) NOT NULL,
  `waktu_lapor` timestamp NOT NULL DEFAULT current_timestamp(),
  `nama_agen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sign_on`
--

CREATE TABLE `sign_on` (
  `id` int(255) NOT NULL,
  `nama_cru` varchar(255) NOT NULL,
  `no_paspor` varchar(255) NOT NULL,
  `kebangsaan_cru` varchar(255) NOT NULL,
  `tg_rencana_sign_on` date NOT NULL,
  `nama_kapal` varchar(255) NOT NULL,
  `kebangsaan_kapal` varchar(255) NOT NULL,
  `surat` varchar(255) NOT NULL,
  `waktu_lapor` timestamp NOT NULL DEFAULT current_timestamp(),
  `nama_agen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `keberangkatan`
--
ALTER TABLE `keberangkatan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kedatangan`
--
ALTER TABLE `kedatangan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `request_register`
--
ALTER TABLE `request_register`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sign_off`
--
ALTER TABLE `sign_off`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sign_on`
--
ALTER TABLE `sign_on`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `keberangkatan`
--
ALTER TABLE `keberangkatan`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `kedatangan`
--
ALTER TABLE `kedatangan`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `request_register`
--
ALTER TABLE `request_register`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `sign_off`
--
ALTER TABLE `sign_off`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `sign_on`
--
ALTER TABLE `sign_on`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
