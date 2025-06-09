import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateNumberInput } from './number-input';

describe('TemplateNumberInput', () => {
  let component: TemplateNumberInput;
  let fixture: ComponentFixture<TemplateNumberInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateNumberInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateNumberInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
