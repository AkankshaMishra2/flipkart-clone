import User from '../model/User.js';

export const userLogIn = async (request, response) => {
    try {
        let user = await User.findOne({ 
            where: { 
                email: request.body.email, 
                password: request.body.password 
            } 
        });
        
        if(user) {
            return response.json({ username: user.username });
        } else {
            return response.status(401).json({ message: 'Invalid Login' });
        }

    } catch (error) {
        response.status(500).json({ message: error.message });        
    }
}

export const userSignUp = async (request, response) => {
    try {
        const exist = await User.findOne({ where: { username: request.body.username } });
        if (exist) {
            return response.status(401).json({ message: 'User already exists' });
        }
        
        await User.create(request.body);
        response.status(200).json({ message: `${request.body.firstname} has been successfully registered` });
        
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}
