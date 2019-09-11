/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { StewardClientService } from '../../public_api';
import { HttpHeaders } from '@angular/common/http';
import { Queue } from 'queue-typescript';
var TgrAutocompleteComponent = /** @class */ (function () {
    /**
     * Steward service client
     *
     * @param sterwardService
     */
    function TgrAutocompleteComponent(client) {
        this.client = client;
        /**
         * Model object
         */
        this.model = {};
        /**
         * Text field control
         */
        this.textControl = new FormControl();
        /**
         * Retailer Rjx handler
         */
        this.searchElement = new BehaviorSubject([]);
    }
    /**
     * @return {?}
     */
    TgrAutocompleteComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.client.get(this.url).subscribe(function (response) {
            if (response.status == 200) {
                _this.searchElement.next(response.data['content']);
            }
        });
    };
    /**
     * Display name of the selected user
     *
     * @param val selected user
     */
    /**
     * Display name of the selected user
     *
     * @param {?} val selected user
     * @return {?}
     */
    TgrAutocompleteComponent.prototype.displayVal = /**
     * Display name of the selected user
     *
     * @param {?} val selected user
     * @return {?}
     */
    function (val) {
        // if(this.displayWith){
        //   this.displayWith(val);
        // }
        return val == null ? '' : this.getFieldValue(val);
    };
    /**
     * Set assignee agent it
     *
     * @param event
     */
    /**
     * Set assignee agent it
     *
     * @param {?} event
     * @return {?}
     */
    TgrAutocompleteComponent.prototype.setFieldId = /**
     * Set assignee agent it
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // this.optionSelected(event);
        this.model[this.inputAttribute.fieldId] = event.option.value[this.inputAttribute.fieldId];
    };
    /**
     * Get field value
     *
     * @param {?} elem
     * @return {?}
     */
    TgrAutocompleteComponent.prototype.getFieldValue = /**
     * Get field value
     *
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        if (this.inputAttribute.callback) {
            return this.inputAttribute.callback(elem);
        }
        /** @type {?} */
        var k = this.inputAttribute.fieldName.split(".");
        /** @type {?} */
        var keys = new (Queue.bind.apply(Queue, tslib_1.__spread([void 0], k)))();
        return this.client.getObjectValue(elem, keys);
    };
    TgrAutocompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tgr-autocomplete',
                    template: "<mat-form-field class=\"full-width md-icon-left\">\n    <mat-icon *ngIf=\"icon\" matPrefix class=\"material-icons text-esoko-till icon-margin-right\">{{icon}}</mat-icon>\n    <input required matInput [placeholder]=\"inputAttribute.placeholder\" #textInput [formControl]=\"textControl\"\n      [matAutocomplete]=\"textInput\" />\n    <!-- <mat-hint class=\"text-danger\"\n      *ngIf=\"(agentInput.touched || agentInput.dirty) && agentInput.invalid && agentInput.errors.required\"\n      align=\"end\">Current agent is required</mat-hint> -->\n    <mat-autocomplete [autoActiveFirstOption]=\"true\" #textInput=\"matAutocomplete\" [displayWith]=\"displayVal\"\n      [disableRipple]=\"false\" (optionSelected)=\"setFieldId($event)\">\n      <mat-option *ngFor=\"let elem of searchElement | async\" [value]=\"elem\">\n        <div [innerHtml] = \"getFieldValue(elem)\"></div>\n      </mat-option>\n    </mat-autocomplete>\n  </mat-form-field>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    TgrAutocompleteComponent.ctorParameters = function () { return [
        { type: StewardClientService }
    ]; };
    TgrAutocompleteComponent.propDecorators = {
        icon: [{ type: Input }],
        inputAttribute: [{ type: Input }],
        url: [{ type: Input }],
        httpHeaders: [{ type: Input }],
        displayWith: [{ type: Output }],
        optionSelected: [{ type: Output }]
    };
    return TgrAutocompleteComponent;
}());
export { TgrAutocompleteComponent };
if (false) {
    /**
     * Model object
     * @type {?}
     */
    TgrAutocompleteComponent.prototype.model;
    /**
     * Progress indicator
     * @type {?}
     */
    TgrAutocompleteComponent.prototype.isLoading;
    /**
     * Text field control
     * @type {?}
     */
    TgrAutocompleteComponent.prototype.textControl;
    /**
     * Retailer Rjx handler
     * @type {?}
     */
    TgrAutocompleteComponent.prototype.searchElement;
    /**
     * Google material icon
     * @type {?}
     */
    TgrAutocompleteComponent.prototype.icon;
    /**
     * Id field
     * @type {?}
     */
    TgrAutocompleteComponent.prototype.inputAttribute;
    /**
     * Request url
     * @type {?}
     */
    TgrAutocompleteComponent.prototype.url;
    /**
     * custom http headers
     * @type {?}
     */
    TgrAutocompleteComponent.prototype.httpHeaders;
    /**
     * Display value function
     * @type {?}
     */
    TgrAutocompleteComponent.prototype.displayWith;
    /**
     * Selection event function
     * @type {?}
     */
    TgrAutocompleteComponent.prototype.optionSelected;
    /** @type {?} */
    TgrAutocompleteComponent.prototype.client;
}
var InputAttribute = /** @class */ (function () {
    function InputAttribute() {
    }
    return InputAttribute;
}());
export { InputAttribute };
if (false) {
    /**
     * Field name
     * @type {?}
     */
    InputAttribute.prototype.fieldName;
    /**
     * Field id
     * @type {?}
     */
    InputAttribute.prototype.fieldId;
    /**
     * Callback function used for elements rendering.
     *  Note: Function results are not sanitised
     * @type {?}
     */
    InputAttribute.prototype.callback;
    /**
     * placeholder
     * @type {?}
     */
    InputAttribute.prototype.placeholder;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGdyLWF1dG9jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdGV3YXJkLWNsaWVudC8iLCJzb3VyY2VzIjpbImxpYi90Z3ItYXV0b2NvbXBsZXRlL3Rnci1hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxXQUFXLEVBQVUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQVcsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWhELE9BQU8sRUFBRSxvQkFBb0IsRUFBbUIsTUFBTSxrQkFBa0IsQ0FBQztBQUN6RSxPQUFPLEVBQWMsV0FBVyxFQUFpQyxNQUFNLHNCQUFzQixDQUFDO0FBQzlGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7SUFpRXZDOzs7O09BSUc7SUFDSCxrQ0FBb0IsTUFBdUQ7UUFBdkQsV0FBTSxHQUFOLE1BQU0sQ0FBaUQ7Ozs7cUJBM0MzRCxFQUFFOzs7OzJCQVFKLElBQUksV0FBVyxFQUFFOzs7OzZCQUlELElBQUksZUFBZSxDQUFNLEVBQUUsQ0FBQztLQStCc0I7Ozs7SUFFaEYsMkNBQVE7OztJQUFSO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsUUFBUTtZQUMxQyxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNuRDtTQUNGLENBQUMsQ0FBQTtLQUNIO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILDZDQUFVOzs7Ozs7SUFBVixVQUFXLEdBQVE7Ozs7UUFJakIsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNuRDtJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCw2Q0FBVTs7Ozs7O0lBQVYsVUFBVyxLQUFtQzs7UUFFNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0Y7Ozs7Ozs7SUFPTSxnREFBYTs7Ozs7O2NBQUMsSUFBUztRQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNDOztRQUNELElBQUksQ0FBQyxHQUFrQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBQ2hFLElBQUksSUFBSSxRQUFPLEtBQUssWUFBTCxLQUFLLDZCQUFZLENBQUMsTUFBRTtRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7Z0JBOUdqRCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLCs2QkFjWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2I7Ozs7Z0JBdkJRLG9CQUFvQjs7O3VCQTZDMUIsS0FBSztpQ0FJTCxLQUFLO3NCQUlMLEtBQUs7OEJBSUwsS0FBSzs4QkFJTCxNQUFNO2lDQUlOLE1BQU07O21DQXJFVDs7U0E0QmEsd0JBQXdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0dyQyxJQUFBOzs7eUJBNUhBO0lBK0lDLENBQUE7QUFuQkQsMEJBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBOZ0Zvcm0gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJqZWN0LCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBTdGV3YXJkQ2xpZW50U2VydmljZSwgUmVzcG9uc2VXcmFwcGVyIH0gZnJvbSAnLi4vLi4vcHVibGljX2FwaSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gJ3F1ZXVlLXR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGdyLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiZnVsbC13aWR0aCBtZC1pY29uLWxlZnRcIj5cbiAgICA8bWF0LWljb24gKm5nSWY9XCJpY29uXCIgbWF0UHJlZml4IGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgdGV4dC1lc29rby10aWxsIGljb24tbWFyZ2luLXJpZ2h0XCI+e3tpY29ufX08L21hdC1pY29uPlxuICAgIDxpbnB1dCByZXF1aXJlZCBtYXRJbnB1dCBbcGxhY2Vob2xkZXJdPVwiaW5wdXRBdHRyaWJ1dGUucGxhY2Vob2xkZXJcIiAjdGV4dElucHV0IFtmb3JtQ29udHJvbF09XCJ0ZXh0Q29udHJvbFwiXG4gICAgICBbbWF0QXV0b2NvbXBsZXRlXT1cInRleHRJbnB1dFwiIC8+XG4gICAgPCEtLSA8bWF0LWhpbnQgY2xhc3M9XCJ0ZXh0LWRhbmdlclwiXG4gICAgICAqbmdJZj1cIihhZ2VudElucHV0LnRvdWNoZWQgfHwgYWdlbnRJbnB1dC5kaXJ0eSkgJiYgYWdlbnRJbnB1dC5pbnZhbGlkICYmIGFnZW50SW5wdXQuZXJyb3JzLnJlcXVpcmVkXCJcbiAgICAgIGFsaWduPVwiZW5kXCI+Q3VycmVudCBhZ2VudCBpcyByZXF1aXJlZDwvbWF0LWhpbnQ+IC0tPlxuICAgIDxtYXQtYXV0b2NvbXBsZXRlIFthdXRvQWN0aXZlRmlyc3RPcHRpb25dPVwidHJ1ZVwiICN0ZXh0SW5wdXQ9XCJtYXRBdXRvY29tcGxldGVcIiBbZGlzcGxheVdpdGhdPVwiZGlzcGxheVZhbFwiXG4gICAgICBbZGlzYWJsZVJpcHBsZV09XCJmYWxzZVwiIChvcHRpb25TZWxlY3RlZCk9XCJzZXRGaWVsZElkKCRldmVudClcIj5cbiAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBlbGVtIG9mIHNlYXJjaEVsZW1lbnQgfCBhc3luY1wiIFt2YWx1ZV09XCJlbGVtXCI+XG4gICAgICAgIDxkaXYgW2lubmVySHRtbF0gPSBcImdldEZpZWxkVmFsdWUoZWxlbSlcIj48L2Rpdj5cbiAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICA8L21hdC1hdXRvY29tcGxldGU+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgVGdyQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvKipcbiAgICogTW9kZWwgb2JqZWN0XG4gICAqL1xuICBtb2RlbDogT2JqZWN0ID0ge307XG4gIC8qKlxuICAgKiBQcm9ncmVzcyBpbmRpY2F0b3JcbiAgICovXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRleHQgZmllbGQgY29udHJvbFxuICAgKi9cbiAgdGV4dENvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgLyoqXG4gICAqIFJldGFpbGVyIFJqeCBoYW5kbGVyXG4gICAqL1xuICBzZWFyY2hFbGVtZW50OiBTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oW10pO1xuICAvKipcbiAgICogR29vZ2xlIG1hdGVyaWFsIGljb25cbiAgICovXG4gIEBJbnB1dCgpIGljb246IHN0cmluZztcbiAgLyoqXG4gICAqIElkIGZpZWxkXG4gICAqL1xuICBASW5wdXQoKSBpbnB1dEF0dHJpYnV0ZTogSW5wdXRBdHRyaWJ1dGU7XG4gIC8qKlxuICAgKiBSZXF1ZXN0IHVybFxuICAgKi9cbiAgQElucHV0KCkgdXJsOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBjdXN0b20gaHR0cCBoZWFkZXJzXG4gICAqL1xuICBASW5wdXQoKSBodHRwSGVhZGVyczogSHR0cEhlYWRlcnM7XG4gIC8qKlxuICAgKiBEaXNwbGF5IHZhbHVlIGZ1bmN0aW9uXG4gICAqL1xuICBAT3V0cHV0KCkgZGlzcGxheVdpdGg6IEZ1bmN0aW9uO1xuICAvKipcbiAgICogU2VsZWN0aW9uIGV2ZW50IGZ1bmN0aW9uXG4gICAqL1xuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEZ1bmN0aW9uO1xuXG4gIC8qKlxuICAgKiBTdGV3YXJkIHNlcnZpY2UgY2xpZW50IFxuICAgKiBcbiAgICogQHBhcmFtIHN0ZXJ3YXJkU2VydmljZSBcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50OiBTdGV3YXJkQ2xpZW50U2VydmljZTxSZXNwb25zZVdyYXBwZXI8YW55PiwgYW55PikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jbGllbnQuZ2V0KHRoaXMudXJsKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzID09IDIwMCl7XG4gICAgICAgIHRoaXMuc2VhcmNoRWxlbWVudC5uZXh0KHJlc3BvbnNlLmRhdGFbJ2NvbnRlbnQnXSk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwbGF5IG5hbWUgb2YgdGhlIHNlbGVjdGVkIHVzZXJcbiAgICogXG4gICAqIEBwYXJhbSB2YWwgc2VsZWN0ZWQgdXNlclxuICAgKi9cbiAgZGlzcGxheVZhbCh2YWw6IGFueSkge1xuICAgIC8vIGlmKHRoaXMuZGlzcGxheVdpdGgpe1xuICAgIC8vICAgdGhpcy5kaXNwbGF5V2l0aCh2YWwpO1xuICAgIC8vIH1cbiAgICByZXR1cm4gdmFsID09IG51bGwgPyAnJyA6IHRoaXMuZ2V0RmllbGRWYWx1ZSh2YWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhc3NpZ25lZSBhZ2VudCBpdCBcbiAgICogXG4gICAqIEBwYXJhbSBldmVudCBcbiAgICovXG4gIHNldEZpZWxkSWQoZXZlbnQ6IE1hdEF1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnQpe1xuICAgIC8vIHRoaXMub3B0aW9uU2VsZWN0ZWQoZXZlbnQpO1xuICAgIHRoaXMubW9kZWxbdGhpcy5pbnB1dEF0dHJpYnV0ZS5maWVsZElkXSA9IGV2ZW50Lm9wdGlvbi52YWx1ZVt0aGlzLmlucHV0QXR0cmlidXRlLmZpZWxkSWRdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBmaWVsZCB2YWx1ZVxuICAgKiBcbiAgICogQHBhcmFtIGVsZW0gXG4gICAqL1xuICBwdWJsaWMgZ2V0RmllbGRWYWx1ZShlbGVtOiBhbnkpe1xuICAgIGlmICh0aGlzLmlucHV0QXR0cmlidXRlLmNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnB1dEF0dHJpYnV0ZS5jYWxsYmFjayhlbGVtKTtcbiAgICB9XG4gICAgdmFyIGs6IEFycmF5PHN0cmluZz4gPSB0aGlzLmlucHV0QXR0cmlidXRlLmZpZWxkTmFtZS5zcGxpdChcIi5cIik7XG4gICAgdmFyIGtleXMgPSBuZXcgUXVldWU8c3RyaW5nPiguLi5rKTtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuZ2V0T2JqZWN0VmFsdWUoZWxlbSwga2V5cyk7XG4gIH1cblxufVxuXG5leHBvcnQgY2xhc3MgSW5wdXRBdHRyaWJ1dGV7XG4gIFxuICAvKipcbiAgICogRmllbGQgbmFtZVxuICAgKi9cbiAgZmllbGROYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBGaWVsZCBpZFxuICAgKi9cbiAgZmllbGRJZDogc3RyaW5nO1xuICAvKipcbiAgICogQ2FsbGJhY2sgZnVuY3Rpb24gdXNlZCBmb3IgZWxlbWVudHMgcmVuZGVyaW5nLlxuICAgKiAgTm90ZTogRnVuY3Rpb24gcmVzdWx0cyBhcmUgbm90IHNhbml0aXNlZFxuICAgKi9cbiAgY2FsbGJhY2s/OiBGdW5jdGlvbjtcbiAgLyoqXG4gICAqIHBsYWNlaG9sZGVyXG4gICAqL1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xufVxuIl19