import {FormControl, Validators} from '@angular/forms';
import {MessageErrorConstructorUtils} from '../utils/message-error-constructor.utils';

export class SignInValidator {
  public emailForm!: FormControl;
  public passwordForm!: FormControl;

  constructor() {
    this.init();
  }

  public getEmailFormErrors(): string {
    if (this.emailForm.hasError('required')) {
      return MessageErrorConstructorUtils.constructRequiredFieldError('email');
    }
    if (this.emailForm.hasError('pattern')) {
      return MessageErrorConstructorUtils.constructEmailError();
    }
    return '';
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
    return '';
  }


  public isValid(): boolean {
    return  !this.emailForm.errors && !this.passwordForm.errors;
  }

  public init(): void {
     this.emailForm = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9*-_!]*@[a-zA-Z]+\\.[a-zA-Z]+')]);
     this.passwordForm = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z 0-9*-_!]*'),
      Validators.minLength(5), Validators.maxLength(20)]);
  }
}
