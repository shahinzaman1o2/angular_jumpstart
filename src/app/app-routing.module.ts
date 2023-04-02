import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentTableComponent } from './student-table/student-table.component';
import { ApiProductCategoryComponent } from './api-product-category/api-product-category.component';
import { RxjsClassesOperatorsComponent } from './rxjs-classes-operators/rxjs-classes-operators.component';
import { DirectiveHttpClientComponent } from './directive-http-client/directive-http-client.component';
import { ReactiveFormsHttpClientComponent } from './reactive-forms-http-client/reactive-forms-http-client.component';
import { BuiltinPipesComponent } from './builtin-pipes/builtin-pipes.component';
import { CustomPipeComponent } from './custom-pipe/custom-pipe.component';

const routes: Routes = [
  { path: '', redirectTo: 'student-table', pathMatch: 'full' },
  { path: 'student-table', component: StudentTableComponent },
  { path: 'apiProduct-category', component: ApiProductCategoryComponent },
  { path: 'rxjs-classes-operators', component: RxjsClassesOperatorsComponent },
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
