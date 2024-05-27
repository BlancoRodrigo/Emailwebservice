import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//Posibilidad de mejora: usar un index.js para exportar todos los metodos de los controladores
import { createUser, findByUsername, authUser } from '../services/userService.js';
import { generateToken } from '../services/tokenService.js';



export const handleSignup = async (req, res) => {
    const { name, surname, username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        //console.log('Creating user with:', { name, surname, username, email, hashedPassword });
        const userId = await createUser(name, surname, username, email, hashedPassword);
        // console.log('User created with ID:', userId);
        return res.status(201).json({ userId });
    } catch (error) {
        console.error('Error creating user:', error);
        // if (error.name === 'SequelizeUniqueConstraintError') {
        //     return res.status(400).json({ message: 'Username or email already exists' });
        // } else if (error.name === 'SequelizeValidationError') {
        //     return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        // }
        return res.status(500).json({ message: 'Internal server error (handleSignup)' });
    }
};





export const handleLogIn = async (req, res) => {
    const {username, password} = req.body;
    try {
        const result = await authUser(username, password);
        if (!result.authenticated) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(result.user);
        res.json({ message: 'Login succesful', token });

    } catch (error) {
        console.error('Error on login:', error);
        res.status(500).json({ message: 'error suuuu' });
    }
};