import z from "zod";

export const olvidarContrasenaSchema = z.object({
  email: z
    .string({ message: "Debe ser un texto" })
    .email({ message: "Debe ser un correo válido." })
    .min(1, { message: "Email requerido." })
    .max(250, { message: "Longitud máxima excedida." }),
});

export type olvidarContrasenaSchemaType = z.infer<
  typeof olvidarContrasenaSchema
>;
