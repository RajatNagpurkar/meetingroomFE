import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})
export class UpdateRoomComponent implements OnInit {
  

  id: number;
  room: Room;
  submitted = false;
  startTime: string;
  employeeId: string;
  endTime: string;
  department: string;
  minDate: string;
  maxDate: string;
  minTime: string;
  maxTime: string;
  minDateTime: string;
  maxDateTime: string;
  maxStartDateTime: string;


  constructor(private route: ActivatedRoute,private router: Router,
    private roomService: RoomService) {
      const currentDateTime = new Date();
      currentDateTime.setSeconds(0); // Round seconds to 0
      currentDateTime.setMilliseconds(0); // Round milliseconds to 0
      this.minDateTime = currentDateTime.toISOString().slice(0, 16);
      console.log("min time",this.minDateTime)
      this.maxStartDateTime = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
      this.maxDateTime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 16);
     }

  ngOnInit() {
    this.room = new Room();

    this.id = this.route.snapshot.params['id'];
    
    this.roomService.getRoom(this.id)
      .subscribe(data => {
        console.log(data)
        this.room = data;
      }, error => console.log(error));
  }

  updateRoom() {
    console.log("----",this.room);
    
    const indexOfSeconds = this.room.startTime.lastIndexOf(":00");
    if (indexOfSeconds !== -1) {
        // Remove seconds part
        this.room.startTime = this.room.startTime.substring(0, indexOfSeconds);
    }

    const indexOfEndTimeSeconds = this.room.endTime.lastIndexOf(":00");
    if (indexOfEndTimeSeconds !== -1) {
        // Remove seconds part
        this.room.endTime = this.room.endTime.substring(0, indexOfEndTimeSeconds);
    }

    this.roomService.updateRoom(this.id, this.room)
      .subscribe(data => {
        console.log(data);
        alert(data);
      }, 
      error => {
        console.log(error);
        alert(error.error);
      });
    this.room = new Room();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    let room = new Room()
    room.startTime = this.startTime;
    room.employeeId = this.employeeId;
    room.startTime = this.startTime;
    room.endTime = this.endTime;
    room.department = this.department;
    console.log("room",this.room);
    this.updateRoom();    
  }

  updateMinEndTime(): void {
    if (this.room.startTime) {
      // Calculate the maximum date and time (8 hours from the start time)
      const startDateTime = new Date(this.room.startTime);
      this.maxDateTime = new Date(startDateTime.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 16);
    }
  }
  

  gotoList() {
    this.router.navigate(['/rooms']);
  }
}
