
const express = require('express');
const { socialAuth,addProduct ,add} = require('../controllers/user');


const authRoutes = express.Router();

authRoutes.post('/social-auth', socialAuth)
authRoutes.post('/product', addProduct)
authRoutes.post('/add', add)

module.exports = { authRoutes }