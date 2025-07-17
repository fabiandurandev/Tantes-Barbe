import { z } from "zod";

const tasaCambioSchema = z.object({
  tasaCambio: z.coerce
    .number({
      required_error: "Campo requerido",
      invalid_type_error: "Numero requerido",
    })
    .min(1, { message: "Campo requerido" })
    .max(999999999, { message: "Longitud excedida." }),
});

export default tasaCambioSchema;

export type tasaCambioSchemaType = z.infer<typeof tasaCambioSchema>;
