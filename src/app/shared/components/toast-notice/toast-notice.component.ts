import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-toast-notice',
  templateUrl: './toast-notice.component.html',
  styleUrls: ['./toast-notice.component.scss'],
  animations: [
    trigger('toastOpenClose', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('200ms ease-in', style({ opacity: '1' })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: '0' }))]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastNoticeComponent implements OnInit {
  @Input()
  public message: string;

  @Input()
  public messageType: string;

  public background: string;

  public ngOnInit(): void {
    switch (this.messageType) {
      case 'error':
        this.background = 'red';
        break;
      case 'successfully':
        this.background = 'green';
        break;
      default:
        this.background = 'red';
    }
  }
}
