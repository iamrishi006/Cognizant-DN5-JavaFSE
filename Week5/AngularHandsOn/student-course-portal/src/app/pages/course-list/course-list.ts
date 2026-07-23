import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})

export class CourseList implements OnInit {
  errorMessage$: Observable<string | null>;
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  enrolledIds$: Observable<number[]>;

  private store = inject(Store);

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.errorMessage$ = this.store.select(selectCoursesError);
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  searchTerm = '';

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') ?? '';
    this.store.dispatch(loadCourses());
  }

  trackByCourseId(index: number, course: any): number {
    return course.id;
  }

  selectedCourseId?: number;

  onEnroll(courseId: number) {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }

  goToCourse(courseId: number) {
    this.router.navigate(['courses', courseId]);
  }

  searchCourses() {
    this.router.navigate(['courses'], { queryParams: { search: this.searchTerm } });
  }
}
