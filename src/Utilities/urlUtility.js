const searchStrToObj = (str) => {
  if (!str) {
    return {};
  }

  console.log(str.substr(1));
  const urlSearchParams = new URLSearchParams(str.substr(1));
  const entries = [...urlSearchParams];
  const obj = Object.assign(...entries.map(([key, value]) => ({ [key]: value })));
  return obj;
};

export default {
  searchStrToObj,
};
