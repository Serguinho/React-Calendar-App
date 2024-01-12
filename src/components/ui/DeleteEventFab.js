import { useDispatch} from "react-redux";
import { eventStartDelete } from "../../actions/events";

export const DeleteEventFab = () => {

  const dispach = useDispatch();
  const handleDeleteEvent = () => {
    dispach(eventStartDelete());
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDeleteEvent}>
      <i className="fas fa-trash"></i>
      <span> Delete event</span>
    </button>
  );
};
