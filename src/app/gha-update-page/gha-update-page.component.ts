import { Flight, Pet, Airport, Unit, Age } from './../booking-request';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Booking } from '../booking-request';
import { AppSettings } from '../AppSettings';


export interface Status {
  code: string;
  description: string;
  stepIcon: string;
}

@Component({
  selector: 'app-gha-update-page',
  templateUrl: './gha-update-page.component.html',
  styleUrls: ['./gha-update-page.component.css']
})
export class GhaUpdatePageComponent implements OnInit {
  statusList: Status[] = [{
    code: 'BKGCFM',
    description: 'Confirmation',
    stepIcon: 'calendar-check'
  },
  {
    code: 'DOCACC',
    description: 'Document Verification',
    stepIcon: 'copy'
  },
  {
    code: 'ANCCFM',
    description: 'Ancillary Confirmation',
    stepIcon: 'check-circle'
  },
  {
    code: 'DRPREM',
    description: 'Drop Reminder',
    stepIcon: 'clock'
  },
  {
    code: 'ANCTMP',
    description: 'Temperature notification',
    stepIcon: 'temperature-high'
  },
  {
    code: 'ANCFEED',
    description: 'Feeding',
    stepIcon: 'concierge-bell'
  },
  {
    code: 'MFST',
    description: 'Manifest',
    stepIcon: 'shuttle-van'
  },
  {
    code: 'FLTDEP',
    description: 'Departure',
    stepIcon: 'plane-departure'
  }
  ];
  orderId: string = '';
  booking: Booking;

  completed: boolean = false;
  status: string;
  timestamp: Date = new Date();
  remarks: string;

  // fileToUpload: File = null;

  filesToUpload: Array<File> = [];

  form = {
    statusCode: {
      code: '',
      description: '',
      stepIcon: ''
    },
    code: '',
    description: '',
    stepIcon: '',
    orderId: this.orderId,
    completed: true,
    status: '',
    timestamp: new Date(),
    remarks: ''
  };

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.orderId = this.route.snapshot.params.id;
      console.log('Order Id : ' + this.orderId);
      if (this.orderId) {
        this.getBooking();
      }
    });
  }
  handleFileInput(fileInput: any) {
    // this.fileToUpload = files.item(0);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  public getBooking() {
    console.log('Order Id : ' + this.orderId);
    this.httpClient.get(AppSettings.BOOKING_ENDPOINT + this.orderId).subscribe(
      (res: Booking) => {
        const result = res;
        this.booking = result;
        console.log(' Booking Fetched : ' + JSON.stringify(this.booking));
      },
      (error) => { console.log(error); }
    );
  }

  updateStatus(): void {

    this.form.orderId = this.orderId;
    // this.router.navigate(['success', this.orderId]);
    // console.log(" Form : " + JSON.stringify(this.form));

    const formData = new FormData();
    this.form.description = this.form.statusCode.description;
    this.form.stepIcon = this.form.statusCode.stepIcon;
    this.form.code = this.form.statusCode.code;
    if (this.form.completed) {
      this.form.status = "C"
    } else {
      this.form.status = "P";
    }

    console.log(" Form : " + JSON.stringify(this.form));

    const status = this.form;

    // if (this.fileToUpload != null) {
    //   formData.append('files', this.fileToUpload, this.fileToUpload.name);
    // }
    const files: Array<File> = this.filesToUpload;
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i], files[i]['name']);
    }

    formData.append('status', new Blob([JSON.stringify(status)], {
      type: "application/json"
    }));
    this.httpClient.post<any>(AppSettings.BOOKING_ENDPOINT + this.orderId + "/status", formData).subscribe(
      (res) => {
        console.log(res);
        const navigationExtras: NavigationExtras = { state: { id: res.id, message: 'Booking status updated successfully' } };
        this.router.navigate(['success'], navigationExtras);
      },
      (err) => console.log(err)
    );
  }
}
