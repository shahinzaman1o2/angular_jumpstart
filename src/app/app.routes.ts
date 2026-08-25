import { Routes } from '@angular/router';
import { StudentTable } from './student-table/student-table';
import { ApiProductCategory } from './api-product-category/api-product-category';
import { ObservableUseCases } from './observable-use-cases/observable-use-cases';
import { ObservableWithOperators } from './observable-with-operators/observable-with-operators';
import { BehaviorSubjectUseCases } from './behavior-subject-use-cases/behavior-subject-use-cases';
import { JsTsBuiltinFuncs } from './js-ts-builtin-funcs/js-ts-builtin-funcs';
import { HomePage } from './home-page/home-page';
import { PipesUseCases } from './pipes-use-cases/pipes-use-cases';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'js_ts-builtin-funcs', component: JsTsBuiltinFuncs },
  { path: 'student-table', component: StudentTable },
  { path: 'apiProduct-category', component: ApiProductCategory },
  { path: 'observable-use-cases', component: ObservableUseCases },
  { path: 'observable-with-operators', component: ObservableWithOperators },
  { path: 'behavior-subject-use-cases', component: BehaviorSubjectUseCases },
  { path: 'pipes-use-cases', component: PipesUseCases },
  // ** (Catch-all): Redirects any invalid or unknown URL back to the home page (/).
  { path: '**', redirectTo: '' }
];
