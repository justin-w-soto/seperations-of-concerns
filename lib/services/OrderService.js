const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  //send a text and store the order

  static async createOrder({ quantity }) {
    //send text

    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    //store the order
    const order = await Order.insert({ quantity });

    return order;
  }

  static async updateTheOrder(req){
    const id = req.params.id;
    const quantity = req.body.quantity;
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order updated ${quantity}`
    );
    const order = await Order.patchId(id, quantity);

    return order;
  }

  static async deleteOrder(req){
    const id = req.params.id;
    await sendSms(
      `Order number ${id} has been deleted`
    );
    const order = await Order.deleteOrderId(id);
    
    return order;
  }
};

