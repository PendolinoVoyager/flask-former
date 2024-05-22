import { ComponentType, TextComponent } from "@/misc/types";
import styles from "../FormComponent.module.css";
import { ForwardedRef, Ref, forwardRef } from "react";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";
import { useEditableRHF } from "@/misc/hooks";
import EditablePreamble from "../editableHelpers/EditablePreamble";
interface _Props {
  component: TextComponent;
}
const TextComponentEdit = forwardRef(function TextComponentEdit(
  { component }: _Props,
  ref: ForwardedRef<EditComponentHandleInterface<ComponentType.Text>>
) {
  const formState = useEditableRHF<TextComponent>(ref, component);
  return (
    <form
      ref={ref as Ref<HTMLFormElement>}
      className={`${styles.component} ${styles.editing}`}
    >
      <EditablePreamble formState={formState as any} component={component}>
        Text component
      </EditablePreamble>
    </form>
  );
});
export default TextComponentEdit;
