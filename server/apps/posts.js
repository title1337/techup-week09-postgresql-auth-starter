import { Router } from 'express';
import connectionPool from '../utils/db.js';
import { protect } from '../middlewares/protect.js';

const postRouter = Router();
const allowedStatuses = ['draft', 'published'];

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function parsePostId(value) {
  const postId = Number(value);

  if (!Number.isInteger(postId) || postId <= 0) {
    return null;
  }

  return postId;
}

function validatePostBody(body) {
  const title = cleanText(body.title);
  const content = cleanText(body.content);
  const status = cleanText(body.status);

  if (title.length < 3 || title.length > 120) {
    return {
      error: 'title must contain 3 to 120 characters',
    };
  }

  if (content.length < 20) {
    return {
      error: 'content must contain at least 20 characters',
    };
  }

  if (!allowedStatuses.includes(status)) {
    return {
      error: 'status must be draft or published',
    };
  }

  return {
    data: {
      title,
      content,
      status,
    },
  };
}

postRouter.get('/', async (req, res) => {
  const status = cleanText(req.query.status);
  const search = cleanText(req.query.search);

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: 'status must be draft or published',
    });
  }

  if (search.length > 100) {
    return res.status(400).json({
      message: 'search must not exceed 100 characters',
    });
  }

  // ภารกิจที่ 2
  // 1. SELECT ข้อมูลจาก posts และ JOIN กับ users ผ่าน author_id
  // 2. สร้างชื่อผู้เขียนด้วย CONCAT(first_name, ' ', last_name) AS author_name
  // 3. ใช้ status และ search เป็นตัวกรองแบบไม่บังคับ โดยส่งค่าผ่าน parameter
  // 4. เรียงโพสต์ใหม่ที่สุดขึ้นก่อน
  // 5. ส่งผลลัพธ์กลับในรูปแบบ { data: result.rows }
  return res.status(501).json({
    message: 'Mission 2: List Posts API is not implemented',
  });
});

postRouter.post('/', protect, async (req, res) => {
  const input = validatePostBody(req.body);

  if (input.error) {
    return res.status(400).json({
      message: input.error,
    });
  }

  // ภารกิจที่ 3
  // 1. INSERT title, content, status และ req.user.userId
  // 2. ห้ามอ่าน authorId จาก req.body
  // 3. กำหนด published_at เฉพาะเมื่อ status เป็น "published"
  // 4. ส่ง status 201 พร้อมโพสต์ที่สร้างและ author_name

  return res.status(501).json({
    message: 'Mission 3: Create Post API is not implemented',
  });
});

postRouter.get('/:postId', async (req, res) => {
  const postId = parsePostId(req.params.postId);

  if (!postId) {
    return res.status(400).json({
      message: 'postId must be a positive integer',
    });
  }

  return res.status(501).json({
    message: 'Bonus: Get Post API is not implemented',
  });
});

postRouter.put('/:postId', protect, async (req, res) => {
  const postId = parsePostId(req.params.postId);

  if (!postId) {
    return res.status(400).json({
      message: 'postId must be a positive integer',
    });
  }

  const input = validatePostBody(req.body);

  if (input.error) {
    return res.status(400).json({
      message: input.error,
    });
  }

  return res.status(501).json({
    message: 'Bonus: Update Post API is not implemented',
  });
});

postRouter.delete('/:postId', protect, async (req, res) => {
  const postId = parsePostId(req.params.postId);

  if (!postId) {
    return res.status(400).json({
      message: 'postId must be a positive integer',
    });
  }

  return res.status(501).json({
    message: 'Bonus: Delete Post API is not implemented',
  });
});

export default postRouter;
