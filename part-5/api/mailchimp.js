import fetch from "node-fetch";

export default async function handler(req, res) {
  const MAILCHIMP_API_KEY = "88df4110d6eed29436e235f06db0e60b-us18";
  const DC = "us18";
  const AUDIENCE_ID = "9edcd26ae7";
  const baseUrl = `https://${DC}.api.mailchimp.com/3.0`;
  console.log("hello from cloud function");

  const subscriberData = JSON.parse(req.body);

  try {
    const memberData = {
      email_address: subscriberData.email,
      status: "pending",
      merge_fields: {
        FNAME: subscriberData.firstName,
      },
    };

    const mailchimpRes = await fetch(
      `${baseUrl}/lists/${AUDIENCE_ID}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
        },
        body: JSON.stringify(memberData),
      }
    );

    const data = await mailchimpRes.json();

    if (!mailchimpRes.ok) {
      throw new Error(data.title);
    }

    console.log(data);

    res.send({ message: "success" });
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send({ message: error.message });
  }
}
