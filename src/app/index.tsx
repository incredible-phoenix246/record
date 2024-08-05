"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import validator from "validator";
import * as FormComp from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  BetweenHorizonalStart,
  Fingerprint,
  House,
  Phone,
  User,
  X,
} from "lucide-react";
import { cn } from "@/utils";
import { Label } from "@/components/ui/label";
import { Add } from "iconsax-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const WardSchema = z.object({
  name: z.string().min(1, { message: "Ward name is required." }).min(3, {
    message: "Ward name must be at least 3 characters",
  }),
  relationship: z
    .string()
    .min(1, { message: "Relationship is required." })
    .min(3, {
      message: "Relationship must be at least 3 characters",
    }),
});

const FormProps = z.object({
  staff_id: z.string().min(4, {
    message: "id must be at least 4 characters",
  }),
  first_name: z.string().min(1, { message: "First name is required." }).min(3, {
    message: "First name must be at least 3 characters",
  }),
  last_name: z.string().min(1, { message: "Last name is required." }).min(3, {
    message: "Last name must be at least 3 characters",
  }),
  phone_number: z.string().refine(validator.isMobilePhone, {
    message: "Invalid phone number",
  }),
  staff_category: z.enum(["academic", "non_academic", "police"], {
    message: "You need to select a category type.",
  }),
  staff_address: z.string().min(3, {
    message: "staff address is required",
  }),
  department: z.string().min(3, {
    message: "falculty is required",
  }),
  relationship_status: z.string().min(3, {
    message: "falculty is required",
  }),
  email: z.string().email().optional(),
  image_url: z.string().optional(),
  wards: z.array(WardSchema).optional(),
});

