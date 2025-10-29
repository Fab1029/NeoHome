import { MethodConverter } from "./MethodConverter";

class Converter {
    private methodConverter: MethodConverter;

    constructor(methodConverter: MethodConverter) {
        this.methodConverter = methodConverter;
    }

    async convert(data:any): Promise<string> {
        return await this.methodConverter.execute(data);
    }

}

export default Converter;