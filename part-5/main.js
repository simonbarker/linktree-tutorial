import {
  createAccountDetails,
  createSocialLinks,
  createWhereNextLinks,
} from "./createLinks.js";

import { setupMailchimp } from "./setupMailchimp.js";

import { setupStripe } from "./setupStripe.js";

createAccountDetails();
createSocialLinks();
createWhereNextLinks();

setupMailchimp();

setupStripe();

fetch("/api/analytics");
