-- ============================================================
-- Budget Ndio Story · MVP Email Database Schema
-- Run this in cPanel → phpMyAdmin on your MySQL database
-- ============================================================

-- 1. CONTACTS (unified email list — every touchpoint writes here)
CREATE TABLE IF NOT EXISTS contacts (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  name          VARCHAR(255),
  source        ENUM('newsletter','donor','tip','report_request') NOT NULL,
  subscribed    TINYINT(1) NOT NULL DEFAULT 1,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_source (source)
);

-- 2. NEWSLETTER SUBSCRIBERS (confirm flow)
CREATE TABLE IF NOT EXISTS subscribers (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  name          VARCHAR(255),
  confirmed     TINYINT(1) NOT NULL DEFAULT 0,
  confirm_token VARCHAR(64) NOT NULL,
  token_expires DATETIME NOT NULL,
  confirmed_at  DATETIME,
  unsubscribed  TINYINT(1) NOT NULL DEFAULT 0,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_token (confirm_token),
  INDEX idx_email (email)
);

-- 3. DONATIONS (M-Pesa / card — email receipt on confirm)
CREATE TABLE IF NOT EXISTS donations (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  donor_name      VARCHAR(255),
  donor_email     VARCHAR(255) NOT NULL,
  amount_kes      INT UNSIGNED NOT NULL,
  payment_method  ENUM('mpesa','card') NOT NULL,
  payment_type    ENUM('one_time','recurring') NOT NULL DEFAULT 'one_time',
  reference       VARCHAR(255),         -- M-Pesa receipt / Stripe session id
  status          ENUM('pending','confirmed','failed') NOT NULL DEFAULT 'pending',
  receipt_sent    TINYINT(1) NOT NULL DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (donor_email),
  INDEX idx_status (status)
);

-- 4. TIPS (community tracker submissions)
CREATE TABLE IF NOT EXISTS tips (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  submitter_email VARCHAR(255) NOT NULL,
  submitter_name  VARCHAR(255),
  title           VARCHAR(500) NOT NULL,
  category        VARCHAR(100),
  county          VARCHAR(100),
  description     TEXT NOT NULL,
  evidence_url    VARCHAR(500),         -- uploaded file URL if any
  status          ENUM('received','reviewing','actioned','rejected') NOT NULL DEFAULT 'received',
  ack_sent        TINYINT(1) NOT NULL DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (submitter_email),
  INDEX idx_status (status)
);

-- 5. REPORT REQUESTS
CREATE TABLE IF NOT EXISTS report_requests (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  requester_email VARCHAR(255) NOT NULL,
  requester_name  VARCHAR(255),
  county          VARCHAR(100),
  sector          VARCHAR(100),
  doc_type        VARCHAR(100),
  description     TEXT,
  status          ENUM('received','in_progress','published','declined') NOT NULL DEFAULT 'received',
  notify_sent     TINYINT(1) NOT NULL DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (requester_email),
  INDEX idx_status (status)
);
