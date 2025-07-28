import { AuthPage, CheckPage, Dashboard, ProductPage, ReceiveProductPage, ReleaseProductPage, ReportPage, ReturnProductPage } from "../pages";

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
];


export {
  publicRoute
}