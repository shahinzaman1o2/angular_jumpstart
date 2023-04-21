import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-behavior-subject-use-case-two',
  template: `
  <h3 style="color: gray; margin-top: 0%;">Child Component to Demonstrate the Use Case-2: Caching</h3>
  <h3>Product List: [Used & Displayed from the Cached data which is resides inside of the instance of the ParentComponent stored in the browser cache (BehaviorSubjectUseCasesComponent)]</h3>
  <ul>
    <li *ngFor="let product of products">
      {{ product.title }}
    </li>
  </ul>
`,
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
