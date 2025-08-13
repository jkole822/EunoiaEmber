<script module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { faker } from "@faker-js/faker";
import NumberInput from "./story.svelte";
import { NumberInputModeEnum } from "./types";
import { ValidationStateEnum } from "$lib/types";

const {Story} = defineMeta({
  title: "NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  args: {
    allowMouseWheel: true,
    allowOverflow: false,
    clampValueOnBlur: true,
    description: faker.lorem.sentence(),
    errorMessage: faker.lorem.sentence(),
    focusInputOnChange: true,
    inputMode: NumberInputModeEnum.Decimal,
		label: faker.lorem.words(2),
    name: faker.lorem.word(),
    readOnly: false,
    required: true,
    spinOnPress: true,
    step: 1,
  },
  argTypes: {
    allowMouseWheel: {
      control: "boolean",
      description: "Enable changing the value using the mouse wheel.",
    },
    allowOverflow: {
      control: "boolean",
      description: "Allow the value to exceed the min/max range.",
    },
    asChild: {
      control: "boolean",
      description: "Use a custom child element as the rendered component.",
    },
    clampValueOnBlur: {
      control: "boolean",
      description: "Clamp the value within min/max when the input loses focus.",
    },
    className: {
      control: "text",
      description: "Class that is applied to top level element.",
    },
    description: {
      control: "text",
      description: "Field description displayed when `withField` is `true`.",
    },
    disabled: {
      control: "boolean",
      description: "Disable the number input.",
    },
    errorMessage: {
      control: "text",
      description:
        "Field error message displayed when `withField` is true and `validationState` is `invalid`.",
    },
    focusInputOnChange: {
      control: "boolean",
      description: "Focus the input when the value changes.",
    },
    form: {
      control: "text",
      description: "Associate the input with a form.",
    },
    formatOptions: {
      control: "object",
      description: "Options for Intl.NumberFormat to format the value.",
    },
    id: {
      control: "text",
      description: "Unique identifier for the component.",
    },
    inputMode: {
      control: "select",
      options: ["decimal", "numeric", "text", "tel", "search", "email", "url"],
      description:
        "Hints at the type of data that might be entered by the user.",
    },
    locale: {
      control: "text",
      description: "Locale for number formatting.",
    },
    max: {
      control: "number",
      description: "Maximum value allowed.",
    },
    min: {
      control: "number",
      description: "Minimum value allowed.",
    },
    modelValue: {
      control: "text",
      description: "The model value of the number input.",
    },
    name: {
      control: "text",
      description: "Name attribute for form submission.",
    },
    onFocusChange: {
      action: "onFocusChange",
      description: "Callback when the input gains or loses focus.",
      table: {
        category: "Events",
      },
    },
    onValueChange: {
      action: "onValueChange",
      description: "Callback when the value changes.",
      table: {
        category: "Events",
      },
    },
    onValueInvalid: {
      action: "onValueInvalid",
      description: "Callback when the value is invalid.",
      table: {
        category: "Events",
      },
    },
    pattern: {
      control: "text",
      description: "Pattern for validating the input value.",
    },
    readOnly: {
      control: "boolean",
      description: "Make the input read-only.",
    },
    required: {
      control: "boolean",
      description: "Mark the input as required.",
    },
    spinOnPress: {
      control: "boolean",
      description:
        "Enable spinning the value when increment/decrement is pressed.",
    },
    step: {
      control: "number",
      description: "Step value for increment/decrement.",
    },
    validationState: {
      control: "select",
      description: "Indicates whether field is `valid` or `invalid`",
      options: [ValidationStateEnum.Valid, ValidationStateEnum.Invalid],
    },
    withField: {
      control: "boolean",
      description:
        "Use label, description, and error message with validation state.",
    },
  },
});
</script>

<Story name="Default" />

<Story name="WithField" args={{ withField: true }} />