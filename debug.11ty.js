"use strict";

module.exports = function(data) {
    return JSON.stringify({
        levels: data.levels,
        schedule: data.schedule,
        sessions: data.sessions,
        sessionsByTrack: data.sessionsByTrack,
        spaces: data.spaces,
        speakers: data.speakers,
        times: data.times,
        tracks: data.tracks,
    });
};