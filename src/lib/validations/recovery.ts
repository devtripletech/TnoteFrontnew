import { z } from "zod"

export const recoverySchema = z.object({
  
  email: z.string(),

})

export type Client = z.infer<typeof recoverySchema>
