import {
  IFrameProtocol,
  ListenerFunction,
  UnsubscribeFunction,
} from './iframe';

export type ClientStatus = 'initializing' | 'idle' | 'done';

export type ClientOptions = {
  iframeUrl?: string | URL;
};

const IFRAME_URL = new URL('http://localhost:5173');

export class IframeClient {
  url: URL;

  status: ClientStatus = 'idle';

  iframe: HTMLIFrameElement;
  element: HTMLElement;
  selector: string | HTMLElement;

  unsubscribeGlobalListener: UnsubscribeFunction;
  unsubscribeChannelListener: UnsubscribeFunction;
  iframeProtocol: IFrameProtocol;

  constructor(selector: string | HTMLElement, options?: ClientOptions) {
    this.selector = selector;
    this.status = 'initializing';

    if (options?.iframeUrl) {
      if (typeof options.iframeUrl === 'string') {
        this.url = new URL(options.iframeUrl);
      } else {
        this.url = options.iframeUrl;
      }
    } else {
      this.url = IFRAME_URL;
    }

    if (typeof selector === 'string') {
      this.selector = selector;
      const element = document.querySelector<HTMLElement>(selector);

      if (!element) {
        throw new Error(`The element '${selector}' was not found`);
      }

      this.element = element;
      if (element.tagName === 'IFRAME') {
        this.iframe = element as unknown as HTMLIFrameElement;
      } else {
        this.iframe = document.createElement('iframe');
      }
      this.initializeElement();
    } else {
      this.element = selector;
      if (selector.tagName === 'IFRAME') {
        this.iframe = selector as unknown as HTMLIFrameElement;
      } else {
        this.iframe = document.createElement('iframe');
      }
    }

    if (!this.iframe.getAttribute('sandbox')) {
      this.iframe.setAttribute(
        'sandbox',
        'allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-downloads allow-pointer-lock',
      );

      this.iframe.setAttribute(
        'allow',
        'accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; clipboard-write;',
      );
    }

    this.setLocationURLIntoIFrame();

    this.iframeProtocol = new IFrameProtocol(this.iframe, this.url);

    this.unsubscribeGlobalListener = this.iframeProtocol.globalListen(
      (mes: Record<string, unknown>) => {
        console.log('unsubscribeGlobalListener from iframe:', mes);
        if (mes.type !== 'initialized' || !this.iframe.contentWindow) {
          return;
        }

        this.iframeProtocol.register();
      },
    );

    this.unsubscribeChannelListener = this.iframeProtocol.channelListen(
      (mes: Record<string, unknown>) => {
        console.log('unsubscribeChannelListener from iframe:', mes);
        switch (mes.type) {
          case 'start': {
            break;
          }
          case 'status': {
            this.status = mes.status as ClientStatus;
            break;
          }
          case 'action': {
            break;
          }
          case 'done': {
            this.status = 'done';
            break;
          }
          case 'state': {
            break;
          }
        }
      },
    );
  }

  public destroy(): void {
    this.unsubscribeChannelListener();
    this.unsubscribeGlobalListener();
    this.iframeProtocol.cleanup();
  }

  public dispatch(message: Record<string, unknown>): void {
    this.iframeProtocol.dispatch(message);
  }

  public listen(listener: ListenerFunction): UnsubscribeFunction {
    return this.iframeProtocol.channelListen(listener);
  }

  public setLocationURLIntoIFrame(): void {
    const urlSource = this.url;

    this.iframe.contentWindow?.location.replace(urlSource);
    this.iframe.src = urlSource.toString();
  }

  private initializeElement(): void {
    this.iframe.style.border = '0';
    this.iframe.style.width = '100%';
    this.iframe.style.height = '100%';
    this.iframe.style.overflow = 'hidden';

    if (!this.element.parentNode) {
      throw new Error('The given iframe does not have a parent.');
    }

    this.element.parentNode!.replaceChild(this.iframe, this.element);
  }
}

export type IframeClientType = InstanceType<typeof IframeClient>;
