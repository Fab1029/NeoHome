import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import useBLE from "../../hooks/UseBle"; 
import { Device } from "react-native-ble-plx";

const BluetoothScreen = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
  } = useBLE();

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

      {isScanning && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}

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
        <Text style={styles.scanText}>🔄 Escanear Nuevamente</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BluetoothScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  deviceCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  deviceStatus: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },
  scanButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
  },
  scanText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
