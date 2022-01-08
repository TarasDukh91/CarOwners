import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOwnerFormComponent } from './edit-owner-form.component';

describe('EditOwnerFormComponent', () => {
  let component: EditOwnerFormComponent;
  let fixture: ComponentFixture<EditOwnerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOwnerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOwnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
