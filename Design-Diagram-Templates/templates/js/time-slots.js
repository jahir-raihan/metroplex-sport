// Selected time slots - payment method - team info

let count_selected_slots = 0;
let current_sport_type = null;
let current_contract_duration = null;
let current_fare = null;



// End Selected time slots - payment method - team info


// Class based approach

// Renderer Class to handle all kind of logics of slot selection process.

class Renderer{

    constructor(){
        
        this.storage = null;
        this.current_date = new Date();
        this.searched_date = $('#current-date').val();
        this.contract_duration = $('#current-contract-duration').val();
        this.fare = $('#current-fare').val();
        this.sport_type = $('#current-sport-type').val();
        this.formatted_date = $('#formatted-date').val();
        this.utils = new Utility();


        // Initial call

        this.get_ls_data();
        this.update_ls_data();
        this.render_summary()
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

        this.utils.create_summary_table_skeleton()
        let summary_table = $('#summary-table-row')
        
        let total = 0;
        for (let data_id in this.storage){
            let slot_parent = this.storage[data_id]
            let slots = this.storage[data_id].time_slots_and_teams
            
            total += slot_parent.total_fare
            for (let slot in slots){

                if (this.is_expired(slots[slot])){
                    this.remove_slot(slots, slot);
                    total -= slot_parent.fare_rate;
                    continue;
                }

                this.render_selected_slot(data_id, slot_parent.court_id)
                let row = this.utils.create_summary_data_row(slot_parent, slots, slot)
                summary_table.before(row);

            }
            $("#"+slot_parent.court_id+'-sub-total').html(String(slot_parent.total_fare))

            if (slot_parent.total_fare == 0){
                $('#selections-and-team-details-'+slot_parent.court_id).addClass('d-none-force');
            }
   
        }
        
        summary_total.html(`${total}`)
    }

    render_selected_slot(key, court_id){

        /* Method to render a selected slot data in summary table */
        // Yeah it's a little mess, but it's worth it.

        let slot_parent = this.storage[key]

        this.utils.create_data_table_skeleton(court_id)
                                                 
        $('#team-details-container-'+slot_parent.court_id).html(`<div id="${slot_parent.court_id}-teams-data"></div>`)
        
        if (slot_parent.total_fare > 0){
            $('#selections-and-team-details-'+court_id).removeClass('d-none-force');
            
            let date = slot_parent.formatted_date;

            for (let slot in slot_parent.time_slots_and_teams){

                let cur_slot = slot_parent.time_slots_and_teams[slot]
                $('#'+slot).addClass('selected')

                let new_row = this.utils.create_selected_slot_data_row(slot_parent, slot, cur_slot, key, date);
                $('#data-table-row-'+slot_parent.court_id).before(new_row);

                let team_data = this.utils.create_team_data_input_row(slot_parent, slot, cur_slot);
                $('#'+slot_parent.court_id+'-teams-data').before(team_data)

            }
        }
    }

    is_expired(slot){
        /* Returns True if the seat is expierd else False */

        // Slot selection date
        const date1 = new Date(slot.add_time);

        // Current date
        const date2 = new Date(this.get_formatted_time(this.current_date));
        
        // Calculating minutes difference using helper function.
        const minutesDifference = this.utils.get_difference_in_minutes(date1, date2);

        return minutesDifference >= 5;

    }

    action_remover(slot, key){
        let slots = this.storage[key]['time_slots_and_teams'];
        this.storage[key].total_fare -= this.storage[key].fare_rate;
        this.remove_slot(slots, slot);

        $('#data-row-'+slot).remove();
        $('#'+slot+'-team-name-input').remove();
        // $('#'+$('#'+slot).getAttribute('data-court-id')+'-sub-total') = this.storage[key].total_fare
    }

    remove_slot(slots, slot){

        // Remove a selected slot if it is expiered or remove function is called.
        
        delete slots[slot];
        $('#'+slot).removeClass('selected')
        this.update_ls_data();
        this.render_summary();
        
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
        
        let data = {};

        // If key is not in local storage then create a new skelteton for that key.
        if (key in this.storage){
            data = this.storage[key]
            
        } else {
            data = this.utils.create_local_storage_key_pair_data_skeleton(this, slot)
            
        }

        // If the slot is available and does not exist already in localstorage then add it.
        let is_avialable = this.check_availablity(slot, data);

        if (is_avialable && !this.slot_exist(slot, data, key)){
            
            data['time_slots_and_teams'][`${slot.getAttribute('id')}`]  = this.utils.add_time_slot_skeleton(this, slot)

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

// For accessibility purpose as JS modules can't be called from HTML
