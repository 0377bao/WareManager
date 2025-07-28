import React from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import SidebarItem from "./SidebarItem";
import { faSquareCheck, faChartBar, faEnvelope, faUser, faFileExcel, faArrowAltCircleLeft, faArrowAltCircleRight, faLemon, faFile } from "@fortawesome/free-regular-svg-icons";
import logo from "../../../assets/logo.png"
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

const Sidebar = () => {
  const sidebarMenu = [
    {
      title: "Dashboard",
      iconName: faChartBar,
      path: "/",
    },
    {
      title: "Sản phẩm",
      iconName: faLemon,
      path: "/products",
    },
    {
      title: "Nhập kho",
      iconName: faArrowAltCircleRight,
      path: "/ware-receive",
    },
    {
      title: "Xuất kho",
      iconName: faArrowAltCircleLeft,
      path: "/ware-release",
    },
    {
      title: "Kiểm kê kho",
      iconName: faSquareCheck,
      path: "/check-inventory",
    },
    {
      title: "Báo cáo",
      iconName: faFileExcel,
      path: "/report",
    },
    {
      title: "Đổi trả",
      iconName: faFile,
      path: "/return-order",
    },
    {
      title: "Phân quyền",
      iconName: faUser,
      path: "/auth",
    },
    {
      title: "Cài đặt",
      iconName: faEnvelope,
      path: "/settings",
    },
  ];

  let location = useLocation();
  return (
    <div className={cx("wrapper-sidebar")}>
      <div className={cx("sidebar-content")}>
        <div className={cx("info-user")}>
          <img src={logo} className={cx('logo-sidebar')} loading="lazy"/>
          <h1 className={cx("username")}>Nguyen Van Minh</h1>
        </div>
        <div className={cx("sidebar-list")}>
            {sidebarMenu.map((item, index) => <SidebarItem
            key={index}
            title={item.title}
            iconName={item.iconName}
            path={item.path}
            location={location.pathname}
          />)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
