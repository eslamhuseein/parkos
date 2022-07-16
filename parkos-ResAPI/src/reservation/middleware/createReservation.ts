import { BadRequestException, Injectable, NestMiddleware, UseFilters } from '@nestjs/common'
import { Request, Response } from 'express'
import { HttpExceptionFilter } from '@app/libs/errors/http-exception.filter'

@Injectable()
@UseFilters(new HttpExceptionFilter())
export class createReservationMiddleware implements NestMiddleware {
  public constructor() { }

  async use(req: Request, res: Response<any>, next: () => any): Promise<any> {
    await this.checkBody(req['body']);
    await this.checkBodyReservation(req['body']);
    next();
  }

  // check body is not empty
  async checkBody(body: any) {
    // check if body is empty
    if (Object.keys(body).length === 0) {
      this.returnError();
    }
    return true;
  }

  // check body has reservation json object
  async checkBodyReservation(body: any) {
    if ('reservation' in body) {
      if (body.reservation === null || body.reservation.constructor !== Object) {
        this.returnError();
      } else {
        return true;
      }
    } else {
      this.returnError();
    }

    return true;
  }

  // response error
  returnError() {
    throw new BadRequestException({
      message: 'Please insert correct query'
    });
  }
}