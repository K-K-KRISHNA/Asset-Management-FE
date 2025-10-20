import {
  FilePlusIcon,
  FilesIcon,
  NotePencilIcon,
  ShieldCheckIcon,
  SquaresFourIcon,
  TruckIcon,
  UploadSimpleIcon,
  UsersFourIcon,
} from "@phosphor-icons/react";
export const BASE_URL = "http://localhost:8080/";

export const routes = [
  {
    label: "Dashboard",
    Icon: SquaresFourIcon,
    path: "/dashboard",
  },
  {
    label: "Add New Asset",
    Icon: FilePlusIcon,
    path: "/add-asset",
  },
  {
    label: "Asset List",
    Icon: FilesIcon,
    path: "/asset-list",
  },
  {
    label: "User List",
    Icon: UsersFourIcon,
    path: "/user-list",
  },
  {
    label: "Requests",
    Icon: NotePencilIcon,
    path: "/requests",
  },
  {
    label: "Warranty",
    Icon: ShieldCheckIcon,
    path: "/warranty",
  },
  {
    label: "Bulk Upload",
    Icon: UploadSimpleIcon,
    path: "/bulk-upload",
  },
  {
    label: "Order Tracking",
    Icon: TruckIcon,
    path: "/order-tracking",
  },
];
