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
            tableContent += `<th> ${time.start} - ${time.end} </th>`;
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
