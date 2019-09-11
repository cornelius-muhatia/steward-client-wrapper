import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { StewardClientService, ResponseWrapper } from '../../public_api';
import { HttpHeaders } from '@angular/common/http';
export declare class TgrAutocompleteComponent implements OnInit {
    private client;
    /**
     * Model object
     */
    model: Object;
    /**
     * Progress indicator
     */
    isLoading: boolean;
    /**
     * Text field control
     */
    textControl: FormControl;
    /**
     * Retailer Rjx handler
     */
    searchElement: Subject<any>;
    /**
     * Google material icon
     */
    icon: string;
    /**
     * Id field
     */
    inputAttribute: InputAttribute;
    /**
     * Request url
     */
    url: string;
    /**
     * custom http headers
     */
    httpHeaders: HttpHeaders;
    /**
     * Display value function
     */
    displayWith: Function;
    /**
     * Selection event function
     */
    optionSelected: Function;
    /**
     * Steward service client
     *
     * @param sterwardService
     */
    constructor(client: StewardClientService<ResponseWrapper<any>, any>);
    ngOnInit(): void;
    /**
     * Display name of the selected user
     *
     * @param val selected user
     */
    displayVal(val: any): any;
    /**
     * Set assignee agent it
     *
     * @param event
     */
    setFieldId(event: MatAutocompleteSelectedEvent): void;
    /**
     * Get field value
     *
     * @param elem
     */
    getFieldValue(elem: any): any;
}
export declare class InputAttribute {
    /**
     * Field name
     */
    fieldName: string;
    /**
     * Field id
     */
    fieldId: string;
    /**
     * Callback function used for elements rendering.
     *  Note: Function results are not sanitised
     */
    callback?: Function;
    /**
     * placeholder
     */
    placeholder: string;
}
