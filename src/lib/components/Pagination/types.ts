export interface Props {
	className?: string;
	disableNext?: boolean;
	disablePrev?: boolean;
	nextLabel: string;
	onnext: () => void;
	onprevious: () => void;
	previousLabel: string;
	text: string;
}