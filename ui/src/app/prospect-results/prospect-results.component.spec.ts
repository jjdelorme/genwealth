import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectResultsComponent } from './prospect-results.component';

describe('ProspectResultsComponent', () => {
  let component: ProspectResultsComponent;
  let fixture: ComponentFixture<ProspectResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProspectResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProspectResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
