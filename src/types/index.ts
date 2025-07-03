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
