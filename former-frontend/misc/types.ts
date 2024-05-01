type Form = {
  id: string;
  name: string;
  description: string;
  image: string;
  created: EpochTimeStamp;
  components: any[];
};
type Component = {
  label: string;
  default_value: unknown;
  min: undefined | number;
  max: undefined | number;
  is_integer: boolean | undefined;
};
