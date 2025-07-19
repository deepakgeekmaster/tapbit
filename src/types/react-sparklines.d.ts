// src/types/react-sparklines.d.ts

declare module 'react-sparklines' {
  import * as React from 'react';

  export interface SparklinesProps {
    data: number[];
    limit?: number;
    width?: number;
    height?: number;
    margin?: number;
    min?: number;
    max?: number;
    svgWidth?: number | string;
    svgHeight?: number | string;
    preserveAspectRatio?: string;
    style?: React.CSSProperties;
    /** ✅ Add this to fix your error */
    children?: React.ReactNode;
  }

  export interface SparklinesLineProps {
    color?: string;
    style?: React.CSSProperties;
  }

  export const Sparklines: React.FC<SparklinesProps>;
  export const SparklinesLine: React.FC<SparklinesLineProps>;
}
