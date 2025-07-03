import { z } from "zod";

export const addProductSchema = z.object({
  codigoProducto: z
    .number({
      required_error: "Campo requerido",
      coerce: true,
      invalid_type_error: "Número requerido",
    })
    .min(1, { message: "Campo requerido" })
    .int({ message: "Debe ser un numero entero sin decimales." }),
  nombreProducto: z
    .string()
    .min(1, { message: "Campo requerido" })
    .min(3, { message: "Logintud mínima 3" }),
  precioProducto: z
    .number({
      required_error: "Campo requerido",
      coerce: true,
      invalid_type_error: "Número requerido",
    })
    .min(1, { message: "Campo requerido" }),
});

export type addProductFormType = z.infer<typeof addProductSchema>;
