import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  let store: MockStore;

  const mockCourse: Course = { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideMockStore({ initialState: { enrollment: { enrolledCourseIds: [] } } })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course name', () => {
    const titleElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(titleElement.textContent.toLowerCase()).toContain('data structures');
  });

  it('should emit enrollRequested event on button click', () => {
    const spy = vi.spyOn(component.enrollRequested, 'emit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should log previous and current values on ngOnChanges', () => {
    const spy = vi.spyOn(console, 'log');
    component.ngOnChanges({
      course: new SimpleChange(null, mockCourse, true)
    });
    expect(spy).toHaveBeenCalledWith('Previous Value: undefined');
    expect(spy).toHaveBeenCalledWith('Current Value: Data Structures');
  });
});
