import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import Modal from "react-modal";
import "react-datetime-picker/dist/DateTimePicker.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdate,
} from "../../actions/events";
import { useEffect } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlusOne = now.clone().add(1, "hours");
const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlusOne.toDate(),
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const dispach = useDispatch();

  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [dateStart, setdateStart] = useState(now.toDate());

  const [dateEnd, setdateEnd] = useState(nowPlusOne.toDate());

  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispach(uiCloseModal());
    dispach(eventClearActiveEvent());
    setFormValues(initEvent);
    //console.log("closing.....");
  };

  const handleStartDateChange = (e) => {
    setdateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };
  const handleEndDateChange = (e) => {
    setdateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire("Error", "The dates cannot be the same.", "error");
    }
    if (title.trim().length < 2) {
      return setTitleValid(false);
    }
    if (activeEvent) {
      dispach(eventStartUpdate(formValues));
    } else {
      dispach(
        eventStartAddNew(formValues));
    }
    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      closeTimeoutMS={200}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      className={"modal"}
      overlayClassName={"modal-fondo"}
    >
      <h1> {activeEvent ? "Edit event" : "New event"}</h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <div>
            <DateTimePicker
              onChange={handleStartDateChange}
              value={dateStart}
              className={"form-control "}
            />
          </div>
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <div>
            <DateTimePicker
              onChange={handleEndDateChange}
              value={dateEnd}
              minDate={dateStart}
              className={"form-control "}
            />
          </div>
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            value={title}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
