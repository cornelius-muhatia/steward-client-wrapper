import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TgrMaterialTableComponent } from './tgr-material-table.component';
import { DebugElement } from '@angular/core';

describe('TgrMaterialTableComponent', () => {
    let component: TgrMaterialTableComponent;
    let fixture: ComponentFixture<TgrMaterialTableComponent>;
    let htmlElement: DebugElement;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TgrMaterialTableComponent],
        // imports: [
        //   StewardClientModule.forRoot(
        //     {
        //       base_url: environment.apiUrl, access_token: localStorage.getItem('access_token')
        //     }),
        //   SharedModule,
        //   FormsModule,
        //   MatButtonModule,
        //   MatIconModule,
        //   MatCardModule,
        //   MatInputModule,
        //   MatCheckboxModule,
        //   MatSelectModule,
        //   MatTabsModule,
        //   MatAutocompleteModule,
        //   MatDialogModule,
        //   MatProgressSpinnerModule,
        //   BrowserAnimationsModule,
        // ],
        // providers: [
        //   { provide: StewardClientService, useValue: stewardClientService },
        //   { provide: MatDialogRef, useValue: matDialogRef }, { provide: MAT_DIALOG_DATA, useValue: {} },
        // ],
      })
        .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(TgrMaterialTableComponent);
      component = fixture.componentInstance;
      htmlElement = fixture.debugElement;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
});