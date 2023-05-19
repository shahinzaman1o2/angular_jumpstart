import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-behavior-subject-use-case-two',
  templateUrl: './child-behavior-subject-use-case-two.component.html',
  styleUrls: ['./child-behavior-subject-use-case-two.component.css']
})
export class ChildBehaviorSubjectUseCaseTwoComponent {
  @Input() products: any[] = [];
  // instead of any we can --> 
  // @Input() products: Product[] = [];
  // where,
  //        interface Product {
  //          id: number;
  //          name: string;
  //          description: string;
  //          price: number;
  //        }

  // Parent to child component communication by @Input() & @Output()
  //-----------------------------------------------------------------
  // @Input()→  by this we transfer data from parent to child component
  // it’ll accept input form parent component (input : parent --> child)

  // @Output()→ by this we transfer data from child to parent component
  // it’ll send output from the child component (output : child --> parent)


  // Note: we use these two property in the child component

}
