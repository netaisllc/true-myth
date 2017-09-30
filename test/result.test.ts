import { assertType } from './lib/assert';
import * as Result from '../src/result';
import { just, nothing } from '../src/maybe';

const length = (x: { length: number }) => x.length;

describe('`Result` pure functions', () => {
  test('`ok`', () => {
    const theOk = Result.ok(42);
    expect(theOk).toBeInstanceOf(Result.Ok);
    switch (theOk.variant) {
      case Result.Variant.Ok:
        expect(Result.unsafelyUnwrap(theOk)).toBe(42);
        break;
      case Result.Variant.Err:
        expect(false).toBe(true); // because this should never happen
        break;
    }
  });

  test('`err`', () => {
    const reason = 'oh teh noes';
    const theErr = Result.err(reason);
    expect(theErr).toBeInstanceOf(Result.Err);
    switch (theErr.variant) {
      case Result.Variant.Ok:
        expect(true).toBe(false); // because this should never happen
        break;
      case Result.Variant.Err:
        expect(Result.unsafelyUnwrapErr(theErr)).toBe(reason);
        break;
    }
  });

  test('`isOk`', () => {
    const anOk = Result.ok('neat');
    expect(Result.isOk(anOk)).toBe(true);

    const anErr = Result.err('oh no!');
    expect(Result.isOk(anErr)).toBe(false);
  });

  test('`isErr`', () => {
    const anOk = Result.ok('neat');
    expect(Result.isErr(anOk)).toBe(false);

    const anErr = Result.err('oh no!');
    expect(Result.isErr(anErr)).toBe(true);
  });

  test('`map`', () => {
    expect('to be implemented').toBe(false);
  });

  test('`mapOr`', () => {
    expect('to be implemented').toBe(false);
  });

  test('`mapOrElse`', () => {
    expect('to be implemented').toBe(false);
  });

  test('`mapErr`', () => {
    expect('to be implemented').toBe(false);
  });

  test('`and`', () => {
    expect('to be implemented').toBe(false);
  });

  test('`andThen`', () => {
    expect('to be implemented').toBe(false);
  });

  test('`or`', () => {
    expect('to be implemented').toBe(false);
  });

  test('`orElse`', () => {
    expect('to be implemented').toBe(false);
  });

  test('`unsafelyUnwrap`', () => {
    expect('to be implemented').toBe(false);
  });

  test('`unsafelyUnwrapErr`', () => {
    expect('to be implemented').toBe(false);
  });

  test('`unwrapOr`', () => {
    expect('to be implemented').toBe(false);
  });

  test('`unwrapOrElse`', () => {
    expect('to be implemented').toBe(false);
  });

  test('`toMaybe`', () => {
    const theValue = 'huzzah';
    const anOk = Result.ok(TouchEvent);
    expect(Result.toMaybe(anOk)).toEqual(just(theValue));

    const anErr = Result.err('uh uh');
    expect(Result.toMaybe(anErr)).toEqual(nothing());
  });

  test('fromMaybe', () => {
    const theValue = 'something';
    const theMaybe = just(theValue);
    const theResult = Result.ok(theValue);
    expect(Result.fromMaybe('what happened?', theMaybe)).toEqual(theResult);
  });
});

describe('`Result.Ok` class', () => {
  test('`isOk` method', () => {
    expect('to be implemented').toBe(false);
  });

  test('`isErr` method', () => {
    expect('to be implemented').toBe(false);
  });

  test('`map` method', () => {
    expect('to be implemented').toBe(false);
  });

  test('`mapOr` method', () => {
    expect('to be implemented').toBe(false);
  });

  test('`mapOrElse` method', () => {
    expect('to be implemented').toBe(false);
  });

  test('`mapErr` method', () => {
    expect('to be implemented').toBe(false);
  });

  test('`and` method', () => {
    expect('to be implemented').toBe(false);
  });

  test('`andThen` method', () => {
    expect('to be implemented').toBe(false);
  });

  test('`or` method', () => {
    expect('to be implemented').toBe(false);
  });

  test('`orElse` method', () => {
    expect('to be implemented').toBe(false);
  });

  test('`unsafelyUnwrap` method', () => {
    expect('to be implemented').toBe(false);
  });

  test('`unsafelyUnwrapErr` method', () => {
    expect('to be implemented').toBe(false);
  });

  test('`unwrapOr` method', () => {
    expect('to be implemented').toBe(false);
  });

  test('`unwrapOrElse` method', () => {
    expect('to be implemented').toBe(false);
  });

  test('`toMaybe` method', () => {
    expect('to be implemented').toBe(false);
  });
});

