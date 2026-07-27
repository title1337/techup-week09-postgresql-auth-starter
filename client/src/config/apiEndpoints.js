// โจทย์ Frontend วันศุกร์:
// เติมเฉพาะ path ของ endpoint ด้านล่าง ส่วน React UI, การเรียก Axios, form,
// state, validation และ JWT header เตรียมไว้ให้เรียบร้อยแล้ว

export const API_ENDPOINTS = {
  // งานหลัก
  register: '/auth/rigister',
  login: '/auth/login',
  listPosts: '/posts',
  createPost: '/posts',

  // โจทย์เสริม
  getPost: (postId) => `/posts/${postId}`,
  updatePost: (postId) => `/posts/${postId}`,
  deletePost: (postId) => `/posts/${postId}`,
};
