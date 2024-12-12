export interface Game {
  id: number;
  name: string;
  summary: string;
  coverUrl: string;
  platformId: number;
  first_release_date: number;
  rating: number;
  url: string;
}

export interface Platform {
  id: number;
  name: string;
  image_id: string;
  iconUrl: string;
  coverUrl:string;
}