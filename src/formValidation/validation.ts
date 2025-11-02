import * as yup from "yup"

export const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })

export const signupSchema = yup
  .object({
    email: yup.string().trim().email().required(),
    password: yup.string().trim().trim().min(6).max(15).trim().required(),
    name: yup.string().trim().trim().min(2).max(20).matches(/^[A-Za-z ]+$/, "Name will contain alphabets only").required(),
    phone: yup.string().trim().trim().min(4).max(13).matches(/^[0-9]+$/, "Phone will accept digit only.").required(),
    country: yup.string().trim().trim().max(40).required(),
  })
  


  export const jobSchema = yup.object({
    jobTitle: yup.string().required("Job title is required"),
    companyName: yup.string().required("Company name is required"),
    jobType: yup.string().required("Select job type"),
    category: yup.string().required("Select category"),
    vacancy: yup
      .number()
      .typeError("Vacancies must be a number")
      .positive("Must be positive")
      .integer("Must be an integer")
      .required("Vacancies required"),
    minSalary: yup.number().typeError("Enter min salary").required("Min salary required"),
    maxSalary: yup.number().typeError("Enter max salary").required("Max salary required"),
    location: yup.string().required("Location is required"),
    education: yup.string().required("Education required"),
    experience: yup.string().required("Experience required"),
    skills: yup.string().required("Enter at least one skill"),
    description: yup.string().required("Description required"),
    deadline: yup.string().required("Deadline required"),
  })