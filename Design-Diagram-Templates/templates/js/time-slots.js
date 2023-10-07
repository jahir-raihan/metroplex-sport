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
    // Skeleton view 
    'Date_SportType_CourtId_ContractDuration': {
        date: 'Date',
        court_id: 'courtId',
        contract_duration: 'contract_duration',
        sport_type: 'sport_type',
        total_fare: 0,
        time_slots_and_teams: {
            slotid: {
                time: 'time',
                team1: 'team1',
                team2: 'team2'
            }
        }

    }
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
            time: slot.getAttribute('data-time'),
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

function update_data_listings(){
    
}

// End Update data listings


// Add slot function

function add_slot(slot){

    // Check for availablity

    let availablity = check_slot_avilability(slot);
    if (! availablity.status){
        slot.disabled = true;
        slot.classList.add(availablity.classname)
        return;
    }

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
            court_id: slot.getAttribute('data-court-id'),
            contract_duration: current_contract_duration,
            sport_type: current_sport_type,
            total_fare: current_fare,
            time_slots_and_teams: {
                slotid: {
                    time: slot.getAttribute('data-time'),
                    team1: '',
                    team2: ''
                }
            }
        
        }
        slot.disabled = true;
        slot.classList.add('selected')

    }

    // End Add or append data


    // Update data listings and summary

    update_data_listings();
    update_summary_data();

    // End Update data listings and summary
}

// End Add slot function

// End Selected time slots - payment method - team info