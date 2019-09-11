/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { StewardClientComponent } from './steward-client.component';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StewardConfig } from './steward-client.service';
import { TgrMaterialTableComponent } from './tgr-material-table/tgr-material-table.component';
import { MatInputModule, MatTableModule, MatCheckboxModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSelectModule, MatButtonModule, MatSortModule, MatMenuModule, MatProgressSpinnerModule, MatAutocompleteModule } from '@angular/material';
import { TgrAutocompleteComponent } from './tgr-autocomplete/tgr-autocomplete.component';
export class StewardClientModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: StewardClientModule,
            providers: [{ provide: StewardConfig, useValue: config }]
        };
    }
}
StewardClientModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    NgxDatatableModule,
                    CommonModule,
                    HttpClientModule,
                    MatInputModule,
                    MatTableModule,
                    MatCheckboxModule,
                    MatIconModule,
                    MatDatepickerModule,
                    MatNativeDateModule,
                    MatPaginatorModule,
                    MatSelectModule,
                    MatButtonModule,
                    MatSortModule,
                    MatMenuModule,
                    MatProgressSpinnerModule,
                    MatAutocompleteModule
                ],
                declarations: [
                    StewardClientComponent,
                    TgrMaterialTableComponent,
                    TgrAutocompleteComponent
                ],
                exports: [StewardClientComponent, TgrMaterialTableComponent, TgrAutocompleteComponent]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc3Rld2FyZC1jbGllbnQvIiwic291cmNlcyI6WyJsaWIvc3Rld2FyZC1jbGllbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzlGLE9BQU8sRUFDTCxjQUFjLEVBQ2QsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNuQixrQkFBa0IsRUFDbEIsZUFBZSxFQUNmLGVBQWUsRUFDZixhQUFhLEVBQ2IsYUFBYSxFQUNiLHdCQUF3QixFQUN4QixxQkFBcUIsRUFDdEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQThCekYsTUFBTTs7Ozs7SUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQXFCO1FBQ2xDLE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsU0FBUyxFQUFFLENBQUUsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsQ0FBRTtTQUMxRCxDQUFBO0tBQ0Y7OztZQWxDRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixrQkFBa0I7b0JBQ2xCLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsaUJBQWlCO29CQUNqQixhQUFhO29CQUNiLG1CQUFtQjtvQkFDbkIsbUJBQW1CO29CQUNuQixrQkFBa0I7b0JBQ2xCLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixhQUFhO29CQUNiLGFBQWE7b0JBQ2Isd0JBQXdCO29CQUN4QixxQkFBcUI7aUJBQ3RCO2dCQUNELFlBQVksRUFBRTtvQkFDWixzQkFBc0I7b0JBQ3RCLHlCQUF5QjtvQkFDekIsd0JBQXdCO2lCQUN6QjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSx5QkFBeUIsRUFBRSx3QkFBd0IsQ0FBQzthQUN2RiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0ZXdhcmRDbGllbnRDb21wb25lbnQgfSBmcm9tICcuL3N0ZXdhcmQtY2xpZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5neERhdGF0YWJsZU1vZHVsZSB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IFN0ZXdhcmRDb25maWcgfSBmcm9tICcuL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUZ3JNYXRlcmlhbFRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi90Z3ItbWF0ZXJpYWwtdGFibGUvdGdyLW1hdGVyaWFsLXRhYmxlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7XHJcbiAgTWF0SW5wdXRNb2R1bGUsIFxyXG4gIE1hdFRhYmxlTW9kdWxlLCBcclxuICBNYXRDaGVja2JveE1vZHVsZSwgXHJcbiAgTWF0SWNvbk1vZHVsZSwgXHJcbiAgTWF0RGF0ZXBpY2tlck1vZHVsZSwgXHJcbiAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcclxuICBNYXRQYWdpbmF0b3JNb2R1bGUsXHJcbiAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gIE1hdEJ1dHRvbk1vZHVsZSxcclxuICBNYXRTb3J0TW9kdWxlLFxyXG4gIE1hdE1lbnVNb2R1bGUsXHJcbiAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxyXG4gIE1hdEF1dG9jb21wbGV0ZU1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgVGdyQXV0b2NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi90Z3ItYXV0b2NvbXBsZXRlL3Rnci1hdXRvY29tcGxldGUuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgTmd4RGF0YXRhYmxlTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgSHR0cENsaWVudE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0VGFibGVNb2R1bGUsXHJcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxyXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcclxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdFNvcnRNb2R1bGUsXHJcbiAgICBNYXRNZW51TW9kdWxlLFxyXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxyXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFN0ZXdhcmRDbGllbnRDb21wb25lbnQsIFxyXG4gICAgVGdyTWF0ZXJpYWxUYWJsZUNvbXBvbmVudCxcclxuICAgIFRnckF1dG9jb21wbGV0ZUNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1N0ZXdhcmRDbGllbnRDb21wb25lbnQsIFRnck1hdGVyaWFsVGFibGVDb21wb25lbnQsIFRnckF1dG9jb21wbGV0ZUNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDbGllbnRNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogU3Rld2FyZENvbmZpZykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IFN0ZXdhcmRDbGllbnRNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogWyB7cHJvdmlkZTogU3Rld2FyZENvbmZpZywgdXNlVmFsdWU6IGNvbmZpZ30gXVxyXG4gICAgfVxyXG4gIH1cclxuIH1cclxuIl19