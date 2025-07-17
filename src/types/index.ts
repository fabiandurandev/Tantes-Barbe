export type ProductType = {
  id: number;
  nombreProducto: string;
  codigoProducto: number;
  stock: number;
  precioProducto: string;
};

export type ClientType = {
  length: number;
  id: number;
  nombreCliente: string;
  cedulaCliente: number;
  direccionCliente: string;
  telefonoCliente: number;
};

export type ItemProductType = {
  producto: number;
  cantidad: number | undefined;
};

type ItemServiceType = {
  servicio: number;
  cantidad: number | undefined;
};

export type SaleType = {
  idCliente: number;
  idEmpleado: number;
  estadoVenta: string;
  itemsProductos?: ItemProductType[];
  itemsServicios?: ItemServiceType[];
};

export type ServiceType = {
  id: number;
  nombreServicio: string;
  codigoServicio: number;
  precioServicio: string;
};

export type SupplierType = {
  id: number;
  rifProveedor: number;
  nombreProveedor: string;
  emailProveedor: string;
  telefonoProveedor: string;
  direccionProveedor: string;
};

export type EmployeeType = {
  id: number;
  cedulaEmpleado: number;
  nombreEmpleado: string;
  direccionEmpleado: string;
  telefonoEmpleado: string;
  emailEmpleado: string;
  nivelAutorizacion: string;
};

export type CompraType = {
  idProveedor: number;
  estadoCompra: string;
  itemsProductos?: ItemProductType[];
};

export type ProductoType = {
  producto: number;
  nombreProducto: string;
  precioProducto: string;
  cantidad: number;
  producto_subtotal: number;
};

export type ServicioType = {
  servicio: number;
  nombreServicio: string;
  precioServicio: number;
  cantidad: number;
  servicio_subtotal: number;
};

export type VentaType = {
  id: number;
  fecha: string;
  idCliente: ClientType;
  idEmpleado: EmployeeType;
  estadoVenta: string;
  itemsProductos?: ProductoType[];
  itemsServicios?: ServicioType[];
  tasaCambio: number;
  precio_total_bs: number;
  precio_total: number;
};

export type ComprasType = {
  id: number;
  fecha: string;
  idProveedor: SupplierType;
  estadoCompra: string;
  itemsProductosCompra?: ProductoType[];
  precio_total: number;
  precio_total_bs: number;
};
