import { Meteor } from 'meteor/meteor';
import loggerMsgs from '/imports/db/loggerMsgs';

const DEFAULT_SETTINGS = {
  logLevel: 3, // 1=fatal, 2=error, 3=warn, 4=log, 5=info, 6=debug, 0=off
  logDB: false
};

export default class BaseLogger {
  /* eslint-disable no-alert, no-console */
  constructor(settings) {
    this.console = console;
    this._id = null;
    this.settings = Object.assign(DEFAULT_SETTINGS, settings);
  }

  log(msg, obj) {
    if (this.logLevel >= 4) {
      this.updateCollection('L', msg, obj);
      obj ? this.console.log(msg, obj) : this.console.log(msg);
    }
  }

  info(msg, obj) {
    if (this.logLevel >= 5) {
      this.updateCollection('I', msg, obj);
      obj ? this.console.info(msg, obj) : this.console.info(msg);
    }
  }

  debug(msg, obj) {
    if (this.logLevel >= 6) {
      this.updateCollection('D', msg, obj);
      obj ? this.console.debug(msg, obj) : this.console.debug(msg);
    }
  }

  warn(msg, obj) {
    if (this.logLevel >= 3) {
      this.updateCollection('W', msg, obj);
      obj ? this.console.warn(msg, obj) : this.console.warn(msg);
    }
  }

  error(msg, obj) {
    if (this.logLevel >= 2) {
      this.updateCollection('E', msg, obj);
      obj ? this.console.error(msg, obj) : this.console.error(msg);
    }
  }

  fatal(msg, obj) {
    if (this.logLevel >= 1) {
      this.updateCollection('F', msg, obj);
      obj ? this.console.fatal(msg, obj) : this.console.fatal(msg);
    }
  }
  /* eslint-enable no-alert, no-console */

  setEnableLogDB(newValue) {
    this.settings.logDB = newValue;
  }

  setId(_id) {
    this._id = _id;
  }

  getId() {
    return this._id;
  }

  setUserId() {
    loggerMsgs.update(
      { _id: this.getId() },
      {
        $set: {
          userId: Meteor.userId()
        }
      }
    );
  }

  updateCollection(type, msg, obj) {
    if (!this.settings.logDB) return;

    let text = '';
    let prefix = '';
    let suffix = '';

    try {
      prefix = typeof msg === 'string' ? msg : JSON.stringify(msg);
    } catch (ex) {
      prefix = '<Error:msg>';
    }
    if (obj) {
      try {
        suffix = typeof obj === 'string' ? obj : JSON.stringify(obj);
      } catch (ex) {
        suffix = '<Error:obj>';
      }
    }

    text = prefix + (suffix ? (';' + suffix) : '');

    if (this._id) {
      loggerMsgs.update(
        { _id: this._id },
        {
          $push: {
            msgs: {
              type: type,
              msgTime: (new Date()).getTime(),
              text: text,
              url: Meteor.isClient ? window.location.pathname : ''
            }
          }
        }
      );
    }
  }
}