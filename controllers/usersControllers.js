export const usersController = {
  createUser:async (req, res) => {},
  getUser:async (req, res) => {},
  getUserById:async (req, res) => {
    const { userId } = req.params
    res.status(200).send('OK')
  },
  updateUserById:async (req, res) => {},
  deleteUserById:async (req, res) => {},
}