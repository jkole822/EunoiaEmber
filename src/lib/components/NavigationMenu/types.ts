export interface NavigationLink {
	href?: string;
	title?: string;
}

export interface Props {
	className?: string;
	links: NavigationLink[];
	isNavigating?: boolean;
}
