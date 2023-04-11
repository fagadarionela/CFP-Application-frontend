import {FormControl, Validators} from '@angular/forms';
import {MessageErrorConstructorUtils} from '../utils/message-error-constructor.utils';

export class SignUpValidator {
  public nameForm: FormControl;
  public emailForm: FormControl;
  public passwordForm: FormControl;
  public passwordConfirmationForm: FormControl;
  public medicalServicesForm: FormControl;
  public gdprForm: FormControl;

  constructor() {
    this.init();
  }

  public getNameFormErrors(): string {
    if (this.nameForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('name');
    }
    if (this.nameForm.hasError('pattern')) {
      return MessageErrorConstructorUtils.constructOnlyLettersFieldError('name');
    }
    if (this.nameForm.hasError('minlength')) {
      return MessageErrorConstructorUtils.constructMinLengthFieldError('name', 5);
    }
    if (this.nameForm.hasError('maxlength')) {
      return MessageErrorConstructorUtils.constructMaxLengthFieldError('name', 50);
    }
  }

  public getEmailFormErrors(): string {
    if (this.emailForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('email');
    }
    if (this.emailForm.hasError('pattern')) {
      return MessageErrorConstructorUtils.constructEmailError();
    }
  }

  public getPasswordFormErrors(): string {
    if (this.passwordForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('password');
    }
    if (this.passwordForm.hasError('pattern')) {
      return MessageErrorConstructorUtils.constructOnlyLettersAndDigitsAndSignsFieldError('password');
    }
    if (this.passwordForm.hasError('minlength')) {
      return MessageErrorConstructorUtils.constructMinLengthFieldError('password', 5);
    }
    if (this.passwordForm.hasError('maxlength')) {
      return MessageErrorConstructorUtils.constructMaxLengthFieldError('password', 20);
    }
  }

  public getPasswordConfirmationFormErrors(): string {
    if (this.passwordConfirmationForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('confirmation of password');
    }
    if (this.passwordConfirmationForm.hasError('pattern')) {
      return MessageErrorConstructorUtils.constructOnlyLettersAndDigitsAndSignsFieldError('confirmation of password');
    }
    if (this.passwordConfirmationForm.hasError('minlength')) {
      return MessageErrorConstructorUtils.constructMinLengthFieldError('confirmation of password', 5);
    }
    if (this.passwordConfirmationForm.hasError('maxlength')) {
      return MessageErrorConstructorUtils.constructMaxLengthFieldError('confirmation of password', 20);
    }
  }

  public isValid(): boolean {
    return !this.nameForm.errors && !this.emailForm.errors && !this.passwordForm.errors && !this.passwordConfirmationForm.errors &&
      (this.passwordForm.value === this.passwordConfirmationForm.value);
  }

  public init(): void {
    this.nameForm = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'),
      Validators.minLength(5), Validators.maxLength(50)]);
    this.emailForm = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9*-_!]*@[a-zA-Z]+\\.[a-zA-Z]+')]);
    this.passwordForm = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z 0-9*-_!]*'),
      Validators.minLength(5), Validators.maxLength(20)]);
    this.passwordConfirmationForm = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z 0-9*-_!]*'),
      Validators.minLength(5), Validators.maxLength(20)]);
    this.medicalServicesForm = new FormControl();
    this.gdprForm = new FormControl();
  }
}
