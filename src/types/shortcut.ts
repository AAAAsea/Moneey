export interface IShortcutItem {
  date: string;
  cost: number;
  categoryName: string;
  content: string;
  tags: string[];
  organizationName: string;
}

export interface IShortcutState {
  shortcutList: IShortcutItem[];
}
