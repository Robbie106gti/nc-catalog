const makeLink = require('./link');

const updateItem = async (docAfter, context) => {
  const content = new Array();
  const image = docAfter.image;
  content.push(docAfter.title);
  if (docAfter.images) docAfter.images.map(img => (img.title ? content.push(img.title) : ''));
  if (docAfter.listTitle) content.push(docAfter.listTitle);
  if (docAfter.description) {
    content.push(docAfter.description.description);
    content.push(docAfter.description.title);
  }
  return {
    title: docAfter.title,
    link: makeLink(docAfter.title),
    id: context.params.sopSubId,
    idCat: context.params.sopCatId,
    image,
    sub: docAfter.sub,
    content
  };
};

module.exports = updateItem;
