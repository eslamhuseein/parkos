import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const Reservation = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.reservation) {
    null;
  }
  
  if (data) {
    return request.reservation[data];
  }

  return request.reservation

})