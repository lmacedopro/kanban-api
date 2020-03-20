const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {

    static init(sequelize){
        super.init({
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            checkEmail: DataTypes.BOOLEAN,
            phone: DataTypes.STRING,
            checkPhone: DataTypes.BOOLEAN,
            photo: DataTypes.STRING,
            password: DataTypes.STRING,
            profile: DataTypes.STRING,
        }, {
            sequelize,
            hooks: {
                beforeCreate: async (user)=>{
                    
                    const hash = await bcrypt.hash(user.get('password'), 10);
                    user.set('email', user.email.toLowerCase());
                    user.set('password', hash);
                },
                beforeUpdate: async (user)=>{

                    const hash = await bcrypt.hash(user.get('password'), 10);
                    user.set('email', user.email.toLowerCase());
                    user.set('password', hash);
                }
            }
        },)
    }
}

module.exports = User;