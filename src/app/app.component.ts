import { Component } from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "mg-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss","../asset/css/style.css"],
})
export class AppComponent {
  title = "mega-front";
}
