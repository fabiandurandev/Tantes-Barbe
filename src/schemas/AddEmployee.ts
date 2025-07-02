import { z } from "zod";


export const addEmployeeSchema = z.object({
    cedulaEmpleado: z
        .number({
        required_error: "Campo requerido",
        coerce: true,
        invalid_type_error: "Campo requerido",
         })
        .min(1, { message: "Campo requerido"}),
    nombreEmpleado: z
        .string()
        .min(1, { message: "Campo requerido"})
        .min(3, { message: "Longitud minima 3"}),
    telefonoEmpleado: z
        .number({
            required_error: "Campo requerido",
            coerce: true,
            invalid_type_error: "Numero requerido",
        })
        .min(1, { message: "Campo requerido" }),
    emailEmpleado: z
        .string().email({ message: "Debe ser un correo valido"})
        .min(1, { message: "Campo requerido"})
        .min(3, { message: "Longitud minima 3"}),

    direccionEmpleado: z
        .string()
        .min(1, { message: "Campo requerido"})
        .min(3, { message: "Longitud minima 3"}),
})

export type addEmployeeformType = z.infer<typeof addEmployeeSchema>;