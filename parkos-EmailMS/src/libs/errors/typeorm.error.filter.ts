import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, UseFilters } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { HttpExceptionFilter } from "@app/libs/errors/http-exception.filter";

@Injectable()
@UseFilters(new HttpExceptionFilter())
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      console.log(metatype)
      return value
    }

    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    const errorsObject = {}
    let errorMsgs = []
    if (errors.length > 0) {
      const errorsResponse: any = errors.map((val: any) => {
        for (const key of Object.keys(val.constraints)) {
          if (key == "isNotEmpty") {
            errorMsgs.push("The " + val.property + " field is required.")
          } else {
            errorMsgs.push(val.constraints[key])
          }
        }

        errorsObject[val.property] = errorMsgs
        errorMsgs = []
      })

      throw new BadRequestException({
        message: 'Have ' + (errors.length) + ' error(s)',
        ...errorsObject
      });
    }

    return value
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}