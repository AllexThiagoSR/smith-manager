type OkStatusCode = 201 | 200;
type ErrorStatusCode = 400 | 404 | 500 | 401;

type ServiceReturn<Type> = {
  status: OkStatusCode | ErrorStatusCode,
  data: Type | { message: string }
};

export default ServiceReturn;
