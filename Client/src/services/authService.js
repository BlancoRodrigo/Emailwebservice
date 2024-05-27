import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('api/users/login', { username, password });
    console.log('User logged in', response);
    return response.data;    
  } catch (error) {
    console.error('Failed to login', error);
  }
  
};

export const signup = async (name, surname, username, email, password) => {
  try {
    const response = await api.post('/api/users/signup', {
      name,
      surname,
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to signup', error);
    throw error;
  }
};



//Ventaja de axios.

// Código con fetch
// const response = await fetch('http://localhost:5000/signup', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     name,
//     surname,
//     username,
//     password,
//     email,
//   }),
// });

// axios permite crear instancias personalizadas con configuraciones predeterminadas, como baseURL, headers comunes, etc.
// Estas configuraciones predeterminadas se aplican automáticamente a todas las solicitudes hechas con esa instancia, por lo que no necesitas repetirlas cada vez que haces una solicitud.
// axios configura automáticamente algunos encabezados necesarios para la mayoría de las solicitudes, como Content-Type: application/json para solicitudes POST cuando se envía un objeto JavaScript.
// axios maneja la transformación de datos automáticamente. Convierte el cuerpo de la solicitud en JSON y también analiza automáticamente las respuestas JSON.
// Con fetch, se necesita usar JSON.stringify para convertir el objeto JavaScript en una cadena JSON y response.json() para analizar la respuesta.