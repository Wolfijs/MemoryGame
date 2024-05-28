-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 28, 2024 at 08:43 PM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `memory`
--

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `ScoreID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Score` int(11) NOT NULL,
  `Level` int(11) NOT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`ScoreID`, `UserID`, `Score`, `Level`, `Timestamp`) VALUES
(1, 1, 6, 1, '2024-05-28 12:20:15'),
(2, 1, 3, 1, '2024-05-28 12:24:52'),
(3, 1, 3, 1, '2024-05-28 12:25:10'),
(4, 1, 3, 1, '2024-05-28 12:25:27'),
(5, 1, 9, 2, '2024-05-28 12:25:45'),
(6, 2, 9, 2, '2024-05-28 12:26:53'),
(7, 3, 9, 2, '2024-05-28 12:34:11'),
(8, 3, 9, 2, '2024-05-28 12:51:11'),
(9, 1, 3, 1, '2024-05-28 12:52:41'),
(10, 1, 3, 1, '2024-05-28 13:04:42'),
(11, 3, 9, 2, '2024-05-28 14:39:24'),
(12, 3, 6, 1, '2024-05-28 14:39:40'),
(13, 1, 12, 2, '2024-05-28 14:45:39'),
(14, 2, 12, 2, '2024-05-28 14:45:39'),
(15, 1, 15, 2, '2024-05-28 14:45:52'),
(16, 2, 15, 2, '2024-05-28 14:45:52'),
(17, 3, 3, 1, '2024-05-28 16:15:56'),
(18, 3, 12, 2, '2024-05-28 16:18:45'),
(19, 3, 9, 2, '2024-05-28 16:26:23'),
(20, 7, 100, 10, '2024-05-28 20:03:33'),
(21, 7, 250, 25, '2024-05-28 20:04:31'),
(22, 7, 500, 50, '2024-05-28 20:04:45'),
(23, 7, 750, 75, '2024-05-28 20:05:59'),
(24, 7, 1000, 100, '2024-05-28 20:06:16'),
(25, 4, 100, 10, '2024-05-28 20:34:45');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `Username`, `Email`, `Password`) VALUES
(1, 'Kakis1', 'Kakis1@gmail.com', '$2y$10$ColZjyZtT2ePWcUkzh4esehUZVsAg8iaN.43hyt09bDlZAegjTkiG'),
(2, 'Volters123', 'Volters@gmail.com', '$2y$10$it4LnUsfytI7Oi64E7Lm/e6ettwJIeUWKjS9E7vSv9WwyWTXjIPnC'),
(3, 'Cuska123', 'Cuska123@gmail.com', '$2y$10$82gPNhtJ6vmR52dDn86tL.K24XOaWABuxCrCk7artU2k97EdOHbjy'),
(4, 'Imka1234', 'Imka@gmail.com', '$2y$10$utRHZiOUQRVk9fv206nq/eZc5TlQRq4jHiDx9ROe74nGBTg2a2AkS'),
(5, 'Valters123', 'Valters@gmail.com', '$2y$10$ssqL6Eny3Kc0jJNIuDm9Wuqut1aiI.ugdWEFYGGlhddPws7yZ30ni'),
(7, 'Testers123', 'Testers123@gmail.com', '$2y$10$MnqBU0hjU1JX7CjUAdekB.yzIp6Wsa/OHJI4nWDH.WnFRYLyetRuG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`ScoreID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `ScoreID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
