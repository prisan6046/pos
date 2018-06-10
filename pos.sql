-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2018 at 11:01 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `id_bill` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `pay` int(11) NOT NULL,
  `withdraw` int(11) NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`id_bill`, `price`, `pay`, `withdraw`, `datetime`) VALUES
(2, 200, 150, 50, '2018-01-11 04:50:10');

-- --------------------------------------------------------

--
-- Table structure for table `group_product`
--

CREATE TABLE `group_product` (
  `group_id` int(11) NOT NULL,
  `group_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `group_product`
--

INSERT INTO `group_product` (`group_id`, `group_name`) VALUES
(1, 'เหล็ก'),
(2, 'ไม้'),
(3, 'น้ำมัน'),
(4, 'วัสดุอุปกรณ์'),
(10, 'กระเบื้อง'),
(11, 'ควยโน็ต1'),
(12, 'เครื่องดื่ม');

-- --------------------------------------------------------

--
-- Table structure for table `listbuy`
--

CREATE TABLE `listbuy` (
  `id_buy` int(11) NOT NULL,
  `id_bill` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `qty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `listbuy`
--

INSERT INTO `listbuy` (`id_buy`, `id_bill`, `id_product`, `qty`) VALUES
(8, 2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `office`
--

CREATE TABLE `office` (
  `id_office` int(11) NOT NULL,
  `offname_thai` varchar(155) CHARACTER SET utf8 NOT NULL,
  `offname_eng` varchar(155) CHARACTER SET utf8 NOT NULL,
  `off_tel` varchar(15) CHARACTER SET utf8 NOT NULL,
  `off_tel1` varchar(15) CHARACTER SET utf8 NOT NULL,
  `off_fex` varchar(15) CHARACTER SET utf8 NOT NULL,
  `off_detail` text CHARACTER SET utf8 NOT NULL,
  `user_contect` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `office`
--

INSERT INTO `office` (`id_office`, `offname_thai`, `offname_eng`, `off_tel`, `off_tel1`, `off_fex`, `off_detail`, `user_contect`) VALUES
(1, 'ศีไทย', '', '0902681080', '0902681080', '0902681080', '<p>บ้านเลขที่ 289 ต.ตะเคียน อ.ด่านขุทด จ.นครราชสีมา 30210 </p>', ''),
(2, 'เสริมสุข จำกัด', '-', '044-389-044', '090-268-1080', '044-389-045', '<p>บ้านเลขที่ 289 หมู่ 13 ต.ตะเคียน อ.ด่านขุนทด จ.นคราชสีมา 30210</p>\r\n', 'ไพศาล พิมพ์ประสาน'),
(3, 'โค้ก', 'Coca', '0-2616-5555', '0-2616-5555', '0-2616-5555', '<p>ไทยน้ำทิพย์ แมนูแฟคเจอริ่ง&nbsp;</p>\r\n', 'พรทิตย​์');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id_product` int(11) NOT NULL,
  `id_group` int(20) NOT NULL,
  `name_product` varchar(255) CHARACTER SET utf8 NOT NULL,
  `product_barcode` varchar(255) CHARACTER SET utf8 NOT NULL,
  `price` int(10) NOT NULL,
  `price_vat` int(11) NOT NULL,
  `group_office` int(11) NOT NULL,
  `stock_product` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id_product`, `id_group`, `name_product`, `product_barcode`, `price`, `price_vat`, `group_office`, `stock_product`) VALUES
(1, 1, 'Euro Cake', '8850426000236', 5, 0, 1, 0),
(2, 2, 'หัวแร้ง', '6947532002550', 150, 55000, 2, 50),
(3, 12, 'โค้ด', '8851959142011', 25, 20, 3, 150);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id_bill`);

--
-- Indexes for table `group_product`
--
ALTER TABLE `group_product`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `listbuy`
--
ALTER TABLE `listbuy`
  ADD PRIMARY KEY (`id_buy`);

--
-- Indexes for table `office`
--
ALTER TABLE `office`
  ADD PRIMARY KEY (`id_office`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_product`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `id_bill` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `group_product`
--
ALTER TABLE `group_product`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `listbuy`
--
ALTER TABLE `listbuy`
  MODIFY `id_buy` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `office`
--
ALTER TABLE `office`
  MODIFY `id_office` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
