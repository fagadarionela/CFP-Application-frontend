export class MessageErrorConstructorUtils {
  public static constructRequiredFieldError(field: string): string {
    return 'The ' + field + ' is required!';
  }

  public static constructEmailError(): string{
    return 'This is not a valid email address!';
  }

  public static constructMinLengthFieldError(field: string, minLength: number): string {
    return 'The size of the ' + field + ' should be more than ' + minLength + '!';
  }

  public static constructMaxLengthFieldError(field: string, maxLength: number): string {
    return 'The size of the ' + field + ' should be less than ' + maxLength + '!';
  }

  public static constructOnlyLettersFieldError(field: string): string {
    return 'The ' + field + ' should contain only letters!';
  }

  public static constructOnlyLettersAndDigitsFieldError(field: string): string {
    return 'The ' + field + ' should contain only letters & digits!';
  }

  public static constructOnlyLettersAndDigitsAndSignsFieldError(field: string): string {
    return 'The ' + field + ' should contain only letters, digits and \'*,-,_,!\'!';
  }
}
