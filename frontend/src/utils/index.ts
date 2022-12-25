export const omit = (object: Object, keys: Array<string>): Object => {
  const newObject = { ...object };
  keys.forEach((key) => {
    delete newObject[key];
  });
  return newObject;
};

export default {
  omit,
};
