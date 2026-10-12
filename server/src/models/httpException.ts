/**
 * Borrowed with adjustments, see:
 * https://github.com/gothinkster/node-express-realworld-example-app/
 */
export class HttpException extends Error {
  code: number;
  type: string;

  constructor(
    code: number,
    type: string,
    public readonly message: string,
  ) {
    super(message);
    this.code = code;
    this.type = type;
  }
}

export function isHttpException(error: Error | HttpException): error is HttpException {
  return (
    (error as HttpException).code !== undefined &&
    (error as HttpException).type !== undefined
  );
}

export default HttpException;
