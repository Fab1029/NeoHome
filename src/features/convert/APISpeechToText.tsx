import { MethodConverter } from "./MethodConverter";

class APISpeechToText implements MethodConverter {
  private apiKey = process.env.EXPO_PUBLIC_API_WHISPER;

  async execute(data: any): Promise<string> {
    try {
  
      const formData = new FormData();
      formData.append("file", {
        uri: data,
        name: "recording.m4a",
        type: "audio/m4a", 
      } as any);
      formData.append("model", "gpt-4o-mini-transcribe");


      const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (result.error) {
        console.error("Error en transcripción:", result.error);
        throw new Error(result.error.message);
      }

      return result.text;
    } catch (error) {
      console.error("Error Speech-to-Text:", error);
      throw error;
    }
  }
}

export default APISpeechToText;
