
type TListenerFn<T> = (data: T) => void;

export class EventManager<T> {
    listeners: TListenerFn<T>[] = [];

    subscribe(handler: TListenerFn<T>) {
        const idx = this.listeners.push(handler);
        return () => {
            this.listeners.splice(idx, 1);
        };
    }

    unsubscribe(handler: TListenerFn<T>) {
        const idx = this.listeners.indexOf(handler);
        this.listeners.splice(idx, 1);
    }

    push(data: T) {
        this.listeners.forEach(listener => {
            listener(data);
        });
    }
}
