import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements OnInit {

  id: string;
  message: string;
  constructor(private router: Router, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { id: string, message: string };
    this.id = state.id;
    this.message = state.message;
  }

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   this.id = this.route.snapshot.params.id;
    //   console.log('Lo Id : ' + this.id);
    // });

  }
  trackBooking() {
    this.router.navigate(['gha', this.id]);
  }

}