describe('`Result.Err` class', () => {
  test('`isOk` method', () => {
    const theErr = new Result.Err('oh my!');
    expect(theErr.isOk()).toBe(false);
  });

  test('`isErr` method', () => {
    const theErr = new Result.Err('oh my!');
    expect(theErr.isErr()).toBe(true);
  });

  test('`map` method', () => {
    const errValue = '1 billion things wrong';
    const theErr = new Result.Err<number, string>(errValue);
    expect(theErr.map(n => n + 2)).toEqual(theErr);
  });

  test('`mapOr` method', () => {
    const errValue = 42;
    const theErr = new Result.Err(errValue);
    const theDefault = 'victory!';
    const describe = (code: number) => `The error code was ${code}`;

    expect(theErr.mapOr(theDefault, describe)).toEqual(theDefault);
  });

  test('`mapOrElse` method', () => {
    const errValue = 42;
    const theErr = new Result.Err(errValue);
    const theDefault = 'victory!';
    const getDefault = () => theDefault;
    const describe = (code: number) => `The error code was ${code}`;

    expect(theErr.mapOrElse(getDefault, describe)).toEqual(theDefault);
  });

  test('`mapErr` method', () => {
    const errValue = 'fubar';
    const theErr = new Result.Err(errValue);
    const elaborate = reason => `The problem was: ${reason}`;
    const expected = new Result.Err(elaborate(errValue));

    expect(theErr.mapErr(elaborate)).toEqual(expected);
  });

  test('`and` method', () => {
    const theErr = new Result.Err('blarg');

    const anOk = Result.ok<string, string>('neat');
    expect(theErr.and(anOk)).toEqual(theErr);

    const anotherErr = Result.err('oh no');
    expect(theErr.and(anotherErr)).toEqual(theErr);
  });

  test('`andThen` method', () => {
    const theErr = new Result.Err<string[], number>(42);

    const getAnOk = strings => Result.ok<number, number>(length(strings));
    expect(theErr.andThen(getAnOk)).toEqual(theErr);

    const getAnErr = () => Result.err(0);
    expect(theErr.andThen(getAnErr)).toEqual(theErr);
  });

  test('`or` method', () => {
    const theErr = new Result.Err('a shame');
    const anOk = Result.ok<number, string>(42);
    expect(theErr.or(anOk)).toBe(anOk);
  });

  test('`orElse` method', () => {
    const theErr = new Result.Err<string, string>('what sorrow');
    const theOk = Result.ok<string, string>('neat!');
    const getOk = () => theOk;
    expect(theErr.orElse(getOk)).toBe(theOk);

    const anotherErr = Result.err<string, string>('even worse');
    const getAnotherErr = () => anotherErr;
    expect(theErr.orElse(getAnotherErr)).toBe(anotherErr);
  });

  test('`unsafelyUnwrap` method', () => {
    const theErr = new Result.Err('a pity');
    expect(() => theErr.unsafelyUnwrap()).toThrow();
  });

  test('`unsafelyUnwrapErr` method', () => {
    const theReason = 'phooey';
    const theErr = new Result.Err(theReason);
    expect(theErr.unsafelyUnwrapErr()).toBe(theReason);
  });

  test('`unwrapOr` method', () => {
    const theErr = new Result.Err<number, string>('whatever');
    const theDefault = 0;
    expect(theErr.unwrapOr(theDefault)).toBe(theDefault);
  });

  test('`unwrapOrElse` method', () => {
    const theReason = 'alas';
    const theErr = new Result.Err<number, string>(theReason);
    expect(theErr.unwrapOrElse(length)).toEqual(length(theReason));
  });

  test('`toMaybe` method', () => {
    const theErr = new Result.Err('so sad');
    expect(theErr.toMaybe()).toEqual(nothing());
  });
});
