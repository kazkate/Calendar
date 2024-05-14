import { Component, OnInit } from '@angular/core';
import { EventOrMeeting, Participant } from '../../event/event.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from '../../core/services/calendar.service';
export interface Calendar {
    date: Date;
    events: EventOrMeeting[];
}
export class Calendar implements Calendar {
    constructor(date: Date, events: EventOrMeeting[]) {
        this.date = date;
        this.events = events;
    }
}
@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
    constructor(
        private activateRouter: ActivatedRoute,
        private router: Router,
        private calendarService: CalendarService
    ) {}
    myCalendar: Calendar[] = [];
    dateE: Date = new Date('0000-00-00');
    upId: number = -1;
    idEvent: number = -1;
    participant_: Participant = new Participant(-1, '', '');
    eventsDate: Date = new Date('0000-00-00');
    eventDate: Date = new Date('0000-00-00');
    addId: number = -1;
    addEventDate: Date = new Date('0000-00-00');
    addIdEvent: number = -1;

    idUpEvent: number = -1;
    eventUpDate: Date = new Date('0000-00-00');
    eventUp_: EventOrMeeting = new EventOrMeeting(
        -1,
        '',
        this.eventUpDate,
        '',
        []
    );
    showEvents(eventsDate: Date): void {
        if (this.eventsDate == eventsDate) {
            this.eventsDate = new Date('0000-00-00');
        } else {
            this.eventsDate = eventsDate;
        }
    }
    deleteEvent(date: Date, id: number): void {
        let dayIdx = this.myCalendar.findIndex(item => item.date == date);
        console.log(dayIdx);
        let idx = this.myCalendar[dayIdx].events.findIndex(
            item => item.id == id
        );
        console.log(idx);
        this.calendarService.deleteEvent(dayIdx, idx);
        console.log(this.myCalendar);
    }
    updateEvent(date: Date, id: number): void {
        if (this.idUpEvent == id) {
            this.idUpEvent = -1;
            this.eventUpDate = new Date('0000-00-00');
        } else {
            console.log('Попали в обновление');
            let dayIdx = this.myCalendar.findIndex(item => item.date == date);
            console.log(dayIdx);
            let idxE = this.myCalendar[dayIdx].events.findIndex(
                item => item.id == id
            );
            console.log(idxE);
            this.eventUp_ = this.myCalendar[dayIdx].events[idxE];
            console.log(this.eventUp_);
            this.idUpEvent = id;
            this.eventUpDate = date;
        }
    }
    catchUpdateEvent(event: any): void {
        let dayIdx = this.myCalendar.findIndex(
            item => item.date == this.eventUpDate
        );

        let idxE = this.myCalendar[dayIdx].events.findIndex(
            item => item.id == this.idUpEvent
        );
        this.calendarService.updateEvent(dayIdx, idxE, event);
        this.idUpEvent = -1;
        this.eventUpDate = new Date('0000-00-00');
    }
    deleteParticipant(date: Date, id: number, idparticipant: number): void {
        let dayIdx = this.myCalendar.findIndex(item => item.date == date);
        console.log('Индекс дня');
        console.log(dayIdx);
        let idxE = this.myCalendar[dayIdx].events.findIndex(
            item => item.id == id
        );
        console.log('Индекс события');
        console.log(idxE);
        let idx = this.myCalendar[dayIdx].events[idxE].participants.findIndex(
            item => item.id == idparticipant
        );
        console.log('Индекс участника');
        console.log(idx);
        this.calendarService.deleteParticipant(dayIdx, idxE, idx);
    }
    updateParticipant(date: Date, id: number, idparticipant: number): void {
        if (this.upId == idparticipant) {
            this.upId = -1;
            this.idEvent = -1;
            this.eventDate = new Date('0000-00-00');
        } else {
            let dayIdx = this.myCalendar.findIndex(item => item.date == date);

            let idxE = this.myCalendar[dayIdx].events.findIndex(
                item => item.id == id
            );

            let idx = this.myCalendar[dayIdx].events[
                idxE
            ].participants.findIndex(item => item.id == idparticipant);

            this.participant_ =
                this.myCalendar[dayIdx].events[idxE].participants[idx];

            this.upId = idparticipant;
            this.idEvent = id;
            this.eventDate = date;
        }
    }
    catchUpdate(event: any): void {
        let dayIdx = this.myCalendar.findIndex(
            item => item.date == this.eventDate
        );

        let idxE = this.myCalendar[dayIdx].events.findIndex(
            item => item.id == this.idEvent
        );

        let idx = this.myCalendar[dayIdx].events[idxE].participants.findIndex(
            item => item.id == this.upId
        );

        this.calendarService.updateParticipant(dayIdx, idxE, idx, event);

        this.upId = -1;
    }
    addParticipant(eventsdate: Date, eventid: number): void {
        if (this.addIdEvent == eventid) {
            this.addId = -1;
            this.addIdEvent = -1;

            this.addEventDate = new Date('0000-00-00');
        } else {
            let dayIdx = this.myCalendar.findIndex(
                item => item.date == eventsdate
            );

            let idxE = this.myCalendar[dayIdx].events.findIndex(
                item => item.id == eventid
            );

            this.addId =
                this.myCalendar[dayIdx].events[idxE].participants.at(-1)!.id +
                1;

            this.addIdEvent = eventid;
            this.addEventDate = eventsdate;
            console.log(this.addId);
        }
    }
    catchAddParticipant(event: any): void {
        let dayIdx = this.myCalendar.findIndex(
            item => item.date == this.addEventDate
        );

        let idxE = this.myCalendar[dayIdx].events.findIndex(
            item => item.id == this.addIdEvent
        );

        this.calendarService.addParticipant(dayIdx, idxE, event);
        this.addId = -1;
        this.addIdEvent = -1;
        this.addEventDate = new Date('0000-00-00');
    }
    goAdd(): void {
        this.router.navigate(['/addEvent']);
    }
    eventsPast(): void {
        this.myCalendar = this.calendarService.past();
    }
    eventsFuture(): void {
        this.myCalendar = this.calendarService.future();
    }
    ngOnInit(): void {
        // this.calendarService
        //     .getCalendar()
        //     .pipe(filter(data => data != null))
        //     .subscribe(myCalendar => {
        //         this.myCalendar = myCalendar;
        //         console.log(this.myCalendar);
        //     });
        this.myCalendar = this.calendarService.getEvents();
        console.log(this.myCalendar);
    }
}
