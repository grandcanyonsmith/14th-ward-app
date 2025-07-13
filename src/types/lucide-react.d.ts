declare module "lucide-react" {
  import * as React from "react";

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export type LucideIcon = React.FC<LucideProps>;

  // Explicitly declare the icons used in this project. If more icons are needed later, simply add them here.
  export const Activity: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const Calendar: LucideIcon;
  export const Camera: LucideIcon;
  export const Check: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const Clock: LucideIcon;
  export const Eye: LucideIcon;
  export const EyeOff: LucideIcon;
  export const FileText: LucideIcon;
  export const Home: LucideIcon;
  export const Lock: LucideIcon;
  export const LogIn: LucideIcon;
  export const LogOut: LucideIcon;
  export const Mail: LucideIcon;
  export const Menu: LucideIcon;
  export const Mic: LucideIcon;
  export const Plus: LucideIcon;
  export const Shield: LucideIcon;
  export const Star: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const Upload: LucideIcon;
  export const User: LucideIcon;
  export const UserCheck: LucideIcon;
  export const UserPlus: LucideIcon;
  export const Users: LucideIcon;
  export const Video: LucideIcon;
  export const X: LucideIcon;
  export const XCircle: LucideIcon;
  export const Zap: LucideIcon;

  // Fallback export so you can do `import * as icons from 'lucide-react'`.
  const icons: Record<string, LucideIcon>;
  export default icons;
}