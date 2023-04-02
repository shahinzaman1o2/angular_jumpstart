import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentTableComponent } from './student-table/student-table.component';
import { ApiProductCategoryComponent } from './api-product-category/api-product-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxjsClassesOperatorsComponent } from './rxjs-classes-operators/rxjs-classes-operators.component';
import { DirectiveHttpClientComponent } from './directive-http-client/directive-http-client.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsHttpClientComponent } from './reactive-forms-http-client/reactive-forms-http-client.component';
import { BuiltinPipesComponent } from './builtin-pipes/builtin-pipes.component';
import { CustomPipeComponent } from './custom-pipe/custom-pipe.component';
import { FetchJsonPipe } from './fetch-json.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StudentTableComponent,
    ApiProductCategoryComponent,
    RxjsClassesOperatorsComponent,
    DirectiveHttpClientComponent,
    ReactiveFormsHttpClientComponent,
    BuiltinPipesComponent,
    CustomPipeComponent,
    FetchJsonPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
