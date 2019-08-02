const makeLink = require('./link');
const updateSearch = async (item, search) => {
  const newSearch = search.map(s => {
    if (s.id !== item.content.sopSubId) return s;
    const content = new Array();
    const image = item.docAfter.image;
    if (item.docAfter.images) item.docAfter.images.map(img => (img.title ? content.push(img.title) : ''));
    if (item.docAfter.listTitle) content.push(item.docAfter.listTitle);
    if (item.docAfter.description) {
      content.push(item.docAfter.description.description);
      content.push(item.docAfter.description.title);
    }
    return {
      title: item.docAfter.title,
      link: common.makeLink(item.docAfter.title),
      id: item.content.sopSubId,
      idCat: item.content.sopCatId,
      image,
      sub: common.makeLink(item.docAfter.sub),
      content
    };
  });
  console.log(newSearch);
  return newSearch;
};

module.exports = updateSearch;
