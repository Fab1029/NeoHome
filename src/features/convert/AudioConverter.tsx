import { MethodConverter } from "./MethodConverter";


class APISpeechToText implements MethodConverter{

  async execute(audioUri: string): Promise<string> {
    return 'Enciende el foco';
  }
}

export default APISpeechToText;
