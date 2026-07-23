import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { noCourseCode } from '../../validators/no-course-code.validator';
import { simulateEmailCheck } from '../../validators/email.validator';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})

export class ReactiveEnrollmentForm {
  enrollForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
     private courseService: CourseService
  ) { }

  ngOnInit(): void {

    this.enrollForm = this.fb.group({

      studentName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      studentEmail: this.fb.control(
        '',
        [
          Validators.required,
          Validators.email
        ],
        [
          simulateEmailCheck
        ]
      ),

      courseId: [
        '',
        [
          Validators.required,
          noCourseCode
        ]
      ],

      preferredSemester: [
        'Odd',
        Validators.required
      ],

      agreeToTerms: [
        false,
        Validators.requiredTrue
      ],

      additionalCourses: this.fb.array([]),

    });

  }

  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse() {

    this.additionalCourses.push(

      new FormControl(
        '',
        Validators.required
      )

    );

  }

  removeCourse(index: number) {

    this.additionalCourses.removeAt(index);

  }

  /*
    enrollForm.value

    Returns only enabled form controls.

    If any control is disabled,
    it will NOT appear in the object.


    enrollForm.getRawValue()

    Returns all form controls,
    including disabled controls.
*/
  onSubmit() {

    console.log("Form Value");
    console.log(this.enrollForm.value);

    console.log("Raw Form Value");
    console.log(this.enrollForm.getRawValue());

    const newCourse = {

      name: this.enrollForm.value.studentName,

      code: this.enrollForm.value.courseId,

      credits: 4,

      gradeStatus: 'pending' as const

    };

    this.courseService.createCourse(newCourse).subscribe({

      next: (course) => {

        console.log('Course Created');

        console.log(course);

      }

    });
  }
}
