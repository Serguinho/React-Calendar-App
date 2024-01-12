import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Navbar } from "../ui/Navbar";
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";
import { useState } from "react";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventClearActiveEvent, eventSetActive, startLoading } from "../../actions/events";
import { AddNewfab } from "../ui/AddNewfab";
import { DeleteEventFab } from "../ui/DeleteEventFab";
import { useEffect } from "react";

moment.locale("es");

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector(state => state.calendar);
  const { uid } = useSelector(state => state.auth);

  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month" );

  useEffect(() => {
    dispatch(startLoading());
  }, [dispatch])
  

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };
  const onViewChance = (e) => {
    setLastView();
    localStorage.setItem("lastView", e);
  };

  const onSeletSlot = (e) => {
    dispatch(eventClearActiveEvent());
  };

  const eventStyleGetter = (event, start, end, isSeleted) => {
    const style = {
      backgroundColor: (uid===event.user._id) ? "#367cf7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return { style };
  };
  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChance}
        onSelectSlot={onSeletSlot}
        selectable={true}
        view={lastView}
        components={{ event: CalendarEvent }}
      />

      {activeEvent && <DeleteEventFab />}

      <AddNewfab />

      <CalendarModal />
    </div>
  );
};
