import { Injectable, Inject } from "@angular/core";
import { Resolve } from "@angular/router";
import { EventService } from "./shared/event.service";


@Injectable()

export class EventListResolver implements Resolve<any> {
    constructor(@Inject(EventService) private eventService: EventService) {

    }
    resolve() {
        return this.eventService.getEvents();
    }
}