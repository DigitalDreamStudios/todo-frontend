export type TodoRequest = {
    title: string;
    description: string;
    completed?: boolean;
    userId: number | null;
}