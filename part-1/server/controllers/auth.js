const bcrypt = require(`bcryptjs`)
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          const authenticated = bcrypt.compareSync(password, users[i].pinHash)
          if(authenticated){
            let userToReturn = {...users[i]}
            delete userToReturn.pinHash
          res.status(200).send(users[i])
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        const {username,email,firstName,lastName,password} = req.body
        const salt = bcrypt.genSaltSync(5)
        const pinHash = bcrypt.hashSync(password,salt)
        const user = {
          username,
          email,
          firstName,
          lastName,
          pinHash
        }
        
        users.push(user)
        let newUser = {...user}
        delete newUser.pinHash
        res.status(200).send(newUser)
        
        
      }
    }
    // console.log(users);