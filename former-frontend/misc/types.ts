export type Form = {
  id: string;
  name: string;
  description: string;
  image: string;
  created: EpochTimeStamp;
  components: FormComponentType[];
};

export enum ComponentType {
  Text = "text",
  Number = "number",
  Date = "date",
  DateTime = "datetime",
  Time = "time",
  CheckBox = "checkbox",
  Radio = "radio",
}

export interface Component {
  type: ComponentType;
  label: string;
  required: boolean;
}

export interface TextComponent extends Component {
  type: ComponentType.Text;
  defaultValue?: string;
}

export interface NumberComponent extends Component {
  type: ComponentType.Number;
  defaultValue?: number;
  min?: number;
  max?: number;
  isInteger?: boolean;
}

export interface CheckboxComponent extends Component {
  type: ComponentType.CheckBox;
  choices: string[];
}
export interface RadioComponent extends Component {
  type: ComponentType.Radio;
  choices: string[];
}
export interface DateTimeComponent extends Component {
  type: ComponentType.DateTime;
  defaultValue?: string;
}
export interface TimeComponent extends Component {
  type: ComponentType.Time;
  defaultValue?: string;
}
export interface DateComponent extends Component {
  type: ComponentType.Date;
  defaultValue?: string;
}
export type FormComponentType =
  | TextComponent
  | NumberComponent
  | CheckboxComponent
  | RadioComponent
  | DateTimeComponent
  | TimeComponent
  | DateComponent;

export function createFormComponent(
  componentType: ComponentType
): FormComponentType {
  switch (componentType) {
    case ComponentType.Text:
      return {
        type: ComponentType.Text,
        label: "New Text",
        required: true,
        defaultValue: "",
      };
    case ComponentType.Number:
      return {
        type: ComponentType.Number,
        label: "New Number",
        defaultValue: 0,
        required: true,
        isInteger: false,
      };
    case ComponentType.CheckBox:
      return {
        type: ComponentType.CheckBox,
        label: "New Checkbox",
        required: true,
        choices: ["Option 1", "Option 2"],
      };
    case ComponentType.Radio:
      return {
        type: ComponentType.Radio,
        label: "New Radio",
        required: true,
        choices: ["Option 1", "Option 2"],
      };
    case ComponentType.DateTime:
      return {
        type: ComponentType.DateTime,
        required: true,
        label: "New DateTime",
      };
    case ComponentType.Time:
      return {
        type: ComponentType.Time,
        required: true,
        label: "New Time",
      };
    case ComponentType.Date:
      return {
        type: ComponentType.Date,
        required: true,
        label: "New Date",
      };
    default:
      throw new Error(`Unsupported component type: ${componentType}`);
  }
}
export function getNativeHTMLInputType(component: ComponentType): string {
  if (component === ComponentType.DateTime) return "datetime-local";
  else return component;
}
export enum ComponentMode {
  "edit",
  "static",
  "answer",
}
