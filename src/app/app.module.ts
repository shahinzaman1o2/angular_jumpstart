import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentTableComponent } from './student-table/student-table.component';
import { ApiProductCategoryComponent } from './api-product-category/api-product-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveHttpClientComponent } from './directive-http-client/directive-http-client.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsHttpClientComponent } from './reactive-forms-http-client/reactive-forms-http-client.component';
import { BuiltinPipesComponent } from './builtin-pipes/builtin-pipes.component';
import { CustomPipeComponent } from './custom-pipe/custom-pipe.component';
import { FetchJsonPipe } from './fetch-json.pipe';
import { ObservableUseCasesComponent } from './observable-use-cases/observable-use-cases.component';
import { ObservableWithOperatorsComponent } from './observable-with-operators/observable-with-operators.component';
import { BehaviorSubjectUseCasesComponent } from './behavior-subject-use-cases/behavior-subject-use-cases.component';
import { ChildBehaviorSubjectUseCaseOneComponent } from './child-behavior-subject-use-case-one/child-behavior-subject-use-case-one.component';
import { ChildBehaviorSubjectUseCaseTwoComponent } from './child-behavior-subject-use-case-two/child-behavior-subject-use-case-two.component';
import { ChildBehaviorSubjectUseCaseThreeComponent } from './child-behavior-subject-use-case-three/child-behavior-subject-use-case-three.component';
import { ChangestateService } from './changestate.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    StudentTableComponent,
    ApiProductCategoryComponent,
    DirectiveHttpClientComponent,
    ReactiveFormsHttpClientComponent,
    BuiltinPipesComponent,
    CustomPipeComponent,
    FetchJsonPipe,
    ObservableUseCasesComponent,
    ObservableWithOperatorsComponent,
    BehaviorSubjectUseCasesComponent,
    ChildBehaviorSubjectUseCaseOneComponent,
    ChildBehaviorSubjectUseCaseTwoComponent,
    ChildBehaviorSubjectUseCaseThreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ChangestateService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
