import { Component } from '@angular/core';
import { CalendarService } from '../../core/services/calendar.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventOrMeeting } from '../../event/event.component';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrl: './add-event.component.css',
})
export class AddEventComponent {
    constructor(private calendarService: CalendarService) {}

    addEventForm: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        place: new FormControl('', Validators.required),
        participants: new FormArray([
            new FormGroup({
                name: new FormControl('', Validators.required),
                role: new FormControl('', Validators.required),
            }),
        ]),
    });

    get participantFormGroups() {
        return this.addEventForm.get('participants') as FormArray;
    }
    addParticipant() {
        const participant: FormGroup = new FormGroup({
            name: new FormControl('', Validators.required),
            role: new FormControl('', Validators.required),
        });
        (this.addEventForm.controls['participants'] as FormArray).push(
            participant
        );
    }
    remuveParticipant(index: number) {
        (this.addEventForm.controls['participants'] as FormArray).removeAt(
            index
        );
    }
    id: number = -1;
    myEvent: EventOrMeeting = new EventOrMeeting(
        -1,
        '',
        new Date('0000-00-00 00:00'),
        '',
        []
    );
    onSubmit() {
        this.id = this.myEvent.id;
        this.myEvent = this.addEventForm.getRawValue();
        this.myEvent.id = this.id;
        this.calendarService.addEvent(this.myEvent);
        this.onreInitForm();
    }
    onreInitForm() {
        this.addEventForm = new FormGroup({
            title: new FormControl('', Validators.required),
            date: new FormControl('', Validators.required),
            place: new FormControl('', Validators.required),
            participants: new FormArray([
                new FormGroup({
                    name: new FormControl('', Validators.required),
                    role: new FormControl('', Validators.required),
                }),
            ]),
        });
    }
}
