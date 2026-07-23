import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfile implements OnInit {
  enrolledCourses: Course[] = [];

  constructor(private enrollmentService: EnrollmentService) { }

  ngOnInit(): void {

    this.enrollmentService.getEnrolledCourses().subscribe(
      courses => this.enrolledCourses = courses
    );

  }

  studentName = '';
  email = '';
  selectedCourse = '';
  successMessage = "";
  courses = [
    'Angular',
    'Java',
    'Spring Boot',
    'Cloud Computing'
  ];

  onSubmit(form: NgForm) {

    this.successMessage = "Student enrolled successfully!";

    console.log({
      name: this.studentName,
      email: this.email,
      course: this.selectedCourse
    });

    form.reset();

  }
}
