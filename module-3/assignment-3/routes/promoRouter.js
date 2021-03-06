const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Promotions = require('../models/promotions');
const promoRouter = express.Router();
var authenticate = require('../authencticate')

promoRouter.use(bodyParser.json());

promoRouter.route('/')
  .get((req, res, next) => {
    Promotions.find({})
      .then((promotions) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(promotions)
//        console.log('Promo => ', res.json(promotions));
      }, (err) => next(err))
      .catch((err) => next(err));
    })

  .post(authenticate.verifyUser, (req, res, next) => {
    Promotions.create(req.body)
      .then((promotion) => {
        console.log('Promo Created', promotion);
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(promotion);
      }, (err) => next(err))
      .catch((err) => next(err))
  })

  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /promotions')
})

  .delete(authenticate.verifyUser, (req, res, next) => {
    Promotions.remove({})
      .then((resp) => {
        console.log('Promo Deleted', resp);
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err))
  })

promoRouter.route('/:promotionId')
  .get((req, res, next) => {
    Promotions.findById(req.params.promotionId)
    .then((promotion) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json(promotion)
//      console.log('Promo => ', res.json(promotion));
    }, (err) => next(err))
    .catch((err) => next(err));
  })

  .post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403
    res.end('POST operation not supported on /promotions ' + req.params.promotionId)
})

  .put(authenticate.verifyUser, (req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promotionId, {
      $set: req.body
    }, { new: true })
    .then((promotion) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json(promotion)
//      console.log('Promo => ', res.json(promotion));
    }, (err) => next(err))
    .catch((err) => next(err));
  })

  .delete(authenticate.verifyUser, (req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promotionId)
      .then((resp) => {
        console.log('Promo Deleted', resp);
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp);
      }, (err) => next(err))
    .catch((err) => next(err))
  });

   /* ------------------------------------ */
   module.exports = promoRouter;