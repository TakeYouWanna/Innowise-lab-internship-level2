import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ToastNoticeComponent } from 'src/app/shared/components/toast-message/toast-notice.component';
import { selectToastNoticeMessage } from 'src/app/store/toast-notice/toast-notice.selectors';
import { selectUserUid } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements AfterViewInit {
  @ViewChild('toastContainer', { read: ViewContainerRef })
  public container!: ViewContainerRef;

  public message$ = this.store$.pipe(select(selectToastNoticeMessage));

  public uid$ = this.store$.pipe(select(selectUserUid));

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store$: Store,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngAfterViewInit(): void {
    this.message$.subscribe((message) => this.createComponent(message));
  }

  public createComponent(message: string): void {
    if (message === '') {
      this.container.clear();
    } else {
      const factory = this.componentFactoryResolver.resolveComponentFactory(
        ToastNoticeComponent
      );
      this.container.createComponent(factory).instance.message = message;
    }
    this.changeDetectorRef.markForCheck();
  }
}
