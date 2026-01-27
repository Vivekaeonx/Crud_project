const Joi = require("joi");


const createUser = (data) => {                              //POST
  const schema = Joi.object({
    s_rollno: Joi.number().integer().positive().required().messages({
      "number.base": "s_rollno must be a number",
      "number.integer": "s_rollno must be an integer",
      "number.positive": "s_rollno must be positive",
      "any.required": "s_rollno is required",
    }),
    s_name: Joi.string().pattern(/^[A-Za-z]+$/).required().messages({
      "string.base": "s_name must be a string",
      "string.pattern.base": "s_name can contain only alphabets",
      "any.required": "s_name is required",
    }),
    s_std: Joi.number().integer().required().messages({
      "number.base": "s_std must be a number",
      "number.integer": "s_std must be an integer",
      "any.required": "s_std is required",
    }),
    s_dob: Joi.date().optional().messages({
      "date.base": "s_dob must be a valid date",
    }),
    gender: Joi.string().valid("male", "female", "others").required().messages({
      "any.only": "gender must be male, female, or others",
      "any.required": "gender is required",
      "string.base": "gender must be a string",
    }),
    adress: Joi.string().optional().messages({
      "string.base": "adress must be a string",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

const getUser = (data) => {                                             //Get
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "id must be a number",
      "number.integer": "id must be an integer",
      "any.required": "id is required",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

const updateUser = (data) => {                                          //PUT
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "id must be a number",
      "number.integer": "id must be an integer",
      "any.required": "id is required",
    }),
    s_name: Joi.string().pattern(/^[A-Za-z]+$/).required().messages({
      "string.base": "s_name must be a string",
      "string.pattern.base": "s_name can contain only alphabets",
      "any.required": "s_name is required",
    }),
    s_std: Joi.number().integer().required().messages({
      "number.base": "s_std must be a number",
      "number.integer": "s_std must be an integer",
      "any.required": "s_std is required",
    }),
    gender: Joi.string().valid("male", "female", "others").required().messages({
      "any.only": "gender must be male, female, or others",
      "any.required": "gender is required",
      "string.base": "gender must be a string",
    }),
    adress: Joi.string().optional().messages({
      "any.required": "Adress is required",
      "string.base": "adress must be a string",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};


const deleteUser = (data) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "id must be a number",
      "number.integer": "id must be an integer",
      "any.required": "id is required",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};


module.exports = {
  createUser,
  updateUser,
  getUser,
  deleteUser
};
