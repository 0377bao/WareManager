import { AuthPage, CheckPage, Dashboard, ProductPage, ReceiveProductPage, ReleaseProductPage, ReportPage, ReturnProductPage, Supplier, WarehousePage, WarehouseTransferPage, ProductErrorPage } from "../pages";

const publicRoute = [
  {
    page: Dashboard,
    path: "/",
  },
  {
    page: ProductPage,
    path: "/products",
  },
  {
    page: ReceiveProductPage,
    path: "/ware-receive",
  },
  {
    page: ReleaseProductPage,
    path: "/ware-release",
  },
  {
    page: CheckPage,
    path: "/check-inventory",
  },
  {
    page: ReportPage,
    path: "/report",
  },
  {
    page: ReturnProductPage,
    path: "/return-order",
  },
  {
    page: AuthPage,
    path: "/auth",
  },
  {
    page: ProductErrorPage,
    path: "/product-error"
  },
  {
    page: Supplier,
    path: '/supplier'
  },
  {
    page: WarehousePage,
    path: '/manage-warehouse'
  },
  {
    page: WarehouseTransferPage,
    path: '/ware-transfer'
  }
];


export {
  publicRoute
}