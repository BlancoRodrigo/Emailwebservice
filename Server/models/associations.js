import User from './User.js';
import Email from './Email.js';
import Rol from './Rol.js';

//Reletion User -> Mail (sender)
User.hasMany(Email, {foreignKey: 'sender_id', as: 'sentEmails'}); //sourceKey esta de mas? no es por default?
Email.belongsTo(User, {foreignKey: 'sender_id', as: 'sender'}); //targetKey esta de mas? no es por default?

//Relation User -> Mail (Receiver)
User.hasMany(Email, { foreignKey: 'receiver_id', as: 'receivedEmails' });
Email.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });

// Relation User -> Rol
Rol.hasMany(User, {
    foreignKey: 'rol',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

User.belongsTo(Rol, {
    foreignKey: 'rol',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
export default { User, Email, Rol };
