import { oneLine } from 'common-tags';

export const CenterAbsoluteStyles = oneLine`
-translate-x-1/2
-translate-y-1/2
absolute
left-1/2
top-1/2
`;

export const DescriptionStyles = oneLine`
block
description
text-neutral-primary-400
text-sm
`;

export const ErrorMessageStyles = oneLine`
block
error-message
font-medium
text-red-600
text-sm
`;

export const HeadingStyles = oneLine``;

export const IconStyles = oneLine`
fa-solid
fa-fire
`;

export const LabelStyles = oneLine`
block
capitalize
duration-200
font-medium
mb-2
select-label
text-primary-600
text-sm
transition-colors

in-data-invalid:text-red-600
`;

export const ParagraphStyles = oneLine``;

export const SubHeadingStyles = oneLine`
font-bold
mt-4
text-primary-600
tracking-wide
uppercase
`;
