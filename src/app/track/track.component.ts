import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttachmentDialogComponent } from '../attachment-dialog/attachment-dialog.component';
import { Step } from '../booking-request';

import * as _ from 'lodash';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  extensions: string[] = ['.jpg', '.JPG', '.png', '.PNG', '.jpeg', '.JPEG'];

  @Input()
  status: Step[] = [];

  steps: Step[] = [
    {
      code: "BKGCFM",
      description: "Booking confirmation",
      remarks: '',
      stepIcon: 'calendar-check',
      noOfAttachements: 0,
      timestamp: new Date(),
      status: 'P',
      documents: [],
      media: []
    },
    {
      code: "DOCACC",
      description: "Document verified successfully by airline",
      stepIcon: 'copy',
      noOfAttachements: 0,
      timestamp: new Date(),
      status: 'P',
      documents: [],
      media: [],
      remarks: '',
    },
    {
      code: "ANCCFM",
      description: "Confirmation on ancillary services",
      stepIcon: 'check-circle',
      noOfAttachements: 0,
      timestamp: new Date(),
      status: 'P', documents: [],
      media: [], remarks: '',
    },
    {
      code: "DRPREM",
      description: "Reminder to drop off the PET and drop-off location",
      stepIcon: 'clock',
      noOfAttachements: 0,
      timestamp: new Date(),
      status: 'P', documents: [],
      media: [], remarks: '',
    }, {
      code: "ANCTMP",
      description: "Temperature notification with pet is doing good",
      stepIcon: 'temperature-high',
      noOfAttachements: 0,
      timestamp: new Date(),
      status: 'P', documents: [],
      media: [], remarks: '',
    }, {
      code: "ANCFEED",
      description: "Feeding completed",
      stepIcon: 'concierge-bell',
      noOfAttachements: 0,
      timestamp: new Date(),
      status: 'P', documents: [],
      media: [], remarks: '',
    }, {
      code: "MFST",
      description: "Ramp Operations & Handling",
      stepIcon: 'shuttle-van',
      noOfAttachements: 0,
      timestamp: new Date(),
      status: 'P', documents: [],
      media: [], remarks: '',
    }, {
      code: "FLTDEP",
      description: "Departure",
      stepIcon: 'plane-departure',
      noOfAttachements: 0,
      timestamp: new Date(),
      status: 'P', documents: [],
      media: [], remarks: '',
    }

  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.status.length);
    console.log(this.steps.length);


    _.forEach(this.status, (status) => {
      console.log('Filter:; ');
      let step = _.find(this.steps, { 'code': status.code });
      step.status = status.status;
      step.timestamp = status.timestamp;

      const temp = _.partition(status.documents, (document) => {
        console.log('Document Name:' + document.name);
        const extn = document.name.split('.').pop();
        console.log('Document extn:' + extn);
        if (_.findIndex(this.extensions, (e) => e === "." + extn) != -1) {
          return true;
        }
        return false;
      });
      console.log(" Temp " + JSON.stringify(temp));
      if (temp) {
        step.documents = temp[1];
        step.media = temp[0];
      }


      // if (status.documents) {
      //   step.media = _.filter(status.documents,(document)=> {
      //
      //       console.log('Document Name:' + document.name);
      //       const extn = document.name.split('.').pop();
      //       if(_.findIndex(this.extensions, (e)=> e === extn) != -1){
      //         return true;
      //       }
      //       return false;
      //    });
      // }


      step.remarks = status.remarks;
      console.log(step);
    });

    console.log(this.steps);
  }

  getColor(step: Step): string {
    if (step.status == 'C') {
      return 'green'
    }
    if (step.status == 'D') {
      return '#ffbf00';
    }
    if (step.status == 'P') {
      return 'grey';
    }
  }

  /**
   *
   * @param step
   */
  public isVisible(step: Step): boolean {
    return true;
  }

  public openDialog(param: Step, type: string): void {
    let data;
    if (type === 'i') {
       data = param.media;
    } else {
       data = param.documents;
    }
    const dialogRef = this.dialog.open(AttachmentDialogComponent, {
      disableClose: true,
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
