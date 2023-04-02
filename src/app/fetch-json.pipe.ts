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
            this.cachedUrl = url;
            this.http.get(url).subscribe(result => this.cachedData = result);
        }

        return this.cachedData;
    }
}