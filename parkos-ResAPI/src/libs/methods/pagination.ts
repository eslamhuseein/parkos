import { isNotEmpty, isNumber } from "class-validator";

// get paramter limits
export class Pagination {
  limit: number = 20;

  constructor(Limit: any) {
    this.getLimit(Limit)
  }

  getLimit(Limit: any) {
    Limit = parseInt(Limit)
    if (isNumber(Limit) && isNotEmpty(Limit)) {
      this.limit = Limit
    }
    
    return this.limit
  }
}