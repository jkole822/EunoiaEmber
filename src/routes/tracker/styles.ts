import { oneLine } from 'common-tags';

export const ParagraphStyles = oneLine`
after:-bottom-1.5
after:absolute
after:bg-primary-600
after:h-0.5
after:left-0
after:rounded-full
after:w-full
mb-12
relative
`;

export const SlipDateTimeInputContainer = oneLine`
flex
flex-col
gap-4
relative

after:-bottom-4
after:absolute
after:bg-primary-300
after:h-0.5
after:left-0
after:w-full

last:after:hidden

xs:flex-row
xs:gap-4
xs:items-center
`;

export const TitleStyles = oneLine`
bg-primary-100
font-mono
mb-8
text-5xl
text-primary-600
tracking-wider
w-fit
`;