import { isNull, isUndefined } from "./assertion";

export interface ResourceSchema {
  id: number | string;
  url: string;
}

const resourceMap = new Map<string | number, Resource>();

const imgloader =
  ({ decode = true, crossOrigin = "" }) =>
  (record: ResourceSchema | undefined): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (isUndefined(record)) {
        return reject(new Error("No image source found for this resource"));
      }

      const i = new Image();
      if (crossOrigin) i.crossOrigin = crossOrigin;
      i.onload = () => {
        decode && i.decode ? i.decode().then(resolve).catch(reject) : resolve();
      };
      i.onerror = reject;
      i.src = record.url;
    });
  };

// sequential map.find for promises
const promiseFind = (arr: ResourceSchema[]) => {
  let done = false;
  return new Promise<ResourceSchema | undefined>((resolve, reject) => {
    const queueNext = async (record: ResourceSchema | undefined) => {
      if (isUndefined(record)) {
        return undefined;
      }

      return imgloader({ decode: true })(record).then(() => {
        done = true;
        resolve(record);
      });
    };

    arr
      .reduce((p, record) => {
        // ensure we aren't done before enquing the next source
        return p.catch(() => {
          if (!done) return queueNext(record);
        });
      }, queueNext(arr.shift()))
      .catch(reject);
  });
};

interface ResourceConstructor {
  data: ResourceSchema | null;
}

class Resource {
  private _resources: ResourceSchema[] = [];

  private _error: Error | null = null;
  private _loader: ReturnType<typeof promiseFind>;
  private _promise: ReturnType<typeof promiseFind> | null = null;
  private _result: ResourceSchema | null;

  constructor(params: ResourceConstructor) {
    if (params.data) {
      this._resources.push(params.data);
    }

    this._error = null;
    this._loader = promiseFind(this._resources);
    this._promise = null;
    this._result = null;
  }

  /**
   * Loads the resource if necessary.
   */
  load() {
    let promise = this._promise;
    if (promise == null) {
      promise = this._loader
        .then((result) => {
          if (result) {
            this._result = result;
          }
          return result;
        })
        .catch((error: Error) => {
          this._error = error;
          throw error;
        });
      this._promise = promise;
    }
    return promise;
  }

  get() {
    if (this._result != null) {
      return this._result;
    }
  }

  read() {
    if (this._result != null) {
      return this._result;
    } else if (this._error != null) {
      throw this._error;
    } else {
      throw this._promise;
    }
  }
}

// one loading
export const MediaResource = (data: ResourceSchema) => {
  let resource = resourceMap.get(data.id);
  if (isNull(resource) || isUndefined(resource)) {
    resource = new Resource({
      data,
    });
    resourceMap.set(data.id, resource);
  }

  const resourceData = resource.get();

  if (resourceData && data.url !== resourceData.url) {
    // 이미 한번 로드된 데이터인데 이미지가 변경된 경우 다시 로드하도록 한다.
    resource = new Resource({
      data,
    });
    resourceMap.set(data.id, resource);
  }

  return resource;
};
