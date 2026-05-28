export type SearchSuggestionItem = {
  id: string;
  label: string;
};

export const RECENT_SEARCHES: ReadonlyArray<SearchSuggestionItem> = [
  {id: 'recent-1', label: 'T-Shirts & Polos'},
  {id: 'recent-2', label: 'Jeans'},
  {id: 'recent-3', label: 'Jackets & Coats'},
  {id: 'recent-4', label: 'Trousers & Chinos'},
];

export const TRENDING_SEARCHES: ReadonlyArray<SearchSuggestionItem> = [
  {id: 'trend-1', label: 'Shorts'},
  {id: 'trend-2', label: 'Ethnic'},
  {id: 'trend-3', label: 'Innerwear & Sleepwear'},
  {id: 'trend-4', label: 'Track Pants & Joggers'},
];
