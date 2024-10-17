import { Component } from '@angular/core';

@Component({
  selector: 'app-horizontal-separator',
  standalone: true,
  imports: [],
  template: `
    <div class="d-flex justify-content-center" style="background-color: var(--pages-color-secondary);">
      <hr class="border border-dark border-1" style="opacity: 5%; width: 75%">
    </div>
  `
})
export class HorizontalOvercompensation {

}
