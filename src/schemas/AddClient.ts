import { z } from "zod";

export const addClientSchema = z.object({
  cedulaCliente: z
    .number({
      required_error: "Campo requerido",
      coerce: true,
      invalid_type_error: "Número requerido",
    })
    .min(1, { message: "Campo requerido" })
    .min(3, { message: "Logintud mínima 3" }),
  telefonoCliente: z
    .string()
    .min(1, { message: "Campo requerido" })
    .min(3, { message: "Logintud mínima 3" })
    .max(100, { message: "Longitud máxima excedida." }),
  nombreCliente: z.string().min(1, { message: "Campo requerido" }),
  direccionCliente: z.string().min(1, { message: "Campo requerido" }),
});

export type addClientFormType = z.infer<typeof addClientSchema>;
