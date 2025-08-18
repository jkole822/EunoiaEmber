import { oneLine } from 'common-tags';

export const ToggleItemStyles = oneLine`
bg-primary-50
cursor-pointer
font-semibold
lowercase
outline-hidden
px-3
ring
ring-primary-700
text-lg
text-primary-700
tracking-wider
transition-all

first:rounded-bl
first:rounded-tl

last:rounded-br
last:rounded-tr

data-[state='on']:bg-primary-300
data-[state='on']:text-primary-900

focus:ring-2
focus:z-10

hover:bg-primary-200
hover:text-primary-800
`;