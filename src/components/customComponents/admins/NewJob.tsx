import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FormValidationError } from "../common/formValidationError"
import { jobSchema } from "@/formValidation/validation"
import {jobCategory, jobType} from "@/constants"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
type JobForm = yup.InferType<typeof jobSchema>

export  function NewJob() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<JobForm>({
    resolver: yupResolver(jobSchema),
    defaultValues: {
      
    },
  })

  const onSubmit = (data: JobForm) => {
    setLoading(true)
    console.log("Job Data:", data)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <Card className="max-w-3xl mx-auto shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

            <div className="flex flex-col gap-2 [&>button]:w-full">
              <Label htmlFor="jobType">Job Type</Label>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => 
                <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                        {jobType.map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>}
              />
              {errors?.jobType && <FormValidationError message={errors.jobType?.message}/>}
            </div>

            <div className="flex flex-col gap-2 [&>button]:w-full">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => 
                <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {jobCategory.map((ctg) => (
                            <SelectItem key={ctg.value} value={ctg.value}>
                                {ctg.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>}
              />
              {errors?.category && <FormValidationError message={errors.category?.message}/>}
            </div>
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register("location")} placeholder="New Delhi, India" />
              {errors?.location && <FormValidationError message={errors.location?.message}/>}
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe the job role and responsibilities"
            />
            {errors?.description && <FormValidationError message={errors.description?.message}/>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="applicationDeadline">Application Deadline</Label>
            <Input type="date" id="applicationDeadline" {...register("applicationDeadline")} />
            {errors?.applicationDeadline && <FormValidationError message={errors.applicationDeadline?.message}/>}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Posting..." : "Create Job"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
