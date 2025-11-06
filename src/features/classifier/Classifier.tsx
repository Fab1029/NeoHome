import { MethodClassifier } from "./MethodClassifier";

class Classifier {
    private methodClassifier: MethodClassifier;

    constructor(methodClassifier: MethodClassifier) {
        this.methodClassifier = methodClassifier;
    }

    async clasify(data:any): Promise<string> {
        return await this.methodClassifier.execute(data);
    }

}

export default Classifier;