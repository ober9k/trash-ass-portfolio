import { Token } from "./token";

export type Asset = {
  name:     string,
  token:   Token,
  quantity: number,
  fee:      number,
  total:    number,
  average:  number,
  value:    number, /* TODO: rename */
};
