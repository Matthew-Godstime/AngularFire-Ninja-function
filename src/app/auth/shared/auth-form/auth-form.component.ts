import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormData } from 'src/app/core/model/FormData';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  public authForm!: FormGroup;
  public formSubmitted: boolean = false;
  @Output() formEmitter = new EventEmitter<FormData>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }


  
  public get email() : FormGroup {
    return this.authForm.get('email') as FormGroup
  }
  
  public get password(): FormGroup {
    return this.authForm.get('password') as FormGroup
  }
  
/**
 * onSubmit: Collets the input data
 */
  public onSubmit() {
    this.formSubmitted = true;
  this.formEmitter.emit(this.authForm.value);
}  

}
