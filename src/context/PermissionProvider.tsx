import { createContext, ReactNode, useEffect, useState } from "react";
import BasePermission from "../features/permissions/BasePermission";
import NotificationPermission from "../features/permissions/NotificationPermission";

type PermissionMap = {
  [key: string]: BasePermission;
};

export const PermissionContext = createContext<PermissionMap | undefined>(undefined);


export const PermissionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [permissions, setPermissions] = useState<PermissionMap>({});

  useEffect(() => {

    setPermissions({
      notification: new NotificationPermission(),
      // Agregar mas
    });
  }, []);

  return (
    <PermissionContext.Provider value={permissions}>
      {children}
    </PermissionContext.Provider>
  );
};