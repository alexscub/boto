function getFormatedDate(seconds) {
const ms= seconds*1000
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
return new Intl.DateTimeFormat('en-US', options).format(ms)
}
export default getFormatedDate;