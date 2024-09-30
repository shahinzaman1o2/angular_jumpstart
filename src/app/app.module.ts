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
import { JsTsBuiltinFuncsComponent } from './js-ts-builtin-funcs/js-ts-builtin-funcs.component';
import { HomePageComponent } from './home-page/home-page.component';

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
    ChildBehaviorSubjectUseCaseThreeComponent,
    JsTsBuiltinFuncsComponent,
    HomePageComponent
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


// The BrowserModule is a built-in module in Angular that provides essential services and directives 
// needed for a browser-based application to run. Some of the things included in the BrowserModule are:
//-----------------------------------------------------------------------------------------------------
// Directives: The BrowserModule provides several built-in directives like ngIf, ngFor, and ngSwitch that help in manipulating the DOM.

// Pipes: Angular pipes are used for transforming data before displaying it in the template. The BrowserModule provides 
// several built-in pipes like DatePipe, DecimalPipe, and CurrencyPipe.

// Services: The BrowserModule provides essential services like Location, PlatformLocation, and Title that help in 
// manipulating the browser's URL, location, and title.

// CommonModule: The BrowserModule imports the CommonModule, which provides common directives like NgStyle, NgClass, and AsyncPipe, among others.

// BrowserModule: The BrowserModule itself is also included in the NgModule and provides services like DOCUMENT, 
// which represents the browser's DOM, and EVENT_MANAGER_PLUGINS, which allows you to register custom event manager plugins.

// BrowserModule also includes the base provider for Angular's dependency injection system, which allows you to create 
// and manage dependencies for your application.

// Overall, the BrowserModule provides many essential services, directives, and pipes that are required for 
// an Angular application to run in a browser environment.
