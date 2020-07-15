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
INSERT INTO Admin VALUES ('test', 'test');


-- ----------------------------
-- Table structure for carMessage
-- ----------------------------
DROP TABLE IF EXISTS carMessage;
CREATE TABLE carMessage  (
  carId bigint  PRIMARY KEY NOT NULL auto_increment,
  carType varchar(10) not null,
  carName varchar(10) not null,
  carBuyTime date not null,
  carRentStandard decimal(10,2) not null,
  carState varchar(10) not null
);

-- ----------------------------
-- Records of carMessage
-- ----------------------------
INSERT INTO carMessage VALUES ('11001', '中型车', '奥迪', '2018-10-15', 100, '可出租');
INSERT INTO carMessage VALUES ('11002', '小型车', '大众', '2019-10-15', 80, '可出租');
INSERT INTO carMessage VALUES ('11003', '大型车', '五菱宏光', '2019-08-12', 120, '可出租');
INSERT INTO carMessage VALUES ('11004', '紧凑型车', '丰田', '2019-09-12', 110, '可出租');
INSERT INTO carMessage VALUES ('11005', '大型车', '马自达', '2019-11-12', 120, '可出租');
INSERT INTO carMessage VALUES ('11006', '小型车', '雪佛兰', '2020-05-13', 110, '已租用');
INSERT INTO carMessage VALUES ('11007', '商务车', '现代', '2020-05-11', 100, '已租用');
INSERT INTO carMessage VALUES ('11008', '商务车', '别克', '2020-05-09', 115, '已租用');
INSERT INTO carMessage VALUES ('11009', '小型车', '奔驰', '2020-05-01', 100, '已租用');
INSERT INTO carMessage VALUES ('11010', '中型车', '路虎', '2020-05-13', 90, '已租用');


-- ----------------------------
-- Table structure for clientMessage
-- ----------------------------
DROP TABLE IF EXISTS clientMessage;
CREATE TABLE clientMessage  (
  clientId bigint  PRIMARY KEY NOT NULL auto_increment,
  clientIdCard varchar(20) not null,
  clientName varchar(10) not null,
  clientSex varchar(5) not null,
  clientAge int,
  clientPhone varchar(20) not null,
  clientAddress varchar(50) not null
);

-- ----------------------------
-- Records of clientMessage
-- ----------------------------
INSERT INTO clientMessage VALUES ('10001', '320100************', '赵峰', '男', 26, '133****0510', '江苏南京');
INSERT INTO clientMessage VALUES ('10002', '320200************', '钱林', '男', 27, '135****0517', '江苏无锡');
INSERT INTO clientMessage VALUES ('10003', '320300************', '孙淼', '男', 28, '172****7745', '江苏徐州');
INSERT INTO clientMessage VALUES ('10004', '320400************', '李鑫', '男', 29, '199****8976', '江苏常州');
INSERT INTO clientMessage VALUES ('10005', '320500************', '周欣', '女', 27, '178****0796', '江苏苏州');


-- ---------------------------------
-- Table structure for driverMessage
-- ---------------------------------
drop table if exists driverMessage;
create table driverMessage (
driverId bigint primary key not null auto_increment,
driverIdCard varchar(20) not null,
driverName varchar(10) not null,
driverSex varchar(5) not null,
driverAge int not null,
driverPhone varchar(20) not null,
driverAddress varchar(50) not null,
driverState varchar(10) not null
);

-- ----------------------------
-- Records of driverMessage
-- ----------------------------
INSERT INTO driverMessage VALUES ('1111', '320100************', '王明', '男', 26, '133****0510', '江苏南京','未接单');
INSERT INTO driverMessage VALUES ('1112', '320200************', '黄浩', '男', 27, '135****0517', '江苏无锡','未接单');
INSERT INTO driverMessage VALUES ('1113', '320300************', '李雷', '男', 28, '172****7745', '江苏徐州','未接单');
INSERT INTO driverMessage VALUES ('1114', '320400************', '杨星', '男', 29, '199****8976', '江苏常州','未接单');
INSERT INTO driverMessage VALUES ('1115', '320500************', '张泽', '女', 27, '178****0796', '江苏苏州','未接单');


