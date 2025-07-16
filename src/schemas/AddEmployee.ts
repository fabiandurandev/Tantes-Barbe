import { z } from "zod";

export const addEmployeeSchema = z.object({
  nombreEmpleado: z
    .string()
    .min(1, { message: "Campo requerido." })
    .min(3, { message: "Longitud mínima 3." })
    .max(40, { message: "Longitud máxima excedida." }),
  cedulaEmpleado: z
    .number({
      required_error: "Campo requerido.",
      coerce: true,
      invalid_type_error: "Número requerido",
    })
    .min(1, { message: "Longitud mínima 1." })
    .max(999999999, { message: "Longitud máxima excedida." })
    .refine((val) => Number.isInteger(val), {
      message: "El número debe ser un entero sin decimales.",
    }),
  direccionEmpleado: z
    .string()
    .min(1, { message: "Campo requerido" })
    .min(3, { message: "Longitud mínima 3." })
    .max(40, { message: "Longitud máxima excedida." }),
  telefonoEmpleado: z
    .string()
    .min(1, { message: "Campo requerido." })
    .min(3, { message: "Longitud mínima 3." })
    .max(12, { message: "Longitud máxima excedida." }),
  emailEmpleado: z
    .string({ message: "Debe ser un texto" })
    .email({ message: "Debe ser un correo válido." })
    .min(1, { message: "Email requerido." })
    .max(50, { message: "Longitud máxima excedida." }),
  nivelAutorizacion: z
    .string({
      required_error: "Debe seleccionar un rol.",
    })
    .min(1, { message: "Debe seleccionar un rol." }),
});

export type addEmployeeFormType = z.infer<typeof addEmployeeSchema>;
