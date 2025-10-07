import * as yup from "yup"

export const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    name: yup.string().required(),
    phone: yup.string().required(),
    country: yup.string().required(),
  })
  .required()
