/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Represents dynamic html controls (Input, TextArea and Select)
 * @template T
 */
export class TgrDynamicControl {
    /**
     * @param {?} label
     * @param {?} name
     * @param {?} controlType
     * @param {?=} icon
     * @param {?=} isRequired
     * @param {?=} placeholder
     */
    constructor(label, name, controlType, icon = "fa fa-file-text-o", isRequired = false, placeholder = null) {
        /**
         * Control placeholder
         */
        this.placeholder = "";
        this.label = label;
        this.name = name;
        this.controlType = controlType;
        this.icon = icon;
        this.isRequired = isRequired;
        this.placeholder = placeholder ? placeholder : label;
    }
}
if (false) {
    /**
     * Control label
     * @type {?}
     */
    TgrDynamicControl.prototype.label;
    /**
     * Icon to be appended before the control (supports class defined icons)
     * @type {?}
     */
    TgrDynamicControl.prototype.icon;
    /**
     * Name of the control (provide variable valid names ie. no spaces prefarably api corresponding names e.g. userName)
     * @type {?}
     */
    TgrDynamicControl.prototype.name;
    /**
     * The actual control (TgrInput, TgrTextArea & TgrSelect)
     * @type {?}
     */
    TgrDynamicControl.prototype.controlType;
    /**
     * Checks if the field is required
     * @type {?}
     */
    TgrDynamicControl.prototype.isRequired;
    /**
     * Control placeholder
     * @type {?}
     */
    TgrDynamicControl.prototype.placeholder;
}
/**
 * Used to represent html input with options:
 * type: default to text,  maxLength, minLength, min, max
 */
export class TgrInput {
    /**
     * @param {?=} type
     */
    constructor(type = "text") {
        this.type = type;
        this.minLength = this.min = 0;
        this.maxLength = 4000;
        this.max = 1000000000;
    }
}
if (false) {
    /**
     * Type of input e.g. text, number, date
     * @type {?}
     */
    TgrInput.prototype.type;
    /**
     * Used to validate length of the input
     * @type {?}
     */
    TgrInput.prototype.maxLength;
    /**
     * Used to validate minimum input length
     * @type {?}
     */
    TgrInput.prototype.minLength;
    /**
     * Used to validate number inputs
     * @type {?}
     */
    TgrInput.prototype.min;
    /**
     * Used to validate number inputs
     * @type {?}
     */
    TgrInput.prototype.max;
}
/**
 * Represents html textarea input
 */
export class TgrTextarea {
    /**
     * @param {?=} cols
     * @param {?=} rows
     */
    constructor(cols = 5, rows = 1) {
        this.cols = cols;
        this.rows = rows;
        this.maxLength = 4000;
        this.minLength = 0;
    }
}
if (false) {
    /**
     * Number textarea columns
     * @type {?}
     */
    TgrTextarea.prototype.cols;
    /**
     * Number of textarea rows
     * @type {?}
     */
    TgrTextarea.prototype.rows;
    /**
     * Validate maximum input length
     * @type {?}
     */
    TgrTextarea.prototype.maxLength;
    /**
     * Validate minimum input length
     * @type {?}
     */
    TgrTextarea.prototype.minLength;
}
/**
 * Represents html select control
 */
