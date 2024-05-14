import { Component } from '@angular/core';
export enum Role {
    Organizer = 'Организатор',
    Visitor = 'Гость',
    Another = 'Другое',
}
export interface Participant {
    id: number;
    name: string;
    role: Role | string;
}
export interface EventOrMeeting {
    id: number;
    title: string;
    date: Date;
    place: string;
    participants: Participant[];
}
export class EventOrMeeting implements EventOrMeeting {
    constructor(
        id: number,
        title: string,
        date: Date,
        place: string,
        participants: Participant[]
    ) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.place = place;
        this.participants = participants;
    }
}
export class Participant implements Participant {
    constructor(id: number, name: string, role: Role | string) {
        this.id = id;
        this.name = name;
        this.role = role;
    }
}
@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrl: './event.component.css',
})
export class EventComponent {}
