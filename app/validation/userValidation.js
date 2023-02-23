import Joi from "joi";

const userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(10).required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(new RegExp(/^(\+98|0098|98|0)?9\d{9}$/))
    .message("your phone number is not valid"),
});

export { userValidationSchema };
