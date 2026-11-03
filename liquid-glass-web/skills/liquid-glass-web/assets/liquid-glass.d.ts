// Liquid Glass Web — component types (documentation). Global: window.LG

type Children = React.ReactNode;
type IconName =
  | "home" | "search" | "plus" | "close" | "check" | "chevron" | "back" | "more" | "bell" | "key"
  | "shield" | "person" | "gear" | "share" | "trash" | "filter" | "clock" | "warning" | "info";

/** The glass material on any element. Functional layer only. */
export interface GlassProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "regular" | "clear";
  shape?: "rounded" | "capsule" | "circle";
  /** Element tag to render. Default "div". */
  as?: keyof JSX.IntrinsicElements;
  /** Rim only, no drop shadow. */
  flat?: boolean;
  children?: Children;
}

/** Capsule action. One prominent per view. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "glass" | "prominent" | "clear" | "plain";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: IconName;
  destructive?: boolean;
  /** Required when the button has only an icon. */
  "aria-label"?: string;
  children?: Children;
}

/** Related actions sharing one capsule of glass. */
export interface GlassGroupProps {
  label: string;
  separators?: boolean;
  variant?: "regular" | "clear";
  className?: string;
  children: Children;
}

/** Floating top bar with scroll edge effect. */
export interface ToolbarProps {
  title?: string;
  label?: string;
  leading?: Children;
  trailing?: Children;
  edge?: "top" | "bottom" | false;
  className?: string;
  style?: React.CSSProperties;
}

export interface TabItem { id: string; label: string; icon: IconName }
/** Floating tab bar; search sits apart at the trailing end. */
export interface TabBarProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  onSearch?: () => void;
  minimized?: boolean;
  label?: string;
  className?: string;
}

/** Binary switch; knob turns to glass while pressed. */
export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Forces the pressed look (documentation and previews). */
  pressed?: boolean;
  "aria-label"?: string;
  children?: Children;
  className?: string;
}

/** Capsule search input. */
export interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placement?: "glass" | "surface";
}

export interface MenuItem { id?: string; label: string; icon?: IconName; destructive?: boolean }
/** Glass action list that grows from its trigger. */
export interface MenuProps {
  items: (MenuItem | "-")[];
  onSelect?: (id: string) => void;
  label?: string;
  /** CSS transform-origin pointing at the trigger. Default "top right". */
  origin?: string;
  className?: string;
  style?: React.CSSProperties;
}

/** Bottom sheet: glass at medium, opaque surface + scrim at large. */
export interface SheetProps {
  title: string;
  detent?: "medium" | "large";
  open?: boolean;
  onClose?: () => void;
  action?: Children;
  contained?: boolean;
  id?: string;
  className?: string;
  children?: Children;
}

export interface ListRow {
  title: string;
  subtitle?: string;
  detail?: string;
  icon?: IconName;
  accessory?: Children;
  onClick?: () => void;
}
/** Grouped list section on surface. */
export interface ListSectionProps {
  header?: string;
  footer?: string;
  rows: ListRow[];
  className?: string;
}

/** Glyph + word status label. */
export interface StatusProps {
  tone?: "positive" | "warning" | "critical";
  children: Children;
  className?: string;
}

/** Stroke icon in currentColor. */
export interface IconProps {
  name: IconName;
  label?: string;
  size?: number | string;
  weight?: number;
  className?: string;
}

declare global {
  interface Window {
    LG: {
      Glass: React.FC<GlassProps>;
      Button: React.FC<ButtonProps>;
      GlassGroup: React.FC<GlassGroupProps>;
      Toolbar: React.FC<ToolbarProps> & { Spacer: React.FC<{ fixed?: boolean }> };
      TabBar: React.FC<TabBarProps>;
      Toggle: React.FC<ToggleProps>;
      SearchField: React.FC<SearchFieldProps>;
      Menu: React.FC<MenuProps>;
      Sheet: React.FC<SheetProps>;
      ListSection: React.FC<ListSectionProps>;
      Status: React.FC<StatusProps>;
      Icon: React.FC<IconProps> & { names: IconName[] };
    };
  }
}
