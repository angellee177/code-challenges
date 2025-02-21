export const Status = {
    Pending: "pending",
    InProgress: "in-progress",
    Done: "done"
} as const;

export type StatusType = (typeof Status)[keyof typeof Status]; // "pending" | "in-progress" | "done"
