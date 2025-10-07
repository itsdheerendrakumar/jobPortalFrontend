import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FormValidationError } from "../common/formValidationError"

// ✅ Validation schema
const jobSchema = yup.object({
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
  isRemote: yup.boolean().default(false),
  education: yup.string().required("Education required"),
  experience: yup.string().required("Experience required"),
  skills: yup.string().required("Enter at least one skill"),
  description: yup.string().required("Description required"),
  applicationDeadline: yup.string().required("Deadline required"),
})

type JobForm = yup.InferType<typeof jobSchema>

export  function NewJob() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<JobForm>({
    resolver: yupResolver(jobSchema),
    defaultValues: {
      isRemote: false,
    },
  })

  const onSubmit = (data: JobForm) => {
    setLoading(true)
    console.log("Job Data:", data)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <Card className="max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Create New Job</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="flex flex-col gap-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input id="jobTitle" {...register("jobTitle")} placeholder="Frontend Developer" />
              {errors?.jobTitle && <FormValidationError message={errors.jobTitle?.message}/>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" {...register("companyName")} placeholder="ABC Pvt Ltd" />
              {errors?.companyName && <FormValidationError message={errors.companyName?.message}/>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="jobType">Job Type</Label>
              <select
                id="jobType"
                {...register("jobType")}
                className="w-full border rounded-md p-2 bg-background"
              >
                <option value="">Select type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
                <option value="Freelance">Freelance</option>
              </select>
              {errors?.jobType && <FormValidationError message={errors.jobType?.message}/>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" {...register("category")} placeholder="IT / Marketing / Sales" />
              {errors?.category && <FormValidationError message={errors.category?.message}/>}
            </div>
          </div>

          {/* Salary & Vacancies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="vacancies">Vacancies</Label>
              <Input type="number" id="vacancies" {...register("vacancies")} placeholder="5" />
              {errors?.vacancies && <FormValidationError message={errors.vacancies?.message}/>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="salaryMin">Min Salary</Label>
              <Input type="number" id="salaryMin" {...register("salaryMin")} placeholder="30000" />
              {errors?.salaryMin && <FormValidationError message={errors.salaryMin?.message}/>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="salaryMax">Max Salary</Label>
              <Input type="number" id="salaryMax" {...register("salaryMax")} placeholder="60000" />
              {errors?.salaryMax && <FormValidationError message={errors.salaryMax?.message}/>}
            </div>
          </div>

          {/* Location & Remote */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register("location")} placeholder="New Delhi, India" />
              {errors?.location && <FormValidationError message={errors.location?.message}/>}
            </div>

            <div className="flex items-center space-x-2 mt-6">
              {/* ✅ Correct way to handle shadcn checkbox with RHF */}
              <Checkbox
                id="isRemote"
                checked={watch("isRemote")}
                onCheckedChange={(checked) => setValue("isRemote", checked === true)}
              />
              <Label htmlFor="isRemote">Remote Job</Label>
            </div>
          </div>

          {/* Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="education">Education</Label>
              <Input id="education" {...register("education")} placeholder="Bachelor's Degree" />
              {errors?.education && <FormValidationError message={errors.education?.message}/>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="experience">Experience</Label>
              <Input id="experience" {...register("experience")} placeholder="2+ years" />
              {errors?.experience && <FormValidationError message={errors.experience?.message}/>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="skills">Skills</Label>
              <Input id="skills" {...register("skills")} placeholder="React, Node.js, MongoDB" />
              {errors?.skills && <FormValidationError message={errors.skills?.message}/>}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe the job role and responsibilities"
            />
            {errors?.description && <FormValidationError message={errors.description?.message}/>}
          </div>

          {/* Deadline */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="applicationDeadline">Application Deadline</Label>
            <Input type="date" id="applicationDeadline" {...register("applicationDeadline")} />
            {errors?.applicationDeadline && <FormValidationError message={errors.applicationDeadline?.message}/>}
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Posting..." : "Create Job"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
