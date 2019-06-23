import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhaUpdatePageComponent } from './gha-update-page.component';

describe('GhaUpdatePageComponent', () => {
  let component: GhaUpdatePageComponent;
  let fixture: ComponentFixture<GhaUpdatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhaUpdatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhaUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
