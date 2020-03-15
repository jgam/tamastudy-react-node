const User = require('../../database/models/User');
const createJWT = require('../../util/user/createJWT');

// post
// signup
// postman uri ex
// http://localhost:4000/v1/user/signup
exports.signup = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return {
        success: false,
        error: `${req.body.email}는 존재하는 이메일입니다. `,
        data: null,
      };
    }
    const newUser = await User.create({ ...req.body });
    const token = await createJWT(newUser._id);
    return {
      success: true,
      error: null,
      data: token,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};