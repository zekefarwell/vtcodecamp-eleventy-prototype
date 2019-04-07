"use strict";

class Schedule
{

    data() {
        return {
            layout: "page.njk",
            title: "Schedule"
        };
    }


    render(data) 
    {
        var schedule = this.buildSchedule(data);

        // return "<pre>" + JSON.stringify(schedule) + "</pre>";

        let tableContent = "<table>"; 

        // tableContent = `
        //     <thead>
        //         <tr>
        //             <th>Time</th>
        //             <th>${firstRowData.}</th>
        //         </tr>
        //     </thead>

        // `;

        tableContent += "<tbody>"; 
        for (let [timeCode, rowSessions] of Object.entries(schedule)) {
            let time = data.times[timeCode];
            tableContent += "<tr>";
            let startTime = this.getTimeString(time.start);
            let endTime = this.getTimeString(time.end);
            tableContent += `<th> ${startTime} - ${endTime} </th>`;
            for (let session of Object.values(rowSessions)) {
                tableContent += "<td>";
                tableContent += `<a href="#" class="td-title">${session.title}<a>`;
                tableContent += `<a href="#" class="td-subtitle">${session.speakers[0]}<a>`;
                tableContent += "</td>";
            }
            tableContent += "</tr>";
        } 
        tableContent += "</tbody>"; 
        tableContent += "</table>"

        return tableContent;

    }

    buildSchedule(data)
    {
        let schedule = {};

        for (let session of Object.values(data.sessions)) {
            let time = session.time;
            let space = session.space;
            if (!schedule[time]) {
                schedule[time] = {};
            }
            schedule[time][space] = session;
        }
        return schedule;
    }

    getTimeString(timeString)
    {
        let date = new Date(timeString);
        let time = date.toLocaleTimeString('en-US', {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
        })
        return time;
    }

    renderHeader(row)
    {
        header = `
            <thead> 
                <tr>
                    <th></th>
                </tr>
            </thead>
        `

        return row;
    }

}

module.exports = Schedule;
