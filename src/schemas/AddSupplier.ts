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
    .max(40, { message: "Longitud máxima excedida." }),
  emailProveedor: z
    .string({
      invalid_type_error: "Debe ser un texto",
    })
    .email({ message: "Debe ser un correo válido." })
    .min(1, { message: "El correo es requerido." })
    .max(50, { message: "Longitud máxima excedida." }),
  telefonoProveedor: z
    .string()
    .min(1, { message: "Campo requerido." })
    .max(12, { message: "Longitud máxima excedida." }),
  direccionProveedor: z
    .string()
    .min(1, { message: "Campo requerido" })
    .max(40, { message: "Longitud máxima excedida." }),
});

export type AddSupplierFormType = z.infer<typeof addSupplierSchema>;
