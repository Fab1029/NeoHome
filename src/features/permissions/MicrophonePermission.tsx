import { AudioModule } from "expo-audio";
import { Alert } from "react-native";
import BasePermission from "./BasePermission";

class MicrophonePermission implements BasePermission {
  key = "microphone_permission";

  async isGranted(): Promise<boolean> {
    const { status } = await AudioModule.getRecordingPermissionsAsync();
    return status === "granted";
  }

  async request(): Promise<void> {
    const { status } = await AudioModule.requestRecordingPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso de micrófono no concedido");
    }
  }
}

export default MicrophonePermission;