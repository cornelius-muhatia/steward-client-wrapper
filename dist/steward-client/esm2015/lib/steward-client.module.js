/**
 * @fileoverview added by tsickle
 * Generated from: lib/steward-client.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { StewardClientComponent } from './steward-client.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StewardConfig } from './steward-client.service';
import { TgrMaterialTableComponent } from './tgr-material-table/tgr-material-table.component';
import { MatInputModule, MatTableModule, MatCheckboxModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSelectModule, MatButtonModule, MatSortModule, MatMenuModule, MatProgressSpinnerModule, MatAutocompleteModule } from '@angular/material';
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
                ],
                exports: [StewardClientComponent, TgrMaterialTableComponent,]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc3Rld2FyZC1jbGllbnQvIiwic291cmNlcyI6WyJsaWIvc3Rld2FyZC1jbGllbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUM5RixPQUFPLEVBQ0wsY0FBYyxFQUNkLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixtQkFBbUIsRUFDbkIsa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixlQUFlLEVBQ2YsYUFBYSxFQUNiLGFBQWEsRUFDYix3QkFBd0IsRUFDeEIscUJBQXFCLEVBQ3RCLE1BQU0sbUJBQW1CLENBQUM7QUE0QjNCLE1BQU0sT0FBTyxtQkFBbUI7Ozs7O0lBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBcUI7UUFDbEMsT0FBTztZQUNMLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsU0FBUyxFQUFFLENBQUUsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsQ0FBRTtTQUMxRCxDQUFBO0lBQ0gsQ0FBQzs7O1lBaENGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsaUJBQWlCO29CQUNqQixhQUFhO29CQUNiLG1CQUFtQjtvQkFDbkIsbUJBQW1CO29CQUNuQixrQkFBa0I7b0JBQ2xCLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixhQUFhO29CQUNiLGFBQWE7b0JBQ2Isd0JBQXdCO29CQUN4QixxQkFBcUI7aUJBQ3RCO2dCQUNELFlBQVksRUFBRTtvQkFDWixzQkFBc0I7b0JBQ3RCLHlCQUF5QjtpQkFDMUI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLEVBQUUseUJBQXlCLEVBQUU7YUFDOUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Rld2FyZENsaWVudENvbXBvbmVudCB9IGZyb20gJy4vc3Rld2FyZC1jbGllbnQuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTdGV3YXJkQ29uZmlnIH0gZnJvbSAnLi9zdGV3YXJkLWNsaWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IFRnck1hdGVyaWFsVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3Rnci1tYXRlcmlhbC10YWJsZS90Z3ItbWF0ZXJpYWwtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIE1hdElucHV0TW9kdWxlLFxuICBNYXRUYWJsZU1vZHVsZSxcbiAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gIE1hdEljb25Nb2R1bGUsXG4gIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgTWF0U2VsZWN0TW9kdWxlLFxuICBNYXRCdXR0b25Nb2R1bGUsXG4gIE1hdFNvcnRNb2R1bGUsXG4gIE1hdE1lbnVNb2R1bGUsXG4gIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU3Rld2FyZENsaWVudENvbXBvbmVudCxcbiAgICBUZ3JNYXRlcmlhbFRhYmxlQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbU3Rld2FyZENsaWVudENvbXBvbmVudCwgVGdyTWF0ZXJpYWxUYWJsZUNvbXBvbmVudCxdXG59KVxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDbGllbnRNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFN0ZXdhcmRDb25maWcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0ZXdhcmRDbGllbnRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFsge3Byb3ZpZGU6IFN0ZXdhcmRDb25maWcsIHVzZVZhbHVlOiBjb25maWd9IF1cbiAgICB9XG4gIH1cbn1cbiJdfQ==