export class TgrSelect {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = options;
    }
}
if (false) {
    /**
     * Select options
     * @type {?}
     */
    TgrSelect.prototype.options;
}
export class TgrSelectOption {
    /**
     * @param {?} value
     * @param {?=} text
     */
    constructor(value, text = null) {
        this.value = value;
        this.text = text ? text : value;
    }
}
if (false) {
    /**
     * Option value
     * @type {?}
     */
    TgrSelectOption.prototype.value;
    /**
     * Option text/label
     * @type {?}
     */
    TgrSelectOption.prototype.text;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGdyLWR5bmFtaWMtY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL2VudGl0aWVzL3Rnci1keW5hbWljLWNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQSxNQUFNOzs7Ozs7Ozs7SUEwQkYsWUFBWSxLQUFhLEVBQUUsSUFBWSxFQUFFLFdBQWMsRUFBRSxPQUFlLG1CQUFtQixFQUN2RixhQUFzQixLQUFLLEVBQUUsY0FBc0IsSUFBSTs7OzsyQkFIckMsRUFBRTtRQUlwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDeEQ7Q0FFSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtELE1BQU07Ozs7SUFzQkYsWUFBWSxPQUFlLE1BQU07UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQztLQUN6QjtDQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0QsTUFBTTs7Ozs7SUFrQkYsWUFBWSxPQUFlLENBQUMsRUFBRSxPQUFlLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUE7S0FDckI7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLRCxNQUFNOzs7O0lBTUYsWUFBWSxPQUErQjtRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztLQUMxQjtDQUVKOzs7Ozs7OztBQUVELE1BQU07Ozs7O0lBVUYsWUFBWSxLQUFhLEVBQUUsT0FBZSxJQUFJO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUNuQztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZXByZXNlbnRzIGR5bmFtaWMgaHRtbCBjb250cm9scyAoSW5wdXQsIFRleHRBcmVhIGFuZCBTZWxlY3QpXG4gKi9cbmV4cG9ydCBjbGFzcyBUZ3JEeW5hbWljQ29udHJvbDxUPiB7XG4gICAgLyoqXG4gICAgICogQ29udHJvbCBsYWJlbFxuICAgICAqL1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogSWNvbiB0byBiZSBhcHBlbmRlZCBiZWZvcmUgdGhlIGNvbnRyb2wgKHN1cHBvcnRzIGNsYXNzIGRlZmluZWQgaWNvbnMpXG4gICAgICovXG4gICAgaWNvbjogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGNvbnRyb2wgKHByb3ZpZGUgdmFyaWFibGUgdmFsaWQgbmFtZXMgaWUuIG5vIHNwYWNlcyBwcmVmYXJhYmx5IGFwaSBjb3JyZXNwb25kaW5nIG5hbWVzIGUuZy4gdXNlck5hbWUpXG4gICAgICovXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBhY3R1YWwgY29udHJvbCAoVGdySW5wdXQsIFRnclRleHRBcmVhICYgVGdyU2VsZWN0KVxuICAgICAqL1xuICAgIGNvbnRyb2xUeXBlOiBUO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgZmllbGQgaXMgcmVxdWlyZWRcbiAgICAgKi9cbiAgICBpc1JlcXVpcmVkOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIENvbnRyb2wgcGxhY2Vob2xkZXJcbiAgICAgKi9cbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nID0gXCJcIjtcblxuICAgIGNvbnN0cnVjdG9yKGxhYmVsOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY29udHJvbFR5cGU6IFQsIGljb246IHN0cmluZyA9IFwiZmEgZmEtZmlsZS10ZXh0LW9cIixcbiAgICAgICAgaXNSZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlLCBwbGFjZWhvbGRlcjogc3RyaW5nID0gbnVsbCkge1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBjb250cm9sVHlwZTtcbiAgICAgICAgdGhpcy5pY29uID0gaWNvbjtcbiAgICAgICAgdGhpcy5pc1JlcXVpcmVkID0gaXNSZXF1aXJlZDtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyID8gcGxhY2Vob2xkZXIgOiBsYWJlbDtcbiAgICB9XG5cbn1cbi8qKlxuICogVXNlZCB0byByZXByZXNlbnQgaHRtbCBpbnB1dCB3aXRoIG9wdGlvbnM6XG4gKiB0eXBlOiBkZWZhdWx0IHRvIHRleHQsICBtYXhMZW5ndGgsIG1pbkxlbmd0aCwgbWluLCBtYXhcbiAqL1xuZXhwb3J0IGNsYXNzIFRncklucHV0e1xuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgaW5wdXQgZS5nLiB0ZXh0LCBudW1iZXIsIGRhdGVcbiAgICAgKi9cbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBsZW5ndGggb2YgdGhlIGlucHV0XG4gICAgICovXG4gICAgbWF4TGVuZ3RoOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBtaW5pbXVtIGlucHV0IGxlbmd0aFxuICAgICAqL1xuICAgIG1pbkxlbmd0aDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbnVtYmVyIGlucHV0c1xuICAgICAqL1xuICAgIG1pbjogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbnVtYmVyIGlucHV0c1xuICAgICAqL1xuICAgIG1heDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nID0gXCJ0ZXh0XCIpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5taW5MZW5ndGggPSB0aGlzLm1pbiA9IDA7XG4gICAgICAgIHRoaXMubWF4TGVuZ3RoID0gNDAwMDtcbiAgICAgICAgdGhpcy5tYXggPSAxMDAwMDAwMDAwO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGh0bWwgdGV4dGFyZWEgaW5wdXRcbiAqL1xuZXhwb3J0IGNsYXNzIFRnclRleHRhcmVhe1xuICAgIC8qKlxuICAgICAqIE51bWJlciB0ZXh0YXJlYSBjb2x1bW5zXG4gICAgICovXG4gICAgY29scz86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBOdW1iZXIgb2YgdGV4dGFyZWEgcm93c1xuICAgICAqL1xuICAgIHJvd3M/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgbWF4aW11bSBpbnB1dCBsZW5ndGhcbiAgICAgKi9cbiAgICBtYXhMZW5ndGg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBtaW5pbXVtIGlucHV0IGxlbmd0aFxuICAgICAqL1xuICAgIG1pbkxlbmd0aDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoY29sczogbnVtYmVyID0gNSwgcm93czogbnVtYmVyID0gMSl7XG4gICAgICAgIHRoaXMuY29scyA9IGNvbHM7XG4gICAgICAgIHRoaXMucm93cyA9IHJvd3M7XG4gICAgICAgIHRoaXMubWF4TGVuZ3RoID0gNDAwMDtcbiAgICAgICAgdGhpcy5taW5MZW5ndGggPSAwXG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgaHRtbCBzZWxlY3QgY29udHJvbFxuICovXG5leHBvcnQgY2xhc3MgVGdyU2VsZWN0IHtcbiAgICAvKipcbiAgICAgKiBTZWxlY3Qgb3B0aW9uc1xuICAgICAqL1xuICAgIG9wdGlvbnM6IEFycmF5PFRnclNlbGVjdE9wdGlvbj47XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBBcnJheTxUZ3JTZWxlY3RPcHRpb24+KXtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIFRnclNlbGVjdE9wdGlvbntcbiAgICAvKipcbiAgICAgKiBPcHRpb24gdmFsdWVcbiAgICAgKi9cbiAgICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIE9wdGlvbiB0ZXh0L2xhYmVsXG4gICAgICovXG4gICAgdGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nID0gbnVsbCl7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dCA/IHRleHQgOiB2YWx1ZTtcbiAgICB9XG5cbn1cblxuIl19