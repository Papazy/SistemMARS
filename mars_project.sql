-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 05 Agu 2024 pada 13.16
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
  `dokument` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `keberangkatan`
--

INSERT INTO `keberangkatan` (`id`, `nama_agen_kapal`, `perusahaan_agen_kapal`, `imo_number`, `nama_kapal`, `kebangsaan_kapal`, `data_cru_indonesia`, `data_cru_asing`, `pelabuhan_asal`, `pelabuhan_tujuan`, `service_location`, `jadwal_keberangkatan`, `tujuan_keberangkatan`, `dokument`) VALUES
(1, 't', 't', 't', 't', 't', 0, 0, 't', 't', 'Kantor Imigrasi Kelas II TPI Lhokseumawe', '2024-07-16', 'Medical Evacuation', 'dokument-1721075054606.pdf'),
(2, 'tes', 'tes', 't', 't', 't', 0, 0, 't', 't', 'Kantor Imigrasi Kelas II TPI Lhokseumawe', '2024-07-29', 'Medical Evacuation', 'dokument-1722196266688.pdf');

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
  `dokument` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kedatangan`
--

INSERT INTO `kedatangan` (`id`, `nama_agen_kapal`, `perusahaan_agen_kapal`, `imo_number`, `nama_kapal`, `kebangsaan_kapal`, `data_cru_indonesia`, `data_cru_asing`, `pelabuhan_asal`, `pelabuhan_tujuan`, `service_location`, `jadwal_kedatangan`, `tujuan_kedatangan`, `dokument`) VALUES
(41, 'Fajry Ariansyah', 'Halteks Studio', 192323, 'Titanic', 'Indonesia', 0, 0, 'Lhokseumawe', 'Banda Aceh', 'Kantor Imigrasi Kelas II TPI Lhokseumawe', '2024-12-31', 'Medical Evacuation', 'dokument-1722528845355.pdf'),
(42, 'Fajry Ariansyah', 'Halteks Studio', 192323, 'Titanic', 'Indonesia', 0, 0, 'Lhokseumawe', 'Banda Aceh', 'Kantor Imigrasi Kelas II TPI Lhokseumawe', '2024-12-31', 'Medical Evacuation', 'dokument-1722528845355.pdf');

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

--
-- Dumping data untuk tabel `notifications`
--

INSERT INTO `notifications` (`id`, `message`, `type`, `count`, `created_at`, `is_read`) VALUES
(1, 'Terdapat %count% kapal yang akan datang', 'kedatangan', 0, '2024-07-07 07:51:13', 1),
(2, 'Terdapat %count% kapal yang akan berangkat', 'berangkat', 0, '2024-07-07 07:51:13', 1),
(3, '%count% kru melakukan sign-on', 'sign-on', 0, '2024-07-07 07:52:39', 1),
(4, '%count% kru melakukan sign-off', 'sign-off', 0, '2024-07-07 07:52:39', 1),
(5, 'Terdapat %count% data kapal berangkat yang diperbarui', 'berangkat-update\r\n', 0, '2024-07-29 21:47:49', 1),
(6, 'Terdapat %count% kapal berangkat dicancel', 'berangkat-delete', 0, '2024-07-29 21:47:49', 1),
(7, 'Terdapat %count% data kapal datang yang diperbarui', 'datang-update\r\n', 0, '2024-07-29 21:47:49', 1),
(8, 'Terdapat %count% kapal datang dicancel', 'datang-delete', 0, '2024-07-29 21:47:49', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `request_register`
--

CREATE TABLE `request_register` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_agen_kapal` varchar(255) NOT NULL,
  `nama_perusahaan` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `no_hp_agen` int(35) NOT NULL,
  `alamat_perusahaan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `request_register`
--

INSERT INTO `request_register` (`username`, `password`, `id_agen_kapal`, `nama_perusahaan`, `email`, `no_hp_agen`, `alamat_perusahaan`) VALUES
('', '', '', '', '', 0, ''),
('abdil', '123', '123', 'Pt Tunas Bangsa', 'suksesselalubangku@gmail.com', 2147483647, 'jln. barangkali kenal, kec. ada project lagi? '),
('abdila', '123', '12', 'ssd', 'sdfs', 29993, 'fdg'),
('as', 'qwe', 'zdsw', 'ee', 'eew', 203, 'wew'),
('fajry', '123', 'fajry', 'fajry', 'fajry@gmail.com', 822, 'fajry'),
('Fajry Ariansyah', 'fajry', '12345', 'Halteks Studio', 'fajry@gmail.com', 2147483647, 'Banda Aceh'),
('gibran', '1111111', 'GIB1', 'PT Aman', 'amansentosa@gmail.com', 88822212, 'Banda Aceh No.1'),
('jamal1', 'password', '101525AB', 'PT. Barito ', 'barito@gmail.com', 2147483647, 'Kalimantan Selatan'),
('te', 'tew', 'tes', 'tes', 'tes@gmail.com', 0, 'ste'),
('tes', '123', 'tes', 'tes', 'tes@gmail.com', 812345678, 'tes'),
('tes1', '123', 'tes', 'tes', 'tes@gmail.com', 0, 'tes'),
('tes11', 'tes', 'tes11', 'tes', 'tes@gmail.com', 0, 'tes'),
('tes12', 'tes', 'tes12', 'tes', 'tes@gmail.com', 0, 'tes'),
('tes13', 'tes', 'tes13', 'tes', 'tes@gmail.com', 0, 'tes'),
('tes14', 'tes', 'tes14', 'tes', 'tes@gmail.com', 0, 'tes'),
('tes15', 'tes', 'tes15', 'tes', 'tes@gmail.com', 0, 'tes'),
('tes16', 'tes', 'tes16', 'tes', 'tes@gmail.com', 0, 'tes'),
('tes2', 'tes', 'tes2', 'tes', 'tes@gmail.com', 0, 'tes'),
('tes3', 'tes', 'tes3', 'tes', 'tes@gmail.com', 0, 'tes'),
('tes4', 'tes', 'tes4', 'tes', 'tes@gmail.com', 0, 'tes'),
('tes5', 'tes', 'tes5', 'tes', 'tes@gmail.com', 0, 'tes'),
('tes6', 'tes', 'tes6', 'tes', 'tes@gmail.com', 0, 'tes'),
('tes7', 'tes', 'tes7', 'tes', 'tes@gmail.com', 0, 'tes'),
('tes8', 'tes', 'tes8', 'tes', 'tes@gmail.com', 0, 'tes'),
('tes9', 'tes', 'tes9', 'tes', 'tes@gmail.com', 0, 'tes');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sign_off`
--

