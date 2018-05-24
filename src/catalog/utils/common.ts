export const makelink = function makeLink(title) {
  const link = title.replace(/\W+/g, '-').toLowerCase();
  return link;
};

export const prepareFirestore = function makeLink(title) {
  const link = title.replace(/-/g, ' ').toLowerCase();
  return link;
};
