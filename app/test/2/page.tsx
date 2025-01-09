const TestPage2 = () => {

    fetch('/api/chat/test')
        .then(res => res.json())
        .then(data => console.log('lets jinvicky', data));



    return <>this is chat test for jinvicky</>;
}

export default TestPage2;