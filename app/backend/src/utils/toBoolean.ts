const toBoolean = (query: string) => {
  if (query === 'true') return true;
  if (query === 'false') return false;
  return '';
};

export default toBoolean;
