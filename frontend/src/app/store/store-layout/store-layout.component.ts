import { Component } from '@angular/core';
import {FooterComponent} from "../../shared/footer/footer.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-store-layout',
  standalone: true,
    imports: [
        FooterComponent,
        RouterOutlet
    ],
  templateUrl: './store-layout.component.html',
  styleUrl: './store-layout.component.scss'
})
export class StoreLayoutComponent {

}
