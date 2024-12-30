// interface Form<T> {

//     setFailureListener(onFailure: OnValidFailure): void;

//     setSuccessListener(onSuccess: OnValidSuccess<T>): void;

//     setValidationOrder(fields: KeyOf<T>[]): void;

// }


// abstract class AbstractForm<T> implements Form<T> {

// }

// const validator = customValidator( {
//     email:  {
//         value: '',
//         required: true, 
//         order: 2,
//         condition: ['notEmpty', 'isEmail'], // 메세지는 조건별로 다르게... 여러 개 위반이면 메세지도 배열로 주세요.
//         failure: '올바른 이메일 주소를 입력해 주세요.',
//     }, 
//     username: {
//         value: '',
//         required: true,
//         order: 1, 
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
