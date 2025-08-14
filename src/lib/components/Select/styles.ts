import { oneLine } from "common-tags";

export const ContentStyles = oneLine`
bg-primary-100
max-h-50
outline-hidden
overflow-scroll
px-3
py-2
ring-1
ring-primary-700
rounded-lg
select-content
w-[var(--reference-width)]
`;

export const ItemDescriptionStyles = oneLine`
font-light
select-item-description
text-primary-400
text-sm
`;

export const ItemIndicatorStyles = oneLine`
-translate-y-1/2
absolute
right-2
select-item-indicator
text-primary-500
top-1/2

group-data-highlighted:text-primary-800
`;

export const ItemLabelStyles = oneLine`
select-item-label
font-medium
`;

export const ItemStyles = oneLine`
cursor-pointer
duration-200
group
mx-0.5
my-1.5
outline-none
px-2
py-1
relative
ring-primary-500
rounded-md
select-item
transition-colors

[&_>_span]:flex
[&_>_span]:flex-col

data-disabled:bg-primary-50
data-disabled:cursor-not-allowed
data-disabled:text-primary-300

data-disabled:[&_.select-item-description]:text-primary-200

data-highlighted:bg-primary-200
data-highlighted:ring-1

data-highlighted:[&_.select-item-description]:text-primary-700
`;

export const TriggerStyles = oneLine`
cursor-pointer
flex
justify-between
duration-200
outline-none
p-4
relative
ring-2
ring-primary-800
rounded-lg
select-control
text-primary-800
transition-colors
w-full

disabled:cursor-not-allowed
disabled:opacity-50

in-data-invalid:ring-red-600

data-placeholder-shown:[&_span:first-child]:opacity-60

focus-visible:ring-primary-500
`;
