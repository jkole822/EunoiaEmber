export enum HeadingLevelEnum {
	One = "h1",
	Two = "h2",
	Three = "h3",
	Four = "h4",
	Five = "h5",
	Six = "h6"
}

export type HeadingLevels =
	| HeadingLevelEnum.One
	| HeadingLevelEnum.Two
	| HeadingLevelEnum.Three
	| HeadingLevelEnum.Four
	| HeadingLevelEnum.Five
	| HeadingLevelEnum.Six;
