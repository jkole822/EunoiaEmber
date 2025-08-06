import { oneLine } from "common-tags";

export const ControlStyles = oneLine`
-translate-y-1/2
absolute
flex
flex-col
number-input-control
right-0
top-1/2
`;

export const DecrementTriggerStyles = oneLine`
border-l-2
duration-100
px-2.5
py-1
text-xs
transition-colors

in-data-disabled:cursor-not-allowed
in-data-disabled:opacity-50

in-data-invalid:border-red-700

in-data-invalid:in-data-focus:border-red-700

in-data-focus:border-primary-600
`;

export const IncrementTriggerStyles = oneLine`
border-b-2
border-l-2
duration-100
px-2.5
py-1
text-xs
transition-colors

in-data-disabled:cursor-not-allowed
in-data-disabled:opacity-50

in-data-invalid:border-red-700

in-data-invalid:in-data-focus:border-red-700

in-data-focus:border-primary-600
`;

export const InputContainerStyles = oneLine`
number-input-container
relative
w-full
`;

export const InputStyles = oneLine`
duration-200
number-input-input
outline-none
p-3
relative
ring-2
ring-primary-800
rounded-lg
transition-colors
w-full

focus:ring-primary-600

in-data-disabled:cursor-not-allowed
in-data-disabled:opacity-50

in-data-invalid:ring-red-700

in-data-invalid:focus:ring-red-700
`;

