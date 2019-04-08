
module.exports = buildSchedule()

function buildSchedule()
{
    let sessionsByTimeSpace = getSessionsByTimeSpace();
    let speakers  = require('./speakers.json');
    let tracks = require('./tracks.json');
    let spaces = require('./spaces.json');
    let times  = require('./times.json');

    let scheduleTable = {
        head: [],
        body: [],
    };
    scheduleTable.head.push({ title: 'Time' });
    for (let [trackCode, track] of Object.entries(tracks)) {
        let space = spaces[track.space];
        scheduleTable.head.push({
            title: track.title,
            subtitle: space.title,
        })
    }
    for (let [timeCode, rowSessions] of Object.entries(sessionsByTimeSpace)) {
        let tableRow = [];
        let time = times[timeCode];
        let startTime = getTimeString(time.start);
        let endTime = getTimeString(time.end);
        tableRow.push({
            type: 'generic',
            title: startTime + " - " + endTime,
        })
        for (let session of Object.values(rowSessions)) {
            tableCell = {
                type: 'session',
                title: session.title,
                title_link: `/sessions/#${session.code}`,
                speakers: [],
            };
            for (let speakerCode of session.speakers) {
                let speaker = speakers[speakerCode];
                tableCell.speakers.push({
                    name: speaker.firstname + " " + speaker.lastname,
                    link: `/speakers/#${speaker.code}`,
                });
            }
            tableRow.push(tableCell);
        }
        scheduleTable.body.push(tableRow);
    }
    return scheduleTable;
}

function getSessionsByTimeSpace()
{
    let sessions = require('./sessions.json');
    let sessionsByTimeSpace = {};
    for (let session of Object.values(sessions)) {
        let time = session.time;
        let space = session.space;
        if (!sessionsByTimeSpace[time]) {
            sessionsByTimeSpace[time] = {};
        }
        sessionsByTimeSpace[time][space] = session;
    }
    return sessionsByTimeSpace;
}

function getTimeString(timeString)
{
    let date = new Date(timeString);
    let time = date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
    })
    return time;
}