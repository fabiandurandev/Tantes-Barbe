import { z } from "zod";

export const supplierSearchSchema = z.object({
  rifProveedor: z
    .number({
      required_error: "Campo requerido.",
      coerce: true,
      invalid_type_error: "Número requerido.",
    })
    .min(1, { message: "Campo requerido" }),
});

export type SupplierSearchFormType = z.infer<typeof supplierSearchSchema>;
