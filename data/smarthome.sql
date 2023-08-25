CREATE DATABASE smarthome;
USE smarthome;

CREATE TABLE User 
(
    ID                  INT NOT NULL AUTO_INCREMENT,
    SSN                 VARCHAR(300) NOT NULL,
    Email               VARCHAR(300) NOT NULL,
    Phone               VARCHAR(300) NOT NULL,
    FName               VARCHAR(300) NOT NULL,
    LName               VARCHAR(300) NOT NULL,
    Avatar              VARCHAR(500),
    City                VARCHAR(300),
    District            VARCHAR(300),
    Username            VARCHAR(300) NOT NULL,
    Pass                VARCHAR(300) NOT NULL,
    refreshToken        VARCHAR(256),
    Role                char(2) check(Role in ('AD', 'CU')),
    constraint FK_User primary key (ID) 
);

CREATE TABLE House
(
    ID                  INT NOT NULL AUTO_INCREMENT,
    Housename           VARCHAR(300) NOT NULL,
    House_address       VARCHAR(300) NOT NULL,
    UserID              INT NOT NULL,
    constraint PK_Home primary key (ID),
    constraint FK_Home_User foreign key (UserID) references User(ID) ON DELETE CASCADE
);

CREATE TABLE Room 
(
    ID                  INT NOT NULL AUTO_INCREMENT,
    Roomname            VARCHAR(300) NOT NULL,
    HouseID             INT NOT NULL,
    constraint PK_Room primary key (ID),
    constraint FK_Room_House foreign key (HouseID) references House(ID) ON DELETE CASCADE
);

CREATE TABLE Device
(
    ID                  INT NOT NULL AUTO_INCREMENT,
    Devicename          VARCHAR(300) NOT NULL UNIQUE,
    Device_Status       VARCHAR(300) NOT NULL,
    Mode                VARCHAR(300) NOT NULL,
    Day_add             DATETIME NOT NULL,
    RoomID              INT NOT NULL,
    constraint PK_Device primary key (ID),
    constraint FK_Device_Room foreign key (RoomID) references Room(ID) ON DELETE CASCADE
);

CREATE TABLE Device_History
(
    ID                  INT NOT NULL,
    Turn_on_time        DATETIME NOT NULL,
    Turn_off_time       DATETIME,
    constraint PK_DeviceHistory primary key (ID, Turn_on_time),
    constraint FK_Device foreign key (ID) references Device(ID) ON DELETE CASCADE
);

CREATE TABLE Sensor
(
    ID                  INT NOT NULL AUTO_INCREMENT,
    DeviceID            INT,
    constraint PK_S primary key(ID),
    constraint FK_S foreign key(DeviceID) references Device(ID) 
);

CREATE TABLE RecordT
(
    SensorID            INT NOT NULL,      
    TimeDate            DATETIME NOT NULL,
    Temperature         decimal(10,1),
    constraint PK_RT primary key(SensorID, TimeDate),
    constraint FK_RT foreign key(SensorID) references Sensor(ID) ON DELETE CASCADE
);

CREATE TABLE RecordH
(
    SensorID            INT NOT NULL,      
    TimeDate            DATETIME NOT NULL,
    Humidity            decimal(10,1),
    constraint PK_RH primary key(SensorID, TimeDate),
    constraint FK_RH foreign key(SensorID) references Sensor(ID) ON DELETE CASCADE
);

CREATE TABLE Light
(
    ID                  INT NOT NULL,
    constraint PK_Light primary key (ID),
    constraint FK_Light foreign key (ID) references Device(ID) ON DELETE CASCADE
);

CREATE TABLE Door
(
    ID                  INT NOT NULL,
    constraint PK_Door primary key (ID),
    constraint FK_Door foreign key (ID) references Device(ID) ON DELETE CASCADE
);

CREATE TABLE Air_Condition
(
    ID                  INT NOT NULL,
    Temperature_D       decimal(10,1) NOT NULL,
    Humidity_D          decimal(10,1) NOT NULL,
    constraint PK_AC primary key (ID),
    constraint FK_AC foreign key (ID) references Device(ID) ON DELETE CASCADE
);

CREATE TABLE Water_pumps
(
    ID                  INT NOT NULL,
    Temperature_D       decimal(10,1) NOT NULL,
    Humidity_D          decimal(10,1) NOT NULL,
    constraint PK_WP primary key (ID),
    constraint FK_WP foreign key (ID) references Device(ID) ON DELETE CASCADE
);