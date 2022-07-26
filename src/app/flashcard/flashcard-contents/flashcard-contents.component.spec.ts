import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardContentsComponent } from './flashcard-contents.component';

describe('FlashcardContentsComponent', () => {
  let component: FlashcardContentsComponent;
  let fixture: ComponentFixture<FlashcardContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardContentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
