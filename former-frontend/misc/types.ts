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
export type FormComponentType =
  | TextComponent
  | NumberComponent
  | CheckboxComponent
  | RadioComponent
  | DateTimeComponent;

export function createFormComponent(
  componentType: ComponentType
): FormComponentType {
  switch (componentType) {
    case ComponentType.Text:
      return {
        type: ComponentType.Text,
        label: "New Text",
        defaultValue: "",
      };
    case ComponentType.Number:
      return {
        type: ComponentType.Number,
        label: "New Number",
        defaultValue: 0,
        isInteger: false,
      };
    case ComponentType.CheckBox:
      return {
        type: ComponentType.CheckBox,
        label: "New Checkbox",
        choices: ["Option 1", "Option 2"],
      };
    case ComponentType.Radio:
      return {
        type: ComponentType.Radio,
        label: "New Radio",
        choices: ["Option 1", "Option 2"],
      };
    case ComponentType.DateTime:
      return {
        type: ComponentType.DateTime,
        label: "New DateTime",
      };
    default:
      throw new Error(`Unsupported component type: ${componentType}`);
  }
}

export enum ComponentMode {
  "edit",
  "static",
  "answer",
}
