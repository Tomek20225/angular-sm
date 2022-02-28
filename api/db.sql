-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Czas generowania: 28 Lut 2022, 21:40
-- Wersja serwera: 10.5.12-MariaDB-102+deb11u1
-- Wersja PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `recodeit_6`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `posts`
--

CREATE TABLE `posts` (
  `id` int(10) UNSIGNED NOT NULL,
  `author_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `body` text CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `date` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Zrzut danych tabeli `posts`
--

INSERT INTO `posts` (`id`, `author_id`, `title`, `body`, `date`) VALUES
(1, 1, 'Post testowy', 'Pobiera zdjęcia z linków:\nhttps://i.ytimg.com/vi/rxDfD5RhCpg/maxresdefault.jpg', '2020-04-12 00:00:00'),
(11, 1, 'Post testowy 3', 'Pobiera zdjęcia z tagów:\r\nhttp://recodeit-testy-3.cba.pl/test-image/', '2022-02-28 21:20:05'),
(3, 1, 'Post testowy 2', 'Nie pobiera zdjęć, jeśli strona na to nie pozwala:\r\nhttp://wiktormed.pl/', '2020-04-14 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `surname` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `surname`) VALUES
(1, 'tomek20225@op.pl', 'test123', 'Tomek', 'Kapcia'),
(2, 'Sincere@april.biz', 'Sincere@april.biz', 'April', 'Sincere'),
(7, 'final@op.pl', 'finaltest', 'Final', 'Test');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
