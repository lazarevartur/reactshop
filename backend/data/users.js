import bcrypt from 'bcryptjs'

const Users = [
  {
    name: 'Artur Admin',
    email: 'example@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Jon dou',
    email: 'example1@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Lora dou',
    email: 'example2@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]
export default Users
