import { creatorDetails, socialLinks, whereNextLinks } from "./data.js";

export function createAccountDetails() {
  const accountHandleElement = document.getElementById("accountHandle");
  const nameElement = document.getElementById("creatorName");
  const taglineElement = document.getElementById("tagline");
  accountHandleElement.innerHTML = creatorDetails.accountHandle;
  nameElement.innerHTML = creatorDetails.creatorName;
  taglineElement.innerHTML = creatorDetails.tagline;

  if (creatorDetails.profilePic) {
    const profilePicWrapperElement = document.getElementById(
      "profilePicContainer"
    );
    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", creatorDetails.profilePic);
    imageElement.classList.add("profileImage");
    profilePicWrapperElement.appendChild(imageElement);
  }
}

export function createSocialLinks() {
  const socialLinksElement = document.getElementById("socialRow");
  for (let link of socialLinks) {
    if (link.active) {
      const i = document.createElement("i");
      i.classList.add("fa-brands");
      i.classList.add(`fa-${link.iconName}`);

      const a = document.createElement("a");
      a.setAttribute("href", link.url);

      a.appendChild(i);

      socialLinksElement.appendChild(a);
    }
  }
}

export function createWhereNextLinks() {
  const whereNextElement = document.getElementById("whereNext");
  for (let link of whereNextLinks) {
    if (link.active) {
      const a = document.createElement("a");
      a.setAttribute("href", link.url);
      a.classList.add("whiteButton");
      a.innerHTML = link.text;
      whereNextElement.appendChild(a);
    }
  }
}
