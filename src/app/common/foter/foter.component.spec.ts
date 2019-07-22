import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoterComponent } from './foter.component';

describe('FoterComponent', () => {
  let component: FoterComponent;
  let fixture: ComponentFixture<FoterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
