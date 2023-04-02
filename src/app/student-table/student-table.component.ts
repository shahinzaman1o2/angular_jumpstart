import { Component } from '@angular/core';

interface Subject {
  name: string;
  marks: number;
}

interface Student {
  id: number;
  name: string;
  department: string;
  subjects: Subject[];
}

interface Classroom {
  id: number;
  name: string;
  students: Student[];
}

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent {
  students: Student[] = [
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
      department: 'Electrical Engineering',
      subjects: [
        { name: 'Math', marks: 75 },
        { name: 'Science', marks: 85 },
        { name: 'English', marks: 90 }
      ]
    }
  ];

  classrooms: Classroom[] = [
    {
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
    },
    {
      id: 2,
      name: 'Electrical Engineering Class',
      students: [
        {
          id: 3,
          name: 'Tom Jackson',
          department: 'Electrical Engineering',
          subjects: [
            { name: 'Math', marks: 90 },
            { name: 'Science', marks: 80 },
            { name: 'English', marks: 70 }
          ]
        },
        {
          id: 4,
          name: 'Emma Green',
          department: 'Electrical Engineering',
          subjects: [
            { name: 'Math', marks: 85 },
            { name: 'Science', marks: 90 },
            { name: 'English', marks: 80 }
          ]
        }
      ]
    }
  ];

  getTotalMarks(student: Student): number {
    let totalMarks = 0;
    for (let subject of student.subjects) {
      totalMarks += subject.marks;
    }
    return totalMarks;
  }

  getRanking(student: Student): number {
    let totalMarks = this.getTotalMarks(student);
    let ranking = 1;
    for (let otherStudent of this.students) {
      if (otherStudent !== student && this.getTotalMarks(otherStudent) > totalMarks) {
        ranking++;
      }
    }
    return ranking;
  }

  getTotalMarks_2(student: Student): number {
    let totalMarks = 0;
    for (let subject of student.subjects) {
      totalMarks += subject.marks;
    }
    return totalMarks;
  }

  getRanking_2(student: Student, classroom: Classroom): number {
    let totalMarks = this.getTotalMarks(student);
    let ranking = 1;
    for (let otherStudent of classroom.students) {
      if (otherStudent !== student && this.getTotalMarks(otherStudent) > totalMarks) {
        ranking++;
      }
    }
    return ranking;
  }
}