CREATE TABLE `sign_off` (
  `nama_cru` varchar(255) NOT NULL,
  `no_paspor` varchar(255) NOT NULL,
  `kebangsaan_cru` varchar(255) NOT NULL,
  `tg_rencana_sign_off` date NOT NULL,
  `nama_kapal` varchar(255) NOT NULL,
  `kebangsaan_kapal` varchar(255) NOT NULL,
  `surat` varchar(255) NOT NULL,
  `waktu_lapor` date NOT NULL,
  `nama_agen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sign_off`
--

INSERT INTO `sign_off` (`nama_cru`, `no_paspor`, `kebangsaan_cru`, `tg_rencana_sign_off`, `nama_kapal`, `kebangsaan_kapal`, `surat`, `waktu_lapor`, `nama_agen`) VALUES
('Abdillah M', '12812872', 'Indonesia', '2024-05-14', 'Donggala', 'Indonesia', 'ssssd', '2024-05-14', 'Gilang Pambua'),
('t', 't', 't', '2024-07-07', 't', 't', '', '0000-00-00', 't');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sign_on`
--

CREATE TABLE `sign_on` (
  `nama_cru` varchar(255) NOT NULL,
  `no_paspor` varchar(255) NOT NULL,
  `kebangsaan_cru` varchar(255) NOT NULL,
  `tg_rencana_sign_on` date NOT NULL,
  `nama_kapal` varchar(255) NOT NULL,
  `kebangsaan_kapal` varchar(255) NOT NULL,
  `surat` varchar(255) NOT NULL,
  `waktu_lapor` date NOT NULL,
  `nama_agen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sign_on`
--

INSERT INTO `sign_on` (`nama_cru`, `no_paspor`, `kebangsaan_cru`, `tg_rencana_sign_on`, `nama_kapal`, `kebangsaan_kapal`, `surat`, `waktu_lapor`, `nama_agen`) VALUES
('Abdillah Mustamin', '1234532PAgd', 'Indonesia', '2024-05-14', 'Donggala', 'Indonesia', 'asds', '2024-05-14', 'Gillang Pambua'),
('t', 't', 't', '2024-07-07', 't', 't', '', '2024-07-07', 't'),
('tes', 'ter', 't', '2024-07-23', 't', 't', '', '2024-01-01', 't');

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
  ADD PRIMARY KEY (`username`);

--
-- Indeks untuk tabel `sign_off`
--
ALTER TABLE `sign_off`
  ADD PRIMARY KEY (`no_paspor`);

--
-- Indeks untuk tabel `sign_on`
--
ALTER TABLE `sign_on`
  ADD PRIMARY KEY (`no_paspor`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `keberangkatan`
--
ALTER TABLE `keberangkatan`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `kedatangan`
--
ALTER TABLE `kedatangan`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT untuk tabel `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
