import { BadRequestException, Injectable, NestMiddleware, UseFilters } from '@nestjs/common'
import { json } from 'body-parser'
import { Request, Response } from 'express'
import { HttpExceptionFilter } from '@app/libs/errors/http-exception.filter'

@Injectable()
@UseFilters(new HttpExceptionFilter())
export class BodyMiddleware implements NestMiddleware {
  public constructor() {}

  public use(req: Request, res: Response<any>, next: () => any): any {
    console.log('BodyMiddleWare: ', req.body)
    
    // check if body is empty
    if (Object.keys(req['body']).length === 0) {
      throw new BadRequestException({
        message: 'Please insert query'
      });
    }

    next()
  }
}