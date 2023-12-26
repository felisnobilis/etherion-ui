import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmFindComponent } from './realm-find.component';

describe('RealmFindComponent', () => {
  let component: RealmFindComponent;
  let fixture: ComponentFixture<RealmFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealmFindComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealmFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
