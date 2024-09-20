//This File is To check weather user is authenticated or not
const userSchema = require("../models/userSchema");
const jwt = require('jsonwebtoken');



module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await userSchema.findById(decoded._id).select('_id'); // Attach user ID to req.user
    next();
  } catch (error) {
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

