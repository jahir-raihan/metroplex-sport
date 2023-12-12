# Documentation of time_slots.js file

## Table of contents

 - [**Function specifications and usage**](#functions)
 - [**Class specification and usage**](#Classes)
    - [Renderer](#renderer)
        - [get_ls_data](#get_ls_data)
        - [update_ls_data](#update_ls_data)
        - [render_summary](#render_summary)
        - [render_selected_slot](#render_selected_slot)
        - [is_expired](#is_expired)
        - [action_remover](#action_remover)
        - [remove_slot](#remove_slot)
        - [get_formatted_time](#get_formatted_time)
        - [add_slot](#add_slot)
        - [slot_exist](#slot_exist)
        - [check_availability](#check_availability)
        - [request_mark_selected](#request_mark_selected)
      

    
## Functions
**No function**

## Classes

> **<a name="renderer"> Renderer</a>**
  > 
  > Renderer class -> Responsible for rendering process of slots and thier logics.
> >  **<a name="get_ls_data"> Get Local Storage Data</a>**
> > <br> This method gets/creates local storage data and assigns as a JSON a object in the constructor.
> 
> > **<a name="update_ls_data"> Update Local Storage Data</a>**
> > <br> Updates local storage data with current Constructor JSON object data.
> 
> > **<a name="render_summary"> Render Summary Data</a>**
> > <br> This method iterates over all selected valid time slots, computes their total and renders them 
> In the summary table for overview and payment processing.
> 
> > **<a name="render_selected_slot"> Render Selected Slot</a>**
> <br> Renders selected slots after a bunch of checking like, if the slot is already selected, or someone booked it, or it's on the selected list already etc.
>
> > **<a name="is_expired"> Is Expired</a>**
> <br> Returns `True` if a slot is expired on local storage eg: Is on the local Storage for more than 5 minutes.
> Else `False`.
> 
> > **<a name="action_remover"> Action remover</a>**
> <br> Removes a rendered selected slots from frontend and calls method to remove from local storage and backend. Takes two inputs: `slot` --> Which slot, `key` --> Key of localStorage data
> 
> > **<a name="remove_slot"> Remove slot</a>**
> <br> Removes a slot from localStorage and backend. Takes two arguments: `slots` --> All localStorage selected slots, `slot` --> The Slot to remove.
> 
> > **<a name="get_formatted_time"> Get Formatted Time</a>**
> <br> Returns formatted time for time comparison easiness. Takes one argument `date` which needs to be formatted.
> 
> > **<a name="add_slot"> Add Slot</a>**
> <br> Adds a new slot to localStorage and Backend after few checks like, if the slot is already booked, or already selected or is on the localstorage already. Takes one argument: `slot' --> The slot to add.
> 
> > **<a name="slot_exist"> Slot Exists</a>**
> <br> Checks if a slot exists on localStorage. Takes three arguments as input, `slot` --> The slot to check, `key` --> Key to localStorage slot reference.
> 
> > **<a name="check_availability"> Checks Availability.</a>**
> <br> Returns `True` if the given slot is available in the backend Else `False`.
> 
> > **<a name="request_mark_selected"> Request Mark Selected</a>**
> <br> Marks a slot as selected in the backend through request.
> 
> ### `let renderer = new Renderer();` 
> **Creates a new renderer object reference with data loaded from local storage and servers it's methods throughout the whole session and frontend.**