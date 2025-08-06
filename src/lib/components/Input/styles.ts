import { oneLine } from "common-tags";

export const ContainerStyles = oneLine`
relative
w-full
`;

export const InputStyles = oneLine`
bg-transparent
duration-200
ease-[cubic-bezier(0.4,0,0.2,1)]
outline-hidden
p-4
ring-2
ring-primary-800
rounded-lg
text-primary-800
transition-all
w-full

disabled:cursor-not-allowed
disabled:opacity-50

focus:ring-primary-600

[&:focus_~_label]:-translate-y-[55%]
[&:focus_~_label]:bg-primary-200
[&:focus_~_label]:opacity-100
[&:focus_~_label]:px-1
[&:focus_~_label]:scale-[0.8]
[&:focus_~_label]:text-primary-600

[&[type=date]_~_label]:-translate-y-[55%]
[&[type=date]_~_label]:bg-primary-200
[&[type=date]_~_label]:opacity-100
[&[type=date]_~_label]:px-1
[&[type=date]_~_label]:scale-[0.8]
[&[type=date]_~_label]:text-primary-600

[&[type=time]_~_label]:-translate-y-[55%]
[&[type=time]_~_label]:bg-primary-200
[&[type=time]_~_label]:opacity-100
[&[type=time]_~_label]:px-1
[&[type=time]_~_label]:scale-[0.8]
[&[type=time]_~_label]:text-primary-600

[&::-webkit-calendar-picker-indicator]:[filter:invert(13%)_sepia(82%)_saturate(4636%)_hue-rotate(33deg)_brightness(100%)_contrast(105%)]
[&::-webkit-calendar-picker-indicator]:cursor-pointer
[&::-webkit-calendar-picker-indicator]:outline-offset-2
[&::-webkit-calendar-picker-indicator]:rounded

[&::-webkit-datetime-edit-day-field]:cursor-pointer
[&::-webkit-datetime-edit-day-field]:rounded-sm   
  
[&::-webkit-datetime-edit-day-field:focus]:bg-transparent
[&::-webkit-datetime-edit-day-field:focus]:ring-2
[&::-webkit-datetime-edit-day-field:focus]:ring-primary-600

[&::-webkit-datetime-edit-month-field]:cursor-pointer
[&::-webkit-datetime-edit-month-field]:ml-0.5
[&::-webkit-datetime-edit-month-field]:rounded

[&::-webkit-datetime-edit-month-field:focus]:bg-transparent
[&::-webkit-datetime-edit-month-field:focus]:ring-2
[&::-webkit-datetime-edit-month-field:focus]:ring-primary-600
[&::-webkit-datetime-edit-month-field]:cursor-pointer

[&::-webkit-datetime-edit-year-field]:cursor-pointer
[&::-webkit-datetime-edit-year-field]:rounded

[&::-webkit-datetime-edit-year-field:focus]:bg-transparent
[&::-webkit-datetime-edit-year-field:focus]:ring-2
[&::-webkit-datetime-edit-year-field:focus]:ring-primary-600

data-invalid:ring-red-700

[&[data-invalid]:focus_~_label]:text-red-700

[&[data-invalid]::-webkit-datetime-edit-day-field:focus]:ring-red-700
[&[data-invalid]::-webkit-datetime-edit-month-field:focus]:ring-red-700
[&[data-invalid]::-webkit-datetime-edit-year-field:focus]:ring-red-700

data-[raise-label=true]:ring-primary-600
data-[raise-label=true]:[&_~_label]:-translate-y-[55%]
data-[raise-label=true]:[&_~_label]:bg-primary-200
data-[raise-label=true]:[&_~_label]:opacity-100
data-[raise-label=true]:[&_~_label]:px-1
data-[raise-label=true]:[&_~_label]:scale-[0.8]
data-[raise-label=true]:[&_~_label]:text-primary-600

data-[raise-label=true]:[&[data-invalid]_~_label]:text-red-700
`;

export const LabelStyles = oneLine`
absolute
duration-200
ease-[cubic-bezier(0.4,0,0.2,1)]
left-4
opacity-60
pointer-events-none
text-primary-800
translate-y-4
transition-all
`;
