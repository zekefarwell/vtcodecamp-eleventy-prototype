class Test {
    
    render(data) 
    {
        var schedule = this.buildSchedule(data);

        return "<pre>" + JSON.stringify(schedule) + "</pre>";
    }

    buildSchedule(data)
    {
        var header = [
            { 'title': 'Time', 'subtitle': '' }
        ];
        for (var track of Object.values(data.tracks)) {
            header.push({
                'title': track.title,
                'subtitle': data.spaces[track.space].title
            });
        }

        var schedule = {};
        for (let session of Object.values(data.sessions)) {
            let time = session.time;
            let space = session.space;
            if (!schedule[time]) {
                schedule[time] = {};
            }
            schedule[time][space] = session;
        }

        return {
            'header': header,
            'schedule': schedule
        };
    }

}

module.exports = Test;