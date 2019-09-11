/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { StewardClientService } from '../../public_api';
import { HttpHeaders } from '@angular/common/http';
import { Queue } from 'queue-typescript';
export class TgrAutocompleteComponent {
    /**
     * Steward service client
     *
     * @param {?} client
     */
    constructor(client) {
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
    ngOnInit() {
        this.client.get(this.url).subscribe(response => {
            if (response.status == 200) {
                this.searchElement.next(response.data['content']);
            }
        });
    }
    /**
     * Display name of the selected user
     *
     * @param {?} val selected user
     * @return {?}
     */
    displayVal(val) {
        // if(this.displayWith){
        //   this.displayWith(val);
        // }
        return val == null ? '' : this.getFieldValue(val);
    }
    /**
     * Set assignee agent it
     *
     * @param {?} event
     * @return {?}
     */
    setFieldId(event) {
        // this.optionSelected(event);
        this.model[this.inputAttribute.fieldId] = event.option.value[this.inputAttribute.fieldId];
    }
    /**
     * Get field value
     *
     * @param {?} elem
     * @return {?}
     */
    getFieldValue(elem) {
        if (this.inputAttribute.callback) {
            return this.inputAttribute.callback(elem);
        }
        /** @type {?} */
        var k = this.inputAttribute.fieldName.split(".");
        /** @type {?} */
        var keys = new Queue(...k);
        return this.client.getObjectValue(elem, keys);
    }
}
TgrAutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: 'tgr-autocomplete',
                template: `<mat-form-field class="full-width md-icon-left">
    <mat-icon *ngIf="icon" matPrefix class="material-icons text-esoko-till icon-margin-right">{{icon}}</mat-icon>
    <input required matInput [placeholder]="inputAttribute.placeholder" #textInput [formControl]="textControl"
      [matAutocomplete]="textInput" />
    <!-- <mat-hint class="text-danger"
      *ngIf="(agentInput.touched || agentInput.dirty) && agentInput.invalid && agentInput.errors.required"
      align="end">Current agent is required</mat-hint> -->
    <mat-autocomplete [autoActiveFirstOption]="true" #textInput="matAutocomplete" [displayWith]="displayVal"
      [disableRipple]="false" (optionSelected)="setFieldId($event)">
      <mat-option *ngFor="let elem of searchElement | async" [value]="elem">
        <div [innerHtml] = "getFieldValue(elem)"></div>
      </mat-option>
    </mat-autocomplete>
  </mat-form-field>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
TgrAutocompleteComponent.ctorParameters = () => [
    { type: StewardClientService }
];
TgrAutocompleteComponent.propDecorators = {
    icon: [{ type: Input }],
    inputAttribute: [{ type: Input }],
    url: [{ type: Input }],
    httpHeaders: [{ type: Input }],
    displayWith: [{ type: Output }],
    optionSelected: [{ type: Output }]
};
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
export class InputAttribute {
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGdyLWF1dG9jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdGV3YXJkLWNsaWVudC8iLCJzb3VyY2VzIjpbImxpYi90Z3ItYXV0b2NvbXBsZXRlL3Rnci1hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLFdBQVcsRUFBVSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBVyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFaEQsT0FBTyxFQUFFLG9CQUFvQixFQUFtQixNQUFNLGtCQUFrQixDQUFDO0FBQ3pFLE9BQU8sRUFBYyxXQUFXLEVBQWlDLE1BQU0sc0JBQXNCLENBQUM7QUFDOUYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBc0J6QyxNQUFNOzs7Ozs7SUFnREosWUFBb0IsTUFBdUQ7UUFBdkQsV0FBTSxHQUFOLE1BQU0sQ0FBaUQ7Ozs7cUJBM0MzRCxFQUFFOzs7OzJCQVFKLElBQUksV0FBVyxFQUFFOzs7OzZCQUlELElBQUksZUFBZSxDQUFNLEVBQUUsQ0FBQztLQStCc0I7Ozs7SUFFaEYsUUFBUTtRQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0MsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDbkQ7U0FDRixDQUFDLENBQUE7S0FDSDs7Ozs7OztJQU9ELFVBQVUsQ0FBQyxHQUFROzs7O1FBSWpCLE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkQ7Ozs7Ozs7SUFPRCxVQUFVLENBQUMsS0FBbUM7O1FBRTVDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzNGOzs7Ozs7O0lBT00sYUFBYSxDQUFDLElBQVM7UUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQzs7UUFDRCxJQUFJLENBQUMsR0FBa0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztRQUNoRSxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Ozs7WUE5R2pELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0NBY1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2I7Ozs7WUF2QlEsb0JBQW9COzs7bUJBNkMxQixLQUFLOzZCQUlMLEtBQUs7a0JBSUwsS0FBSzswQkFJTCxLQUFLOzBCQUlMLE1BQU07NkJBSU4sTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1RFQsTUFBTTtDQW1CTCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3ViamVjdCwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgU3Rld2FyZENsaWVudFNlcnZpY2UsIFJlc3BvbnNlV3JhcHBlciB9IGZyb20gJy4uLy4uL3B1YmxpY19hcGknO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgUXVldWUgfSBmcm9tICdxdWV1ZS10eXBlc2NyaXB0JztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Rnci1hdXRvY29tcGxldGUnLFxuICB0ZW1wbGF0ZTogYDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImZ1bGwtd2lkdGggbWQtaWNvbi1sZWZ0XCI+XG4gICAgPG1hdC1pY29uICpuZ0lmPVwiaWNvblwiIG1hdFByZWZpeCBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHRleHQtZXNva28tdGlsbCBpY29uLW1hcmdpbi1yaWdodFwiPnt7aWNvbn19PC9tYXQtaWNvbj5cbiAgICA8aW5wdXQgcmVxdWlyZWQgbWF0SW5wdXQgW3BsYWNlaG9sZGVyXT1cImlucHV0QXR0cmlidXRlLnBsYWNlaG9sZGVyXCIgI3RleHRJbnB1dCBbZm9ybUNvbnRyb2xdPVwidGV4dENvbnRyb2xcIlxuICAgICAgW21hdEF1dG9jb21wbGV0ZV09XCJ0ZXh0SW5wdXRcIiAvPlxuICAgIDwhLS0gPG1hdC1oaW50IGNsYXNzPVwidGV4dC1kYW5nZXJcIlxuICAgICAgKm5nSWY9XCIoYWdlbnRJbnB1dC50b3VjaGVkIHx8IGFnZW50SW5wdXQuZGlydHkpICYmIGFnZW50SW5wdXQuaW52YWxpZCAmJiBhZ2VudElucHV0LmVycm9ycy5yZXF1aXJlZFwiXG4gICAgICBhbGlnbj1cImVuZFwiPkN1cnJlbnQgYWdlbnQgaXMgcmVxdWlyZWQ8L21hdC1oaW50PiAtLT5cbiAgICA8bWF0LWF1dG9jb21wbGV0ZSBbYXV0b0FjdGl2ZUZpcnN0T3B0aW9uXT1cInRydWVcIiAjdGV4dElucHV0PVwibWF0QXV0b2NvbXBsZXRlXCIgW2Rpc3BsYXlXaXRoXT1cImRpc3BsYXlWYWxcIlxuICAgICAgW2Rpc2FibGVSaXBwbGVdPVwiZmFsc2VcIiAob3B0aW9uU2VsZWN0ZWQpPVwic2V0RmllbGRJZCgkZXZlbnQpXCI+XG4gICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgZWxlbSBvZiBzZWFyY2hFbGVtZW50IHwgYXN5bmNcIiBbdmFsdWVdPVwiZWxlbVwiPlxuICAgICAgICA8ZGl2IFtpbm5lckh0bWxdID0gXCJnZXRGaWVsZFZhbHVlKGVsZW0pXCI+PC9kaXY+XG4gICAgICA8L21hdC1vcHRpb24+XG4gICAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFRnckF1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgLyoqXG4gICAqIE1vZGVsIG9iamVjdFxuICAgKi9cbiAgbW9kZWw6IE9iamVjdCA9IHt9O1xuICAvKipcbiAgICogUHJvZ3Jlc3MgaW5kaWNhdG9yXG4gICAqL1xuICBpc0xvYWRpbmc6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBUZXh0IGZpZWxkIGNvbnRyb2xcbiAgICovXG4gIHRleHRDb250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gIC8qKlxuICAgKiBSZXRhaWxlciBSanggaGFuZGxlclxuICAgKi9cbiAgc2VhcmNoRWxlbWVudDogU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KFtdKTtcbiAgLyoqXG4gICAqIEdvb2dsZSBtYXRlcmlhbCBpY29uXG4gICAqL1xuICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBJZCBmaWVsZFxuICAgKi9cbiAgQElucHV0KCkgaW5wdXRBdHRyaWJ1dGU6IElucHV0QXR0cmlidXRlO1xuICAvKipcbiAgICogUmVxdWVzdCB1cmxcbiAgICovXG4gIEBJbnB1dCgpIHVybDogc3RyaW5nO1xuICAvKipcbiAgICogY3VzdG9tIGh0dHAgaGVhZGVyc1xuICAgKi9cbiAgQElucHV0KCkgaHR0cEhlYWRlcnM6IEh0dHBIZWFkZXJzO1xuICAvKipcbiAgICogRGlzcGxheSB2YWx1ZSBmdW5jdGlvblxuICAgKi9cbiAgQE91dHB1dCgpIGRpc3BsYXlXaXRoOiBGdW5jdGlvbjtcbiAgLyoqXG4gICAqIFNlbGVjdGlvbiBldmVudCBmdW5jdGlvblxuICAgKi9cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBGdW5jdGlvbjtcblxuICAvKipcbiAgICogU3Rld2FyZCBzZXJ2aWNlIGNsaWVudCBcbiAgICogXG4gICAqIEBwYXJhbSBzdGVyd2FyZFNlcnZpY2UgXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsaWVudDogU3Rld2FyZENsaWVudFNlcnZpY2U8UmVzcG9uc2VXcmFwcGVyPGFueT4sIGFueT4pIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2xpZW50LmdldCh0aGlzLnVybCkuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApe1xuICAgICAgICB0aGlzLnNlYXJjaEVsZW1lbnQubmV4dChyZXNwb25zZS5kYXRhWydjb250ZW50J10pO1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogRGlzcGxheSBuYW1lIG9mIHRoZSBzZWxlY3RlZCB1c2VyXG4gICAqIFxuICAgKiBAcGFyYW0gdmFsIHNlbGVjdGVkIHVzZXJcbiAgICovXG4gIGRpc3BsYXlWYWwodmFsOiBhbnkpIHtcbiAgICAvLyBpZih0aGlzLmRpc3BsYXlXaXRoKXtcbiAgICAvLyAgIHRoaXMuZGlzcGxheVdpdGgodmFsKTtcbiAgICAvLyB9XG4gICAgcmV0dXJuIHZhbCA9PSBudWxsID8gJycgOiB0aGlzLmdldEZpZWxkVmFsdWUodmFsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYXNzaWduZWUgYWdlbnQgaXQgXG4gICAqIFxuICAgKiBAcGFyYW0gZXZlbnQgXG4gICAqL1xuICBzZXRGaWVsZElkKGV2ZW50OiBNYXRBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50KXtcbiAgICAvLyB0aGlzLm9wdGlvblNlbGVjdGVkKGV2ZW50KTtcbiAgICB0aGlzLm1vZGVsW3RoaXMuaW5wdXRBdHRyaWJ1dGUuZmllbGRJZF0gPSBldmVudC5vcHRpb24udmFsdWVbdGhpcy5pbnB1dEF0dHJpYnV0ZS5maWVsZElkXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZmllbGQgdmFsdWVcbiAgICogXG4gICAqIEBwYXJhbSBlbGVtIFxuICAgKi9cbiAgcHVibGljIGdldEZpZWxkVmFsdWUoZWxlbTogYW55KXtcbiAgICBpZiAodGhpcy5pbnB1dEF0dHJpYnV0ZS5jYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHRoaXMuaW5wdXRBdHRyaWJ1dGUuY2FsbGJhY2soZWxlbSk7XG4gICAgfVxuICAgIHZhciBrOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5pbnB1dEF0dHJpYnV0ZS5maWVsZE5hbWUuc3BsaXQoXCIuXCIpO1xuICAgIHZhciBrZXlzID0gbmV3IFF1ZXVlPHN0cmluZz4oLi4uayk7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmdldE9iamVjdFZhbHVlKGVsZW0sIGtleXMpO1xuICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIElucHV0QXR0cmlidXRle1xuICBcbiAgLyoqXG4gICAqIEZpZWxkIG5hbWVcbiAgICovXG4gIGZpZWxkTmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogRmllbGQgaWRcbiAgICovXG4gIGZpZWxkSWQ6IHN0cmluZztcbiAgLyoqXG4gICAqIENhbGxiYWNrIGZ1bmN0aW9uIHVzZWQgZm9yIGVsZW1lbnRzIHJlbmRlcmluZy5cbiAgICogIE5vdGU6IEZ1bmN0aW9uIHJlc3VsdHMgYXJlIG5vdCBzYW5pdGlzZWRcbiAgICovXG4gIGNhbGxiYWNrPzogRnVuY3Rpb247XG4gIC8qKlxuICAgKiBwbGFjZWhvbGRlclxuICAgKi9cbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbn1cbiJdfQ==