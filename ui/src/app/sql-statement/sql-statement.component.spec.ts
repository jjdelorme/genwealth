import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlStatementComponent } from './sql-statement.component';

describe('SqlStatementComponent', () => {
  let component: SqlStatementComponent;
  let fixture: ComponentFixture<SqlStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SqlStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SqlStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
