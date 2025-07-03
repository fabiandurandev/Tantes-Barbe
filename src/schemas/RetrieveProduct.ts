import { z } from "zod";

const retrieveProduct = z.object({
  CodigoProducto: z
    .number({
      required_error: "Campo requerido",
      coerce: true,
      invalid_type_error: "Numero requerido",
    })
    .min(1, { message: "Campo requerido" }),
});

export type retrieveProductFormType = z.infer<typeof retrieveProduct>;

export default retrieveProduct;
