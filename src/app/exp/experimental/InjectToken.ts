import { InjectionToken } from "@angular/core";

export const COLOR = new InjectionToken<string>("It was be string", {
    providedIn: "root",
    factory() {
        return "orange"
    },
})