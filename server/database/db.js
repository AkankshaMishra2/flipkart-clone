import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

let sequelize;

// Try PostgreSQL first, fallback to SQLite for local development
if (process.env.DATABASE_URL && process.env.USE_POSTGRES === 'true') {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false }
        }
    });
} else {
    // Use SQLite for local development (no external DB needed)
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite',
        logging: false
    });
}

const Connection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true }); // Auto-create/update tables
        console.log('Database Connected Successfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }
};

export { sequelize };
export default Connection;