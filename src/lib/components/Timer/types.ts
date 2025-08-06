import { Timer } from '@ark-ui/svelte/timer';

export interface Props {
	autoStart?: boolean;
	className?: string;
	countdown?: boolean;
	hideDays?: boolean;
	hideHours?: boolean;
	hideMinutes?: boolean;
	hideReset?: boolean;
	hideToggle?: boolean;
	id?: string;
	interval?: number;
	onComplete?: () => void;
	onTick?: (details: Timer.TickDetails) => void;
	separator?: string;
	startMs?: number;
	targetMs?: number;
}
