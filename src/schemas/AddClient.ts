import { z } from "zod";

export const addClientSchema = z.object({
  cedulaCliente: z
    .number({
      required_error: "Campo requerido",
      coerce: true,
      invalid_type_error: "Número requerido",
    })
    .min(1, { message: "Campo requerido" })
    .min(3, { message: "Logintud mínima 3" })
    .max(99999999, { message: "Logintud máxima excedida." })
    .refine((val) => Number.isInteger(val), {
      message: "El número debe ser un entero sin decimales.",
    }),
  telefonoCliente: z
    .string()
    .min(1, { message: "Campo requerido" })
    .min(3, { message: "Logintud mínima 3" })
    .max(12, { message: "Longitud máxima excedida." }),
  nombreCliente: z
    .string()
    .min(1, { message: "Campo requerido" })
    .max(40, { message: "Longituda máxima excedida." }),
  direccionCliente: z
    .string()
    .min(1, { message: "Campo requerido" })
    .max(40, { message: "Longitud máxima  excedida." }),
});

export type addClientFormType = z.infer<typeof addClientSchema>;
