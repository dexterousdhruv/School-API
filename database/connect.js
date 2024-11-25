import { config } from 'dotenv';
import { Sequelize } from 'sequelize';
config()

const { DB_URL } = process.env
const sequelize = new Sequelize(DB_URL) 
 
sequelize.authenticate()
  .then(() => console.log('Connected to MySQL'))   
  .catch(err => console.error('Unable to connect:', err)); 

export default sequelize  