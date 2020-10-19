  
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

import {
  ILogListener,
  ILogEntry
} from "@pnp/logging";

export default class ApplicationInsightsLoggerListener implements ILogListener {

  private _appInsights: ApplicationInsights;

  constructor() {
    this._appInsights = new ApplicationInsights({ config: {
      instrumentationKey: 'e8b524ac-23c2-433a-bf91-4636050a2459'
    } });
    this._appInsights.loadAppInsights();
  }

  public log(entry: ILogEntry): void {
    this._appInsights.trackTrace({message: entry.message});
  }
}