// Interface is a type of abstract data type that defines a set of methods and properties that an object must implement.
// It specifies the public Interface of an object, but does not provide any implementation details.
// An Interface is used to enforce a contract between different parts of a program, allowing them to communicate 
//    with each other in a well-defined manner.

// Note: abstract data types are used to describe data structures and their operations.
//       Some common examples of abstract data types in programming include arrays, stacks, queues, and trees.
//       They provide a way to encapsulate data and its associated operations, allowing them to be reused in different parts 
//          of a program without exposing their underlying implementation details.
//--------------------------------------------------------------------------------
import { Component } from '@angular/core';

interface Subject {
  name: string;
  marks: number;
}
// Types : 
//--------
// type Subject = {
//   name: string;
//   marks: number;
// }

interface Student {
  id: number;
  name: string;
  department: string;
  subjects: Subject[];
}
// interface Student {
//   id: number;
//   name: string;
//   department: string;
//   subjects: {
//     name: string;
//     marks: number;
//   }[];
// }
// Types : 
//--------
// type Student = {
//   id: number;
//   name: string;
//   department: string;
//   subjects: {
//     name: string;
//     marks: number;
//   }[];
// };

interface Classroom {
  id: number;
  name: string;
  students: Student[];
}
// Types : 
//--------
// type Classroom = {
//   id: number;
//   name: string;
//   students: Student[];
// }

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent {
  // students = [
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

  // classrooms = [
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

  // getTotalMarks(student: any): number {
  getTotalMarks(student: Student): number {
    let totalMarks = 0;
    for (let subject of student.subjects) {
      totalMarks += subject.marks;
    }
    return totalMarks;
  }

  // getRanking(student: any): number {
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

  // getRanking_2(student: any, classroom: any): number {
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

// When you assign an object literal with specific properties and values, TypeScript can infer the shape of the object and assign an appropriate type to it.
// That's why we can avoid the need to explicitly declare types or interfaces for variables, properties & functions.
// We have given example of each with every declarations above...
//------- *** ------ *** ------ *** ------ *** ------ *** ------- *** ------- *** ------- *** -------- *** --------- *** -------

// ******* However, declaring interface or types is always a good practice which provides additional clarity and ensure type safety in your code. *********

// Types :
//-----------------------
// TypeScript's type keyword allows you to define complex types such as union types, intersection types, tuple types, and mapped types, 
// which cannot be defined with Interfaces alone.
// Here's an example of defining a union type with type:
      // type MyUnionType = string | number;

// In addition, type can also be used to create aliases for function types, which is not possible with interfaces. 
// This allows you to create reusable aliases for function signatures.
      // type MyFunctionType = (arg1: string, arg2: number) => boolean;


// Interface :
//------------------------
// One example is the ability to extend Interfaces with additional properties or methods. This allows you to create new Interfaces 
// that inherit the properties and methods of existing Interfaces, while also adding new ones.
      
      // interface MyInterface {
      //   name: string;
      //   age: number;
      // }

      // interface MyExtendedInterface extends MyInterface {
      //   gender: string;
      // }

// In addition, Interfaces can also be used to define optional properties or readonly properties, which cannot be defined with type aliases.
      
      // interface MyInterface {
      //   readonly id: number;
      //   name?: string;
      // }
      
      // Note: **-> Readonly properties, on the other hand, are properties of an object that cannot be changed after they are set. 
      //            They are denoted with the readonly keyword before the property name. It provides immutability and prevent unintended 
      //            changes to objects.
      //       **-> Optional properties are properties of an object that may or may not exist. They are denoted with a question mark (?) 
      //            after the property name. 

// Another feature that Interfaces have is the ability to define index signatures. This allows you to specify the types of properties 
// that may be added dynamically to an object, based on their property names.
      
      // interface MyInterface {
      //   [key: string]: string;
            // name: "John",
      // }

      // the returned object should look like below from an api response --> 
      
      // const myObj: MyInterface = {
        // name: "John",
        // age: "30",
        // address: "123 Main St",
      // };

      // Note: **-> An index signature allows you to define the type of properties that may be added dynamically to an object, based 
      //            on their property names.
      //       **-> Index signatures can be useful for defining the shape of objects that may have dynamic properties, such as objects 
      //            returned from APIs or user input data.


// Developers generally use Interface instead of Types because :
//--------------------------------------------------------------
// Interfaces are more readable and familiar: Interfaces have been around since the early days of TypeScript and are more familiar 
// to developers coming from object-oriented programming backgrounds. As a result, Interfaces are more commonly used in TypeScript code 
// and are often easier to read and understand.
