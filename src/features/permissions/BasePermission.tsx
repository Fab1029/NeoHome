interface BasePermission {
    key: string;
    isGranted: () => Promise<boolean>;
    request: () => Promise<void>;
};

export default BasePermission;