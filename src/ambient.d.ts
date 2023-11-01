// export type AccordionState = {
//     uniqueKey: number;
//     open: boolean;
// }
// export type MessageType = {
//     uniqueKey: number | void;
//     message: string;
// }
// export type MessageMDType = {
//     uniqueKey: string;
//     source: string;
// }
//github.com/sveltejs/language-tools/issues/1459

declare global {
    interface AccordionState {
        uniqueKey: number;
        open: boolean;
    }
    interface MessageType {
        uniqueKey: number | void;
        message: string;
    }
    interface MessageMDType {
        uniqueKey: string;
        source: string;
    }
}

// Adding this exports the declaration file which Typescript/CRA can now pickup:
export { }