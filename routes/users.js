const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const { formatDateTime } = require('../lib/helpers');

// Danh sách người dùng
router.get('/', (req, res) => {
    const { name, company_id } = req.query;

    let sql = `
        SELECT users.*, companies.name AS company_name 
        FROM users 
        LEFT JOIN companies ON users.company_id = companies.id
        WHERE 1 = 1
    `;
    const params = [];

    if (name) {
        sql += ' AND users.name LIKE ?';
        params.push(`%${name}%`);
    }

    if (company_id) {
        sql += ' AND users.company_id = ?';
        params.push(company_id);
    }

    // filter
    db.query('SELECT * FROM companies', (err, companies) => {
        if (err) throw err;

        db.query(sql, params, (err, users) => {
            if (err) throw err;

            res.render('users/index', {
                users,
                companies,
                filter: { name: name || '', company_id: company_id || '' },
                formatDateTime
            });
        });
    });
});


// Form thêm
router.get('/add', (req, res) => {
    db.query('SELECT * FROM companies', (err, companies) => {
        if (err) throw err;
        res.render('users/add', { companies, error: null });
    });
});

// Thêm mới
router.post('/add', (req, res) => {
    const { name, email, company_id } = req.body;
    if (!name || !email || !company_id) {
        db.query('SELECT * FROM companies', (err, companies) => {
            return res.render('users/add', { companies, error: 'Vui lòng điền đầy đủ thông tin!' });
        });
    } else {
        const sql = 'INSERT INTO users (name, email, company_id) VALUES (?, ?, ?)';
        db.query(sql, [name, email, company_id], (err) => {
            if (err) throw err;
            res.redirect('/users');
        });
    }
});

// Form sửa
router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, users) => {
        if (err) throw err;
        if (users.length === 0) return res.redirect('/users');

        db.query('SELECT * FROM companies', (err, companies) => {
            if (err) throw err;
            res.render('users/edit', { user: users[0], companies, error: null });
        });
    });
});

// Cập nhật
router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, company_id } = req.body;
    if (!name || !email || !company_id) {
        db.query('SELECT * FROM companies', (err, companies) => {
            return res.render('users/edit', {
                user: { id, name, email, company_id },
                companies,
                error: 'Không được để trống!'
            });
        });
    } else {
        db.query('UPDATE users SET name=?, email=?, company_id=? WHERE id=?',
            [name, email, company_id, id], (err) => {
                if (err) throw err;
                res.redirect('/users');
            });
    }
});

// Xóa
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.redirect('/users');
    });
});

module.exports = router;
