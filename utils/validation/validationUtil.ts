interface Validator<T> {
  condition?(): T; // 유효성 조건
  isValid(value?: T): boolean; // 제네릭으로 검증 결과 반환
}

interface ValidateForm<T> {
  value: T;
  validConditions: Validator<T>[]; // 유효성 검사 함수 배열
  message: string;
  failure: boolean;
}

/**
 *  const formData = {
        email: {
            value: correctEmail,
            validConditions: [Validators.notBlank(), Validators.isEmail()],
            message: '이메일은 필수 입력입니다. 이메일 형식을 확인해 주세요',
            failure: false,
        },
    }
 */

export function UseForm(validation: { [key: string]: ValidateForm<any> }) {
  for (const key in validation) {
    const form = validation[key];
    for (const v of form.validConditions) {
      if (!v.isValid(form.value)) {
        form.failure = true;
        break;
      }
    }
    if (form.failure) {
      // window.alert(form.message);
      return {
        isValid: false,
        message: form.message,
      };
    }
  }
  return {
    isValid: true,
    message: "PASS",
  };
}

export class Validators {
  private static readonly blankPattern = /^\s*$/g;

  private static readonly emailPattern = /^(.+)@(\S+)$/;

  static blank(): Validator<string> {
    return {
      isValid(value: string): boolean {
        return Validators.blankPattern.test(value);
      },
    };
  }

  static notBlank(): Validator<string> {
    return {
      isValid(value: string): boolean {
        return !Validators.blankPattern.test(value);
      },
    };
  }

  static undefined<T>(): Validator<T> {
    return {
      isValid(value: T) {
        return value === undefined;
      },
    };
  }

  static notUndefined<T = any>(): Validator<T> {
    return {
      isValid(value: T) {
        return value !== undefined;
      },
    };
  }

  static max(max: number): Validator<number> {
    return {
      condition(): number {
        return max;
      },
      isValid(value: number): boolean {
        return max > value;
      },
    };
  }

  static min(min: number): Validator<number> {
    return {
      condition(): number {
        return min;
      },
      isValid(value: number): boolean {
        return min < value;
      },
    };
  }

  static minLength(min: number): Validator<string> {
    return {
      condition(): string {
        return min.toString();
      },
      isValid(value: string): boolean {
        return min < value.length;
      },
    };
  }

  static maxLength(max: number): Validator<string> {
    return {
      condition(): string {
        return max.toString();
      },
      isValid(value: string): boolean {
        return max >= value.length;
      },
    };
  }

  static isEmail(): Validator<string> {
    return {
      isValid(value: string): boolean {
        return Validators.emailPattern.test(value);
      },
    };
  }

  static assertTrue(): Validator<boolean> {
    return {
      isValid(value: boolean): boolean {
        return value;
      },
    };
  }
}
