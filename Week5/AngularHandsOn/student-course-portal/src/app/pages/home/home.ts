import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';
@Component({
  selector: 'app-home',
  imports: [FormsModule, CourseSummaryWidget],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';

  // [property] performs one-way binding from the component to the view,
  isPortalActive = true;

  availableCourses = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.availableCourses = courses.length;
        console.log(`Home component initialised: Total courses loaded ` + this.availableCourses);
      },
      error: (err) => console.error(err)
    });
  }

  message = '';

  onEnrollClick() {
    this.message = "Enrollment opened";
  }

  // while [(ngModel)] provides two-way binding between the component and the view.
  searchTerm = "";

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }
}



