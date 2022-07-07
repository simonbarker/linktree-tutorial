//sk_test_51LCPFoIqey7J2iTMRA8EY3jfEEiNYuua95fXg4lXUfLt6idnYk6OBPvXrjTQUjGU0hjywM3L5Q0sSIZTyiGFgwZB00hDzNim0q
const stripe = require("stripe")(
  "sk_test_51LCPFoIqey7J2iTMRA8EY3jfEEiNYuua95fXg4lXUfLt6idnYk6OBPvXrjTQUjGU0hjywM3L5Q0sSIZTyiGFgwZB00hDzNim0q"
);

const YOUR_DOMAIN = "http://localhost:3000";

const productLookup = {
  oneCoffee: "price_1LCQTIIqey7J2iTMv4ADM8ra",
  twoCoffees: "price_1LCQTkIqey7J2iTMDzkwqKP2",
  fourCoffees: "price_1LCQU8Iqey7J2iTMU0y1INSV",
};

export default async function handler(req, res) {
  const data = JSON.parse(req.body);
  const productCode = data.productCode;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: productLookup[productCode],
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}`,
    cancel_url: `${YOUR_DOMAIN}`,
  });

  res.send({ sessionId: session.id });
}
