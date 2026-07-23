import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CourseService {
    private courses: Course[] = [
        {
            id: 1,
            name: 'Angular',
            code: 'ANG101',
            credits: 4,
            gradeStatus: 'passed'
        },
        {
            id: 2,
            name: 'Java',
            code: 'JAVA201',
            credits: 3,
            gradeStatus: 'failed'
        },
        {
            id: 3,
            name: 'Spring Boot',
            code: 'SPR301',
            credits: 4,
            gradeStatus: 'pending'
        },
        {
            id: 4,
            name: 'Database Systems',
            code: 'DB401',
            credits: 3,
            gradeStatus: 'passed'
        },
        {
            id: 5,
            name: 'Cloud Computing',
            code: 'CC501',
            credits: 4,
            gradeStatus: 'pending'
        }
    ];

    constructor(private http: HttpClient) { }

    getCourses(): Observable<Course[]> {

        return this.http.get<Course[]>(
            'http://localhost:3000/courses'
        ).pipe(
            retry(2),
            
            map(courses =>
                courses.filter(course => course.credits > 0)
            ),

            // tap() is used for side effects such as logging.
            // It should not modify the data stream.
            // Data transformation should always be done using map().
            tap(courses => {

                console.log(
                    'Courses loaded:',
                    courses.length
                );

            }),

            catchError(err => {

                console.error(err);

                return throwError(() =>
                    new Error('Failed to load courses. Please try again.')
                );

            })

        );

    }

    getCourseById(id: number): Observable<Course> {
        return this.http.get<Course>(
            `http://localhost:3000/courses/${id}`
        );
    }

    createCourse(course: Omit<Course, 'id'>): Observable<Course> {
        return this.http.post<Course>(
            'http://localhost:3000/courses',
            course
        );
    }

    updateCourse(course: Course): Observable<Course> {

        return this.http.put<Course>(
            `http://localhost:3000/courses/${course.id}`,
            course
        );

    }

    deleteCourse(id: number): Observable<void> {

        return this.http.delete<void>(
            `http://localhost:3000/courses/${id}`
        );

    }

    addCourse(course: Course): void {
        this.courses.push(course);
    }
}
