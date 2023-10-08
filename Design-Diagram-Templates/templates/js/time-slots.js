// disable enable modiy search section

const toggle_close = () => {
    document.getElementById('modify-search-form').classList.toggle('d-none-force')

    let elements = document.querySelectorAll('.toggle-close');
    elements.forEach( (ele) => {
        ele.classList.toggle('d-none-force')
    })
}
// end disable enable modify search section


// show hide time slots for a field with updated data

const change_arrow_and_border = (ele, id) => {
    ele.classList.toggle('c-f-h-cng-class')
    $('#c-f-contents-'+id).slideToggle()
}

// end show hide time slots for a field with updated data





// Selected time slots - payment method - team info

let selected_slot_datas = {
    //* Skeleton view 
    // 'Date_SportType_CourtId_ContractDuration': {
    //     date: 'Date',
    //     court_id: 'courtId',
    //     contract_duration: 'contract_duration',
    //     sport_type: 'sport_type',
    //     total_fare: 0,
    //     time_slots_and_teams: {
    //         slotid: {
    //             time: 'time',
    //             team1: 'team1',
    //             team2: 'team2'
    //         }
    //     }

    // }
    // End Skeleton view
}
let count_selected_slots = 0;
let current_date = null;
let current_sport_type = null;
let current_contract_duration = null;
let current_fare = null;

// Update current page data function

function update_page_data(){
    current_date = $('#current-date').val();
    current_sport_type = $('#current-sport-type').val();
    current_contract_duration = $('#current-contract-duration').val();
    current_fare = $('#current-fare').val();
}

// End Update current page data function

// Check slot availability

function check_slot_avilability(slot){

}

// End Check slot availability


// Check slot is already there


function check_slot_is_already_there(data, slot){
    if (slot.id in data){
        return true;
    }
    return false;
}

// End Check slot is already there



// Add slot data to selected slots datas dictionary

function add_slot_data(data_id, slot){

    let slot_parent = selected_slot_datas[data_id]

    let already_there = check_slot_is_already_there(slot_parent.time_slots_and_teams, slot)

    if (!already_there){
        slot_parent.time_slots_and_teams[slot.id] = {
            time: slot.getAttribute('data-time') + ' ' + slot.getAttribute('data-when'),
            team1: '',
            team2: ''
        }
        slot.disabled = true 
        slot.classList.add('selected')

        slot_parent.total_fare += current_fare;

    }
}
// End Add slot data to selected slots datas dictionary


// Update data listings 

function update_data_listings(data_id, slot){
    let slot_parent = selected_slot_datas[data_id]

    $('#data-table-'+slot.getAttribute('data-court-id')).html(` <tr class="header-row"><td>DateTime</td><td>Fare</td><td>Action</td>
                                                                </tr><tr id="data-table-row-B2"> <td></td></tr>`)

    $('#team-details-container-'+slot_parent.court_id).html(`<div id="${slot_parent.court_id}-teams-data"></div>`)
    
    if (slot_parent.total_fare > 0){
        $('#selections-and-team-details-'+slot.getAttribute('data-court-id')).removeClass('d-none-force');
        
        let date = slot_parent.formatted_date;

        for (slot in slot_parent.time_slots_and_teams){

            let cur_slot = slot_parent.time_slots_and_teams[slot]

            let new_row = ` <tr id="data-row-${slot}">
                        <td>${date} <span>${cur_slot.time}</span></td>
                        <td>${slot_parent.fare_rate} TK</td>
                        <td onclick="remove_slot('${slot}')"><i class="fas fa-circle-xmark"></i></td>
                    </tr>`
            $('#data-table-row-'+slot_parent.court_id).before(new_row);

            let team_data = `<div class="team-name-input">
                                <input type="text" placeholder="type here" value="${cur_slot.team1}"  data-team="1" data-slot-id="${slot}" data-court-id="${slot_parent.court_id}" id="${slot}-team-1">
                                <p>VS</p>
                                <input type="text" placeholder="type here" value="${cur_slot.team2}" data-team="2" data-slot-id="${slot}" data-court-id="${slot_parent.court_id}" id="${slot}-team-2">
                            </div>`
            
            $('#'+slot_parent.court_id+'-teams-data').before(team_data)

        }
        
        
       
    }

}

// End Update data listings


// Update summary data

function update_summary_data(){
    
    let summary_total = $('#summary-total')

    $('#summary-table').html(`<tr class="table-head"><td>DateTime</td><td>Amount</td></tr>
                              <tr id="summary-table-row"> <td></td></tr>`)
    let summary_table = $('#summary-table-row')

    for (data_id in selected_slot_datas){
        let slot_parent = selected_slot_datas[data_id]
        let slots = selected_slot_datas[data_id].time_slots_and_teams
        let total = 0;

        for (slot in slots){
            let row = `<tr>
                            <td>
                                <span>${slot_parent.formatted_date}</span>
                                <span>${slots[slot].time}</span>
                            </td>
                            <td>
                                ${slot_parent.fare_rate} TK
                            </td>
                        </tr>`
            total += Number(slot_parent.fare_rate)
            summary_table.before(row);
            summary_total.html(`${total}`)

        }
        
    }
}

// End Update summary data


// Add slot function

function add_slot(slot){

    // Check for availablity

    // let availablity = check_slot_avilability(slot);
    // if (! availablity.status){
    //     slot.disabled = true;
    //     slot.classList.add(availablity.classname)
    //     return;
    // }

    // End Check for availabilty

    // Update current page data 

    update_page_data()

    // End Update current page data 


    // Add or append data

    var data_id = `${current_date}_${current_sport_type}_${slot.getAttribute('data-court-id')}_${current_contract_duration}`
    if (data_id in selected_slot_datas){
        
        add_slot_data(data_id, slot)

    } else {

        selected_slot_datas[data_id] = {
            date: current_date,
            formatted_date: $('#formatted-date').val(),
            court_id: slot.getAttribute('data-court-id'),
            contract_duration: current_contract_duration,
            sport_type: current_sport_type,
            total_fare: current_fare,
            fare_rate : current_fare,
            time_slots_and_teams: {
            }
        
        }
        selected_slot_datas[data_id].time_slots_and_teams[slot.id] = {
            time: slot.getAttribute('data-time') + ' ' + slot.getAttribute('data-when'),
            team1: '',
            team2: ''
        }

        slot.disabled = true;
        slot.classList.add('selected')

    }

    // End Add or append data


    // Update data listings and summary

    update_data_listings(data_id, slot);
    update_summary_data();

    // End Update data listings and summary
}

// End Add slot function

// End Selected time slots - payment method - team info