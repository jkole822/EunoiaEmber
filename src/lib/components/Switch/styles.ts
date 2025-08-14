import { oneLine } from "common-tags";

export const ContainerStyles = oneLine`
block
outline-none
switch-container
w-fit

data-[state=checked]:[&_.switch-control]:bg-primary-500

data-[state=checked]:in-data-invalid:[&_.switch-control]:bg-red-500

data-[state=checked]:[&_.switch-control_.switch-thumb]:translate-y-[2.3em]

data-[state=checked]:[&_.switch-control:after]:rotate-x-180
data-[state=checked]:[&_.switch-control:after]:-translate-x-[0.45em]
data-[state=checked]:[&_.switch-control:after]:translate-y-[1.2em]

data-[state=checked]:focus-within:[&_.switch-control]:ring-primary-300

data-[state=checked]:in-data-invalid:focus-within:[&_.switch-control]:ring-red-300

data-disabled:cursor-not-allowed

data-disabled:[&_.switch-label]:cursor-not-allowed
data-disabled:[&_.switch-label]:text-primary-600

data-disabled:[&_.switch-control]:bg-primary-600

data-disabled:[&_.switch-control:after]:-translate-x-[22.5%]
data-disabled:[&_.switch-control:after]:[background:linear-gradient(transparent_50%,_--alpha(var(--color-primary-400)_/_0.15)_0)_0_50%_/_50%_100%,_repeating-linear-gradient(90deg,var(--color-primary-400)_0,var(--color-primary-400),var(--color-primary-400)_20%,var(--color-primary-400)_20%,var(--color-primary-400)_40%)_0_50%_/_50%_100%,_radial-gradient(circle_at_50%_50%,var(--color-primary-400)_25%,_transparent_26%)]
data-disabled:[&_.switch-control:after]:[border-left:0.4em_solid_var(--color-primary-400)_!important]
data-disabled:[&_.switch-control:after]:rotate-z-90

data-disabled:[&_.switch-control_.switch-thumb]:bg-primary-400
data-disabled:[&_.switch-control_.switch-thumb]:translate-y-0

focus-within:[&_.switch-control]:ring-[3px]

focus-within:[&_.switch-label:after]:w-full
`;

export const ControlStyles = oneLine`
absolute
bg-primary-400
cursor-pointer
duration-400
inset-0
ring-primary-500
rounded-lg
switch-control

in-data-invalid:ring-red-500

after:[background:linear-gradient(transparent_50%,_--alpha(var(--color-primary-100)_/_0.15)_0)_0_50%_/_50%_100%,_repeating-linear-gradient(90deg,_var(--color-primary-100)_0,_var(--color-primary-100),_var(--color-primary-100)_20%,_var(--color-primary-100)_20%,_var(--color-primary-100)_40%)_0_50%_/_50%_100%,_radial-gradient(circle_at_50%_50%,_var(--color-primary-100)_30%,_transparent_26%)]
after:[border-left:0.4em_solid_var(--color-primary-100)_!important]
after:[border-right:0_solid_transparent_!important]
after:[border:0.25em_solid_transparent]
after:[transition:border-left-color_0.1s_0.3s_ease-out,_translate_0.4s,_transform_0.4s]
after:-translate-x-[22.5%]
after:bg-no-repeat!
after:block
after:box-border
after:h-[1em]
after:left-[0.55em]
after:origin-[25%_50%]
after:relative
after:rotate-x-0
after:rotate-z-90
after:top-[0.5em]
after:w-[2em]
`;

export const FlexContainerStyles = oneLine`
flex
gap-8
items-center
switch-flex-container
`;

export const LabelStyles = oneLine`
cursor-pointer
duration-300
relative
switch-label
text-primary-200
transition-all

after:[transition-timing-function:cubic-bezier(0.25,0.8,0.25,1)]
after:-bottom-0.5
after:absolute
after:bg-primary-500
after:duration-[400ms]
after:h-0.5
after:left-0
after:pointer-events-none
after:transition-all
after:w-0

in-data-invalid:after:bg-red-500   
`;

export const SwitchContainerStyles = oneLine`
inline-block
switch-switch-container
relative
text-[17px]
w-[1.2em]
h-[3.3em]
`;

export const ThumbStyles = oneLine`
-left-[0.6em]
absolute
bg-primary-100
block
duration-400
h-[0.5em]
rounded-lg
shadow-[0_6px_7px_rgba(0,0,0,0.3)]
switch-thumb
top-[0.2em]
w-[2.4em]
`;
