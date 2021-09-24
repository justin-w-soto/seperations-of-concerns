const { Router } = require('express');
const Order = require('../models/Order');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const order = await OrderService.createOrder(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const order = await Order.getAll(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const order = await Order.getId(id);
      res.send(order);
    } catch (err) {
      next(err);
  }})

  .patch('/:id', async (req, res, next) => {
    try {
      const order = await OrderService.updateTheOrder(req);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const order = await OrderService.deleteOrder(req);
      res.send(order);

    } catch(err) {
      next(err);
    }
  })
  
  
  