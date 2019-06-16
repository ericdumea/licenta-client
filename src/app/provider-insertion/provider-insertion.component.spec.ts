import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderInsertionComponent } from './provider-insertion.component';

describe('ProviderInsertionComponent', () => {
  let component: ProviderInsertionComponent;
  let fixture: ComponentFixture<ProviderInsertionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderInsertionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
