import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Java', code: 'JAVA201', credits: 3, gradeStatus: 'failed' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get courses and filter by credits > 0', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should handle error when getting courses', () => {
    service.getCourses().subscribe({
      next: () => expect.fail('should have failed with the 500 error'),
      error: (error: Error) => {
        expect(error.message).toBe('Failed to load courses. Please try again.');
      }
    });

    // The retry(2) operator will cause the request to be made 3 times sequentially
    const req1 = httpMock.expectOne('http://localhost:3000/courses');
    req1.flush('Failed!', { status: 500, statusText: 'Internal Server Error' });

    const req2 = httpMock.expectOne('http://localhost:3000/courses');
    req2.flush('Failed!', { status: 500, statusText: 'Internal Server Error' });

    const req3 = httpMock.expectOne('http://localhost:3000/courses');
    req3.flush('Failed!', { status: 500, statusText: 'Internal Server Error' });
  });
});
