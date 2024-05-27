import User from "../models/User.js";
import bcrypt from 'bcrypt';    



export const createUser = async (name, surname, username, email, password) => {
    try {
        const newUser = await User.create({
            name,
            surname,
            username,
            email,
            password,
        });
        return newUser;
    } catch (error) {
        console.error('Error in createUser:', error);
        throw error;
    }
};



//Utilizada en caso de necesitar buscar un usuario por su username una vez logueado
export async function findByUsername(username) {
    const user = await User.findOne({ where: { username } });   
    return user;
}

export async function findByEmail(email) {
    const user = await User.findOne({ where: { email } });   
    return user;
}



export async function authUser(username, password) {

    const user = await findByUsername(username);
    if (!user) {
        return {authenticated: false};
    }

    const passwordIsValid = await bcrypt.compare(password, user.password); //password is hashed before the call. user.password is hashed before caling createUser.
    if (!passwordIsValid) {
        return {authenticated: false};
    }

    return {authenticated: true, user: user};
}

//Deshasher u.password y hacer la comparacion en texto plano