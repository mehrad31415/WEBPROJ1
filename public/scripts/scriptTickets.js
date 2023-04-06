//Javascript

date = ejsDate.split('-');
time = ejsTime.split('-');
dateTime = new Date(date[0], date[1], date[2], time[0], time[1], time[2]);
console.log(date.toLocaleString());