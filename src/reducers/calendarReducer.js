import { types } from "../types/types";

// {
//   id: viene de la bd,
//   title: "El cumpleaños del jefe",
//   start: moment().toDate(),
//   end: moment().add(2, "hours").toDate(),
//   note: "comprar pastel",
//   user: {
//     id: "1234",
//     name: "Pedro",
//   },
// },

const inicailState = {
  events: [],
  activeEvent: null,
};

export const calendarReducer = (state = inicailState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
      case types.eventAddNew:
      return {
        ...state,
        events:[
            ...state.events,
            action.payload
        ]
      };
      case types.eventClearActiveEvent:
      return {
        ...state,
        activeEvent:null
        
      };
      case types.eventUpdateActiveEvent:
      return {
        ...state,
        events: state.events.map(
          e=>(e.id===action.payload.id) ? action.payload : e
        )
      }
      case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(
          e=>(e.id!==state.activeEvent.id)
        ),
        activeEvent:null
      }
      case types.eventLoaded:
      return {
        ...state,
        events: [...action.payload]
      
      }
      case types.eventLogout:
        return {
          ...inicailState
        }


    default:
      return state;
  }
};
