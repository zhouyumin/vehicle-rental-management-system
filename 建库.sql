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
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS admin;
CREATE TABLE admin (
	username VARCHAR(20) PRIMARY KEY NOT NULL,
	passwd VARCHAR(20) NOT NULL 
);

-- ----------------------------
-- Records of Admin
-- ----------------------------
INSERT INTO admin VALUES ('admin', 'admin123');
INSERT INTO admin VALUES ('test', 'test');


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
INSERT INTO carMessage VALUES ('1A001', '中型车', '奥迪', '2018-10-15', 100, '已租用');
INSERT INTO carMessage VALUES ('1A002', '小型车', '大众', '2019-10-15', 80, '已租用');
INSERT INTO carMessage VALUES ('1A003', '大型车', '五菱宏光', '2019-08-12', 120, '已租用');
INSERT INTO carMessage VALUES ('1A004', '紧凑型车', '丰田', '2019-09-12', 110, '已租用');
INSERT INTO carMessage VALUES ('1A005', '大型车', '马自达', '2019-11-12', 120, '已租用');
INSERT INTO carMessage VALUES ('1A006', '三轮车', '宗申', '2020-05-12', 120, '已租用');


-- ----------------------------
-- Table structure for clientMessage
-- ----------------------------
DROP TABLE IF EXISTS clientMessage;
CREATE TABLE clientMessage  (
  clientId varchar(50)  PRIMARY KEY NOT NULL,
  clientIdCard varchar(50),
  clientName varchar(50),
  clientSex varchar(20),
  clientAge int,
  clientPhone varchar(50),
  clientAddress varchar(50)
);

-- ----------------------------
-- Records of clientMessage
-- ----------------------------
INSERT INTO clientMessage VALUES ('C001', '320100************', '赵峰', '男', 26, '133****0510', '江苏南京');
INSERT INTO clientMessage VALUES ('C002', '320200************', '钱林', '男', 27, '135****0517', '江苏无锡');
INSERT INTO clientMessage VALUES ('C003', '320300************', '孙淼', '男', 28, '172****7745', '江苏徐州');
INSERT INTO clientMessage VALUES ('C004', '320400************', '李鑫', '男', 29, '199****8976', '江苏常州');
INSERT INTO clientMessage VALUES ('C005', '320500************', '周欣', '女', 27, '178****0796', '江苏苏州');


-- ---------------------------------
-- Table structure for driverMessage
-- ---------------------------------
drop table if exists driverMessage;
create table driverMessage (
driverId varchar(50) primary key not null,
driverIdCard varchar(50),
driverName varchar(50),
driverSex varchar(20),
driverAge int,
driverPhone varchar(50),
driverAddress varchar(50)
);

-- ----------------------------
-- Records of driverMessage
-- ----------------------------
INSERT INTO driverMessage VALUES ('D001', '320100************', '王明', '男', 26, '133****0510', '江苏南京');
INSERT INTO driverMessage VALUES ('D002', '320200************', '黄浩', '男', 27, '135****0517', '江苏无锡');
INSERT INTO driverMessage VALUES ('D003', '320300************', '李雷', '男', 28, '172****7745', '江苏徐州');
INSERT INTO driverMessage VALUES ('D004', '320400************', '杨星', '男', 29, '199****8976', '江苏常州');
INSERT INTO driverMessage VALUES ('D005', '320500************', '张泽', '女', 27, '178****0796', '江苏苏州');


-- ----------------------------
-- Table structure for rentRecord
-- ----------------------------
drop table if exists rentRecord;
create table rentRecord (
rentId varchar(50) primary key not null,
clientId varchar(50) references clientMessage(clientId),
carId varchar(50) references carMessage(carId),
rentType varchar(20),
rentFromTime date,
rentToTime date
);

-- ----------------------------
-- Records of rentRecord
-- ----------------------------
insert into rentRecord values('00006','C001','1A001','日租','2020-6-16','2020-6-20');
insert into rentRecord values('00007','C002','1A002','日租','2020-07-01','2020-07-05');
insert into rentRecord values('00008','C003','1A003','年租','2019-08-16','2020-08-16');
insert into rentRecord values('00009','C004','1A004','月租','2019-12-10','2020-06-10');
insert into rentRecord values('00010','C005','1A005','月租','2020-06-16','2020-07-16');


-- ----------------------------
-- Table structure for returnRecord
-- ----------------------------
drop table if exists returnRecord;
create table returnRecord (
rentId varchar(50) primary key not null,
clientId varchar(50) references clientMessage(clientId),
carId varchar(50) references carMessage(carId),
rentType varchar(20),
rentFromTime date,
rentToTime date,
returnTime date
);

-- ----------------------------
-- Records of returnRecord
-- ----------------------------
insert into returnRecord values('00001','C001','1A001','日租','2018-10-16','2018-10-20','2018-10-20');
insert into returnRecord values('00002','C002','1A002','日租','2019-10-16','2019-10-20','2019-10-20');
insert into returnRecord values('00003','C003','1A003','年租','2019-08-16','2019-08-16','2019-08-16');
insert into returnRecord values('00004','C004','1A004','月租','2019-09-10','2019-11-10','2019-11-10');
insert into returnRecord values('00005','C005','1A005','月租','2019-11-16','2019-12-16','2019-12-16');


-- ----------------------------
-- Table structure for bookRecord
-- ----------------------------
drop table if exists bookRecord;
create table bookRecord (
rentId varchar(50) primary key not null,
clientId varchar(50) references clientMessage(clientId),
carId varchar(50) references carMessage(carId),
rentType varchar(20),
rentFromTime date,
rentToTime date,
bookTime date
);

-- ----------------------------
-- Records of bookRecord
-- ----------------------------
insert into bookRecord values('00011','C001','1A001','日租','2020-8-16','2020-8-20','2020-07-05');
insert into bookRecord values('00012','C002','1A002','日租','2020-08-01','2020-08-05','2020-05-01');
insert into bookRecord values('00013','C003','1A003','年租','2020-08-16','2021-08-16','2020-06-29');
insert into bookRecord values('00014','C004','1A004','月租','2020-8-10','2020-010-10','2020-07-01');
insert into bookRecord values('00015','C005','1A005','月租','2020-09-16','2022-09-16','2020-06-24');



