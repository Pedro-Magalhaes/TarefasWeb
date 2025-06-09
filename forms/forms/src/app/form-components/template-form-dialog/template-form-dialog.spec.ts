import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFormDialog } from './template-form-dialog';

describe('TemplateFormDialog', () => {
  let component: TemplateFormDialog;
  let fixture: ComponentFixture<TemplateFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateFormDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
