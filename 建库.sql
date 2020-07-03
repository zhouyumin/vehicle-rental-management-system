-- ------------------------------------------------
-- create database vehicle_rental_management_system
-- ------------------------------------------------
DROP DATABASE IF EXISTS vehicle_rental_management_system;
CREATE DATABASE vehicle_rental_management_system;


-- ---------------------------------------------
-- use database vehicle_rental_management_system
-- ---------------------------------------------
USE vehicle_rental_management_system;


-- ----------------------------
-- Table structure for Admin
-- ----------------------------
DROP TABLE IF EXISTS Admin;
CREATE TABLE Admin (
	username VARCHAR(20) PRIMARY KEY NOT NULL,
	passwd VARCHAR(20) NOT NULL 
);

-- ----------------------------
-- Records of Admin
-- ----------------------------
INSERT INTO Admin VALUES ('admin', 'admin123');


-- ----------------------------
-- Table structure for carMessage
-- ----------------------------
DROP TABLE IF EXISTS carMessage;
CREATE TABLE carMessage  (
  carId varchar(50)  PRIMARY KEY NOT NULL,
  carType varchar(50),
  carName varchar(50),
  carBuyTime date,
  carRentStandard int(0),
  carState varchar(20)
);

-- ----------------------------
-- Records of carMessage
-- ----------------------------
INSERT INTO carMessage VALUES ('1A001', '中型车', '奥迪', '2018-10-15', 100, '可出租');
INSERT INTO carMessage VALUES ('1A002', '小型车', '大众', '2019-10-15', 80, '可出租');
INSERT INTO carMessage VALUES ('1A003', '大型车', '五菱宏光', '2019-08-12', 120, '可出租');
INSERT INTO carMessage VALUES ('1A004', '紧凑型车', '丰田', '2019-09-12', 110, '可出租');
INSERT INTO carMessage VALUES ('1A005', '大型车', '马自达', '2019-11-12', 120, '可出租');
INSERT INTO carMessage VALUES ('1A006', '三轮车', '宗申', '2020-05-12', 120, '可出租');

-- ----------------------------
-- Table structure for clientMessage
-- ----------------------------
DROP TABLE IF EXISTS clientMessage;
CREATE TABLE clientMessage  (
  clientId varchar(50)  PRIMARY KEY NOT NULL,
  clientIdCard varchar(50),
  clientName varchar(50),
  clientSex varchar(20),
  clientAge int(0),
  clientPhone varchar(50),
  clientAddress varchar(50)
);

-- ----------------------------
-- Records of clientMessage
-- ----------------------------
INSERT INTO clientMessage VALUES ('CL001', '320100************', '赵峰', '男', 26, '133****0510', '江苏南京');
INSERT INTO clientMessage VALUES ('CL002', '320200************', '钱林', '男', 27, '135****0517', '江苏无锡');
INSERT INTO clientMessage VALUES ('CL003', '320300************', '孙淼', '男', 28, '172****7745', '江苏徐州');
INSERT INTO clientMessage VALUES ('CL004', '320400************', '李鑫', '男', 29, '199****8976', '江苏常州');
INSERT INTO clientMessage VALUES ('CL005', '320500************', '周欣', '女', 27, '178****0796', '江苏苏州');
