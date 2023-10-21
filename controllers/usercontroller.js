const UserModel = require('../model/usermodel');

class UserController {

  static async getAllUser(req, res) {
    try {
      const users = await UserModel.getAllUser(); 
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static adduser(req, res){
    const { email, gender, password, role } = req.body; 
    const objUser = { 
        email, gender, password, role
  }
    UserModel.adduser( objUser, (err, user) => {
        if(err){
            res.send(err);
        }
        else{
            res.redirect("/user");
        }
    });

  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const success = await UserModel.deleteMovie(id);
      if (success) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;