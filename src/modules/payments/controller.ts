import stripe from "../../core/stripe";

async function processPayment(id: string, amount: number) {
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "2020 Ford Shelby GT350",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
    return true;
  } catch (error) {
    console.error(`[Error] Payments controller: ${error?.message ?? error}`);
    return false;
  }
}

export { processPayment };
