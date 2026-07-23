-- MySQL Schema for IMAT Daily Quiz
-- Aiven-compatible version

SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT;
SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS;
SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION;

SET NAMES utf8mb4;

SET @OLD_TIME_ZONE=@@TIME_ZONE;
SET TIME_ZONE='+00:00';

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;

SET @OLD_SQL_MODE=@@SQL_MODE;
SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO';

SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0;


-- =====================================================
-- ADMINS
-- =====================================================

DROP TABLE IF EXISTS `admins`;

CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- DAILY QUIZZES
-- =====================================================

DROP TABLE IF EXISTS `daily_quizzes`;

CREATE TABLE `daily_quizzes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quiz_date` date NOT NULL,
  `cycle_number` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `quiz_date` (`quiz_date`)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- QUESTIONS
-- =====================================================

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `option_a` varchar(255) NOT NULL,
  `option_b` varchar(255) NOT NULL,
  `option_c` varchar(255) NOT NULL,
  `option_d` varchar(255) NOT NULL,
  `correct_option` char(1) NOT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `difficulty` enum('Easy','Medium','Hard') DEFAULT 'Medium',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',

  PRIMARY KEY (`id`)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- QUESTIONS NEW
-- =====================================================

DROP TABLE IF EXISTS `questions_new`;

CREATE TABLE `questions_new` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `option_a` varchar(255) NOT NULL,
  `option_b` varchar(255) NOT NULL,
  `option_c` varchar(255) NOT NULL,
  `option_d` varchar(255) NOT NULL,
  `correct_option` char(1) NOT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `difficulty` enum('Easy','Medium','Hard') DEFAULT 'Medium',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',

  PRIMARY KEY (`id`)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- STUDENTS
-- =====================================================

DROP TABLE IF EXISTS `students`;

CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `xp` int DEFAULT '0',
  `level` int DEFAULT '1',
  `email_verified` tinyint(1) NOT NULL DEFAULT '0',
  `verification_token` varchar(255) DEFAULT NULL,
  `verification_token_expiry` datetime DEFAULT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- SUBJECTS
-- =====================================================

DROP TABLE IF EXISTS `subjects`;

CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- DAILY QUIZ QUESTIONS
-- =====================================================

DROP TABLE IF EXISTS `daily_quiz_questions`;

CREATE TABLE `daily_quiz_questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `daily_quiz_id` int NOT NULL,
  `question_id` int NOT NULL,

  PRIMARY KEY (`id`),

  KEY `daily_quiz_id` (`daily_quiz_id`),
  KEY `question_id` (`question_id`),

  CONSTRAINT `daily_quiz_questions_ibfk_1`
    FOREIGN KEY (`daily_quiz_id`)
    REFERENCES `daily_quizzes` (`id`)
    ON DELETE CASCADE,

  CONSTRAINT `daily_quiz_questions_ibfk_2`
    FOREIGN KEY (`question_id`)
    REFERENCES `questions` (`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- PASSWORD RESET TOKENS
-- =====================================================

DROP TABLE IF EXISTS `password_reset_tokens`;

CREATE TABLE `password_reset_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),

  UNIQUE KEY `token` (`token`),
  KEY `student_id` (`student_id`),

  CONSTRAINT `password_reset_tokens_ibfk_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `students` (`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- QUIZ RESULTS
-- =====================================================

DROP TABLE IF EXISTS `quiz_results`;

CREATE TABLE `quiz_results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `quiz_id` int NOT NULL,
  `score` int NOT NULL,
  `total_questions` int NOT NULL,
  `submitted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),

  KEY `student_id` (`student_id`),
  KEY `quiz_id` (`quiz_id`),

  CONSTRAINT `quiz_results_ibfk_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `students` (`id`)
    ON DELETE CASCADE,

  CONSTRAINT `quiz_results_ibfk_2`
    FOREIGN KEY (`quiz_id`)
    REFERENCES `daily_quizzes` (`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- STUDENT ANSWERS
-- =====================================================

DROP TABLE IF EXISTS `student_answers`;

CREATE TABLE `student_answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `quiz_id` int NOT NULL,
  `question_id` int NOT NULL,
  `selected_option` char(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),

  KEY `student_id` (`student_id`),
  KEY `quiz_id` (`quiz_id`),
  KEY `question_id` (`question_id`),

  CONSTRAINT `student_answers_ibfk_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `students` (`id`)
    ON DELETE CASCADE,

  CONSTRAINT `student_answers_ibfk_2`
    FOREIGN KEY (`quiz_id`)
    REFERENCES `daily_quizzes` (`id`)
    ON DELETE CASCADE,

  CONSTRAINT `student_answers_ibfk_3`
    FOREIGN KEY (`question_id`)
    REFERENCES `questions` (`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- RESTORE SETTINGS
-- =====================================================

SET TIME_ZONE=@OLD_TIME_ZONE;

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT;
SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS;
SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION;

SET SQL_MODE=@OLD_SQL_MODE;
SET SQL_NOTES=@OLD_SQL_NOTES;