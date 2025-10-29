import { actuators } from "@/src/data/Actuators";
import { GoogleGenAI } from "@google/genai";
import { Classifier } from "./Classifier";

class APIClassifier implements Classifier {
  private API_KEY = process.env.EXPO_PUBLIC_API_GEMINI;

  private model: string = "gemini-2.5-flash";
  private basePrompt: string = this.generateBasePrompt();
  private ai = new GoogleGenAI({ apiKey: this.API_KEY });
  
  generateBasePrompt(): string {
    const header = `
      Eres un clasificador experto. 
      Tienes una lista de dispositivos con sus comandos. 
      Tu tarea es interpretar una orden del usuario (en español) y devolver el comando del objeto del dispositivo afectado.
    `;

    const main = JSON.stringify(actuators);

    const footer = `
      IMPORTANTE:
      - Devuelve solo el identificador válido.
      - No incluyas texto adicional ni explicaciones.
      - Si la orden no coincide con ningún dispositivo, responde: con una cadena vacia.
    `

    return `${header}\n${main}\n${footer}`;
  }

  async execute(data: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: this.model,
        contents: `${this.basePrompt}\nUsuario:${data}`,
      });

      return response.text as string;

    } catch (error) {
      return '';
    }
  }
}

export default APIClassifier;
