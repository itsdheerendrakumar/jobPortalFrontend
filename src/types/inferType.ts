import type { jobSchema } from "@/formValidation/validation";
import * as yup from "yup";

export type JobForm = yup.InferType<typeof jobSchema>;