import { z } from "zod";

const retrieveService = z.object({
  codigoServicio: z
    .number({
      required_error: "Campo requerido",
      coerce: true,
      invalid_type_error: "Numero requerido",
    })
    .min(1, { message: "Campo requerido" }),
});

export type retrieveServiceFormType = z.infer<typeof retrieveService>;

export default retrieveService;
