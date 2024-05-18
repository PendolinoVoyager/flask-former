export type Form = {
  id: string;
  name: string;
  description: string;
  image: string;
  created: EpochTimeStamp;
  components: any[];
};

export enum ComponentType {
  Text = "Text",
  Number = "Number",
  Date = "Date",
  Datetime = "Datetime",
  Time = "Time",
  CheckBox = "CheckBox",
  Radio = "Radio",
}

export interface Component {
  type: ComponentType;
  label: string;
  defaultValue?: unknown;
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
  defaultValue?: number;
  choices: string[];
}
export interface RadioComponent extends Component {
  type: ComponentType.Radio;
  defaultValue?: number;
  choices: string[];
}
export type FormComponentType =
  | TextComponent
  | NumberComponent
  | CheckboxComponent
  | RadioComponent;

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
        defaultValue: 0,
        choices: ["Option 1", "Option 2"],
      };
    case ComponentType.Radio:
      return {
        type: ComponentType.Radio,
        label: "New Radio",
        defaultValue: 0,
        choices: ["Option 1", "Option 2"],
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
