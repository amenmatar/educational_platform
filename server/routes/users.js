const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../models/db');
const { auth, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, authorizeAdmin, (req, res) => {
  try {
    const users = getUsers().map(({ password, ...rest }) => rest);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

router.get('/pending', auth, authorizeAdmin, (req, res) => {
  try {
    const users = getUsers()
      .filter((user) => !user.isActive && user.role !== 'admin')
      .map(({ password, ...rest }) => rest);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

router.get('/:id', auth, (req, res) => {
  try {
    const user = getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'المستخدم غير موجود' });

    if (req.user.id !== user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'ليس لديك صلاحية للوصول إلى هذا الملف الشخصي' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

router.patch('/:id/approve', auth, authorizeAdmin, (req, res) => {
  try {
    const user = getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'المستخدم غير موجود' });
    if (user.isActive) return res.status(400).json({ message: 'الحساب مفعل بالفعل' });

    const updatedUser = updateUser(req.params.id, { isActive: true });
    const { password, ...userWithoutPassword } = updatedUser;
    res.json({ message: 'تم تفعيل الحساب بنجاح', user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

router.delete('/:id', auth, authorizeAdmin, (req, res) => {
  try {
    const user = getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'المستخدم غير موجود' });
    if (user.role === 'admin') return res.status(400).json({ message: 'لا يمكن حذف حساب المدير' });

    const deleted = deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'المستخدم غير موجود' });

    res.json({ message: 'تم حذف الحساب بنجاح' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

router.patch('/:id', auth, (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'ليس لديك صلاحية لتعديل هذا الملف الشخصي' });
    }

    const user = getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'المستخدم غير موجود' });

    const { role, isActive, ...updates } = req.body;
    const updatedUser = updateUser(req.params.id, updates);
    const { password, ...userWithoutPassword } = updatedUser;
    res.json({ message: 'تم تحديث الملف الشخصي بنجاح', user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

module.exports = router;
