
module.exports = getSessionsByTrack();

function getSessionsByTrack()
{
    let sessionsByTrack = {};
    let sessions = require('./sessions.json');
    for (let session of Object.values(sessions)) {
        let track = session.track;
        if (!sessionsByTrack[track]) {
            sessionsByTrack[track] = [];
        }
        sessionsByTrack[track].push(session);
    }
    return sessionsByTrack;
}
