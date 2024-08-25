export type Ok<T> = {
    ok: true;
    value: T;
};

export type Err<E> = {
    ok: false;
    error: E;
};

export type Result<T, E> = Ok<T> | Err<E>;

export function ok<T>(value: T): Ok<T> {
    return { ok: true, value };
}

export function err<E>(error: E): Err<E> {
    return { ok: false, error };
}

export function map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
    if (result.ok) {
        return ok(fn(result.value));
    }
    return result;
}
