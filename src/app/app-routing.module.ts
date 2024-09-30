import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentTableComponent } from './student-table/student-table.component';
import { ApiProductCategoryComponent } from './api-product-category/api-product-category.component';
import { DirectiveHttpClientComponent } from './directive-http-client/directive-http-client.component';
import { ReactiveFormsHttpClientComponent } from './reactive-forms-http-client/reactive-forms-http-client.component';
import { BuiltinPipesComponent } from './builtin-pipes/builtin-pipes.component';
import { CustomPipeComponent } from './custom-pipe/custom-pipe.component';
import { ObservableUseCasesComponent } from './observable-use-cases/observable-use-cases.component';
import { ObservableWithOperatorsComponent } from './observable-with-operators/observable-with-operators.component';
import { BehaviorSubjectUseCasesComponent } from './behavior-subject-use-cases/behavior-subject-use-cases.component';
import { JsTsBuiltinFuncsComponent } from './js-ts-builtin-funcs/js-ts-builtin-funcs.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: '', component: HomePageComponent },
  { path: 'js_ts-builtin-funcs', component: JsTsBuiltinFuncsComponent },
  { path: 'student-table', component: StudentTableComponent },
  { path: 'apiProduct-category', component: ApiProductCategoryComponent },
  { path: 'observable-use-cases', component: ObservableUseCasesComponent },
  { path: 'observable-with-operators', component: ObservableWithOperatorsComponent },
  { path: 'behavior-subject-use-cases', component: BehaviorSubjectUseCasesComponent },
  { path: 'directive-http-client', component: DirectiveHttpClientComponent },
  { path: 'reactiveForms-http-client', component: ReactiveFormsHttpClientComponent },
  { path: 'builtin-pipes', component: BuiltinPipesComponent },
  { path: 'custom-pipe', component: CustomPipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
