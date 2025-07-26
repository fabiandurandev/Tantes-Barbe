import z from "zod";

export const verificarCodigoSchema = z.object({
  codigo: z
    .string()
    .min(1, { message: "Campo requerido" })
    .min(3, { message: "Logintud mínima 3" })
    .max(12, { message: "Longitud máxima excedida." }),
});

export type verificarCodigoSchemaType = z.infer<typeof verificarCodigoSchema>;
