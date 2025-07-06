import type { ClientType, ProductType, ServiceType } from "../../types";

export default function PayloadVenta(
  client: ClientType | undefined,
  employeeId: number,
  products?: ProductType[],
  services?: ServiceType[],
  quantityProducts?: number[],
  quantityServices?: number[]
) {
  return {
    idCliente: client!.id,
    idEmpleado: 1,
    estadoVenta: "VAL",
    itemsProductos: products?.map((p, i) => ({
      producto: p.id,
      cantidad: quantityProducts?.[i],
    })),
    itemsServicios: services?.map((s, i) => ({
      servicio: s.id,
      cantidad: quantityServices?.[i],
    })),
  };
}
