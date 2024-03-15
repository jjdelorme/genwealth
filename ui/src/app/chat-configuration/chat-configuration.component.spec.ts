import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatConfigurationComponent } from './chat-configuration.component';

describe('ChatConfigurationComponent', () => {
  let component: ChatConfigurationComponent;
  let fixture: ComponentFixture<ChatConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
