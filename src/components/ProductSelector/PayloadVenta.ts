import type { ClientType, ProductType } from "../../types";

export default function PayloadVenta(
  client: ClientType | undefined,
  employeeId: number,
  products: ProductType[],
  quantity: number[]
) {
  return {
    idCliente: client!.id,
    idEmpleado: 1,
    estadoVenta: "VAL",
    itemsProductos: products.map((p, i) => ({
      producto: p.id,
      cantidad: quantity[i],
    })),
  };
}
