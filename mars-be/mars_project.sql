-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Jul 2024 pada 10.41
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

INSERT INTO `keberangkatan` (`nama_agen_kapal`, `perusahaan_agen_kapal`, `imo_number`, `nama_kapal`, `kebangsaan_kapal`, `data_cru_indonesia`, `data_cru_asing`, `pelabuhan_asal`, `pelabuhan_tujuan`, `service_location`, `jadwal_keberangkatan`, `tujuan_keberangkatan`, `dokument`) VALUES
('sdd', 'sdd', 'sdd123', 'sd', 'sdsd', 11, 11, 'sd', 'fdf', 'df', '2024-05-07', 'ad', 'sd'),
('te', 't', '1', 't', 't', 0, 0, 't', 't', 'Kantor Imigrasi Kelas II TPI Sabang', '2024-08-10', 'Clearance', 'dokument-1720336701024-.pdf');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kedatangan`
--

CREATE TABLE `kedatangan` (
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

INSERT INTO `kedatangan` (`nama_agen_kapal`, `perusahaan_agen_kapal`, `imo_number`, `nama_kapal`, `kebangsaan_kapal`, `data_cru_indonesia`, `data_cru_asing`, `pelabuhan_asal`, `pelabuhan_tujuan`, `service_location`, `jadwal_kedatangan`, `tujuan_kedatangan`, `dokument`) VALUES
('sdd', 'sdd', 0, 'sd', 'sdsd', 11, 11, 'sd', 'fdf', 'df', '2024-05-07', 'ad', 'sd'),
('kapal', 'kapal', 1223, 'kapal', 'kapal', 11, 11, 'kapal', 'kapal', 'kapal', '2024-05-07', 'kapal', 'kapal'),
('tes', 'tes', 123, 'tes', 'tes', 0, 0, 'tes', 'tes', 'Kantor Imigrasi Kelas II TPI Lhokseumawe', '2024-08-07', 'Medical Evacuation', 'dokument-1720335492710-.pdf'),
('tes', 'tes', 123, 'tes', 'tes', 0, 0, 're', 't', 'Kantor Imigrasi Kelas II TPI Lhokseumawe', '2024-07-07', 'Medical Evacuation', 'dokument-1720336679303-.pdf');

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
(4, '%count% kru melakukan sign-off', 'sign-off', 0, '2024-07-07 07:52:39', 1);

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
('abdil', '123', '123', 'Pt Tunas Bangsa', 'suksesselalubangku@gmail.com', 2147483647, 'jln. barangkali kenal, kec. ada project lagi? '),
('abdila', '123', '12', 'ssd', 'sdfs', 29993, 'fdg'),
('as', 'qwe', 'zdsw', 'ee', 'eew', 203, 'wew'),
('gibran', '1111111', 'GIB1', 'PT Aman', 'amansentosa@gmail.com', 88822212, 'Banda Aceh No.1'),
('jamal1', 'password', '101525AB', 'PT. Barito ', 'barito@gmail.com', 2147483647, 'Kalimantan Selatan'),
('tes', '123', 'tes', 'tes', 'tes@gmail.com', 812345678, 'tes');

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
('Abdillah M', '12812872', 'Indonesia', '2024-05-14', 'Donggala', 'Indonesia', 'ssssd', '2024-05-14', 'Gilang Pambua');

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
('Abdillah Mustamin', '1234532PAgd', 'Indonesia', '2024-05-14', 'Donggala', 'Indonesia', 'asds', '2024-05-14', 'Gillang Pambua');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT untuk tabel `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
