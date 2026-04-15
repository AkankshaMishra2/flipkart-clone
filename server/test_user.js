import Connection, { sequelize } from './database/db.js';
import User from './model/User.js';

const test = async () => {
    await Connection();
    try {
        const user = await User.create({
            firstname: 'John',
            lastname: 'Doe',
            username: 'johndoe123',
            email: 'johndoe123@gmail.com',
            password: 'password',
            phone: '1234567890'
        });
        console.log("Inserted user", user.id);
    } catch (e) {
        console.log("Error inserting user:", e);
    }
    process.exit(0);
};

test();
