import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import { prepareEvents } from "../helpers/prepareEvents";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    try {
      const resp = await fetchConToken("events", event, "POST");
      const body = await resp.json();
      if (body.ok) {
        event.id = body.evento.id;
        event.user = {
          _id: uid,
          name: name,
        };

        dispatch(eventAddNew(event));
      }
    } catch (error) {
      Swal.fire("Error", error, "error");
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});
export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});
export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});



export const startLoading=()=>{
    return async(dispatch)=>{
        
        try {
            const resp = await fetchConToken("events");
            const body = await resp.json();

            const events=prepareEvents(body.events)
            dispatch(eventsLoaded(events))
       
        } catch (error) {
            console.log(error)
       // Swal.fire("Error", error, "error");
        
        } 

    }
 }
 
 const eventsLoaded=(events)=>({
     type:types.eventLoaded,
     payload:events
 })


 export const eventStartUpdate=(event)=>{
    return async(dispatch)=>{
        try {
            const resp = await fetchConToken(`events/${event.id}`,event,'PUT');
            const body = await resp.json();

           if(body.ok){
            dispatch(eventUpdateActiveEvent(event))
           }else{
            Swal.fire("Error", body.msg, "error");
           }

        } catch (error) {
            console.log(error)
        
        
        }  
    }
 }


  const eventUpdateActiveEvent = (event) => ({
    type: types.eventUpdateActiveEvent,
    payload: event,
  });

  export const eventStartDelete=()=>{
    return async(dispatch,getState)=>{
        const {id}=getState().calendar.activeEvent;
        //console.log(id);
        try {
            const resp = await fetchConToken(`events/${id}`,{},'DELETE');
            const body = await resp.json();
           if(body.ok){
            dispatch(eventDeleted())
           }else{
            Swal.fire("Error", body.msg, "error");
           }

        } catch (error) {
            console.log(error)
        
        
        }  
    }
 }

  const eventDeleted = () => ({type: types.eventDeleted });

  export const eventLogout = () => ({type: types.eventLogout});