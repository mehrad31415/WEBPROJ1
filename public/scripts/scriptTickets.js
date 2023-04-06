//Javascript

const checkLogin = true;
const movieID = ejsMovieID;
const date = ejsDate.split('-');
const time = ejsTime.split('-');
const dateTime = new Date(date[0], date[1], date[2], time[0], time[1], time[2]);
console.log(ejsSchedule);
const stringSchedule = JSON.parse(ejsSchedule);
const schedule = [];
for (let i = 0; i < stringSchedule.length; i++){
    schedule.push({movieID: stringSchedule[i].movie_id, date: new Date(stringSchedule[i].date.replace(' ', 'T'))});
}

console.log(schedule);
