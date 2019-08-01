const makeLink = str => {
    return str ? str.replace(/\W+/g, '-').toLowerCase() : str;
  };
  
  module.exports = makeLink;
  