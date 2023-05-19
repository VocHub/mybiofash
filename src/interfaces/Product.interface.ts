
export interface IProductPresentation {
  id: string,
  presentation: string,
  units: number,
  cost: number
}

export interface IProduct {
  id: string,
  active: boolean,
  store_id: string,
  category_code: string,
  views: number,
  tags: string[]
  name: string,
  images: string[],
  description: string,
  benefit: string,
  vegan: boolean,
  presentations: IProductPresentation[]
}
