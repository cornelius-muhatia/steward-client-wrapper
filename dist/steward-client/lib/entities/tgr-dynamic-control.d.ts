/**
 * Represents dynamic html controls (Input, TextArea and Select)
 */
export declare class TgrDynamicControl<T> {
    /**
     * Control label
     */
    label: string;
    /**
     * Icon to be appended before the control (supports class defined icons)
     */
    icon: string;
    /**
     * Name of the control (provide variable valid names ie. no spaces prefarably api corresponding names e.g. userName)
     */
    name: string;
    /**
     * The actual control (TgrInput, TgrTextArea & TgrSelect)
     */
    controlType: T;
    /**
     * Checks if the field is required
     */
    isRequired: boolean;
    /**
     * Control placeholder
     */
    placeholder: string;
    constructor(label: string, name: string, controlType: T, icon?: string, isRequired?: boolean, placeholder?: string);
}
/**
 * Used to represent html input with options:
 * type: default to text,  maxLength, minLength, min, max
 */
export declare class TgrInput {
    /**
     * Type of input e.g. text, number, date
     */
    type: string;
    /**
     * Used to validate length of the input
     */
    maxLength: number;
    /**
     * Used to validate minimum input length
     */
    minLength: number;
    /**
     * Used to validate number inputs
     */
    min: number;
    /**
     * Used to validate number inputs
     */
    max: number;
    constructor(type?: string);
}
/**
 * Represents html textarea input
 */
export declare class TgrTextarea {
    /**
     * Number textarea columns
     */
    cols?: number;
    /**
     * Number of textarea rows
     */
    rows?: number;
    /**
     * Validate maximum input length
     */
    maxLength: number;
    /**
     * Validate minimum input length
     */
    minLength: number;
    constructor(cols?: number, rows?: number);
}
/**
 * Represents html select control
 */
export declare class TgrSelect {
    /**
     * Select options
     */
    options: Array<TgrSelectOption>;
    constructor(options: Array<TgrSelectOption>);
}
export declare class TgrSelectOption {
    /**
     * Option value
     */
    value: string | number;
    /**
     * Option text/label
     */
    text: string;
    constructor(value: string, text?: string);
}
