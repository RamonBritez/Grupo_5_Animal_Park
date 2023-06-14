const {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  getUserByEmail,
} = require("../../services/user.service");
const { generateToken } = require("../../helpers/jwt.helper")
const bcrypt = require("bcrypt");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await getUsers();
      const usersResponse = users.map(({ id, first_name, email }) => {
        return {
          id,
          first_name,
          email,
          detail: `/api/users/${id}`,
        };
      });

      const RESPONSE = {
        count: users.length,
        users: usersResponse,
      };

      return res.status(200).json(RESPONSE);
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },
  getUserById: async (req, res) => {
    try {
      const USER_ID = req.params.id;
      const { id, first_name, last_name, email, tel, avatar } = await getUserById(
        USER_ID
      );

      const USER_DATA_RESPONSE = {
        id,
        first_name,
        last_name,
        email,
        tel,
        avatar: `http://localhost:3000/image/users/${avatar}`,
      };

      return res.status(200).json(USER_DATA_RESPONSE);
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await getUserByEmail(email);
      const token = generateToken(user);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  }

};
