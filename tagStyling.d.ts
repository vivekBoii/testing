

export type DSPState = {
  W: {
    W: string;
    H: string;
  };
  minW: {
    W: string;
    H: string;
  };
  maxW: {
    W: string;
    H: string;
  };
};
export type Fills = { color: string, opacity: number, effect: string }[];
export type AdvancedCSSProperties = {name:string, value:string}[];