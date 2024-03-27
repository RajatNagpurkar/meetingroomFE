import { RoomService } from '../room.service';
import { Room } from '../room';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomType } from 'src/roomtype';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  minDate: string;
  maxDate: string;
  minTime: string;
  maxTime: string;
  minDateTime: string;
  maxDateTime: string;
  maxStartDateTime: string;
  room: Room = new Room();
  submitted = false;
  employeeId: string;
  startTime:string;
  endTime:string;
  department:string;
  purposeOfBooking:string;
  selectedOption: RoomType;
  options: RoomType[] = [{
    id: 1,
    roomType: 'BOARD_ROOM'
  },
  {
    id: 2,
    roomType: 'MEETING_ROOM'
  },
  {
    id: 3,
    roomType: 'CALL_BOOTH_1'
  },
  {
    id: 4,
    roomType: 'CALL_BOOTH_2'
  }]
  

  constructor(private roomService: RoomService,
    private router: Router) { 
      const currentDateTime = new Date();
      currentDateTime.setSeconds(0); // Round seconds to 0
      currentDateTime.setMilliseconds(0); // Round milliseconds to 0
      this.minDateTime = currentDateTime.toISOString().slice(0, 16);
      console.log("min time",this.minDateTime)
      this.maxStartDateTime = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
      this.maxDateTime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 16);
    }

  ngOnInit() {
  }

  newRoom(): void {
    this.submitted = false;
    this.room = new Room();
  }

  updateMinEndTime(): void {
    if (this.startTime) {
      // Calculate the maximum date and time (8 hours from the start time)
      const startDateTime = new Date(this.startTime);
      this.maxDateTime = new Date(startDateTime.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 16);
    }
  }

  save(room: Room) {
    this.roomService.createRoom(room)
      .subscribe(data => console.log(data), error => console.log(error));
    this.room = new Room();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    console.log("values",this.startTime)
    let room = new Room()
    room.startTime = this.startTime;
    room.employeeId = this.employeeId;
    room.startTime = this.startTime;
    room.endTime = this.endTime;
    room.department = this.department;
    room.purposeOfBooking = this.purposeOfBooking;
    room.meetingRoom = this.selectedOption;
    this.save(room);    
  }
  

  gotoList() {
    this.router.navigate(['/rooms']);
  }
}
