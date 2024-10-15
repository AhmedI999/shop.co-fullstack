import { Component } from '@angular/core';

@Component({
  selector: 'app-horizontal-separator',
  standalone: true,
  imports: [],
  template: `
    <div class="d-flex justify-content-center">
      <hr class="border border-dark border-1" style="opacity: 30%; width: 95%">
    </div>
  `,
})
export class HorizontalOvercompensation {

}
