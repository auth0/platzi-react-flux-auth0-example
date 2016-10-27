const express = require('express');
const app = express();
const jwt = require('express-jwt');
const cors = require('cors');

app.use(cors());

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
const authCheck = jwt({
  secret: new Buffer('AUTH0_CLIENT_SECRET', 'base64'),
  audience: 'AUTH0_CLIENT_ID'
});

var contacts = [
  {
    id: 1,
    name: 'Kim',
    email: 'kim@email.com',
    image: 'https://en.gravatar.com/userimage/20807150/4c9e5bd34750ec1dcedd71cb40b4a9ba.png'
  },
  {
    id: 2,
    name: 'Gonto',
    email: 'gonto@email.com',
    image: 'https://www.gravatar.com/avatar/df6c864847fba9687d962cb80b482764??s=200'
  },
  {
    id: 3,
    name: 'Ado',
    email: 'ado@email.com',
    image: '//gravatar.com/avatar/99c4080f412ccf46b9b564db7f482907?s=200'
  },
  {
    id: 4,
    name: 'Sebastián',
    email: 'sebastian@email.com',
    image: 'http://en.gravatar.com/userimage/92476393/001c9ddc5ceb9829b6aaf24f5d28502a.png?size=200'
  },
  {
    id: 5,
    name: 'Ryan',
    email: 'ryan@email.com',
    image: '//gravatar.com/avatar/7f4ec37467f2f7db6fffc7b4d2cc8dc2?s=200'
  }
];

app.get('/api/contacts', (req, res) => {
  const allContacts = contacts.map(contact => { 
    return { id: contact.id, name: contact.name}
  });
  res.json(allContacts);
});

app.get('/api/contacts/:id', authCheck, (req, res) => {
  res.json(contacts.filter(contact => contact.id === parseInt(req.params.id))[0]);
});

app.listen(3001);
console.log('Listening on http://localhost:3001');