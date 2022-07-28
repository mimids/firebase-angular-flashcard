import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlachcardListComponent } from './flachcard-list.component';

describe('FlachcardListComponent', () => {
  let component: FlachcardListComponent;
  let fixture: ComponentFixture<FlachcardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlachcardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlachcardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
