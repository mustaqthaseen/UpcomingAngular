import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { JQ_TOKEN,TOASTR_TOKEN, Toastr,CollapsibleWellComponent, SimpleModalComponent, ModalTriggerDirective } from './common/index';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';
import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  UpvoteComponent,
  VoterService,
  LocationValidator,
  EventResolver,
} from './events/index'
import { DurationPipe } from './events/shared/duration.pipe'
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Token } from '@angular/compiler';
import { HttpClientModule } from '@angular/common/http';


let toastr:Toastr =window['toastr'];
let JQuery = window['$'];

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    ModalTriggerDirective,
    DurationPipe,
    SimpleModalComponent,
    UpvoteComponent,
    LocationValidator
  ],
  imports: [
    BrowserModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [EventService,
              {provide: TOASTR_TOKEN, useValue: toastr},
              {provide: JQ_TOKEN, useValue: JQuery},
              EventResolver,
              EventListResolver,
              VoterService,
              AuthService,
            {
              provide: 'canDeactivateCreateEvent', 
              useValue: checkDirtyState
            }
          ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent){
  if (component.isDirty)
  return window.confirm ('You have not saved this event, do you really want to cancel?')
  return true
}