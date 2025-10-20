import * as yup from "yup"

export const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()
export const signupSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    name: yup.string().required(),
    phone: yup.string().required(),
    country: yup.string().required(),
  })
  .required()

  export const jobSchema = yup.object({
    jobTitle: yup.string().required("Job title is required"),
    companyName: yup.string().required("Company name is required"),
    jobType: yup.string().required("Select job type"),
    category: yup.string().required("Select category"),
    vacancies: yup
      .number()
      .typeError("Vacancies must be a number")
      .positive("Must be positive")
      .integer("Must be an integer")
      .required("Vacancies required"),
    salaryMin: yup.number().typeError("Enter min salary").required("Min salary required"),
    salaryMax: yup.number().typeError("Enter max salary").required("Max salary required"),
    location: yup.string().required("Location is required"),
    education: yup.string().required("Education required"),
    experience: yup.string().required("Experience required"),
    skills: yup.string().required("Enter at least one skill"),
    description: yup.string().required("Description required"),
    applicationDeadline: yup.string().required("Deadline required"),
  })