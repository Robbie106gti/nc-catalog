export const makelink = function makeLink(title) {
  const link = title.replace(/\W+/g, '-').toLowerCase();
  return link;
};
