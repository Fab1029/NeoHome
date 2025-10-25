import { useContext } from "react";
import { PermissionContext } from "../context/PermissionProvider";

export const usePermission = () => useContext(PermissionContext);