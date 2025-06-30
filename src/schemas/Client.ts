import { z } from "zod";

export const clientSchema = z.object({
  cedulaClient: z
    .number({
      required_error: "Campo requerido.",
      coerce: true,
      invalid_type_error: "Número requerido.",
    })
    .min(1, { message: "Campo requerido" }),
});

export type ClientSearchFormType = z.infer<typeof clientSchema>;
