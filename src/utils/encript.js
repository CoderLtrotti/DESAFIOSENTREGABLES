import bcrypt from 'bcrypt';

export const hashPassword = password => {
return bcrypt.hashSync(password, bcrypt.genSaltSync(10));

};

/**
 * Compara una contraseña proporcionada por un usuario con la contraseña almacenada en la base de datos.
 * @param {string} userPassword - Contraseña almacenada en la base de datos.
 * @param {string} inputPassword - Contraseña proporcionada por el usuario.
 * @returns {Promise<boolean>} - `true` si las contraseñas coinciden, `false` si no coinciden.
 */
export const comparePassword = async (userPassword, inputPassword) => {
  try {
    const userPasswordString = userPassword.toString(); // Asegúrate de que sea una cadena de texto
    const inputPasswordString = inputPassword.toString(); // Asegúrate de que sea una cadena de texto

    // Compara la contraseña proporcionada con la contraseña almacenada
    const match = await bcrypt.compare(inputPasswordString, userPasswordString);

    return match;
  } catch (error) {
    throw error;
  }
}
export default { hashPassword, comparePassword };