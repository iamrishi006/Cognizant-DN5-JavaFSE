import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';

@Component({

  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})


export class CourseDetail implements OnInit {

  course?: Course;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      // switchMap() cancels the previous HTTP request
      // whenever a new course ID is received.
      // This prevents outdated responses from being displayed.
      switchMap(params => {

        const id = Number(params.get('id'));

        return this.enrollmentService.getStudentsByCourse(id);

      })

    ).subscribe({

      next: students => {

        console.log('Enrolled Students:', students);

      }

    });

  }

}