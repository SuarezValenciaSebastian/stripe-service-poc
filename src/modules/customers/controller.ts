import stripe from "../../core/stripe";

interface Customer {
  email: string;
}

function createCustomer(customer: Customer) {
  return stripe.customers.create(customer);
}

export { createCustomer };
