import { z } from "zod";

export const seleccionarempleadoSchema = z.object({
  empleado: z
    .number({
      required_error: "Debe seleccionar un empelado.",
    })
    .min(1, { message: "Debe seleccionar un empleado." }),
});

export type seleccionarempleadoSchemaType = z.infer<
  typeof seleccionarempleadoSchema
>;
