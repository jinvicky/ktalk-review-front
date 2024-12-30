// interface Form<T> {
//     setFailureListener(onFailure: OnValidFailure): void;
//     setSuccessListener(onSuccess: OnValidSuccess<T>): void;
// }

// abstract class AbstractForm<T> implements Form<T> {
// }

// const validator = customValidator( {
//     email:  {
//         value: '',
//         condition: ['notEmpty', 'isEmail'], // 메세지는 조건별로 다르게... 여러 개 위반이면 메세지도 배열로 주세요.
//         failure: '올바른 이메일 주소를 입력해 주세요.',
//     }, 
//     username: {
//         value: '',
//         condition: ['notEmpty', 'minLength', 'maxLength'],
//         failure: '사용자명을 최소 3자 이상 입력해주세요.',
//     }
// });

// 여기서 validator.setSuccessListener() 를 통해 성공시 콜백을 등록하는 방법을 모르겠음.
// validator.setSuccessListener(() => {
//     console.log('성공');
// });

// validator.setFailureListener(() => {
//     console.log('실패');
// });

// * validator.setValidators(
// *     Validators.notUndefined(),
// *     Validators.notBlank(),
// *     Validators.custom((value: string) => {
// *         return value.startWith('Hello');
// *     })
// * );


//  * interface Validator<T> {

//     /**
//      * 유효성 검증 조건을 반환합니다.
//      * 
//      * @deprecated

//      * @example

//      * const validator: Validator<string> = {
//      *     condition() {
//      *         return 'my-condition';
//      *     }
//      * };
//      * 
//      * validator.condition();
//      */
//     condition?(): T;

//     /**
//      * T타입의 값을 받아 유효성 검증 결과를 반환합니다.
//      * 
//      * @param value 유효성 검증을 진행할 T타입의 값
//      * @example

//      * const validator: Validator<number> = {
//      *     isValid(value: number) {
//      *         return value > 0 && value < 10;
//      *     }
//      * };
//      * 
//      * validator.isValid(5);
//      */
//     isValid(value?: T): boolean;
// }

// type OnValidFailure = (fields: InValidValue) => void;
// type OnValidSuccess<T> = (field: Mandatory<T>) => void;
// type ValidKey<T> = Extract<KeyOf<T>, string>;
/**
 * type ReactiveValidation<T> = {
    [K in KeyOf<T>]: ReactiveValidationField<T[K]>;
}
 */


interface InValidValue {
    [key: string]: string | undefined;
}

class ValidFailures {

    static fluxAlert(fields: InValidValue): void {
        for (const field in fields) {
            const message = fields[field];

            window.alert(message);
        }
    }

    static monoAlert(fields: InValidValue): void {
        for (const field in fields) {
            const message = fields[field];
    
            window.alert(message);
    
            break;
        }
    }

}
