export function Logger(target, key, descriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log('this:', this);
    const result = original.apply(this, args);
    console.log(
      `${key} with args ${JSON.stringify(args)} returned ${JSON.stringify(
        result,
      )}`,
    );
    return result;
  };
  return descriptor;
}

export function Property(target: any, key: string) {
  let _value: string;

  const getter = function() {
    console.log(`getter is ${_value}`);
    return _value;
  };

  const setter = function(newValue) {
    _value = newValue;
    console.log(`setter is ${_value}`);
  };

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}
