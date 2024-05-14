import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Participant } from '../../event/event.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-update-participant',
    templateUrl: './update-participant.component.html',
    styleUrl: './update-participant.component.css',
})
export class UpdateParticipantComponent {
    @Input()
    participant: Participant = new Participant(-1, '', '');
    @Output()
    onClickUpParticipant = new EventEmitter<any>();
    participantForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
    });
    constructor() {}
    fill(): void {
        this.participantForm.patchValue({
            name: this.participant.name,
            role: this.participant.role,
        });
    }
    id: number = -1;
    onSubmit() {
        this.id = this.participant.id;
        this.participant = this.participantForm.getRawValue();
        this.participant.id = this.id;
        this.onClickUpParticipant.emit(this.participant);
    }
    onreInitForm() {
        this.participantForm = new FormGroup({
            name: new FormControl('', Validators.required),
            role: new FormControl('', Validators.required),
        });
    }
}
