import { colors } from "@/src/constants/colors";
import fonts from "@/src/constants/fonts";
import { useBLEContext } from "@/src/context/BLEContext";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Device } from "react-native-ble-plx";
import { SafeAreaView } from "react-native-safe-area-context";

const BluetoothScreen = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    sendData
  } = useBLEContext();

  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    const granted = await requestPermissions();
    if (granted) {
      setIsScanning(true);
      scanForPeripherals();
      setTimeout(() => setIsScanning(false), 8000); // escanea 8 segundos
    } else {
      alert("Se requieren permisos Bluetooth");
    }
  };

  const handleConnect = async (device : Device ) => {
    await connectToDevice(device);
    router.back(); // vuelve al index al conectarse
  };

  useEffect(() => {
    handleScan();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dispositivos Bluetooth Disponibles</Text>

      {isScanning && <ActivityIndicator size="large" color={colors.text.primary} style={{ marginTop: 20 }} />}

      <FlatList
        data={allDevices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.deviceCard,
              connectedDevice?.id === item.id && { backgroundColor: "#a1f0a1" },
            ]}
            onPress={() => handleConnect(item)}
          >
            <Text style={styles.deviceName}>{item.name || "Sin nombre"}</Text>
            <Text style={styles.deviceStatus}>
              {connectedDevice?.id === item.id ? "✅ Conectado" : "🟡 No conectado"}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>
            {isScanning ? "Buscando dispositivos..." : "No se encontraron dispositivos"}
          </Text>
        }
      />

      <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
        <Text style={styles.scanText}>Escanear Nuevamente</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BluetoothScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: 20,
  },
  title: {
    fontSize: fonts.sizes.xlarge,
    fontFamily: 'Bold',
    textAlign: "center",
    marginVertical: 10,
    color: colors.text.primary,
  },
  deviceCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  deviceName: {
    fontSize: fonts.sizes.medium,
    fontFamily: 'Medium',
    color: colors.text.secondary,
  },
  deviceStatus: {
    marginTop: 4,
    fontSize: fonts.sizes.small,
    color: "#666",
  },
  scanButton: {
    marginTop: 20,
    backgroundColor: colors.text.primary,
    padding: 15,
    borderRadius: 10,
  },
  scanText: {
    color: colors.text.tertiary,
    textAlign: "center",
    fontFamily: 'Bold',
  },
});
