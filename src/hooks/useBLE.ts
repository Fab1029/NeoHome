/* eslint-disable no-bitwise */
import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";
import * as ExpoDevice from "expo-device";
import base64 from "react-native-base64";

interface BluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  scanForPeripherals(): void;
  connectToDevice: (device: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  sendData: (data: string) => Promise<void>;
  receivedData: string | null;
  connectedDevice: Device | null;
  allDevices: Device[];
}

function useBLE(): BluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [receivedData, setReceivedData] = useState<string | null>(null);

  // 🔹 UUIDs genéricos (debes reemplazar con los de tu módulo si los conoces)
  const SERVICE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
  const CHARACTERISTIC_UUID = "0000ffe1-0000-1000-8000-00805f9b34fb";

  // 🔹 Permisos Android
  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Permiso de Bluetooth",
        message: "Se requiere Bluetooth para escanear dispositivos",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Permiso de conexión",
        message: "Se requiere Bluetooth para conectar dispositivos",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Permiso de ubicación",
        message: "Bluetooth requiere acceso a la ubicación",
        buttonPositive: "OK",
      }
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
          {
            title: "Permiso de ubicación",
            message: "Bluetooth requiere acceso a la ubicación",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        return await requestAndroid31Permissions();
      }
    } else {
      return true;
    }
  };

  // 🔹 Evitar duplicados
  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  // 🔹 Escanear dispositivos (ej: HC-05, HM-10, Arduino BLE)
  const scanForPeripherals = () => {
    setAllDevices([]);
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("❌ Error al escanear:", error);
        return;
      }

      if (device?.name) {
        // Puedes filtrar por nombre si tu módulo tiene uno específico
        if (device.name.includes("HC-") || device.name.includes("HM-") || device.name.includes("Arduino")) {
          setAllDevices((prevDevices) => {
            if (!isDuplicateDevice(prevDevices, device)) {
              return [...prevDevices, device];
            }
            return prevDevices;
          });
        }
      }
    });
  };

  // 🔹 Conectar al dispositivo
  const connectToDevice = async (device: Device) => {
    try {
      const connection = await bleManager.connectToDevice(device.id);
      await connection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      setConnectedDevice(connection);
      console.log("✅ Conectado a", device.name);

      // Escuchar datos entrantes
      connection.monitorCharacteristicForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            console.log("❌ Error al recibir datos:", error);
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
      console.log("❌ Error al conectar:", e);
    }
  };

  // 🔹 Enviar datos al módulo
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
    } catch (error) {
      console.log("❌ Error al enviar:", error);
    }
  };

  // 🔹 Desconectar
  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setReceivedData(null);
      console.log("🔌 Dispositivo desconectado");
    }
  };

  return {
    requestPermissions,
    scanForPeripherals,
    connectToDevice,
    disconnectFromDevice,
    sendData,
    receivedData,
    connectedDevice,
    allDevices,
  };
}

export default useBLE;
