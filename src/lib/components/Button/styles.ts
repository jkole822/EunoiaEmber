import { oneLine } from 'common-tags';

export const CircleStyles = oneLine`
-z-1
animate-button-pulse
blur-xl
h-7.5
w-full

[&:nth-of-type(1)]:bg-primary-300
[&:nth-of-type(2)]:bg-primary-600

group-active:bg-red-500
`;

export const DefaultStyles = oneLine`
bg-primary-800
cursor-pointer
font-medium
outline-hidden
px-4
py-2
ring-primary-600
rounded-lg
text-primary-50
tracking-wide
transition-all

active:bg-primary-900

disabled:bg-primary-800
disabled:cursor-not-allowed
disabled:opacity-50

focus-visible:ring-3

hover:bg-primary-700
`;

export const EmphasisStyles = oneLine`
[background-clip:content-box,border-box]
[background-image:linear-gradient(var(--color-primary-900),var(--color-primary-900)),linear-gradient(137.48deg,var(--color-primary-300)_10%,var(--color-primary-500)_45%,var(--color-primary-700)_67%,var(--color-primary-900)_87%)]
[background-origin:border-box]
[background-size:300%_300%]
animate-button-gradient 
backdrop-blur-lg
bg-gradient-to-r
border-4
border-transparent
cursor-pointer
duration-500
flex
font-medium
group
h-12
items-center
justify-center
outline-offset-5
outline-primary-900
overflow-hidden 
relative
rounded-full
text-sm
text-white 
tracking-widest
transition-all
uppercase
w-52

active:border-primary-900

hover:scale-110
`;

export const EmphasisTextStyles = oneLine`
text-shadow-[0_0_4px_white]
text-white
tracking-widest
z-2
`;

export const GlowContainerStyles = oneLine`
absolute
flex
w-48
`;

export const StarsContainerStyles = oneLine`
-z-1
absolute
backdrop-blur-lg
duration-500
overflow-hidden
rounded-full
size-full

group-hover:bg-primary-800
group-hover:z-1
`;

export const StarStyles = oneLine`
bg-transparent
relative
size-800

after:-left-400
after:-top-40
after:absolute
after:animate-button-star-rotate
after:bg-[radial-gradient(var(--color-primary-50)_1px,_transparent_1%)]
after:bg-size-[50px_50px]
after:size-full

before:-left-1/2
before:absolute
before:animate-button-star
before:bg-[radial-gradient(var(--color-primary-50)_1px,_transparent_1%)]
before:bg-size-[50px_50px]
before:h-[500%]
before:opacity-50
before:top-0
before:w-[170%]
`;
