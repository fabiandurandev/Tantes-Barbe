import z from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Debe ser un texto" })
    .email({ message: "Debe ser un correo válido." })
    .min(1, { message: "Email requerido." })
    .max(250, { message: "Longitud máxima excedida." }),
  password: z.string().min(1, { message: "Campo requerido." }),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
