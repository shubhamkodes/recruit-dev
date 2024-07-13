export class Aggregator {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  logo: string;

  constructor(id: string, name: string, description: string, rating: number, reviews: number, logo: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.rating = rating;
    this.reviews = reviews;
    this.logo = logo;
  }
}
