
import * as Notifications from 'expo-notifications';
import BasePermission from './BasePermission';

class NotificationPermission implements BasePermission {
    key: string = "notification_permission";

    async isGranted(): Promise<boolean> {
        const { status } = await Notifications.getPermissionsAsync();
        return status === 'granted';
    }

    async request(): Promise<void> {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            console.warn("Permiso de notificaciones no concedido");
        }
    }
}
export default NotificationPermission;