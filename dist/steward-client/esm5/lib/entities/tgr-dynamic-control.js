/**
 * @fileoverview added by tsickle
 * Generated from: lib/entities/tgr-dynamic-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Represents dynamic html controls (Input, TextArea and Select)
 * @template T
 */
var /**
 * Represents dynamic html controls (Input, TextArea and Select)
 * @template T
 */
TgrDynamicControl = /** @class */ (function () {
    function TgrDynamicControl(label, name, controlType, icon, isRequired, placeholder) {
        if (icon === void 0) { icon = "fa fa-file-text-o"; }
        if (isRequired === void 0) { isRequired = false; }
        if (placeholder === void 0) { placeholder = null; }
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
    return TgrDynamicControl;
}());
/**
 * Represents dynamic html controls (Input, TextArea and Select)
 * @template T
 */
export { TgrDynamicControl };
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
var /**
 * Used to represent html input with options:
 * type: default to text,  maxLength, minLength, min, max
 */
TgrInput = /** @class */ (function () {
    function TgrInput(type) {
        if (type === void 0) { type = "text"; }
        this.type = type;
        this.minLength = this.min = 0;
        this.maxLength = 4000;
        this.max = 1000000000;
    }
    return TgrInput;
}());
/**
 * Used to represent html input with options:
 * type: default to text,  maxLength, minLength, min, max
 */
export { TgrInput };
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
var /**
 * Represents html textarea input
 */
TgrTextarea = /** @class */ (function () {
    function TgrTextarea(cols, rows) {
        if (cols === void 0) { cols = 5; }
        if (rows === void 0) { rows = 1; }
        this.cols = cols;
        this.rows = rows;
        this.maxLength = 4000;
        this.minLength = 0;
    }
    return TgrTextarea;
}());
/**
 * Represents html textarea input
 */
export { TgrTextarea };
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
var /**
 * Represents html select control
 */
TgrSelect = /** @class */ (function () {
    function TgrSelect(options) {
        this.options = options;
    }
    return TgrSelect;
}());
/**
 * Represents html select control
 */
export { TgrSelect };
if (false) {
    /**
     * Select options
     * @type {?}
     */
    TgrSelect.prototype.options;
}
var TgrSelectOption = /** @class */ (function () {
    function TgrSelectOption(value, text) {
        if (text === void 0) { text = null; }
        this.value = value;
        this.text = text ? text : value;
    }
    return TgrSelectOption;
}());
export { TgrSelectOption };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGdyLWR5bmFtaWMtY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL2VudGl0aWVzL3Rnci1keW5hbWljLWNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR0E7Ozs7O0lBMEJJLDJCQUFZLEtBQWEsRUFBRSxJQUFZLEVBQUUsV0FBYyxFQUFFLElBQWtDLEVBQ3ZGLFVBQTJCLEVBQUUsV0FBMEI7UUFERixxQkFBQSxFQUFBLDBCQUFrQztRQUN2RiwyQkFBQSxFQUFBLGtCQUEyQjtRQUFFLDRCQUFBLEVBQUEsa0JBQTBCOzs7O1FBSDNELGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBSXJCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUN6RCxDQUFDO0lBRUwsd0JBQUM7QUFBRCxDQUFDLEFBcENELElBb0NDOzs7Ozs7Ozs7OztJQWhDRyxrQ0FBYzs7Ozs7SUFJZCxpQ0FBYTs7Ozs7SUFJYixpQ0FBYTs7Ozs7SUFJYix3Q0FBZTs7Ozs7SUFJZix1Q0FBb0I7Ozs7O0lBSXBCLHdDQUF5Qjs7Ozs7O0FBaUI3Qjs7Ozs7SUFzQkksa0JBQVksSUFBcUI7UUFBckIscUJBQUEsRUFBQSxhQUFxQjtRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDO0lBQzFCLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQzs7Ozs7Ozs7Ozs7SUF4Qkcsd0JBQWE7Ozs7O0lBSWIsNkJBQWtCOzs7OztJQUlsQiw2QkFBa0I7Ozs7O0lBSWxCLHVCQUFZOzs7OztJQUlaLHVCQUFZOzs7OztBQWFoQjs7OztJQWtCSSxxQkFBWSxJQUFnQixFQUFFLElBQWdCO1FBQWxDLHFCQUFBLEVBQUEsUUFBZ0I7UUFBRSxxQkFBQSxFQUFBLFFBQWdCO1FBQzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFBO0lBQ3RCLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7Ozs7Ozs7Ozs7SUFwQkcsMkJBQWM7Ozs7O0lBSWQsMkJBQWM7Ozs7O0lBSWQsZ0NBQWtCOzs7OztJQUlsQixnQ0FBa0I7Ozs7O0FBYXRCOzs7O0lBTUksbUJBQVksT0FBK0I7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVMLGdCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7Ozs7Ozs7Ozs7SUFORyw0QkFBZ0M7O0FBUXBDO0lBVUkseUJBQVksS0FBYSxFQUFFLElBQW1CO1FBQW5CLHFCQUFBLEVBQUEsV0FBbUI7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUFFTCxzQkFBQztBQUFELENBQUMsQUFmRCxJQWVDOzs7Ozs7O0lBWEcsZ0NBQXVCOzs7OztJQUl2QiwrQkFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVwcmVzZW50cyBkeW5hbWljIGh0bWwgY29udHJvbHMgKElucHV0LCBUZXh0QXJlYSBhbmQgU2VsZWN0KVxuICovXG5leHBvcnQgY2xhc3MgVGdyRHluYW1pY0NvbnRyb2w8VD4ge1xuICAgIC8qKlxuICAgICAqIENvbnRyb2wgbGFiZWxcbiAgICAgKi9cbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEljb24gdG8gYmUgYXBwZW5kZWQgYmVmb3JlIHRoZSBjb250cm9sIChzdXBwb3J0cyBjbGFzcyBkZWZpbmVkIGljb25zKVxuICAgICAqL1xuICAgIGljb246IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBjb250cm9sIChwcm92aWRlIHZhcmlhYmxlIHZhbGlkIG5hbWVzIGllLiBubyBzcGFjZXMgcHJlZmFyYWJseSBhcGkgY29ycmVzcG9uZGluZyBuYW1lcyBlLmcuIHVzZXJOYW1lKVxuICAgICAqL1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgYWN0dWFsIGNvbnRyb2wgKFRncklucHV0LCBUZ3JUZXh0QXJlYSAmIFRnclNlbGVjdClcbiAgICAgKi9cbiAgICBjb250cm9sVHlwZTogVDtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIGZpZWxkIGlzIHJlcXVpcmVkXG4gICAgICovXG4gICAgaXNSZXF1aXJlZDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBDb250cm9sIHBsYWNlaG9sZGVyXG4gICAgICovXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBjb25zdHJ1Y3RvcihsYWJlbDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNvbnRyb2xUeXBlOiBULCBpY29uOiBzdHJpbmcgPSBcImZhIGZhLWZpbGUtdGV4dC1vXCIsXG4gICAgICAgIGlzUmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZSwgcGxhY2Vob2xkZXI6IHN0cmluZyA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gY29udHJvbFR5cGU7XG4gICAgICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgICAgIHRoaXMuaXNSZXF1aXJlZCA9IGlzUmVxdWlyZWQ7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlciA/IHBsYWNlaG9sZGVyIDogbGFiZWw7XG4gICAgfVxuXG59XG4vKipcbiAqIFVzZWQgdG8gcmVwcmVzZW50IGh0bWwgaW5wdXQgd2l0aCBvcHRpb25zOlxuICogdHlwZTogZGVmYXVsdCB0byB0ZXh0LCAgbWF4TGVuZ3RoLCBtaW5MZW5ndGgsIG1pbiwgbWF4XG4gKi9cbmV4cG9ydCBjbGFzcyBUZ3JJbnB1dHtcbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIGlucHV0IGUuZy4gdGV4dCwgbnVtYmVyLCBkYXRlXG4gICAgICovXG4gICAgdHlwZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbGVuZ3RoIG9mIHRoZSBpbnB1dFxuICAgICAqL1xuICAgIG1heExlbmd0aDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbWluaW11bSBpbnB1dCBsZW5ndGhcbiAgICAgKi9cbiAgICBtaW5MZW5ndGg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG51bWJlciBpbnB1dHNcbiAgICAgKi9cbiAgICBtaW46IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG51bWJlciBpbnB1dHNcbiAgICAgKi9cbiAgICBtYXg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZyA9IFwidGV4dFwiKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMubWluTGVuZ3RoID0gdGhpcy5taW4gPSAwO1xuICAgICAgICB0aGlzLm1heExlbmd0aCA9IDQwMDA7XG4gICAgICAgIHRoaXMubWF4ID0gMTAwMDAwMDAwMDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBodG1sIHRleHRhcmVhIGlucHV0XG4gKi9cbmV4cG9ydCBjbGFzcyBUZ3JUZXh0YXJlYXtcbiAgICAvKipcbiAgICAgKiBOdW1iZXIgdGV4dGFyZWEgY29sdW1uc1xuICAgICAqL1xuICAgIGNvbHM/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIHRleHRhcmVhIHJvd3NcbiAgICAgKi9cbiAgICByb3dzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIG1heGltdW0gaW5wdXQgbGVuZ3RoXG4gICAgICovXG4gICAgbWF4TGVuZ3RoOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgbWluaW11bSBpbnB1dCBsZW5ndGhcbiAgICAgKi9cbiAgICBtaW5MZW5ndGg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGNvbHM6IG51bWJlciA9IDUsIHJvd3M6IG51bWJlciA9IDEpe1xuICAgICAgICB0aGlzLmNvbHMgPSBjb2xzO1xuICAgICAgICB0aGlzLnJvd3MgPSByb3dzO1xuICAgICAgICB0aGlzLm1heExlbmd0aCA9IDQwMDA7XG4gICAgICAgIHRoaXMubWluTGVuZ3RoID0gMFxuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGh0bWwgc2VsZWN0IGNvbnRyb2xcbiAqL1xuZXhwb3J0IGNsYXNzIFRnclNlbGVjdCB7XG4gICAgLyoqXG4gICAgICogU2VsZWN0IG9wdGlvbnNcbiAgICAgKi9cbiAgICBvcHRpb25zOiBBcnJheTxUZ3JTZWxlY3RPcHRpb24+O1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQXJyYXk8VGdyU2VsZWN0T3B0aW9uPil7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBUZ3JTZWxlY3RPcHRpb257XG4gICAgLyoqXG4gICAgICogT3B0aW9uIHZhbHVlXG4gICAgICovXG4gICAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBPcHRpb24gdGV4dC9sYWJlbFxuICAgICAqL1xuICAgIHRleHQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyA9IG51bGwpe1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQgPyB0ZXh0IDogdmFsdWU7XG4gICAgfVxuXG59XG5cbiJdfQ==