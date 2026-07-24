import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectionPool from '../utils/db.js';

const authRouter = Router();

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function safeUser(user) {
  return {
    userId: user.user_id,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
  };
}

function validateRegisterBody(body) {
  const username = cleanText(body.username).toLowerCase();
  const password = typeof body.password === 'string' ? body.password : '';
  const firstName = cleanText(body.firstName);
  const lastName = cleanText(body.lastName);

  if (!username || !password || !firstName || !lastName) {
    return {
      error: 'username, password, firstName and lastName are required',
    };
  }

  if (username.length < 3 || username.length > 40) {
    return {
      error: 'username must contain 3 to 40 characters',
    };
  }

  if (password.length < 8) {
    return {
      error: 'password must contain at least 8 characters',
    };
  }

  return {
    data: {
      username,
      password,
      firstName,
      lastName,
    },
  };
}

function validateLoginBody(body) {
  const username = cleanText(body.username).toLowerCase();
  const password = typeof body.password === 'string' ? body.password : '';

  if (!username || !password) {
    return {
      error: 'username and password are required',
    };
  }

  return {
    data: {
      username,
      password,
    },
  };
}

authRouter.post('/register', async (req, res) => {
  const input = validateRegisterBody(req.body);

  if (input.error) {
    return res.status(400).json({
      message: input.error,
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(input.data.password, salt);

    const result = await connectionPool.query(
      `insert into users (username, password_hash, first_name, last_name)
      values ($1, $2, $3, $4)
      returning user_id, username, first_name, last_name, created_at`,
      [
        input.data.username,
        passwordHash,
        input.data.firstName,
        input.data.lastName,
      ],
    );

    const newUser = result.rows[0];

    return res.status(201).json({
      message: 'Register successful',
      data: safeUser(newUser),
    });
  } catch (error) {
    const isDuplicateError = error.code === '23505';

    if (isDuplicateError) {
      return res.status(409).json({
        message: 'Username already exists',
      });
    }
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
  return res.status(501).json({
    message: 'Mission 1A: Register API is not implemented',
  });
});
// ภารกิจที่ 1A
// 1. Hash input.data.password ด้วย bcrypt
// 2. INSERT username, password_hash, first_name และ last_name
// 3. ส่งค่าผ่าน parameter และใช้ RETURNING เฉพาะข้อมูลผู้ใช้ที่ปลอดภัย
// 4. ส่ง status 201 พร้อมผลลัพธ์จาก safeUser(...)
// 5. เมื่อ PostgreSQL แจ้งรหัสข้อมูลซ้ำ 23505 ให้เปลี่ยนเป็น status 409

authRouter.post('/login', async (req, res) => {
  const input = validateLoginBody(req.body);

  if (input.error) {
    return res.status(400).json({
      message: input.error,
    });
  }

  // ภารกิจที่ 1B
  // 1. SELECT ผู้ใช้ด้วย input.data.username
  // 2. เปรียบเทียบ input.data.password กับ password_hash
  // 3. ใช้ข้อความ 401 แบบเดียวกันทั้งกรณีไม่พบผู้ใช้และรหัสผ่านไม่ถูกต้อง
  // 4. สร้าง token จาก { userId, username } ด้วย JWT_SECRET และกำหนดอายุ 2 ชั่วโมง
  // 5. ส่ง token และข้อมูลผู้ใช้ที่ปลอดภัยกลับไป
  return res.status(501).json({
    message: 'Mission 1B: Login API is not implemented',
  });
});

export default authRouter;
