/**
 * @fileoverview added by tsickle
 * Generated from: lib/entities/wrappers/page.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Datable page used to wrapper server content response
 * @template T
 */
export class Page {
    constructor() {
        /**
         * Number of items per page same as limit
         */
        this.size = 20;
        /**
         * Total items available on the server
         */
        this.totalElements = 0;
        /**
         * Total number of pages present
         */
        this.totalPages = 0;
        /**
         * Checks if is the first page
         */
        this.first = true;
        /**
         * Checks if it is the last page
         */
        this.last = false;
        /**
         * The actual page content
         */
        this.content = [];
        /**
         * Used to map sort parameters
         */
        this.sorted = new Sort();
        /**
         * Current page number
         */
        this.number = 0;
    }
}
if (false) {
    /**
     * Number of items per page same as limit
     * @type {?}
     */
    Page.prototype.size;
    /**
     * Total items available on the server
     * @type {?}
     */
    Page.prototype.totalElements;
    /**
     * Total number of pages present
     * @type {?}
     */
    Page.prototype.totalPages;
    /**
     * Checks if is the first page
     * @type {?}
     */
    Page.prototype.first;
    /**
     * Checks if it is the last page
     * @type {?}
     */
    Page.prototype.last;
    /**
     * The actual page content
     * @type {?}
     */
    Page.prototype.content;
    /**
     * Used to map sort parameters
     * @type {?}
     */
    Page.prototype.sorted;
    /**
     * Current page number
     * @type {?}
     */
    Page.prototype.number;
}
/**
 * used to map sort request
 */
export class Sort {
    constructor() {
        this.sorted = false;
        this.unsorted = true;
    }
}
if (false) {
    /** @type {?} */
    Sort.prototype.sorted;
    /** @type {?} */
    Sort.prototype.unsorted;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR0EsTUFBTSxPQUFPLElBQUk7SUFBakI7Ozs7UUFJSSxTQUFJLEdBQVcsRUFBRSxDQUFDOzs7O1FBSWxCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDOzs7O1FBSTFCLGVBQVUsR0FBVyxDQUFDLENBQUM7Ozs7UUFJdkIsVUFBSyxHQUFZLElBQUksQ0FBQzs7OztRQUl0QixTQUFJLEdBQVksS0FBSyxDQUFDOzs7O1FBSXRCLFlBQU8sR0FBYSxFQUFFLENBQUM7Ozs7UUFJdkIsV0FBTSxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7Ozs7UUFJMUIsV0FBTSxHQUFXLENBQUMsQ0FBQztJQUN2QixDQUFDO0NBQUE7Ozs7OztJQTdCRyxvQkFBa0I7Ozs7O0lBSWxCLDZCQUEwQjs7Ozs7SUFJMUIsMEJBQXVCOzs7OztJQUl2QixxQkFBc0I7Ozs7O0lBSXRCLG9CQUFzQjs7Ozs7SUFJdEIsdUJBQXVCOzs7OztJQUl2QixzQkFBMEI7Ozs7O0lBSTFCLHNCQUFtQjs7Ozs7QUFLdkIsTUFBTSxPQUFPLElBQUk7SUFBakI7UUFDSSxXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGFBQVEsR0FBWSxJQUFJLENBQUM7SUFDN0IsQ0FBQztDQUFBOzs7SUFGRyxzQkFBd0I7O0lBQ3hCLHdCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRGF0YWJsZSBwYWdlIHVzZWQgdG8gd3JhcHBlciBzZXJ2ZXIgY29udGVudCByZXNwb25zZVxuICovXG5leHBvcnQgY2xhc3MgUGFnZTxUPiB7XG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlIHNhbWUgYXMgbGltaXRcbiAgICAgKi9cbiAgICBzaXplOiBudW1iZXIgPSAyMDtcbiAgICAvKipcbiAgICAgKiBUb3RhbCBpdGVtcyBhdmFpbGFibGUgb24gdGhlIHNlcnZlclxuICAgICAqL1xuICAgIHRvdGFsRWxlbWVudHM6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogVG90YWwgbnVtYmVyIG9mIHBhZ2VzIHByZXNlbnRcbiAgICAgKi9cbiAgICB0b3RhbFBhZ2VzOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBpcyB0aGUgZmlyc3QgcGFnZVxuICAgICAqL1xuICAgIGZpcnN0OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgaXQgaXMgdGhlIGxhc3QgcGFnZVxuICAgICAqL1xuICAgIGxhc3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBUaGUgYWN0dWFsIHBhZ2UgY29udGVudFxuICAgICAqL1xuICAgIGNvbnRlbnQ6IEFycmF5PFQ+ID0gW107XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBtYXAgc29ydCBwYXJhbWV0ZXJzXG4gICAgICovXG4gICAgc29ydGVkOiBTb3J0ID0gbmV3IFNvcnQoKTtcbiAgICAvKipcbiAgICAgKiBDdXJyZW50IHBhZ2UgbnVtYmVyXG4gICAgICovXG4gICAgbnVtYmVyOiBudW1iZXIgPSAwO1xufVxuLyoqXG4gKiB1c2VkIHRvIG1hcCBzb3J0IHJlcXVlc3RcbiAqL1xuZXhwb3J0IGNsYXNzIFNvcnR7XG4gICAgc29ydGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgdW5zb3J0ZWQ6IGJvb2xlYW4gPSB0cnVlO1xufVxuIl19