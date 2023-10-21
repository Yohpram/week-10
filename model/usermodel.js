const pool = require ("../config/connection");

class UserModel {
  constructor(id, email, gender, password, role) {
    this.id = +id;
    this.email = email;
    this.gender = gender;
    this.password = password;
    this.role = role;
  }

  static async getAllUser() {
    const query = 'SELECT * FROM public.users;';
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }
 // masih error 
  static adduser(objUser, callback) {
    const query = `INSERT INTO public.users ( "email", "gender", "password", role") VALUES ($1, $2, $3, $4);`;

    const arrData = [ objUser.email, objUser.gender, objUser.password, objUser.role];

    pool.query(query, arrData, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        console.log(`${objUser.email} sudah masuk datanya`);
        callback(null, null);
      }
    });
  }


  static async deleteUser(id) {
    const query = 'DELETE FROM public.User WHERE id = $1;';
    try {
      await pool.query(query, [id]);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;