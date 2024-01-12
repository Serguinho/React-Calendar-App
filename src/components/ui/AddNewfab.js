import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";

export const AddNewfab = () => {
  const { activeEvent } = useSelector((state) => state.calendar);
  const dispach = useDispatch();
  const handleOpenModal = () => {
    dispach(uiOpenModal());
  };

  return (
    <button className="btn btn-primary fab" onClick={handleOpenModal}>
      <i className={activeEvent ? "fas fa-edit" : "fas fa-plus"}></i>
    </button>
  );
};
