import { z } from "zod";

export const productSchema = z.object({
  productName: z
    .string({ required_error: "Campo requerido" })
    .min(1, { message: "Campo requerido" })
    .min(3, { message: "Longitud mínima 3" })
    .max(100, { message: "Logintud máxima 100" }),
});

export type ProductSearchForm = z.infer<typeof productSchema>;
