//validateFields's explanation:
//This function is used to validate if the required fields are present in the request body.
//It receives an array of strings with the names of the fields that are required. (requiredFields)
//It returns a middleware function that receives the request, response, and next function.

// El metodo filter es un metodo de JS que crea un nuevo array con todos los elementos que cumplan una condicion.
// Este metodo itera sobre cada elemento del array missingFields (enviado por parametro) 
// En caso de cumplir la condicion, se agrega al nuevo array (en este caso, missingFields)

// La logica del operador ! es:
    // Si el valor es true el campo esta presente en el body.
        // Al negarlo, se convierte en false. Finalemente no guarda el elemento en misisngFields
    // Si el valor es false el campo no esta presente en el body.
        // Al negarlo, se convierte en true. Finalmente guarda el elemento en missingFields

//En caso de que el array missingFields tenga almenos un elemento, se retorna un estado 400 


const validateFields = (requiredFields) => {
    return (req, res, next) => {    
        const missingFields = requiredFields.filter((field) => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ message: `All fields are required` });
        }
        next();
    }
};
export default validateFields;


//Posibilidad de mejora:
//return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')}` });
//Retorna un mensaje de error con los campos faltantes.
// HTTP/1.1 400 Bad Request
// Content-Type: application/json

// {
//   "message": "Missing fields: password, email"
// }
// Este mensaje sería útil para el cliente para entender cuáles campos están faltando en la solicitud.
