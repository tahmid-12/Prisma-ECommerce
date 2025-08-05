import { count } from "console";
import { z } from "zod";

export const SingUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const AddressSchema = z.object({
  lineOne: z.string(),
  lineTwo: z.string().nullable(),
  pinCode: z.string().length(6),
  country: z.string(),
  city: z.string(),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  defaultShippingAddress: z.number().nullable(),
  defaultBillingAddress: z.number().nullable()
})