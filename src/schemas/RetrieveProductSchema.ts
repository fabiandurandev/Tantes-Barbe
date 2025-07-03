import { z } from "zod";

const retrieveProductSchema = z.object({
  codigoProducto: z
    .number({
      required_error: "Campo requerido",
      coerce: true,
      invalid_type_error: "Numero requerido",
    })
    .min(1, { message: "Campo requerido" })
    .int({ message: "Debe ser un numero entero sin decimales." }),
});

export type retrieveProductFormType = z.infer<typeof retrieveProductSchema>;

export default retrieveProductSchema;
