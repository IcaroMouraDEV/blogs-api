const { userSchema, categorySchema } = require('./schema');

const validateUser = (user) => {
  const { value, error } = userSchema.validate(user); 
  
  if (error) return { type: 'error', message: error.message };

  return { type: null, message: value };
};

const validateCategory = (name) => {
  const { value, error } = categorySchema.validate({ name }); 

  if (error) return { type: 'error', message: error.message };

  return { type: null, message: value };
};

module.exports = {
  validateUser,
  validateCategory,
};