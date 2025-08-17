import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: 'Not Authorized, login again' });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id;  // ✅ Fix: Set userId on req object
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

export default authMiddleware;
