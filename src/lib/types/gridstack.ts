import type { GridStackWidget } from "gridstack";

export interface WidgetItem extends GridStackWidget {
    // [key: string]: string | number | undefined | boolean | GridStackOptions;
    otherProp?: string;
    component?: string;
    gsAttributes: {
        'gs-min-w': string | number | undefined,
        'gs-min-h': string | number | undefined,
        'gs-w': string | number | undefined,
        'gs-h': string | number | undefined
    }
}