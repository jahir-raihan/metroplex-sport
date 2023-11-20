/* File for Utlity methods */


class Utility {
  
    create_data_table_skeleton(court_id) {

        // Creates data table skeleton for a given Court
      
      $("#data-table-" + court_id)
        .html(`<tr class="header-row"><td>DateTime</td><td>Fare</td>
               <td>Action</td></tr><tr id="data-table-row-B2"><td></td></tr>`);
    }
  
    create_summary_table_skeleton(){

        // Creates Summary table skeleton
  
      $('#summary-table').html = ''
      $('#summary-table')
      .html(`<tr class="table-head"><td>DateTime</td><td>Amount</td></tr>
            <tr id="summary-table-row"> <td></td></tr>`)
    }
  
    create_summary_data_row(slot_parent, slots, slot){

        // Returns summary data row template
  
        return `<tr>
                    <td>
                        <span>${slot_parent.formatted_date}</span>
                        <span>${slots[slot].time} ${slots[slot].when}</span>
                    </td>
                    <td>
                        ${slot_parent.fare_rate} TK
                    </td>
                </tr>`;
    }
  
    create_selected_slot_data_row(slot_parent, slot, cur_slot, key, date){

        // Returns selected slot data row template
  
        return `<tr id="data-row-${slot}">
                    <td>${date} <span>${cur_slot.time} ${cur_slot.when}</span></td>
                    <td>${slot_parent.fare_rate} TK</td>
                    <td onclick="renderer.action_remover('${slot}', '${key}')"><i class="fas fa-circle-xmark"></i></td>
                </tr>`;
    }
  
    create_team_data_input_row(slot_parent, slot, cur_slot){

        // Returns team data input row template
  
        return `<div class="team-name-input" id="${slot}-team-name-input">
                    <input type="text" placeholder="type here" value="${cur_slot.team1}"  data-team="1" data-slot-id="${slot}" data-court-id="${slot_parent.court_id}" id="${slot}-team-1">
                    <p>VS</p>
                    <input type="text" placeholder="type here" value="${cur_slot.team2}" data-team="2" data-slot-id="${slot}" data-court-id="${slot_parent.court_id}" id="${slot}-team-2">
                </div>`;
    }
  
    get_difference_in_minutes(date1, date2) {
  
        /* Returns minutes difference of two given datetimes */
    
        // Convert dates to milliseconds
        const time1 = date1.getTime();
        const time2 = date2.getTime();
        
        // Calculate the difference in milliseconds
        const timeDifference = time2 - time1;
        
        // Convert milliseconds to minutes
        const minutesDifference = timeDifference / (1000 * 60);
        
        // Round to the nearest whole minute
        const roundedMinutesDifference = Math.round(minutesDifference);
        
        // Return the difference in minutes
        return roundedMinutesDifference;
    }
  
    create_local_storage_key_pair_data_skeleton(object, slot){

        // Returns data key skeleton to store in LocalStorage
  
        return {
            date: object.searched_date,
            formatted_date: object.formatted_date,
            court_id: slot.getAttribute('data-court-id'),
            contract_duration: object.contract_duration,
            sport_type: object.sport_type,
            total_fare: 0,
            fare_rate: Number(object.fare),
            time_slots_and_teams: {}
    
        }
    }
  
    add_time_slot_skeleton(object, slot){

        // Returns skeleton of selected time slots to store in LocalStorage
  
        return {
            add_time: object.get_formatted_time(object.current_date),
            time: slot.getAttribute('data-time'),
            when: slot.getAttribute('data-when'),
            team1: 'Red',
            team2: 'Blue'
        };
    }
  
}
