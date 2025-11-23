import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FormValidationError } from "../common/formValidationError"
import { jobSchema } from "@/formValidation/validation"
import {jobCategory, jobType} from "@/constants"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { JobForm } from "@/types/inferType"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { createJob } from "@/service/apis"
import type { CustomError } from "@/types/error"


export  function NewJob() {

  const queryClient = new QueryClient();
  const jobMutation = useMutation<any, CustomError, JobForm>({
    mutationFn: (payload) => createJob(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["jobListing"], exact: true});
      reset();
  }
  })
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<JobForm>({
    resolver: yupResolver(jobSchema),
    defaultValues: {
      
    },
  })

  const onSubmit = (data: JobForm) => {
    jobMutation.mutate(data);
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
                            <SelectItem key={type.value} value={type.value}>
                                {type.label}
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
              <Label htmlFor="vacancy">Vacancies</Label>
              <Input type="number" id="vacancy" {...register("vacancy")} placeholder="5" />
              {errors?.vacancy && <FormValidationError message={errors.vacancy?.message}/>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="minSalary">Min Salary</Label>
              <Input type="number" id="minSalary" {...register("minSalary")} placeholder="30000" />
              {errors?.minSalary && <FormValidationError message={errors.minSalary?.message}/>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="maxSalary">Max Salary</Label>
              <Input type="number" id="maxSalary" {...register("maxSalary")} placeholder="60000" />
              {errors?.maxSalary && <FormValidationError message={errors.maxSalary?.message}/>}
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
            <Label htmlFor="deadline">Application Deadline</Label>
            <Input type="date" id="deadline" {...register("deadline")} />
            {errors?.deadline && <FormValidationError message={errors.deadline?.message}/>}
          </div>

          <Button type="submit" disabled={jobMutation?.isPending} className="w-full">
            {jobMutation?.isPending ? "Posting..." : "Create Job"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
