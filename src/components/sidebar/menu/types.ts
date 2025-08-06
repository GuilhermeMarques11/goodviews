// Define the two possible submenu item types
export interface SubmenuLinkItem {
  text: string;
  href: string;
  component?: never;
}

export interface SubmenuComponentItem {
  text?: never;
  href?: never;
  component: React.ReactNode;
}

// Create a union type for SubmenuItem
export type SubmenuItem = SubmenuLinkItem | SubmenuComponentItem;

// Define the props for MenuItem and Submenu
export interface SubmenuProps {
  text: string | React.ReactNode;
  icon: React.ReactNode;
  submenu?: SubmenuItem[];
}

export interface MenuItemsProps {
  text: string | React.ReactNode;
  href?: string;
  icon: React.ReactNode;
  submenu?: SubmenuItem[];
}
