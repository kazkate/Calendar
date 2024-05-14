import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventOrMeeting } from '../../event/event.component';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
    selector: 'app-update-event',
    templateUrl: './update-event.component.html',
    styleUrl: './update-event.component.css',
})
export class UpdateEventComponent {
    @Input()
    myEvent: EventOrMeeting = new EventOrMeeting(
        -1,
        '',
        new Date('0000-00-00 00:00'),
        '',
        []
    );
    @Output()
    onClickUpEvent = new EventEmitter<any>();
    updateEventForm: FormGroup = new FormGroup({
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
    constructor() {}
    fill(): void {
        this.updateEventForm.patchValue({
            title: this.myEvent.title,
            date: this.myEvent.date,
            place: this.myEvent.place,
            participants: this.myEvent.participants,
        });
    }
    get participantFormGroups() {
        return this.updateEventForm.get('participants') as FormArray;
    }
    addParticipant() {
        const participant: FormGroup = new FormGroup({
            name: new FormControl('', Validators.required),
            role: new FormControl('', Validators.required),
        });
        (this.updateEventForm.controls['participants'] as FormArray).push(
            participant
        );
    }
    remuveParticipant(index: number) {
        (this.updateEventForm.controls['participants'] as FormArray).removeAt(
            index
        );
    }
    id: number = -1;
    onSubmit() {
        this.id = this.myEvent.id;
        this.myEvent = this.updateEventForm.getRawValue();
        this.myEvent.id = this.id;
        this.onClickUpEvent.emit(this.myEvent);
    }
    onreInitForm() {
        this.updateEventForm = new FormGroup({
            title: new FormControl('', Validators.required),
            date: new FormControl('', Validators.required),
            place: new FormControl('', Validators.required),
            participants: new FormArray([]),
        });
    }
}
