import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnInit,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges, OnInit {
  @Input()
  course!: Course;

  @Input()
  isEnrolled_: boolean = false;

  @Output()
  enrollRequested = new EventEmitter<number>();

  isExpanded: boolean = false;

  enrolledIds$: Observable<number[]>;
  isEnrolled$: Observable<boolean>;

  private store = inject(Store);

  constructor() {
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
    this.isEnrolled$ = this.enrolledIds$.pipe(
      map(ids => ids.includes(this.course?.id))
    );
  }

  ngOnInit() {
    this.isEnrolled$ = this.enrolledIds$.pipe(
      map(ids => ids.includes(this.course?.id))
    );
  }

  // Getters keep templates clean by keeping complex logic in the component class instead of the template
  get cardClasses() {
    return {
      'card--enrolled': false, // Will handle via async pipe in template if needed
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Previous Value: " + changes['course']?.previousValue?.name);
    console.log("Current Value: " + changes['course']?.currentValue?.name);
  }

  toggleEnrollment() {
    this.enrolledIds$.pipe(take(1)).subscribe(ids => {
      const isEnrolled = ids.includes(this.course.id);
      if (isEnrolled) {
        this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
      } else {
        this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
      }
      this.enrollRequested.emit(this.course.id);
    });
  }
}
