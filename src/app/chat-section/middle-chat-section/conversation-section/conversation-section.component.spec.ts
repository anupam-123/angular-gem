import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationSectionComponent } from './conversation-section.component';

describe('ConversationSectionComponent', () => {
  let component: ConversationSectionComponent;
  let fixture: ComponentFixture<ConversationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
