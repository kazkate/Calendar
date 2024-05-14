import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Calendar } from '../../pages/calendar/calendar.component';
import { Injectable } from '@angular/core';
import { EventOrMeeting, Participant } from '../../event/event.component';

@Injectable({ providedIn: 'root' })
export class CalendarService {
    constructor(private http: HttpClient) {}
    getCalendar(): Observable<Array<Calendar>> {
        return this.http.get<Array<Calendar>>('assets/calendar.json').pipe(
            catchError(err => {
                console.log(err);
                return of([]);
            })
        );
    }
    Sort(arr: Calendar[], k: number): Calendar[] {
        return arr.sort(function (a, b) {
            if (a.date > b.date) {
                return 1 * k;
            }
            if (a.date < b.date) {
                return -1 * k;
            }
            return 0;
        });
    }

    getEvents(): Calendar[] {
        return this.Sort(this.calendar, 1);
    }
    past(): Calendar[] {
        return this.Sort(
            this.calendar.filter(calendar => calendar.date <= new Date()),
            -1
        );
    }
    future(): Calendar[] {
        return this.Sort(
            this.calendar.filter(calendar => calendar.date >= new Date()),
            1
        );
    }
    deleteEvent(dayIdx: number, idxE: number): void {
        this.calendar[dayIdx].events.splice(idxE, 1);
        console.log(this.calendar);
        if (this.calendar[dayIdx].events.length == 0) {
            this.calendar.splice(dayIdx, 1);
        }
    }
    addEvent(event: any): void {
        this.myEvent = event;
        console.log(this.myEvent);
        let date = this.getDateString(this.myEvent.date);
        let i = 1;
        this.myEvent.participants.map(participant => (participant.id = i++));
        let dayIdx = this.calendar.findIndex(
            item => this.getDateString(item.date) == date
        );
        console.log(date);
        console.log(dayIdx);
        if (dayIdx != -1) {
            this.myEvent.id = this.calendar[dayIdx].events.length + 1;
            this.calendar[dayIdx].events.push(this.myEvent);
        } else {
            this.myEvent.id = 1;
            this.myCalendar = new Calendar(new Date(date), [this.myEvent]);
            this.calendar.push(this.myCalendar);
        }
    }
    myEvent: EventOrMeeting = new EventOrMeeting(
        -1,
        '',
        new Date('0000-00-00'),
        '',
        []
    );
    myCalendar: Calendar = new Calendar(new Date('0000-00-00'), []);
    getDateString(date: Date): string {
        return new Date(date).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    }
    updateEvent(dayIdx: number, idxE: number, event: any) {
        this.myEvent = event;
        console.log(this.myEvent);
        let date = this.getDateString(this.myEvent.date);
        let i = 1;
        this.myEvent.participants.map(participant => (participant.id = i++));
        console.log(this.myEvent.participants);
        console.log(date);
        if (
            this.getDateString(this.calendar[dayIdx].date) != date &&
            this.calendar.findIndex(
                item => this.getDateString(item.date) == date
            ) != -1
        ) {
            this.calendar[dayIdx].events.splice(idxE, 1);
            if (this.calendar[dayIdx].events.length == 0) {
                this.calendar.splice(dayIdx, 1);
            }
            dayIdx = this.calendar.findIndex(
                item => this.getDateString(item.date) == date
            );
            this.myEvent.id = this.calendar[dayIdx].events.length + 1;
            this.calendar[dayIdx].events.push(this.myEvent);
        } else if (this.getDateString(this.calendar[dayIdx].date) != date) {
            this.calendar[dayIdx].events.splice(idxE, 1);
            if (this.calendar[dayIdx].events.length == 0) {
                this.calendar.splice(dayIdx, 1);
            }
            dayIdx = this.calendar.findIndex(
                item => this.getDateString(item.date) == date
            );
            this.myEvent.id = 1;
            this.myCalendar = new Calendar(new Date(date), [this.myEvent]);
            this.calendar.push(this.myCalendar);
        } else {
            this.calendar[dayIdx].events.splice(idxE, 1, this.myEvent);
        }
    }
    deleteParticipant(dayIdx: number, idxE: number, idx: number): void {
        this.calendar[dayIdx].events[idxE].participants.splice(idx, 1);
        console.log(this.calendar);
    }
    updateParticipant(dayIdx: number, idxE: number, idx: number, event: any) {
        this.calendar[dayIdx].events[idxE].participants.splice(idx, 1, event);
    }
    addParticipant(dayIdx: number, idxE: number, event: any): void {
        this.calendar[dayIdx].events[idxE].participants.push(event);
    }
    private calendar: Calendar[] = [
        {
            date: new Date('2023-03-08'),
            events: [
                {
                    id: 1,
                    title: 'Прогулка',
                    date: new Date('2023-03-08 20:30'),
                    place: 'Парк',
                    participants: [
                        {
                            id: 1,
                            name: 'Екатерина',
                            role: 'Организатор',
                        },
                        {
                            id: 2,
                            name: 'Наталья',
                            role: 'Гость',
                        },
                        {
                            id: 3,
                            name: 'Дарья',
                            role: 'Гость',
                        },
                    ],
                },
                {
                    id: 2,
                    title: 'Прогулка',
                    date: new Date('2023-03-08 15:30'),
                    place: 'Набережная',
                    participants: [
                        {
                            id: 1,
                            name: 'Екатерина',
                            role: 'Гость',
                        },
                        {
                            id: 2,
                            name: 'Наталья',
                            role: 'Организатор',
                        },
                        {
                            id: 3,
                            name: 'Дарья',
                            role: 'Гость',
                        },
                    ],
                },
            ],
        },
        {
            date: new Date('2024-04-22'),
            events: [
                {
                    id: 1,
                    title: 'Прогулка',
                    date: new Date('2023-03-08 20:30'),
                    place: 'Парк',
                    participants: [
                        {
                            id: 1,
                            name: 'Екатерина',
                            role: 'Гость',
                        },
                        {
                            id: 2,
                            name: 'Наталья',
                            role: 'Гость',
                        },
                        {
                            id: 3,
                            name: 'Дарья',
                            role: 'Организатор',
                        },
                    ],
                },
                {
                    id: 2,
                    title: 'Прогулка',
                    date: new Date('2023-03-08 15:30'),
                    place: 'Набережная',
                    participants: [
                        {
                            id: 1,
                            name: 'Екатерина',
                            role: 'Гость',
                        },
                        {
                            id: 2,
                            name: 'Наталья',
                            role: 'Организатор',
                        },
                        {
                            id: 3,
                            name: 'Дарья',
                            role: 'Гость',
                        },
                    ],
                },
            ],
        },
    ];
}
