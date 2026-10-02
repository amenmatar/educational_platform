const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser } = require('../models/db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    if (user.role !== 'admin' && !user.isActive) {
      return res.status(403).json({ message: 'حسابك قيد التفعيل، يرجى الانتظار حتى يتم الموافقة عليه' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    const { password: _, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

router.post('/register/student', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (getUserByEmail(email)) {
      return res.status(400).json({ message: 'البريد الإلكتروني مستخدم بالفعل' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = createUser({
      id: Date.now().toString(),
      name,
      email,
      password: hashed,
      role: 'student',
      isActive: false,
      createdAt: new Date().toISOString()
    });

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ message: 'تم إنشاء الحساب بنجاح وبانتظار موافقة الإدارة', user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

router.post('/register/teacher', async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;
    if (getUserByEmail(email)) {
      return res.status(400).json({ message: 'البريد الإلكتروني مستخدم بالفعل' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = createUser({
      id: Date.now().toString(),
      name,
      email,
      password: hashed,
      role: 'teacher',
      specialization,
      isActive: false,
      createdAt: new Date().toISOString()
    });

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ message: 'تم إنشاء الحساب بنجاح وبانتظار موافقة الإدارة', user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

module.exports = router;
