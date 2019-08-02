const makeLink = require('./link');
const updateItem = require('./updateItem');

const updateSearch = async (docAfter, context, search) => {
  const newSearch = search.filter(item => item.id !== context.params.sopSubId);
  newSearch.push(updateItem(docAfter, context));
  console.log(newSearch);
  return newSearch;
};

module.exports = updateSearch | updateItem;
