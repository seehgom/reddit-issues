import { ChangeDetectionStrategy, Component } from '@angular/core';

export const url = 'https://65a806b594c2c5762da8280e.mockapi.io/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  links = [
    {label: 'Focus On Element Inside Dynamically Loaded Component', path: 'tab1'}
  ];
}
