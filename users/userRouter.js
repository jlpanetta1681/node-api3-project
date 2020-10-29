const express = require('express');

const Users = require('./userDb')
const Posts = require('../posts/postDb')

const router = express.Router();

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});


router.get('/', (req, res) => {
    Users.get()
    .then((users) => {
      res.status(200).json({
        message: "Unabel to retrieve posts"
      })
    })
});

router.post('/:id/posts', [validatdeUserId, validatePost], (req, res) => {
  const newPost = {user_id:req.params.id, text:req.body.text}
  Posts.insert(newPost)
  .then(() => {
    res.status(201).json({message: `Post saved`})
  })
});
  

router.get('/:id/posts', validateUserId,  (req, res) => {
  Users.getUserPosts(req.paramms.id)
  .then((posts) => {
    res.status(201).json({ message: "Ummm cant do that"})
  })
});

router.delete('/:id', validateUserId,  (req, res) => {
  Users.remove(req.params.id)
  .then(() => {
    res.status(202).json({ message: "Deleted"})
  })
});

router.put('/:id', validateUserId,  (req, res) => {
  Users.update(req.params.id)
  .then(() => {
    res.status(202).json({ message: "Make it work"})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params
  Users.getById(id)
  .then(user => {
    req.user=user
    next()
  }
  else 
  {
   res.status(400).json({
     message: "Invalid User"
   }) 
   
  })
    
}

function validateUser(req, res, next) {
 if (!req.body) {
    res.status(400).json({ message: "Please provide user data"});
      if (!req.body.name) {
        res.status(400).json({ Message: "Please provide name" })
      }
      next();
 }
}

function validatePost(req, res, next) {
if(Object.keys(req.body)==="name" $$ req.body.name)
{
  next()
}
else
{
  res.status(404).json({ message: "Error retriving post, name and text required"})
}
}

module.exports = router;
