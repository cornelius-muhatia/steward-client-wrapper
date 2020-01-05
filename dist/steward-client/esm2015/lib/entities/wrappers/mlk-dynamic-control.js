/**
 * @fileoverview added by tsickle
 * Generated from: lib/entities/wrappers/mlk-dynamic-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Represents dynamic html controls (Input, TextArea and Select)
 * @deprecated
 * @template T
 */
export class MlkDynamicControl {
    /**
     * @param {?} label
     * @param {?} name
     * @param {?} controlType
     * @param {?=} icon
     * @param {?=} isRequired
     * @param {?=} placeholder
     */
    constructor(label, name, controlType, icon = "fa fa-file-text-o", isRequired = true, placeholder = null) {
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
    MlkDynamicControl.prototype.label;
    /**
     * Icon to be appended before the control (supports class defined icons)
     * @type {?}
     */
    MlkDynamicControl.prototype.icon;
    /**
     * Name of the control (provide variable valid names ie. no spaces prefarably api corresponding names e.g. userName)
     * @type {?}
     */
    MlkDynamicControl.prototype.name;
    /**
     * The actual control (MlkInput, MlkTextArea & MlkSelect)
     * @type {?}
     */
    MlkDynamicControl.prototype.controlType;
    /**
     * Checks if the field is required
     * @type {?}
     */
    MlkDynamicControl.prototype.isRequired;
    /**
     * Control placeholder
     * @type {?}
     */
    MlkDynamicControl.prototype.placeholder;
}
/**
 * Used to represent html input with options:
 * type: default to text,  maxLength, minLength, min, max
 */
export class MlkInput {
    /**
     * @param {?=} type
     */
    constructor(type = "text") {
        /**
         * Type of input e.g. text, number, date
         */
        this.type = "text";
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
    MlkInput.prototype.type;
    /**
     * Used to validate length of the input
     * @type {?}
     */
    MlkInput.prototype.maxLength;
    /**
     * Used to validate minimum input length
     * @type {?}
     */
    MlkInput.prototype.minLength;
    /**
     * Used to validate number inputs
     * @type {?}
     */
    MlkInput.prototype.min;
    /**
     * Used to validate number inputs
     * @type {?}
     */
    MlkInput.prototype.max;
}
/**
 * Represents html textarea input
 */
export class MlkTextarea {
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
    MlkTextarea.prototype.cols;
    /**
     * Number of textarea rows
     * @type {?}
     */
    MlkTextarea.prototype.rows;
    /**
     * Validate maximum input length
     * @type {?}
     */
    MlkTextarea.prototype.maxLength;
    /**
     * Validate minimum input length
     * @type {?}
     */
    MlkTextarea.prototype.minLength;
}
/**
 * Represents html select control
 */
export class MlkSelect {
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
    MlkSelect.prototype.options;
}
export class MlkSelectOption {
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
    MlkSelectOption.prototype.value;
    /**
     * Option text/label
     * @type {?}
     */
    MlkSelectOption.prototype.text;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWxrLWR5bmFtaWMtY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL2VudGl0aWVzL3dyYXBwZXJzL21say1keW5hbWljLWNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLE1BQU0sT0FBTyxpQkFBaUI7Ozs7Ozs7OztJQTBCMUIsWUFBWSxLQUFhLEVBQUUsSUFBWSxFQUFFLFdBQWMsRUFBRSxPQUFlLG1CQUFtQixFQUN2RixhQUFzQixJQUFJLEVBQUUsY0FBc0IsSUFBSTs7OztRQUgxRCxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUlyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDekQsQ0FBQztDQUVKOzs7Ozs7SUFoQ0csa0NBQWM7Ozs7O0lBSWQsaUNBQWE7Ozs7O0lBSWIsaUNBQWE7Ozs7O0lBSWIsd0NBQWU7Ozs7O0lBSWYsdUNBQW9COzs7OztJQUlwQix3Q0FBeUI7Ozs7OztBQWlCN0IsTUFBTSxPQUFPLFFBQVE7Ozs7SUFzQmpCLFlBQVksT0FBZSxNQUFNOzs7O1FBbEJqQyxTQUFJLEdBQVcsTUFBTSxDQUFDO1FBbUJsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDO0lBQzFCLENBQUM7Q0FDSjs7Ozs7O0lBeEJHLHdCQUFzQjs7Ozs7SUFJdEIsNkJBQWtCOzs7OztJQUlsQiw2QkFBa0I7Ozs7O0lBSWxCLHVCQUFZOzs7OztJQUlaLHVCQUFZOzs7OztBQWFoQixNQUFNLE9BQU8sV0FBVzs7Ozs7SUFrQnBCLFlBQVksT0FBZSxDQUFDLEVBQUUsT0FBZSxDQUFDO1FBQzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFBO0lBQ3RCLENBQUM7Q0FDSjs7Ozs7O0lBcEJHLDJCQUFjOzs7OztJQUlkLDJCQUFjOzs7OztJQUlkLGdDQUFrQjs7Ozs7SUFJbEIsZ0NBQWtCOzs7OztBQWF0QixNQUFNLE9BQU8sU0FBUzs7OztJQU1sQixZQUFZLE9BQStCO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7Q0FFSjs7Ozs7O0lBTkcsNEJBQWdDOztBQVFwQyxNQUFNLE9BQU8sZUFBZTs7Ozs7SUFVeEIsWUFBWSxLQUFhLEVBQUUsT0FBZSxJQUFJO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNwQyxDQUFDO0NBRUo7Ozs7OztJQVhHLGdDQUFjOzs7OztJQUlkLCtCQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFJlcHJlc2VudHMgZHluYW1pYyBodG1sIGNvbnRyb2xzIChJbnB1dCwgVGV4dEFyZWEgYW5kIFNlbGVjdClcclxuICogQGRlcHJlY2F0ZWRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNbGtEeW5hbWljQ29udHJvbDxUPiB7XHJcbiAgICAvKipcclxuICAgICAqIENvbnRyb2wgbGFiZWxcclxuICAgICAqL1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogSWNvbiB0byBiZSBhcHBlbmRlZCBiZWZvcmUgdGhlIGNvbnRyb2wgKHN1cHBvcnRzIGNsYXNzIGRlZmluZWQgaWNvbnMpXHJcbiAgICAgKi9cclxuICAgIGljb246IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogTmFtZSBvZiB0aGUgY29udHJvbCAocHJvdmlkZSB2YXJpYWJsZSB2YWxpZCBuYW1lcyBpZS4gbm8gc3BhY2VzIHByZWZhcmFibHkgYXBpIGNvcnJlc3BvbmRpbmcgbmFtZXMgZS5nLiB1c2VyTmFtZSlcclxuICAgICAqL1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYWN0dWFsIGNvbnRyb2wgKE1sa0lucHV0LCBNbGtUZXh0QXJlYSAmIE1sa1NlbGVjdClcclxuICAgICAqL1xyXG4gICAgY29udHJvbFR5cGU6IFQ7XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgZmllbGQgaXMgcmVxdWlyZWRcclxuICAgICAqL1xyXG4gICAgaXNSZXF1aXJlZDogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogQ29udHJvbCBwbGFjZWhvbGRlclxyXG4gICAgICovXHJcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihsYWJlbDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNvbnRyb2xUeXBlOiBULCBpY29uOiBzdHJpbmcgPSBcImZhIGZhLWZpbGUtdGV4dC1vXCIsXHJcbiAgICAgICAgaXNSZXF1aXJlZDogYm9vbGVhbiA9IHRydWUsIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5jb250cm9sVHlwZSA9IGNvbnRyb2xUeXBlO1xyXG4gICAgICAgIHRoaXMuaWNvbiA9IGljb247XHJcbiAgICAgICAgdGhpcy5pc1JlcXVpcmVkID0gaXNSZXF1aXJlZDtcclxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXIgPyBwbGFjZWhvbGRlciA6IGxhYmVsO1xyXG4gICAgfVxyXG5cclxufVxyXG4vKipcclxuICogVXNlZCB0byByZXByZXNlbnQgaHRtbCBpbnB1dCB3aXRoIG9wdGlvbnM6XHJcbiAqIHR5cGU6IGRlZmF1bHQgdG8gdGV4dCwgIG1heExlbmd0aCwgbWluTGVuZ3RoLCBtaW4sIG1heFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1sa0lucHV0e1xyXG4gICAgLyoqXHJcbiAgICAgKiBUeXBlIG9mIGlucHV0IGUuZy4gdGV4dCwgbnVtYmVyLCBkYXRlXHJcbiAgICAgKi9cclxuICAgIHR5cGU6IHN0cmluZyA9IFwidGV4dFwiO1xyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIGxlbmd0aCBvZiB0aGUgaW5wdXRcclxuICAgICAqL1xyXG4gICAgbWF4TGVuZ3RoOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbWluaW11bSBpbnB1dCBsZW5ndGhcclxuICAgICAqL1xyXG4gICAgbWluTGVuZ3RoOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbnVtYmVyIGlucHV0c1xyXG4gICAgICovXHJcbiAgICBtaW46IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBudW1iZXIgaW5wdXRzXHJcbiAgICAgKi9cclxuICAgIG1heDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZyA9IFwidGV4dFwiKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IHRoaXMubWluID0gMDtcclxuICAgICAgICB0aGlzLm1heExlbmd0aCA9IDQwMDA7XHJcbiAgICAgICAgdGhpcy5tYXggPSAxMDAwMDAwMDAwO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBodG1sIHRleHRhcmVhIGlucHV0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWxrVGV4dGFyZWF7XHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciB0ZXh0YXJlYSBjb2x1bW5zXHJcbiAgICAgKi9cclxuICAgIGNvbHM/OiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiB0ZXh0YXJlYSByb3dzXHJcbiAgICAgKi9cclxuICAgIHJvd3M/OiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFZhbGlkYXRlIG1heGltdW0gaW5wdXQgbGVuZ3RoXHJcbiAgICAgKi9cclxuICAgIG1heExlbmd0aDogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZSBtaW5pbXVtIGlucHV0IGxlbmd0aFxyXG4gICAgICovXHJcbiAgICBtaW5MZW5ndGg6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xzOiBudW1iZXIgPSA1LCByb3dzOiBudW1iZXIgPSAxKXtcclxuICAgICAgICB0aGlzLmNvbHMgPSBjb2xzO1xyXG4gICAgICAgIHRoaXMucm93cyA9IHJvd3M7XHJcbiAgICAgICAgdGhpcy5tYXhMZW5ndGggPSA0MDAwO1xyXG4gICAgICAgIHRoaXMubWluTGVuZ3RoID0gMFxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBodG1sIHNlbGVjdCBjb250cm9sXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWxrU2VsZWN0IHtcclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgb3B0aW9uczogQXJyYXk8TWxrU2VsZWN0T3B0aW9uPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBBcnJheTxNbGtTZWxlY3RPcHRpb24+KXtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1sa1NlbGVjdE9wdGlvbntcclxuICAgIC8qKlxyXG4gICAgICogT3B0aW9uIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIE9wdGlvbiB0ZXh0L2xhYmVsXHJcbiAgICAgKi9cclxuICAgIHRleHQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgPSBudWxsKXtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dCA/IHRleHQgOiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==