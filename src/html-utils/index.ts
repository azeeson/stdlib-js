import {isFunction} from "../base-utils/index";

interface ElementEventTarget extends EventTarget {
    dataset: DOMStringMap
}

interface ElementEvent extends Event {
    currentTarget: ElementEventTarget | null;
    target: ElementEventTarget | null;
}
/**
 * Получить значения ключа даты из события.
 *
 * @param {Event} event Событие.
 * @param {string} key Ключ.
 */
export const getEventDataValue = <Event extends ElementEvent>(event: Event, key: string): string | null =>
    event?.currentTarget?.dataset?.[key] ?? null;




export type Null<T> = T | null | undefined;

export interface FileTargetEvent extends EventTarget {
    readonly files: FileList;
}

export interface FileEvent extends Event {
    readonly currentTarget: FileTargetEvent | null;
    readonly target: FileTargetEvent | null;
}

export interface DragZoneEvent<E> extends DragEvent {
    readonly currentTarget: E & EventTarget;
}

export interface ElementEventMap<E extends HTMLElement = HTMLElement> extends HTMLElementEventMap {
    dragenter: DragZoneEvent<E>;
    dragover: DragZoneEvent<E>;
    dragleave: DragZoneEvent<E>;
    drop: DragZoneEvent<E>;
    change: FileEvent;
}

export type Error = any;

type TEventListener<E extends HTMLElement, K extends keyof ElementEventMap<E>> = (ev: ElementEventMap<E>[K]) => any;

export const subEventListener = <
    E extends HTMLElement,
    K extends keyof ElementEventMap
>(element: E | null, type: K, listener: TEventListener<E, K> | undefined, options?: boolean | EventListenerOptions): () => void => {
    isFunction(listener) && element?.addEventListener(type, listener as any, options);
    return function remove() {
        isFunction(listener) && element?.removeEventListener(type, listener as any, options);
    };
};

export function preventDefaults<E extends Event>(event: E): E {
    event.preventDefault();
    event.stopPropagation();
    return event;
}
