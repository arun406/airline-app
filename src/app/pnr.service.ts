import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PnrService {

  duffel_endpoint: string = "https://api.duffel.com/air/orders/";
  local: string = 'assets/orders.json';
  constructor(private httpClient: HttpClient) { }

  getPNRDetails(pnr: string) {
    let headers = new HttpHeaders().set("Duffel-Version", "beta");
    headers.append("Accept-Encoding", "gzip");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Bearer test_yVr_mSpn9S1-xOlvvtrq4mK0n0059Gn05ULzGNNnwew")
    headers.append("Access-Control-Request-Headers", "*");
    headers.append("Access-Control-Request-Method", "*");
    return this.httpClient.get(this.local);
  }
}
