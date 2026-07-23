import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidget implements OnInit {

  courseCount = 0;
  availableCourses = 0;

  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

   this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.availableCourses = courses.length;
        console.log(`Home component initialised: Total courses loaded ` + this.availableCourses);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.cdr.detectChanges();
      }
    });

  }

}