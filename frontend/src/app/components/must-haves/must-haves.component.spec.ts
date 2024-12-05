import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MustHavesComponent } from './must-haves.component';

describe('MustHavesComponent', () => {
  let component: MustHavesComponent;
  let fixture: ComponentFixture<MustHavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MustHavesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MustHavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
