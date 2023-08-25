INSERT INTO `User` (`ID`, `SSN`, `Email`, `Phone`, `FName`, `LName`, `City`, `District`, `Username`, `Pass`, `Role`) 
  VALUES ('1', '049202012323', 'hhao@gmail.com', '0912967100', 'Hao', 'Hoan', 'HCM', 'q1', 'hhao', '123123', 'CU');
INSERT INTO `User` (`ID`, `SSN`, `Email`, `Phone`, `FName`, `LName`, `City`, `District`, `Username`, `Pass`, `Role`) 
  VALUES ('3', '988798798723', 'VanC@gmail.com', '0912434343', 'Hao', 'Hoan', 'HCM', 'q1', 'VanC', '123123', 'CU');
INSERT INTO `User` (`ID`, `SSN`, `Email`, `Phone`, `FName`, `LName`, `City`, `District`, `Username`, `Pass`, `Role`) 
  VALUES ('4', '123798798327', 'VanE@gmail.com', '0912432342', 'Hao', 'Hoan', 'HCM', 'q1', 'VanE', '123123', 'CU');
INSERT INTO `User` (`ID`, `SSN`, `Email`, `Phone`, `FName`, `LName`, `City`, `District`, `Username`, `Pass`, `Role`) 
  VALUES ('5', '783798798327', 'VanF@gmail.com', '0912456731', 'Hao', 'Hoan', 'HCM', 'q1', 'VanF', '123123', 'CU');

INSERT INTO `House` (`ID`, `Housename`, `House_address`, `UserID`) VALUES ('1', 'My Home', 'TP HCM', '1');
INSERT INTO `House` (`ID`, `Housename`, `House_address`, `UserID`) VALUES ('2', 'my home', 'TP HCM', '3');
INSERT INTO `House` (`ID`, `Housename`, `House_address`, `UserID`) VALUES ('3', 'Super', 'TP HCM', '4');
INSERT INTO `House` (`ID`, `Housename`, `House_address`, `UserID`) VALUES ('4', 'penthouse', 'TP HCM', '5');

INSERT INTO `Room` (`ID`, `Roomname`, `HouseID`) VALUES ('1', 'kitchen', '1');
INSERT INTO `Room` (`ID`, `Roomname`, `HouseID`) VALUES ('2', 'kitchen', '1');
INSERT INTO `Room` (`ID`, `Roomname`, `HouseID`) VALUES ('3', 'kitchen', '2');
INSERT INTO `Room` (`ID`, `Roomname`, `HouseID`) VALUES ('4', 'kitchen', '2');
INSERT INTO `Room` (`ID`, `Roomname`, `HouseID`) VALUES ('5', 'kitchen', '3');
INSERT INTO `Room` (`ID`, `Roomname`, `HouseID`) VALUES ('6', 'kitchen', '3');
INSERT INTO `Room` (`ID`, `Roomname`, `HouseID`) VALUES ('7', 'kitchen', '4');
INSERT INTO `Room` (`ID`, `Roomname`, `HouseID`) VALUES ('8', 'kitchen', '4');

INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('1','light1','off','manual','2023-03-19 20:20:20','1');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('2','light2','off','manual','2023-03-19 20:20:30','1');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('3','light3','off','manual','2023-03-19 20:20:40','1');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('4','light4','off','manual','2023-03-19 20:20:50','1');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('7', 'light 7', 'off', 'manual', '2023-03-26 06:02:08', '2');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('8', 'light 8', 'off', 'manual', '2023-03-26 06:02:10', '2');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('9', 'ac 3', 'off', 'manual', '2023-03-26 06:02:10', '2');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('10', 'door 8', 'off', 'manual', '2023-03-26 06:02:10', '2');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('11', 'light 98', 'off', 'manual', '2023-03-26 06:02:10', '3');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('12', 'ac 4', 'off', 'manual', '2023-03-26 06:02:10', '3');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('13', 'light 10', 'off', 'manual', '2023-03-26 06:02:10', '4');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('14', 'AC 5', 'off', 'manual', '2023-03-26 06:02:10', '4');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('15', 'Door 4', 'off', 'manual', '2023-03-26 06:02:10', '4');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('16', 'WP 1', 'off', 'manual', '2023-03-26 06:02:10', '4');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('17', 'light 18', 'off', 'manual', '2023-03-26 06:02:10', '5');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('18', 'light 28', 'off', 'manual', '2023-03-26 06:02:10', '6');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('19', 'light 68', 'off', 'manual', '2023-03-26 06:02:10', '7');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('20', 'AC 8', 'off', 'manual', '2023-03-26 06:02:10', '7');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('21', 'light 78', 'off', 'manual', '2023-03-26 06:02:10', '8');
INSERT INTO `Device`(`ID`, `Devicename`, `Device_Status`, `Mode`, `Day_add`, `RoomID`) VALUES ('22', 'WP 5', 'off', 'manual', '2023-03-26 06:02:10', '8');

INSERT INTO `Sensor`(`ID`, `DeviceID`) VALUES ('1','9');
INSERT INTO `Sensor`(`ID`, `DeviceID`) VALUES ('2', '12');
INSERT INTO `Sensor`(`ID`, `DeviceID`) VALUES ('3', '14');
INSERT INTO `Sensor`(`ID`, `DeviceID`) VALUES ('4', '16');
INSERT INTO `Sensor`(`ID`, `DeviceID`) VALUES ('5', '20');
INSERT INTO `Sensor`(`ID`, `DeviceID`) VALUES ('6', '22');

INSERT INTO `Light`(`ID`) VALUES ('1');
INSERT INTO `Light`(`ID`) VALUES ('2');
INSERT INTO `Light`(`ID`) VALUES ('3');
INSERT INTO `Light`(`ID`) VALUES ('4');
INSERT INTO `Light` (`ID`) VALUES ('7');
INSERT INTO `Light` (`ID`) VALUES ('8');
INSERT INTO `Light` (`ID`) VALUES ('11');
INSERT INTO `Light` (`ID`) VALUES ('13');
INSERT INTO `Light` (`ID`) VALUES ('17');
INSERT INTO `Light` (`ID`) VALUES ('18');
INSERT INTO `Light` (`ID`) VALUES ('19');
INSERT INTO `Light` (`ID`) VALUES ('21');

INSERT INTO `Air_Condition` (`ID`, `Temperature_D`, `Humidity_D`) VALUES ('9', '26', '26');
INSERT INTO `Air_Condition` (`ID`, `Temperature_D`, `Humidity_D`) VALUES ('12', '25', '25');
INSERT INTO `Air_Condition` (`ID`, `Temperature_D`, `Humidity_D`) VALUES ('14', '25', '25');
INSERT INTO `Air_Condition` (`ID`, `Temperature_D`, `Humidity_D`) VALUES ('20', '25', '25');

INSERT INTO `Door` (`ID`) VALUES ('10');
INSERT INTO `Door` (`ID`) VALUES ('15');

INSERT INTO `Water_pumps` (`ID`, `Temperature_D`, `Humidity_D`) VALUES ('16', '35', '25');
INSERT INTO `Water_pumps` (`ID`, `Temperature_D`, `Humidity_D`) VALUES ('22', '35', '25');