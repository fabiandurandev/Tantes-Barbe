import { z } from "zod";

const retrieveClientSchema = z.object({
  cedulaCliente: z
    .number({
      required_error: "Campo requerido",
      coerce: true,
      invalid_type_error: "Numero requerido",
    })
    .min(1, { message: "Campo requerido" }),
});

export type retrieveClientFormType = z.infer<typeof retrieveClientSchema>;

export default retrieveClientSchema;
