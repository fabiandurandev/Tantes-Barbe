import { z } from "zod";

export const addServiceSchema = z.object({
  codigoServicio: z
    .number({
      required_error: "Campo requerido",
      coerce: true,
      invalid_type_error: "Número requerido",
    })
    .min(1, { message: "Campo requerido" }),
  nombreServicio: z
    .string()
    .min(1, { message: "Campo requerido" })
    .min(3, { message: "Logintud mínima 3" }),
  precioServicio: z
    .number({
      required_error: "Campo requerido",
      coerce: true,
      invalid_type_error: "Número requerido",
    })
    .min(1, { message: "Campo requerido" }),
});

export type addServiceFormType = z.infer<typeof addServiceSchema>;
