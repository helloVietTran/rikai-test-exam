const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const { formatDateTime } = require('../lib/helpers');

const PAGE_SIZE = 5;

// danh sách công ty có phân trang
router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * PAGE_SIZE;

    const countQuery = 'SELECT COUNT(*) AS total FROM companies';
    const dataQuery = 'SELECT * FROM companies ORDER BY created_at ASC LIMIT ? OFFSET ?';

    db.query(countQuery, (err, countResult) => {
        if (err) throw err;
        const total = countResult[0].total;
        const totalPages = Math.ceil(total / PAGE_SIZE);

        db.query(dataQuery, [PAGE_SIZE, offset], (err, results) => {
            if (err) throw err;
            res.render('companies/index', {
                companies: results,
                formatDateTime,
                currentPage: page,
                totalPages
            });
        });
    });
});

// form thêm
router.get('/add', (req, res) => {
    res.render('companies/add', { error: null });
});

// thêm
router.post('/add', (req, res) => {
    const { name, address } = req.body;
    if (!name || !address) {
        return res.render('companies/add', { error: 'Tên và Địa chỉ không được để trống!' });
    }
    db.query('INSERT INTO companies (name, address) VALUES (?, ?)', [name, address], (err) => {
        if (err) throw err;
        res.redirect('/companies');
    });
});

// form sửa
router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM companies WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.redirect('/companies');
        res.render('companies/edit', { company: results[0], error: null });
    });
});

// sửa 
router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { name, address } = req.body;
    if (!name || !address) {
        return res.render('companies/edit', { company: { id, name, address }, error: 'Không được để trống!' });
    }
    db.query('UPDATE companies SET name = ?, address = ? WHERE id = ?', [name, address, id], (err) => {
        if (err) throw err;
        res.redirect('/companies');
    });
});

// xóa
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM companies WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.redirect('/companies');
    });
});

module.exports = router;
