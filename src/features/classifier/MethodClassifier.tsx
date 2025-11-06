export interface MethodClassifier {
    execute:(data:any) => Promise<string>;
};