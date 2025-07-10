# 📦 Rikai Test Exam

Bài làm của ứng viên Trần Việt Anh - tranvietanh.ft@gmail.com

## 🧰 Công nghệ sử dụng

- Node.js
- Express.js
- MySQL
- EJS

---

## 🚀 Cách chạy ứng dụng

### 🔁 1. Câu lệnh SQL cài dự án
Dán đoạn code này vào Mysql Workbench hoặc phpMyAdmin

```bash
CREATE DATABASE rikai_test_exam;

use rikai_test_exam;

CREATE TABLE companies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

```
### 🔁 2. Clone code và chạy ứng dụng
```bash
git clone https://github.com/helloVietTran/rikai-test-exam.git
cd rikai-test-exam
npm install
npm start
```

### 🖼️ Ảnh demo

---

### ✍️ Tác giả
👤 Trần Việt Anh
📧 tranvietanh.ft@gmail.com
