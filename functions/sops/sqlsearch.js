'use strict';

// CORS Express middleware to enable CORS Requests.
const fetch = require('node-fetch');
const makeLink = require('../msc/link');
const cors = require('cors')({
  origin: true
});
const FormData = require('form-data');
const root = 'https://webquoin.com/';
const folder = 'catalog/api/public/index.php';
const urlAdd = root + folder +    '/search/add';
const urlUpdate = root + folder + '/search/update/';
const urlID = root + folder +     '/search/s/';
const urlDelete = root + folder + '/search/delete/';
const urlSearch = root + folder + '/search/';


const mysqlUpdateSearch = async (doc) => {
  const url = await checkMySqlData(doc.id);
  const form = new FormData();
  form.append('id', doc.id);
  doc.idCat ? form.append('idCat', doc.idCat) : null;
  form.append('title', doc.title);
  form.append('image', doc.image);
  doc.content ? form.append('content', doc.content.join()) : null;
  form.append('type', (doc.type ? doc.type : 'sop'));
  form.append('sub', (doc.sub ? doc.sub : 'main'));
  form.append('link', makeLink(doc.title));
  let message = '';
  const data = {title: doc.title, id: doc.id};
  await fetch(url, { method: 'POST', body: form })
    .then(res => message = res.json())
    .then(mes => {
      console.log(mes)
      console.log(data)
    })
    .catch(err => { throw(err); });
  return data;
}

const checkMySqlData = async (id) => {
  let result = {};
  await fetch(urlID + id, {method: 'GET'})
  .then((response) => result = (response.json() === false) ? urlAdd : urlUpdate + id)
  .catch(err => { throw(err); });
  return result;
}

const deleteMySqlData = async (id) => {
  let result = {};
  await fetch(urlDelete + id, {method: 'DELETE'})
  .then((response) => result = response.json())
  .then(res => console.log(res))
  .catch(err => { throw(err); });
  return result;
}

module.exports = { mysqlUpdateSearch, checkMySqlData, deleteMySqlData};