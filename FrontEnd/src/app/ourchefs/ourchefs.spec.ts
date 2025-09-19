import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurChefsComponent } from './ourchefs'

describe('OurChefsComponent', () => {
  let component: OurChefsComponent;
  let fixture: ComponentFixture<OurChefsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurChefsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurChefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
