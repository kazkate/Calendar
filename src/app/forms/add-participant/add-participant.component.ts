import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Participant } from '../../event/event.component';

@Component({
    selector: 'app-add-participant',
    templateUrl: './add-participant.component.html',
    styleUrl: './add-participant.component.css',
})
export class AddParticipantComponent {
    @Input()
    addId: number = -1;
    @Output()
    onClickAddParticipant = new EventEmitter<any>();
    participantForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
    });
    constructor() {}

    participant: Participant = new Participant(-1, '', '');
    onSubmit() {
        this.participant = this.participantForm.getRawValue();
        this.participant.id = this.addId;
        this.onClickAddParticipant.emit(this.participant);
    }
    onreInitForm() {
        this.participantForm = new FormGroup({
            name: new FormControl('', Validators.required),
            role: new FormControl('', Validators.required),
        });
    }
}
