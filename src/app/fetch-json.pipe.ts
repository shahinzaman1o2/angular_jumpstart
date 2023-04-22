import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fetch',
    pure: false
    // Note: if a custom pipe is declared with pure: true, it will be a pure pipe. If pure is not set or is set to false, it will be an impure pipe.
})
export class FetchJsonPipe implements PipeTransform {
    private cachedData: any = null;
    private cachedUrl = '';

    constructor(private http: HttpClient) { }

    transform(url: string): any {
        if (url !== this.cachedUrl) {
            this.cachedData = null;
            // Setting this.cachedData to null inside the transform method is necessary because it ensures that the cachedData property 
            // is empty before making a new HTTP request. If we don't set this.cachedData to null, there's a possibility that 
            // the previous value will be used instead of fetching the new data when transform is called with a new URL. 
            // So, it's a good practice to reset this.cachedData to null before making a new request to avoid any unexpected behavior.
            this.cachedUrl = url;
            // Setting this.cachedUrl to the new URL ensures that the if statement inside the transform method will correctly identify 
            // when a new request needs to be made. If there's no need to make any new request that means the same url's data is requested by 
            // the Pipe which is custom. Then the transform method will return the same data without making extra http request.
            this.http.get(url).subscribe(result => this.cachedData = result);
        }

        return this.cachedData;
    }
}

// We create custom pipes in an Angular app for various reasons
//-------------------------------------------------------------
// Code reuse: Custom pipes allow you to encapsulate and reuse complex data transformations in multiple components throughout 
// your application. Rather than duplicating the transformation logic in each component, you can define the logic 
// once in a custom pipe and use it anywhere in your app.

// Maintainability: By separating the data transformation logic from the component code, custom pipes can make your 
// codebase more maintainable. If you need to update the logic for a particular transformation, you can simply update 
// the custom pipe and the changes will be reflected throughout your app.

// Readability: Custom pipes can make your template code more readable and expressive by reducing the amount of logic and complexity 
// that needs to be included in your component code. This can help make your templates more concise and easier to understand.

// Performance: Custom pipes can also help improve the performance of your application by reducing the amount of data that needs 
// to be processed and rendered in the template. By transforming data before it is rendered in the template, you can reduce 
// the workload on the browser and improve the perceived performance of your app.
