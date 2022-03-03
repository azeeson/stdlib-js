import {noop} from "func-utils";

interface Logger {
    info(...data: any[]): void;
    log(...data: any[]): void;
    warn(...data: any[]): void;
    debug(message?: any, ...optional: any[]): void;
    error(message?: any, ...optional: any[]): void;
}

let _logger: Logger = {
    log: noop,
    error: noop,
    info: noop,
    warn: noop,
    debug: noop,
};

export function setLogger(logger: Logger) {
    _logger = logger;
}

export function getLogger(): Logger {
    return _logger;
}
