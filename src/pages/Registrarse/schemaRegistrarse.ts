import z from "zod";

export const registrarseSchema = z
  .object({
    email: z
      .string({ message: "Debe ser un texto" })
      .email({ message: "Debe ser un correo válido." })
      .min(1, { message: "Email requerido." })
      .max(250, { message: "Longitud máxima excedida." }),
    password: z
      .string()
      .min(1, { message: "Campo requerido." })
      .min(4, { message: "Debe tener al menos 4 caracteres." }),
    confirmarPassword: z.string().min(1, { message: "Campo requerido." }),
  })
  .refine((data) => data.password === data.confirmarPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarPassword"], // Apunta el error al campo de confirmación
  });

export type registrarseSchemaType = z.infer<typeof registrarseSchema>;