export const Form = () => {
  const [isLoading, startTransition] = useTransition();
  const [image, setImage] = useState<File | Blob | undefined | null>();
  const form = useForm<z.infer<typeof FormProps>>({
    resolver: zodResolver(FormProps),
    // defaultValues: {
    //   email: "",
    //   password: "",
    // },
  });
  return (
    <main className="">
      <FormComp.Form {...form}>
        <form className="flex w-full flex-col md:flex-row gap-4 gap-y-8 md:gap-8  py-4 xl:py-8 px-2 sm:px-4 md:px-6 lg:px-8 h-full items-start">
          <div className="flex w-[300px] h-[300px] max-md:w-full max-md:justify-center">
            {image ? (
              <div className="flex flex-col gap-y-2 h-full w-full relative overflow-hidden rounded-lg">
                <Image
                  width={300}
                  height={300}
                  src={URL.createObjectURL(image!)}
                  alt="Client"
                  className="w-full h-full object-cover rounded-lg transition-all duration-300 hover:duration-700 hover:scale-150"
                />
                {/* @ts-ignore */}
                <span className="absolute bottom-1 left-0 bg-gradient-to-r from-white via-white/50 to-white/5 px-2 w-full text-left font-medium">
                  {/* @ts-ignore */}
                  {image?.name.length > 20
                    ? // @ts-ignore
                      image?.name.slice(0, 20) + "..."
                    : // @ts-ignore
                      image?.name}
                </span>
                <button
                  type="button"
                  tabIndex={0}
                  aria-label="Remove image"
                  onClick={() => setImage(undefined)}
                  className="text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rounded-full bg-white/60 backdrop-blur-sm absolute top-1 right-1 w-8 h-8 flex items-center justify-center hover:text-red-500 hover:bg-white/80 hover:brightness-150 transition-all duration-700 hover:duration-200"
                  title="Remove image"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div
                className={cn(
                  "flex w-full h-full min-h-[300px] items-center justify-center bg-[#f6f6f6]",
                  {
                    hidden: image,
                  }
                )}
              >
                <Label
                  htmlFor="staff_image"
                  className="cursor-pointer flex flex-col items-center justify-center gap-y-3"
                >
                  <button
                    role="span"
                    type="button"
                    className="w-12 h-12 rounded-full bg-white dark:bg-primary-light flex items-center justify-center pointer-events-none text-[#535353] dark:text-gray-300"
                    tabIndex={-1}
                    aria-hidden
                  >
                    <Add size={24} />
                  </button>
                  <span className="text-xs sm:text-sm w-full text-center text-[#535353]">
                    Upload Profile photo
                  </span>
                </Label>
                <Input
                  id="staff_image"
                  type="file"
                  accept="image/*"
                  disabled={isLoading}
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    setImage(file);
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex w-full flex-col gap-y-4 sm:gap-y-6 pt-8 md:pt-0">
            <FormComp.FormField
              control={form.control}
              name="staff_id"
              render={({ field }) => (
                <FormComp.FormItem className="grid gap-2">
                  <FormComp.FormLabel htmlFor="staff_id">
                    SP/AP Number
                  </FormComp.FormLabel>
                  <FormComp.FormControl>
                    <div className="relative flex w-full items-center">
                      <Input
                        {...field}
                        type="text"
                        id="staff_id"
                        placeholder="e.g. for staffs sp/1234 for police 123456"
                        className="pl-[36px]"
                        disabled={isLoading}
                      />
                      <span className="absolute left-2 h-4 w-4  sm:h-6 sm:w-6 sm:p-[2px]">
                        <Fingerprint className="h-full w-full" size={16} />
                      </span>
                    </div>
                  </FormComp.FormControl>
                  <FormComp.FormMessage />
                </FormComp.FormItem>
              )}
            />
            <FormComp.FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormComp.FormItem className="grid gap-2">
                  <FormComp.FormLabel htmlFor="first_name">
                    First Name
                  </FormComp.FormLabel>
                  <FormComp.FormControl>
                    <div className="relative flex w-full items-center">
                      <Input
                        {...field}
                        type="text"
                        id="first_name"
                        placeholder="e.g. John"
                        className="pl-[36px]"
                        disabled={isLoading}
                      />
                      <span className="absolute left-2 h-4 w-4  sm:h-6 sm:w-6 sm:p-[2px]">
                        <User className="h-full w-full" size={16} />
                      </span>
                    </div>
                  </FormComp.FormControl>
                  <FormComp.FormMessage />
                </FormComp.FormItem>
              )}
            />
            <FormComp.FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormComp.FormItem className="grid gap-2">
                  <FormComp.FormLabel htmlFor="last_name">
                    Last Name
                  </FormComp.FormLabel>
                  <FormComp.FormControl>
                    <div className="relative flex w-full items-center">
                      <Input
                        {...field}
                        type="text"
                        id="last_name"
                        placeholder="e.g. John"
                        className="pl-[36px]"
                        disabled={isLoading}
                      />
                      <span className="absolute left-2 h-4 w-4  sm:h-6 sm:w-6 sm:p-[2px]">
                        <User className="h-full w-full" size={16} />
                      </span>
                    </div>
                  </FormComp.FormControl>
                  <FormComp.FormMessage />
                </FormComp.FormItem>
              )}
            />
            <FormComp.FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormComp.FormItem className="grid gap-2">
                  <FormComp.FormLabel htmlFor="phone_number">
                    Phone Number
                  </FormComp.FormLabel>
                  <FormComp.FormControl>
                    <div className="relative flex w-full items-center">
                      <Input
                        {...field}
                        type="tel"
                        id="phone_number"
                        placeholder="e.g. (234) 123-4567"
                        className="pl-[36px]"
                        disabled={isLoading}
                      />
                      <span className="absolute left-2 h-4 w-4  sm:h-6 sm:w-6 sm:p-[2px]">
                        <Phone className="h-full w-full" size={16} />
                      </span>
                    </div>
                  </FormComp.FormControl>
                  <FormComp.FormMessage />
                </FormComp.FormItem>
              )}
            />
            <FormComp.FormField
              control={form.control}
              name="staff_category"
              render={({ field }) => (
                <FormComp.FormItem className="grid gap-2">
                  <FormComp.FormLabel htmlFor="staff_category">
                    Staff Category
                  </FormComp.FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormComp.FormControl>
                      <SelectTrigger className="relative flex w-full items-center">
                        <SelectValue
                          placeholder="Select a categotry"
                          className="pl-[36px] placeholder:pl-[36px]"
                        />
                      </SelectTrigger>
                    </FormComp.FormControl>
                    <SelectContent>
                      <SelectItem value="academic">Academic Staff</SelectItem>
                      <SelectItem value="non_academic">
                        non academic Staff
                      </SelectItem>
                      <SelectItem value="police">Police</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormComp.FormMessage />
                </FormComp.FormItem>
              )}
            />
            <FormComp.FormField
              control={form.control}
              name="relationship_status"
              render={({ field }) => (
                <FormComp.FormItem className="grid gap-2">
                  <FormComp.FormLabel htmlFor="relationship_status">
                    Relationship Status
                  </FormComp.FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormComp.FormControl>
                      <SelectTrigger className="relative flex w-full items-center">
                        <SelectValue
                          placeholder="Relationship Status"
                          className="pl-[36px] placeholder:pl-[36px]"
                        />
                      </SelectTrigger>
                    </FormComp.FormControl>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormComp.FormMessage />
                </FormComp.FormItem>
              )}
            />
            <FormComp.FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormComp.FormItem className="grid gap-2">
                  <FormComp.FormLabel htmlFor="department">
                    Department
                  </FormComp.FormLabel>
                  <FormComp.FormControl>
                    <div className="relative flex w-full items-center">
                      <Input
                        {...field}
                        type="text"
                        id="department"
                        placeholder="e.g. admin, law"
                        className="pl-[36px]"
                        disabled={isLoading}
                      />
                      <span className="absolute left-2 h-4 w-4  sm:h-6 sm:w-6 sm:p-[2px]">
                        <BetweenHorizonalStart
                          className="h-full w-full"
                          size={16}
                        />
                      </span>
                    </div>
                  </FormComp.FormControl>
                  <FormComp.FormMessage />
                </FormComp.FormItem>
              )}
            />
            <FormComp.FormField
              control={form.control}
              name="staff_address"
              render={({ field }) => (
                <FormComp.FormItem className="grid gap-2">
                  <FormComp.FormLabel htmlFor="staff_address">
                    Staff Address
                  </FormComp.FormLabel>
                  <FormComp.FormControl>
                    <div className="relative flex w-full items-center">
                      <Input
                        {...field}
                        type="text"
                        id="phone_number"
                        placeholder="e.g. 123 staff road"
                        className="pl-[36px]"
                        disabled={isLoading}
                      />
                      <span className="absolute left-2 h-4 w-4  sm:h-6 sm:w-6 sm:p-[2px]">
                        <House className="h-full w-full" size={16} />
                      </span>
                    </div>
                  </FormComp.FormControl>
                  <FormComp.FormMessage />
                </FormComp.FormItem>
              )}
            />
          </div>
        </form>
      </FormComp.Form>
    </main>
  );
};
