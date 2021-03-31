import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FigureProperties } from 'src/app/shared/interfaces/figure-properties.interface';
import { TextProperties } from 'src/app/shared/interfaces/text-properties.interface';

@Component({
  selector: 'app-drawing-properties',
  templateUrl: './drawing-properties.component.html',
  styleUrls: ['./drawing-properties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawingPropertiesComponent implements OnInit {
  public figurePropertiesForm: FormGroup;

  public textPropertiesForm: FormGroup;

  @Input()
  public textForm: TextProperties;

  @Input()
  public figureForm: FigureProperties;

  @Output()
  public figureFormChange = new EventEmitter<FigureProperties>();

  @Output()
  public textFormChange = new EventEmitter<TextProperties>();

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.figurePropertiesForm = this.formBuilder.group({
      lineWidth: [1, [Validators.min(1), Validators.max(10)]],
      lineColor: ['#000000'],
      fillColor: ['#000000'],
      filling: [false],
    });

    this.textPropertiesForm = this.formBuilder.group({
      font: ['Times New Roman'],
      fontSize: [10],
      fontColor: ['#000000'],
      fontWeight: [false],
      fontCursive: [false],
      text: [''],
    });

    this.figurePropertiesForm.valueChanges.subscribe(
      (figureProperties: FigureProperties) => {
        this.figureFormChange.emit(figureProperties);
      }
    );

    this.textPropertiesForm.valueChanges.subscribe(
      (textProperties: TextProperties) => {
        this.textFormChange.emit(textProperties);
      }
    );
  }
}
