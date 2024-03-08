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
    private router: Router) { }

  ngOnInit() {
    
  }

  newRoom(): void {
    this.submitted = false;
    this.room = new Room();
  }

  save(room: Room) {
    this.roomService.createRoom(room)
      .subscribe(data => console.log(data), error => console.log(error));
    this.room = new Room();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    console.log("values",this.selectedOption)
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
