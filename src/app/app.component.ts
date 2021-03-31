import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ToastNoticeComponent } from './shared/components/toast-notice/toast-notice.component';
import { State } from './store';
import { removeMessage } from './store/toast-notice/actions';
import { selectToastNotice } from './store/toast-notice/selectors';
import { initializeUser } from './store/user/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Innowise-lab-internship-level2';

  @ViewChild('toastContainer', { read: ViewContainerRef })
  public toastContainer: ViewContainerRef;

  constructor(
    private store$: Store<State>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.store$.dispatch(initializeUser());
  }

  public ngAfterViewInit(): void {
    this.store$
      .pipe(select(selectToastNotice))
      .subscribe((toastNotice) =>
        this.createToast(toastNotice.message, toastNotice.messageType)
      );
  }

  public createToast(message: string, messageType: string): void {
    if (message === '') {
      this.toastContainer.clear();
    } else {
      const factory = this.componentFactoryResolver.resolveComponentFactory(
        ToastNoticeComponent
      );
      const component = this.toastContainer.createComponent(factory);
      component.instance.messageType = messageType;
      component.instance.message = message;
    }
    this.changeDetectorRef.markForCheck();
  }
}
