const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//Get all Subcribers
router.get('/subcribers', (req, res) => {
    Subscriber.find()
    .then(subscribers => {
      res.json(subscribers);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
})

//Get one subscriber
router.get('/subcribers/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
  })
  

// create one subscriber
router.post('/subcribers', (req, res) => {
    const subscriber = new Subscriber({
      name: req.body.name,
      subscribedToChannel: req.body.subscribedToChannel
    });

    subscriber
      .save()
      .then(newSubscriber => {
        res.status(201).json(newSubscriber);
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      });
  });

// update one subscriber
router.patch('/subcribers/:id', getSubscriber, (req, res) => {
    if (req.body.name != null) {
      res.subscriber.name = req.body.name;
    }
    if (req.body.subscribedToChannel != null) {
      res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
  
    res.subscriber
      .save()
      .then(updatedSubscriber => {
        res.json(updatedSubscriber);
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      });
  });

//delete one subscriber
  router.delete('/subcribers/:id', getSubscriber, (req, res) => {
    res.subscriber
      .deleteOne()
      .then(() => {
        res.json({ message: 'Deleted Subscriber' });
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  });


  // Middleware
  function getSubscriber(req, res, next) {
    Subscriber.findById(req.params.id)
      .then(foundSubscriber => {
        if (foundSubscriber == null) {
          return res.status(404).json({ message: 'Cannot find subscriber' });
        }
        res.subscriber = foundSubscriber;
        next();
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  }
  


module.exports = router