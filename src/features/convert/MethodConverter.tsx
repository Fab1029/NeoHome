export interface MethodConverter {
    execute:(data: any) => Promise<string>
} 