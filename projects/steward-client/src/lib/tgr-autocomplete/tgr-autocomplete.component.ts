import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { StewardClientService, ResponseWrapper } from '../../public_api';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Queue } from 'queue-typescript';
import { EventEmitter } from 'events';

@Component({
  selector: 'tgr-autocomplete',
  templateUrl: './tgr-autocomplete.component.html',
  styleUrls: ['./tgr-autocomplete.component.css']
})
export class TgrAutocompleteComponent implements OnInit {

  /**
   * Model object
   */
  model: Object = {};
  /**
   * Progress indicator
   */
  isLoading: boolean;
  /**
   * Text field control
   */
  textControl = new FormControl();
  /**
   * Retailer Rjx handler
   */
  searchElement: Subject<any> = new BehaviorSubject<any>([]);
  /**
   * Google material icon
   */
  @Input() icon: string;
  /**
   * Id field
   */
  @Input() inputAttribute: InputAttribute;
  /**
   * Request url
   */
  @Input() url: string;
  /**
   * custom http headers
   */
  @Input() httpHeaders: HttpHeaders;
  /**
   * Display value function
   */
  @Output() displayWith: Function;
  /**
   * Selection event function
   */
  @Output() optionSelected: Function;

  /**
   * Steward service client 
   * 
   * @param sterwardService 
   */
  constructor(private client: StewardClientService<ResponseWrapper<any>, any>) { }

  ngOnInit() {
    this.client.get(this.url).subscribe(response => {
      if(response.status == 200){
        this.searchElement.next(response.data['content']);
      }
    })
  }

  /**
   * Display name of the selected user
   * 
   * @param val selected user
   */
  displayVal(val: any) {
    // if(this.displayWith){
    //   this.displayWith(val);
    // }
    return val == null ? '' : this.getFieldValue(val);
  }

  /**
   * Set assignee agent it 
   * 
   * @param event 
   */
  setFieldId(event: MatAutocompleteSelectedEvent){
    // this.optionSelected(event);
    this.model[this.inputAttribute.fieldId] = event.option.value[this.inputAttribute.fieldId];
  }

  /**
   * Get field value
   * 
   * @param elem 
   */
  public getFieldValue(elem: any){
    if (this.inputAttribute.callback) {
      return this.inputAttribute.callback(elem);
    }
    var k: Array<string> = this.inputAttribute.fieldName.split(".");
    var keys = new Queue<string>(...k);
    return this.client.getObjectValue(elem, keys);
  }

}

export class InputAttribute{
  
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
