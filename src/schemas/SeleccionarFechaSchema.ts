import { z } from "zod";

export const fechasSchema = z
  .object({
    fechaInicio: z
      .string()
      .nonempty("Fecha de inicio requerida")
      .min(1, { message: "Campo requerido." }),
    fechaFin: z
      .string()
      .nonempty("Fecha de fin requerida")
      .min(1, { message: "Campo requerido." }),
  })
  .refine((data) => data.fechaFin > data.fechaInicio, {
    message: "La fecha de fin debe ser mayor que la de inicio",
    path: ["fechaFin"],
  });

export type FechasFormType = z.infer<typeof fechasSchema>;
