import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TodoProps = {
  createdAt: string;
  description: string;
  id: string;
  status: string;
  title: string;
}
