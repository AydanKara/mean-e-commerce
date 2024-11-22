export interface SubCategory {
  _id: string;
  name: string;
  img: string;
}

export interface Category {
  _id: string;
  name: string;
  subcategories: SubCategory[];
}
