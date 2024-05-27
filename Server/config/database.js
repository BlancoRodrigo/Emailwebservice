import { Sequelize } from 'sequelize';

import dotenv from 'dotenv'; //Allows to use the .env file
dotenv.config(); 
// Using .env file to store the sensitive information
    // If something needs to be changed, it can be done in the .env file and not touching the code

//Create a pool of connections
    //Pool of connections is used to avoid creating a new connection every time a query is made

//Sequelize's instance using the .env file
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,  
    process.env.MYSQL_USER,      
    process.env.MYSQL_PASSWORD,  
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        port: process.env.MYSQL_PORT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)
export default sequelize;

