import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerInsertionComponent } from './consumer-insertion.component';

describe('ConsumerInsertionComponent', () => {
  let component: ConsumerInsertionComponent;
  let fixture: ComponentFixture<ConsumerInsertionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerInsertionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
