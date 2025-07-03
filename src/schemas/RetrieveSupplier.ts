import { z } from "zod";

export const retrieveSupplierSchema = z.object({
  rifProveedor: z
    .number({
      required_error: "Campo requerido.",
      coerce: true,
      invalid_type_error: "Número requerido.",
    })
    .min(1, { message: "Longitud mínima 1." })
    .max(999999999, { message: "Logintud maxima excedida." })
    .refine((val) => Number.isInteger(val), {
      message: "El número debe ser un entero sin decimales.",
    }),
});

export type retrieveSupplierFormType = z.infer<typeof retrieveSupplierSchema>;
