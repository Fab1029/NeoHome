import * as ExpoDevice from "expo-device";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import base64 from "react-native-base64";
import { BleManager, Device } from "react-native-ble-plx";
import Toast from "react-native-toast-message";

interface BLEContextType {
  requestPermissions: () => Promise<boolean>;
  scanForPeripherals: () => void;
  connectToDevice: (device: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  sendData: (data: string) => Promise<void>;
  receivedData: string | null;
  connectedDevice: Device | null;
  allDevices: Device[];
}

const BLEContext = createContext<BLEContextType | null>(null);

export const BLEProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [receivedData, setReceivedData] = useState<string | null>(null);

  const SERVICE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
  const CHARACTERISTIC_UUID = "0000ffe1-0000-1000-8000-00805f9b34fb";

  // Permisos Android
  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      { title: "Permiso Bluetooth", message: "Requerido para escanear", buttonPositive: "OK" }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      { title: "Permiso Conexión", message: "Requerido para conectar", buttonPositive: "OK" }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      { title: "Permiso Ubicación", message: "Requerido para Bluetooth", buttonPositive: "OK" }
    );
    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          { title: "Permiso ubicación", message: "Requerido para Bluetooth", buttonPositive: "OK" }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        return await requestAndroid31Permissions();
      }
    }
    return true;
  };

  // Evitar duplicados
  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((d) => d.id === nextDevice.id) > -1;

  // Escanear dispositivos
  const scanForPeripherals = () => {
    console.log("🔍 Escaneando dispositivos BLE...");
    setAllDevices([]);
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("❌ Error escaneo:", error);
        if (error.errorCode === 102) {
          Toast.show({
            type: 'info',
            text1: 'Bluetooth ',
            text2: 'El bluetooth esta desconecto',
            visibilityTime: 3000
          });
        }
        
        return;
      }
      if (device?.name && (device.name.includes("HM") || device.name.includes("HC"))) {
        setAllDevices((prev) => (!isDuplicateDevice(prev, device) ? [...prev, device] : prev));
      }
    });
  };

  // Conectar
  const connectToDevice = async (device: Device) => {
    try {
      console.log("🔗 Conectando a:", device.name);
      const connection = await bleManager.connectToDevice(device.id);
      await connection.discoverAllServicesAndCharacteristics();
      await new Promise((r) => setTimeout(r, 500));

      bleManager.stopDeviceScan();
      setConnectedDevice(connection);
      console.log("✅ Conectado a", device.name);

      const services = await connection.services();
      console.log("📡 Servicios:", services.map(s => s.uuid));

      connection.monitorCharacteristicForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            console.log("❌ Error al recibir:", error);
            return;
          }
          if (characteristic?.value) {
            const decoded = base64.decode(characteristic.value);
            console.log("📩 Recibido:", decoded);
            setReceivedData(decoded);
          }
        }
      );
    } catch (e) {
      console.log("❌ Error conexión:", e);
    }
  };

  // Enviar datos
  const sendData = async (data: string) => {
    if (!connectedDevice) {
      console.log("⚠️ No hay dispositivo conectado");
      return;
    }
    try {
      const encoded = base64.encode(data);
      await connectedDevice.writeCharacteristicWithoutResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        encoded
      );
      console.log("📤 Enviado:", data);
    } catch (e) {
      console.log("❌ Error envío:", e);
    }
  };

  // Desconectar
  const disconnectFromDevice = () => {
    if (connectedDevice) {
      console.log("🔌 Desconectando de:", connectedDevice.name);
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setReceivedData(null);
    }
  };

  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      console.log("🧹 Cerrando BLE manager");
      bleManager.destroy();
    };
  }, []);

  return (
    <BLEContext.Provider
      value={{
        requestPermissions,
        scanForPeripherals,
        connectToDevice,
        disconnectFromDevice,
        sendData,
        receivedData,
        connectedDevice,
        allDevices,
      }}
    >
      {children}
    </BLEContext.Provider>
  );
};

// Hook de acceso
export const useBLEContext = () => {
  const context = useContext(BLEContext);
  if (!context) throw new Error("useBLEContext debe usarse dentro de un BLEProvider");
  return context;
};
