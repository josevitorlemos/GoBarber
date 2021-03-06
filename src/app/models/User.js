const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING, //Irá armazenar o caminho relativo da imagem
      password: DataTypes.VIRTUAL, //Um campo que só existe na aplicação e não na base de dados
      password_hash: DataTypes.STRING, //Irá criptografar a senha antes de armazenar
      provider: DataTypes.BOOLEAN, //irá armazenar uma informação sobre o tipo de usuário
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        },
      },
    }
  )

  User.prototype.checkPassWord = function (password) {
    return bcrypt.compare(password, this.password_hash) //Usou o bcrypt para comparar a senha que ele digitou no login com a senha registrada no banco de dados. O método retornará um boolean
  }

  return User
}

//sequelize: É a instancia do sequelize que irá fazer a conexão com o banco de dados
//DataTypes: É o tipo de colunas que será usado
