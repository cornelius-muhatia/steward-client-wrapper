/**
 * Represents dynamic html controls (Input, TextArea and Select)
 */
export class TgrDynamicControl<T> {
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
    placeholder: string = "";

    constructor(label: string, name: string, controlType: T, icon: string = "fa fa-file-text-o",
        isRequired: boolean = false, placeholder: string = null) {
        this.label = label;
        this.name = name;
        this.controlType = controlType;
        this.icon = icon;
        this.isRequired = isRequired;
        this.placeholder = placeholder ? placeholder : label;
    }

}
/**
 * Used to represent html input with options:
 * type: default to text,  maxLength, minLength, min, max
 */
export class TgrInput{
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

    constructor(type: string = "text") {
        this.type = type;
        this.minLength = this.min = 0;
        this.maxLength = 4000;
        this.max = 1000000000;
    }
}

/**
 * Represents html textarea input
 */
export class TgrTextarea{
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

    constructor(cols: number = 5, rows: number = 1){
        this.cols = cols;
        this.rows = rows;
        this.maxLength = 4000;
        this.minLength = 0
    }
}

/**
 * Represents html select control
 */
export class TgrSelect {
    /**
     * Select options
     */
    options: Array<TgrSelectOption>;

    constructor(options: Array<TgrSelectOption>){
        this.options = options;
    }

}

export class TgrSelectOption{
    /**
     * Option value
     */
    value: string | number;
    /**
     * Option text/label
     */
    text: string;

    constructor(value: string, text: string = null){
        this.value = value;
        this.text = text ? text : value;
    }

}

