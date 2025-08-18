import { oneLine } from 'common-tags';

export const IntensityCircleStyles = oneLine`
bg-primary-600
flex
font-black
items-center
justify-center
min-w-12
rounded-full
size-12
text-lg
text-primary-100
transition-colors

group-focus:bg-primary-400
group-focus:text-primary-50

group-hover:bg-primary-400
group-hover:text-primary-50
`;

export const ItemStyles = oneLine`
bg-primary-100
flex
gap-4
group
items-center
justify-between
outline-hidden
px-4
py-2
ring-2
rounded-md
transition-colors

focus:ring-primary-600
hover:ring-primary-600
`;