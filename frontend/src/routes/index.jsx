import { AuthPage, CheckPage, Dashboard, ProductPage, ReceiveProductPage, ReleaseProductPage, ReportPage, ReturnProductPage, Supplier, WarehousePage, WarehouseTransferPage, ProductErrorPage, Login, Register } from "../pages";
import DefaultLayout from "../layouts/DefaultLayout";

const publicRoute = [
  {
    page: Dashboard,
    path: "/",
    layout: DefaultLayout
  },
  {
    page: ProductPage,
    path: "/products",
    layout: DefaultLayout
  },
  {
    page: ReceiveProductPage,
    path: "/ware-receive",
    layout: DefaultLayout
  },
  {
    page: ReleaseProductPage,
    path: "/ware-release",
    layout: DefaultLayout
  },
  {
    page: CheckPage,
    path: "/check-inventory",
    layout: DefaultLayout
  },
  {
    page: ReportPage,
    path: "/report",
    layout: DefaultLayout
  },
  {
    page: ReturnProductPage,
    path: "/return-order",
    layout: DefaultLayout
  },
  {
    page: AuthPage,
    path: "/auth",
    layout: DefaultLayout
  },
  {
    page: ProductErrorPage,
    path: "/product-error",
    layout: DefaultLayout
  },
  {
    page: Supplier,
    path: '/supplier',
    layout: DefaultLayout
  },
  {
    page: WarehousePage,
    path: '/manage-warehouse',
    layout: DefaultLayout
  },
  {
    page: WarehouseTransferPage,
    path: '/ware-transfer',
    layout: DefaultLayout
  },
  {
    page: Login,
    path: '/login',
    layout: null
  },
  {
    page: Register,
    path: '/register',
    layout: null
  }
];


export {
  publicRoute
}