import { router } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";
import { useBLEContext } from "../context/BLEContext";

const BluetoothButton = () => {
  const { connectedDevice, disconnectFromDevice } = useBLEContext();

  const handlePress = () => {
    if (connectedDevice) {
      disconnectFromDevice();
    } else {
      router.push("/screens/bluetooth");
    }
  };

  return (
    <Pressable
      style={{
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: connectedDevice ? "#FF3B30" : "#007AFF",
        marginTop: 30,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 16,
          textAlign: "center",
        }}
      >
        {connectedDevice ? "Desconectar" : "Conectar"}
      </Text>
    </Pressable>
  );
};

export default BluetoothButton;
