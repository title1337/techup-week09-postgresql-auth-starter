import jwt from "jsonwebtoken";

export function protect(req, res, next) {
  // ภารกิจที่ 3
  // 1. อ่านค่าจาก req.headers.authorization
  // 2. หากไม่มี token หรือรูปแบบไม่ใช่ "Bearer <token>" ให้ตอบ status 401
  // 3. ตรวจสอบ token ด้วย process.env.JWT_SECRET
  // 4. บันทึก userId และ username ลงใน req.user
  // 5. เรียก next() หลังจากตรวจสอบ token สำเร็จแล้วเท่านั้น
  void jwt;
  void next;

  return res.status(501).json({
    message: "Mission 3: protect middleware is not implemented",
  });
}
