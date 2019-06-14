import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {FieldErrorMatcher} from './FieldErrorMatcher';
import {PasswordStenghValidator} from './PasswordStenghValidator';
import {User} from '../model/User';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  form: FormGroup;
  isSubmitted: boolean;
  isEmptyPhone: boolean;
  errorMatcher = new FieldErrorMatcher();
  private user: User;

  constructor(private fb: FormBuilder) {

    this.form = fb.group({
      name: ['', [Validators.required, Validators.min(3)]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$')]],
      passwords: fb.group({
        password: ['', [Validators.required, Validators.minLength(8), PasswordStenghValidator.strong ]],
        passwordVer: ['', [Validators.required]]
      }, { validator: this.passwordMatchCheck }),
      pets: [ '', [Validators.required]],
      address: this.fb.group({
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        building: ['', [Validators.required]],
        flatNo: ['', ]
      }),
      consents: fb.group({
        newsletter: ['', [Validators.required]],
        sms: ['']
      })
    });

    this.onChanges();
  }

  passwordMatchCheck(form: FormGroup) {
    const condition = form.get('password').value !== form.get('passwordVer').value;
    return condition ? { passwordsNotMatch: true} : null;
  }

  onChanges(): void {
    this.form.get('phone').valueChanges.subscribe(val => {
      this.isEmptyPhone = val.toString().length === 0;
    });
  }

  public get f() {
    return this.form.controls;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  public hasChildError  = (childName: string, controlName: string, errorName: string) => {
    return this.form.get(childName).get(controlName).hasError(errorName);
  }

  public isTouched = (controlName: string) => {
    return this.form.controls[controlName].touched;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid ) {
      this.user = this.form.getRawValue();
      console.log(
        this.user
      );
      this.isSubmitted = false;
    }

  }


}
