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
<img width="500" alt="image" src="https://github.com/user-attachments/assets/17518ef4-ae65-4992-a705-ceba8c07fc9a" />
<img width="500"  alt="image" src="https://github.com/user-attachments/assets/383b80fe-0cd3-4428-83e3-b49725ea5abe" />
<img width="500" alt="image" src="https://github.com/user-attachments/assets/c839203e-1f7a-4ce5-a4f1-bbfba901382e" />
<img width="500" alt="image" src="https://github.com/user-attachments/assets/316ea55c-033f-4c8b-aefd-928e44e1ecd9" />
<img width="500" height="938" alt="image" src="https://github.com/user-attachments/assets/1f2645a2-55a0-4bac-9576-17d4e5a1c6c9" />

---

### ✍️ Tác giả
👤 Trần Việt Anh
📧 tranvietanh.ft@gmail.com
