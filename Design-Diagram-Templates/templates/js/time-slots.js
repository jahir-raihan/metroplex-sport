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


let count_selected_slots = 0;
let current_sport_type = null;
let current_contract_duration = null;
let current_fare = null;



// End Selected time slots - payment method - team info


// Class based approach


class Renderer{

    constructor(){
        this.storage = null;
        this.current_date = new Date();
        this.searched_date = $('#current-date').val();
        this.contract_duration = $('#current-contract-duration').val();
        this.fare = $('#current-fare').val();
        this.sport_type = $('#current-sport-type').val();
        this.formatted_date = $('#formatted-date').val();
    }

    get_ls_data(){
        if ('slots' in localStorage){
            this.storage = JSON.parse(localStorage.getItem('slots'))
        } else {
            localStorage.setItem('slots', '{}')
            this.storage = {}
        }
    }
    
    update_ls_data(){
        /* Update localstorage data along with data in backend for expired slots */

        localStorage.setItem('slots', JSON.stringify(this.storage))
    }

    render_slots(){
    
    }

    render_summary(){
        let summary_total = $('#summary-total')

        $('#summary-table').html = ''
        $('#summary-table').html(`<tr class="table-head"><td>DateTime</td><td>Amount</td></tr>
                                <tr id="summary-table-row"> <td></td></tr>`)
        let summary_table = $('#summary-table-row')
        
        let total = 0;
        for (let data_id in this.storage){
            let slot_parent = this.storage[data_id]
            let slots = this.storage[data_id].time_slots_and_teams
            
            total += Number(slot_parent.total_fare)
            for (let slot in slots){

                if (this.is_expired(slots[slot])){
                    this.remove_slot(slot);
                    continue;
                }

                this.render_selected_slot(data_id, slot_parent.court_id)
                let row = `<tr>
                                <td>
                                    <span>${slot_parent.formatted_date}</span>
                                    <span>${slots[slot].time}</span>
                                </td>
                                <td>
                                    ${slot_parent.fare_rate} TK
                                </td>
                            </tr>`
                
                summary_table.before(row);

            }
            
        }
        summary_total.html(`${total}`)
    }

    render_selected_slot(key, court_id){

        /* Method to render a selected slot data in summary table */
        // Yeah it's a little mess, but it's worth it.

        let slot_parent = this.storage[key]

        $('#data-table-'+court_id).html(` <tr class="header-row"><td>DateTime</td><td>Fare</td><td>Action</td>
                                                                    </tr><tr id="data-table-row-B2"> <td></td></tr>`)

        $('#team-details-container-'+slot_parent.court_id).html(`<div id="${slot_parent.court_id}-teams-data"></div>`)
        
        if (slot_parent.total_fare > 0){
            $('#selections-and-team-details-'+court_id).removeClass('d-none-force');
            
            let date = slot_parent.formatted_date;

            for (let slot in slot_parent.time_slots_and_teams){

                let cur_slot = slot_parent.time_slots_and_teams[slot]
                $('#'+slot).addClass('selected')

                let new_row = ` <tr id="data-row-${slot}">
                            <td>${date} <span>${cur_slot.time} ${cur_slot.when}</span></td>
                            <td>${slot_parent.fare_rate} TK</td>
                            <td onclick="renderer.remove_slot('${slot}')"><i class="fas fa-circle-xmark"></i></td>
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

    getDifferenceInMinutes(date1, date2) {

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

    is_expired(slot){
        /* Returns True if the seat is expierd else False */

        // Slot selection date
        const date1 = new Date(slot.add_time);

        // Current date
        const date2 = new Date(this.get_formatted_time(this.current_date));
        
        // Calculating minutes difference using helper function.
        const minutesDifference = this.getDifferenceInMinutes(date1, date2);

        return !minutesDifference <= 5;

    }

    remove_slot(key, court_id, slot){

        // Remove a selected slot if it is expiered or remove function is called.
        console.log("Remove slot")
    }

    get_formatted_time(date){

        /* Get formatted datetime string for Date object creating */

        let time_string = `${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}:${String(date.getSeconds()).padStart(2, '0')}`
        let date_string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

        return `${date_string}T${time_string}`
    }

    add_slot(slot){

        /* Add slot data to local storage with all kind of logical checks, eg: Availablity,
            Eligibility and Limit etc. And mark that slot as selected in the database as well.
        */

        let key = `${this.searched_date}_${this.sport_type}_${slot.getAttribute('data-court-id')}_${this.contract_duration}`
        
        let data = null;

        // If key is not in local storage then create a new skelteton for that key.
        if (key in this.storage){
            data = this.storage[key]
        } else {
            data = {
                date: this.searched_date,
                formatted_date: this.formatted_date,
                court_id: slot.getAttribute('data-court-id'),
                contract_duration: this.contract_duration,
                sport_type: this.sport_type,
                total_fare: 0,
                fare_rate: this.fare,
                time_slots_and_teams: {}

            }
        }

        // If the slot is available and does not exist already in localstorage then add it.
        let is_avialable = this.check_availablity(slot, data);

        if (is_avialable && !this.slot_exist(slot, data, key)){
        
            data['time_slots_and_teams'][`${slot.getAttribute('id')}`] = {
                add_time: this.get_formatted_time(this.current_date),
                time: slot.getAttribute('data-time'),
                when: slot.getAttribute('data-when'),
                team1: 'Red',
                team2: 'Blue'
            }
            data['total_fare'] += Number(this.fare)
            $(`#${slot.getAttribute('id')}`).addClass('selected');
        }

        this.storage[key] = data;

        // Update everything.
        this.update_ls_data();
        this.render_summary();


    }

    slot_exist(slot, data, key){
        /* Check, if the selected slot is already in localstorage */
        if (key in this.storage &&
            slot.getAttribute('id') in this.storage[key]['time_slots_and_teams']) {
            console.log("slot exists")
            return true;
        }
        return false;
    }

    check_availablity(slot, data){

        /* Send request to backend for availabilty check and return true if available else 
           False 
        */
       return true;

    }

    request_mark_selected(slot){
    
    }


}

let renderer = new Renderer();
renderer.get_ls_data();
renderer.update_ls_data();


renderer.render_summary()