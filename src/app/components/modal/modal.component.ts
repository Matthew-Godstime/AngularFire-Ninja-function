import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public reqForm!: FormGroup;
  @Output() formData = new EventEmitter<string>();
  constructor(private readonly fb: FormBuilder,
) { }

  ngOnInit(): void {
    this.reqForm = this.fb.group({
      text: ['', Validators.required],
    });
  }

  /**
 * callCloudFunction:- Calling firebase callable function request handler. Instead of normal
 * https request
 */
  public addRequest(): void {
    this.formData.emit(this.reqForm.value);
    this.reqForm.setValue({ text: '' });
  }


}
