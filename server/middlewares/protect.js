import jwt from 'jsonwebtoken';

export function protect(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      message: 'Access token is required',
    });
  }

  if (!authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Invalid authorization format',
    });
  }

  const tokenWithoutBearer = authorizationHeader.split(' ')[1];

  if (!tokenWithoutBearer) {
    return res.status(401).json({
      message: 'Access token is required',
    });
  }

  try {
    const decodedPayload = jwt.verify(
      tokenWithoutBearer,
      process.env.JWT_SECRET,
    );

    req.user = {
      userId: decodedPayload.userId,
      username: decodedPayload.username,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
}
// ภารกิจที่ 3
// 1. อ่านค่าจาก req.headers.authorization
// 2. หากไม่มี token หรือรูปแบบไม่ใช่ "Bearer <token>" ให้ตอบ status 401
// 3. ตรวจสอบ token ด้วย process.env.JWT_SECRET
// 4. บันทึก userId และ username ลงใน req.user
// 5. เรียก next() หลังจากตรวจสอบ token สำเร็จแล้วเท่านั้น
