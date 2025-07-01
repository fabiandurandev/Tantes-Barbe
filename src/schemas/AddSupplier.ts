import { z } from "zod";

export const addSupplierSchema = z.object({
  rifProveedor: z
    .number({
      required_error: "Campo requerido.",
      coerce: true,
      invalid_type_error: "Número requerido.",
    })
    .min(1, { message: "Longitud mínima 1." })
    .max(999999999, { message: "Longitud mínima 9." })
    .refine((val) => Number.isInteger(val), {
      message: "El número debe ser un entero sin decimales.",
    }),
  nombreProveedor: z
    .string()
    .min(1, { message: "Campo requerido" })
    .min(3, { message: "Longitud mínima 3." })
    .max(100, { message: "Longitud máxima 100." }),
  emailProveedor: z
    .string({
      invalid_type_error: "Debe ser un texto",
    })
    .email({ message: "Debe ser un correo válido." })
    .min(1, { message: "El correo es requerido." })
    .max(250, { message: "Longitud máxima 250." }),
  telefonoProveedor: z
    .string()
    .min(1, { message: "Campo requerido." })
    .max(100, { message: "Longitud máxima 100." }),
  direccionProveedor: z
    .string()
    .min(1, { message: "Campo requerido" })
    .max(250, { message: "Longitud máxima 250." }),
});

export type AddSupplierFormType = z.infer<typeof addSupplierSchema>;
