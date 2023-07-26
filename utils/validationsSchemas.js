const yup = require("yup");

module.exports.USER_VALIDATION_SCHEMA = yup.object({
  firstName: yup
    .string()
    .min(2)
    .max(64)
    .trim()
    .matches(/^[A-Z][a-z]+$/)
    .required(),
  lastName: yup
    .string()
    .min(2)
    .max(64)
    .trim()
    .matches(/^[A-Z][a-z]+$/)
    .required(),
  email: yup.string().email().required(),
  passwordHash: yup
    .string()
    .min(8)
    .max(64)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    )
    .required(),
  birthday: yup.date().max(new Date().toISOString()),
  gender: yup.mixed().oneOf(["male", "female", "other"]),
});