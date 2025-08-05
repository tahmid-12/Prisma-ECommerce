import { z } from "zod";

export const CreateCartScheme = z.object({
  productId: z.number(),
  quantity: z.number()
})

export const ChangeQuantityScheme = z.object({
  quantity: z.number()
})