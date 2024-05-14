import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EventComponent } from './event/event.component';
import { CalendarService } from './core/services/calendar.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { UpdateParticipantComponent } from './forms/update-participant/update-participant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddParticipantComponent } from './forms/add-participant/add-participant.component';
import { UpdateEventComponent } from './forms/update-event/update-event.component';

const appRoutes: Routes = [
    { path: '', component: CalendarComponent },
    { path: 'addEvent', component: AddEventComponent },
    { path: '*', component: NotFoundComponent },
];
@NgModule({
    declarations: [
        AppComponent,
        CalendarComponent,
        AddEventComponent,
        NotFoundComponent,
        EventComponent,
        UpdateParticipantComponent,
        AddParticipantComponent,
        UpdateEventComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
        CalendarService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
