const _dateFormat = new Intl.DateTimeFormat('fr-CA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});
const _timeFormat = new Intl.DateTimeFormat('en-US', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
});


export {
    _dateFormat as dateFormat,
    _timeFormat as timeFormat
};