export type ProductType = {
  id: number;
  nombreProducto: string;
  codigoProducto: number;
  stock: number;
  precioProducto: string;
};

export type ClientType = {
  id: number;
  nombreCliente: string;
  cedulaCliente: number;
  direccionCliente: string;
  telefonoCliente: string;
};

type ItemProductType = {
  producto: number;
  cantidad: number;
};

export type SaleType = {
  idCliente: number;
  idEmpleado: number;
  estadoVenta: string;
  itemsProductos: ItemProductType[];
};
