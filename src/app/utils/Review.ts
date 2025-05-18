// utils/Review.ts
export class Review {
  constructor(
    public productId: string,
    public username: string,
    public rating: number,
    public comment: string,
    public date: Date = new Date()
  ) {}
}
