'use server'
import { Form } from "@/misc/types";
import AnswerComponentFactory from "../formComponents/AnswerComponentFactory";

interface FormAnswerableProps {
    form: Form
}
const FormAnswerable = function({form}: FormAnswerableProps) {
    return <form>
        {form.components.map(c => <AnswerComponentFactory component={c} />)}
    </form>

}
export default FormAnswerable