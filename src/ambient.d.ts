export type AccordionState = {
    uniqueKey: number;
    open: boolean;
}
export type MessageType = {
    uniqueKey: number | void;
    message: string;
}
export type MessageMDType = {
    uniqueKey: string;
    source: string;
}