import { oneLine } from 'common-tags';

export const InputStyles = oneLine`
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

focus-visible:ring-primary-600

in-data-invalid:ring-red-600
`;

export const NextPrevTriggerStyles = oneLine`
cursor-pointer
outline-hidden
relative
ring-[1.5px]
ring-primary-800
rounded-full
size-5
transition-colors

focus-visible:bg-primary-200
focus-visible:ring-primary-600
hover:bg-primary-200
`;

export const TableCellTriggerStyles = oneLine`
border-2
border-transparent
cursor-pointer
outline-hidden
rounded
text-center
text-primary-600
transition-colors
w-full

data-unavailable:bg-primary-100
data-unavailable:cursor-not-allowed
data-unavailable:opacity-50

focus-visible:border-primary-600

hover:bg-primary-200
`;

export const TriggerStyles = oneLine`
-translate-y-1/2
absolute
cursor-pointer
outline-hidden
right-4
rounded-full
size-7
top-1/2
transition-colors

focus-visible:bg-primary-200
focus-visible:ring-[1.5px]
focus-visible:ring-primary-600
focus-visible:text-primary-600

hover:bg-primary-300
`;

export const ViewTriggerStyles = oneLine`
cursor-pointer
lowercase
outline-hidden
px-3
py-2
rounded-lg
text-primary-700
tracking-widest
transition-colors

focus-visible:bg-primary-200
focus-visible:ring-[1.5px]
focus-visible:ring-primary-600
hover:bg-primary-200
`;
