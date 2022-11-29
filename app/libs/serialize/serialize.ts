import type { AppAPI } from "~/api/schema/api";

interface DataParams<S = any> {
  result: AppAPI<S>;
}

interface DefaultParams<S = any> {
  data: Partial<DataParams<S>> | undefined;
}

export class Serialize {
  static default<S = any>(params: DefaultParams<S>) {
    return params.data?.result?.result;
  }
}
