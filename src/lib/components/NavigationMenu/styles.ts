import { oneLine } from 'common-tags';

export const LineStyles = oneLine`
[stroke-linecap:round]
[stroke-linejoin:round]
[transition:stroke-dasharray_600ms_cubic-bezier(0.4,_0,_0.2,_1),_stroke-dashoffset_600ms_cubic-bezier(0.4,_0,_0.2,_1)]
cursor-pointer
duration-300
ease-in-out
fill-none
navigation-menu-line
stroke-3
stroke-primary-100
transition-all

group-hover:!stroke-primary-100
`;

export const LineTopBottomStyles = oneLine`
${LineStyles}
[stroke-dasharray:12_63]
navigation-menu-line-top-bottom
`;

export const LinkStyles = oneLine`
[transition-timing-function:cubic-bezier(0.25,0.8,0.25,1)]
border-none
cursor-pointer
duration-[400ms]
font-extrabold
outline-hidden
relative
text-primary-800
tracking-wide
transition-all
uppercase
w-fit

md:text-primary-200

focus:text-primary-700
md:focus:text-primary-50

hover:text-primary-700
md:hover:text-primary-50

after:-bottom-0.5
after:[transition-timing-function:cubic-bezier(0.25,0.8,0.25,1)]
after:absolute
after:bg-primary-800
after:duration-[400ms]
after:h-0.5
after:left-1/2
after:pointer-events-none
after:transition-all
after:w-0

md:after:bg-primary-500

focus:after:left-0
focus:after:w-full

hover:after:left-0
hover:after:w-full
`;

export const MobileMenuButtonStyles = oneLine`
cursor-pointer
navigation-menu-mobile-menu-button

[&_svg]:cursor-pointer
[&_svg]:duration-[600ms]
[&_svg]:ease-[cubic-bezier(0.4,0,0.2,1)]
[&_svg]:h-8
[&_svg]:transition-transform

in-data-[state=true]:[&_svg]:-rotate-45
in-data-[state=true]:[&_svg]:-translate-x-[0.25px]
in-data-[state=true]:[&_svg]:translate-y-[0.75px]

in-data-[state=true]:[&_svg]:[stroke-dasharray:20_300]

in-data-[state=true]:[&_svg_.navigation-menu-line-top-bottom]:[stroke-dasharray:20_300]
in-data-[state=true]:[&_svg_.navigation-menu-line-top-bottom]:[stroke-dashoffset:-32.42]
`;

export const MobilePopoverStyles = oneLine`
cursor-pointer
duration-300
ease-in-out
group
navigation-menu-mobile-popover
outline-none!
ring-0!
ring-primary-500
rounded-lg
transition-all
md:hidden

focus-visible:ring-2!

[&:hover_.navigation-menu-line]:stroke-primary-500
`;