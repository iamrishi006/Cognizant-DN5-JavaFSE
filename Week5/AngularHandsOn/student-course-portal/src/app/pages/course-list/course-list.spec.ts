import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { CourseList } from './course-list';
import { Course } from '../../models/course.model';

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Java', code: 'JAVA201', credits: 3, gradeStatus: 'failed' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideRouter([]),
        provideMockStore({ 
          initialState: { 
            course: { courses: mockCourses, loading: false, error: null },
            enrollment: { enrolledCourseIds: [] }
          } 
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course cards matching initial state', () => {
    const courseCards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(courseCards.length).toBe(2);
  });

  it('should show loading indicator when loading is true', () => {
    store.setState({ 
      course: { courses: [], loading: true, error: null },
      enrollment: { enrolledCourseIds: [] }
    });
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(loadingElement.textContent).toContain('Loading courses...');
  });
});
