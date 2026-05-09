export interface CategoryMainItem {
  id: string;
  label: string;
}

export interface CategorySubItem {
  id: string;
  label: string;
}

export interface CategorySubSection {
  id: string;
  title: string;
  items: CategorySubItem[];
}
