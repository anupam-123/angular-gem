import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleChatSectionComponent } from './middle-chat-section.component';

describe('MiddleChatSectionComponent', () => {
  let component: MiddleChatSectionComponent;
  let fixture: ComponentFixture<MiddleChatSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiddleChatSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiddleChatSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
