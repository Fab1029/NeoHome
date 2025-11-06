export interface Classifier {
    execute:(data:any) => Promise<string>;
};