import { useContext } from "react";
import classes from "./FormConstructor.module.css";
import {
  DispatchActions,
  FormConstructorContext,
} from "@/stores/formConstructorContext";
const FormConstructorFinish = function () {
  const { dispatch } = useContext(FormConstructorContext);
  const goBack = () => dispatch({ type: DispatchActions.BACK });
  const goSubmit = () => dispatch({ type: DispatchActions.PROCEED });
  return (
    <form>
      <input type="text" placeholder="Your form name" required></input>
      <input type="password" placeholder="Your unique key"></input>
      <div className="center">
        <button type="button" className={classes.submitBtn} onClick={goBack}>
          Return
        </button>
        <button type="button" className={classes.submitBtn} onClick={goSubmit}>
          Continue
        </button>
      </div>
    </form>
  );
};
export default FormConstructorFinish;
