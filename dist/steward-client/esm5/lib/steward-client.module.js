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
var StewardClientModule = /** @class */ (function () {
    function StewardClientModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    StewardClientModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: StewardClientModule,
            providers: [{ provide: StewardConfig, useValue: config }]
        };
    };
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
    return StewardClientModule;
}());
export { StewardClientModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc3Rld2FyZC1jbGllbnQvIiwic291cmNlcyI6WyJsaWIvc3Rld2FyZC1jbGllbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUM5RixPQUFPLEVBQ0wsY0FBYyxFQUNkLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixtQkFBbUIsRUFDbkIsa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixlQUFlLEVBQ2YsYUFBYSxFQUNiLGFBQWEsRUFDYix3QkFBd0IsRUFDeEIscUJBQXFCLEVBQ3RCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0I7SUFBQTtJQWlDQSxDQUFDOzs7OztJQU5RLDJCQUFPOzs7O0lBQWQsVUFBZSxNQUFxQjtRQUNsQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixTQUFTLEVBQUUsQ0FBRSxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQyxDQUFFO1NBQzFELENBQUE7SUFDSCxDQUFDOztnQkFoQ0YsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLGFBQWE7d0JBQ2IsbUJBQW1CO3dCQUNuQixtQkFBbUI7d0JBQ25CLGtCQUFrQjt3QkFDbEIsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYix3QkFBd0I7d0JBQ3hCLHFCQUFxQjtxQkFDdEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHNCQUFzQjt3QkFDdEIseUJBQXlCO3FCQUMxQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSx5QkFBeUIsRUFBRTtpQkFDOUQ7O0lBUUQsMEJBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQVBZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdGV3YXJkQ2xpZW50Q29tcG9uZW50IH0gZnJvbSAnLi9zdGV3YXJkLWNsaWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUsIEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFN0ZXdhcmRDb25maWcgfSBmcm9tICcuL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgVGdyTWF0ZXJpYWxUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vdGdyLW1hdGVyaWFsLXRhYmxlL3Rnci1tYXRlcmlhbC10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgTWF0SW5wdXRNb2R1bGUsXG4gIE1hdFRhYmxlTW9kdWxlLFxuICBNYXRDaGVja2JveE1vZHVsZSxcbiAgTWF0SWNvbk1vZHVsZSxcbiAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICBNYXRTZWxlY3RNb2R1bGUsXG4gIE1hdEJ1dHRvbk1vZHVsZSxcbiAgTWF0U29ydE1vZHVsZSxcbiAgTWF0TWVudU1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICBNYXRBdXRvY29tcGxldGVNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBTdGV3YXJkQ2xpZW50Q29tcG9uZW50LFxuICAgIFRnck1hdGVyaWFsVGFibGVDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtTdGV3YXJkQ2xpZW50Q29tcG9uZW50LCBUZ3JNYXRlcmlhbFRhYmxlQ29tcG9uZW50LF1cbn0pXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogU3Rld2FyZENvbmZpZykge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU3Rld2FyZENsaWVudE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogWyB7cHJvdmlkZTogU3Rld2FyZENvbmZpZywgdXNlVmFsdWU6IGNvbmZpZ30gXVxuICAgIH1cbiAgfVxufVxuIl19