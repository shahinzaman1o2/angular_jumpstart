import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTableComponent } from './student-table.component';

describe('StudentTableComponent', () => {
  let component: StudentTableComponent;
  let fixture: ComponentFixture<StudentTableComponent>;
  // declaration of fixture

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StudentTableComponent);
    // definition of fixture
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // }); --------- the above portion is created by angular cli ----------

  it('should calculate total marks correctly', () => {
    const student = {
      id: 1,
      name: 'John Doe',
      department: 'Computer Science',
      subjects: [
        { name: 'Math', marks: 80 },
        { name: 'Science', marks: 90 },
        { name: 'English', marks: 85 }
      ]
    };

    const totalMarks = component.getTotalMarks(student);

    expect(totalMarks).toBe(255);
  });

  it('should calculate ranking correctly', () => {
    const student1 = {
      id: 1,
      name: 'John Doe',
      department: 'Computer Science',
      subjects: [
        { name: 'Math', marks: 80 },
        { name: 'Science', marks: 90 },
        { name: 'English', marks: 85 }
      ]
    };

    const student2 = {
      id: 2,
      name: 'Jane Smith',
      department: 'Electrical Engineering',
      subjects: [
        { name: 'Math', marks: 75 },
        { name: 'Science', marks: 85 },
        { name: 'English', marks: 90 }
      ]
    };

    const ranking1 = component.getRanking(student1);
    const ranking2 = component.getRanking(student2);

    expect(ranking1).toBe(1);
    expect(ranking2).toBe(2);
  });

  it('should calculate classroom ranking correctly', () => {
    const classroom = {
      id: 1,
      name: 'Computer Science Class',
      students: [
        {
          id: 1,
          name: 'John Doe',
          department: 'Computer Science',
          subjects: [
            { name: 'Math', marks: 80 },
            { name: 'Science', marks: 90 },
            { name: 'English', marks: 85 }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          department: 'Computer Science',
          subjects: [
            { name: 'Math', marks: 75 },
            { name: 'Science', marks: 85 },
            { name: 'English', marks: 90 }
          ]
        }
      ]
    };

    const student = {
      id: 1,
      name: 'John Doe',
      department: 'Computer Science',
      subjects: [
        { name: 'Math', marks: 80 },
        { name: 'Science', marks: 90 },
        { name: 'English', marks: 85 }
      ]
    };

    const ranking = component.getRanking_2(student, classroom);

    expect(ranking).toBe(1);

    const student_2 = {
      id: 2,
      name: 'Jane Smith',
      department: 'Computer Science',
      subjects: [
        { name: 'Math', marks: 75 },
        { name: 'Science', marks: 85 },
        { name: 'English', marks: 90 }
      ]
    };

    const ranking_2 = component.getRanking_2(student_2, classroom);
    expect(ranking_2).toBe(2);
  });

  // we can add more

});

