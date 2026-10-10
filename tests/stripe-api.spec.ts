import { test, expect } from "@playwright/test";
import Stripe from "stripe";
import "dotenv/config";

// CI pull-request practice
const stripeKey = process.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
  throw new Error(
    "Missing STRIPE_SECRET_KEY. Add it to your .env file or CI secrets.",
  );
}
const stripe = new Stripe(stripeKey);

test("creates a successful test payment", async ({ page }) => {
  const payment = await stripe.paymentIntents.create({
    amount: 500,
    currency: "usd",
    payment_method: "pm_card_visa",
    confirm: true,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never",
    },
  });
  expect(payment.status).toBe("succeeded");
});


test("handles a declined test payment", async ({ page }) => {
  await expect(stripe.paymentIntents.create({
    amount: 3000,
    currency: "usd",
    payment_method: "pm_card_chargeDeclined",
    confirm: true,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never",
    },
  })
).rejects.toMatchObject({code: "card_declined"});
  
});