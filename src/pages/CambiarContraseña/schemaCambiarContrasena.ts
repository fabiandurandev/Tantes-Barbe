import z from "zod";

export const cambiarContrasenaSchema = z
  .object({
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

export type cambiarContrasenaSchemaType = z.infer<
  typeof cambiarContrasenaSchema
>;
