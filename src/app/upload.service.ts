import { AppSettings } from './AppSettings';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }
  public uploadImage(data) {

    return this.httpClient.post<any>(AppSettings.UPLOAD_MULTIPLE_FILE_UPLOAD_URL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }
}
