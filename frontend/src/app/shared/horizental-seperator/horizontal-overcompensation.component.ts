import { Component } from '@angular/core';

@Component({
  selector: 'app-horizontal-separator',
  standalone: true,
  imports: [],
  template: `
    <div class="d-flex justify-content-center">
      <hr class="border border-dark border-1 w-75" style="opacity: 30%">
    </div>
  `,
})
export class HorizontalOvercompensation {

}
