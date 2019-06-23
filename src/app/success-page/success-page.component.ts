import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements OnInit {

  loId: string;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.loId = this.route.snapshot.params.id;
      console.log('Lo Id : ' + this.loId);
    });
  }
  trackBooking(loId: string) {
    this.router.navigate(['track', this.loId])
  }

}
