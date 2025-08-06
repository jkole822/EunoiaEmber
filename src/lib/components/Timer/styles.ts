import { oneLine } from "common-tags";

export const AreaStyles = oneLine`
flex
justify-center
items-center
timer-area
`;

export const ButtonStyles = oneLine`
bg-neutral-secondary-900
capitalize
inline-flex
gap-1
items-center
outline-none
px-3
py-0.5
ring
ring-primary-600
rounded
text-primary-700
text-sm
timer-button
transition-all

[&_i]:text-xs

focus-visible:ring-2
focus-visible:ring-primary-500
focus-visible:text-primary-600

hover:ring-primary-400
hover:text-primary-500
`;

export const ControlStyles = oneLine`
flex
gap-3
justify-center
items-center
mt-4
timer-control
`;

export const SegmentLabelStyles = oneLine`
text-sm
timer-segment-label
tracking-wider
`;

export const SegmentStyles = oneLine`
flex
flex-col
items-center
justify-start
min-w-15
timer-segment

xs:min-w-18
`;

export const SegmentValueStyles = oneLine`
font-bold
text-2xl
text-primary-600
timer-segment-value

md:text-4xl
`;

export const SeparatorStyles = oneLine`
px-1
text-primary-400
timer-separator
`;