-- ----------------------------
-- Table structure for rentRecord
-- ----------------------------
drop table if exists rentRecord;
create table rentRecord (
rentId bigint primary key not null auto_increment,
clientId bigint not null,
carId bigint not null,
driverId bigint,
rentType varchar(5) not null,
rentFromTime date not null,
rentToTime date not null,
foreign key (clientId) references clientMessage(clientId),
foreign key (carId) references carMessage(carId),
foreign key (driverId) references driverMessage(driverId)
);

-- ----------------------------
-- Records of rentRecord
-- ----------------------------
insert into rentRecord values('11006','10001','11006','1111','日租','2020-6-16','2020-6-20');
insert into rentRecord values('11007','10002','11007','1112','日租','2020-07-01','2020-07-05');
insert into rentRecord values('11008','10003','11008','1113','年租','2019-08-16','2020-08-16');
insert into rentRecord values('11009','10004','11009','1114','月租','2019-12-10','2020-06-10');
insert into rentRecord values('11010','10005','11010','1115','月租','2020-06-16','2020-07-16');

-- ----------------------------
-- Table structure for returnRecord
-- ----------------------------
drop table if exists returnRecord;
create table returnRecord (
rentId bigint primary key not null auto_increment,
clientId bigint not null,
carId bigint not null,
driverId bigint,
rentType varchar(5) not null,
rentFromTime date not null,
rentToTime date not null,
rentTime int not null,
returnTime date not null,
rentMoney decimal(10,2) not null,
foreign key (clientId) references clientMessage(clientId),
foreign key (carId) references carMessage(carId),
foreign key (driverId) references driverMessage(driverId)
);

-- ----------------------------
-- Records of returnRecord
-- ----------------------------
insert into returnRecord values('11001','10001','11001','1111','日租','2018-10-16','2018-10-20',4,'2018-10-20',400.00);
insert into returnRecord values('11002','10002','11002','1112','日租','2019-10-16','2019-10-20',4,'2019-10-20',320.00);
insert into returnRecord values('11003','10003','11003','1113','年租','2019-08-16','2020-08-16',366,'2019-08-16',43920.00);
insert into returnRecord values('11004','10004','11004','1114','月租','2019-09-10','2019-11-10',61,'2019-11-10',6710.00);
insert into returnRecord values('11005','10005','11005','1115','月租','2019-11-16','2019-12-16',30,'2019-12-16',3600.00);

-- ----------------------------
-- Table structure for drive
-- ----------------------------
drop table if exists drive;
create table drive (
driverId bigint,
carId bigint not null,
driveFromTime date not null,
driveToTime date not null,
foreign key (driverId) references driverMessage(driverId),
foreign key (carId) references carMessage(carId)
);

-- ----------------------------
-- Records of drive
-- ----------------------------
insert into drive values('1111','11001','2018-10-16','2018-10-20');
insert into drive values('1112','11002','2019-10-16','2019-10-20');
insert into drive values('1113','11003','2019-08-16','2020-08-16');
insert into drive values('1114','11004','2019-09-10','2019-11-10');
insert into drive values('1115','11005','2019-11-16','2019-12-16');


-- ----------------------------
-- Table structure for bookRecord
-- ----------------------------
drop table if exists bookRecord;
create table bookRecord (
rentId bigint primary key not null auto_increment,
clientId bigint not null,
carId bigint not null,
rentType varchar(5) not null,
rentFromTime date not null,
rentToTime date not null,
bookTime date not null,
foreign key (clientId) references clientMessage(clientId),
foreign key (carId) references carMessage(carId)
);

-- ----------------------------
-- Records of bookRecord
-- ----------------------------
insert into bookRecord values('11011','10001','11001','日租','2020-8-16','2020-8-20','2020-07-05');
insert into bookRecord values('11012','10002','11002','日租','2020-08-01','2020-08-05','2020-05-01');
insert into bookRecord values('11013','10003','11003','年租','2020-08-16','2021-08-16','2020-06-29');
insert into bookRecord values('11014','10004','11004','月租','2020-8-10','2020-010-10','2020-07-01');
insert into bookRecord values('11015','10005','11005','月租','2020-09-16','2022-09-16','2020-06-24');



