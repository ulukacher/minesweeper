CREATE SCHEMA `minesweeper`;

use `minesweeper`;

CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `height` int NOT NULL,
  `width` int NOT NULL,
  `mines` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `cells` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` int NOT NULL,
  `row` int NOT NULL,
  `column` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `visible` bit NOT NULL,
  `hasQuestionMark` bit NOT NULL,
  `hasFlag` bit NOT NULL,
  `game_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (game_id) REFERENCES games(id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
