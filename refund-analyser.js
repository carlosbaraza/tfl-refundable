const fs = require("fs");
const rawRefunds = require("./refunds.json");

const refunds = rawRefunds.map(refund => {
  refund.journeyFareRaw = refund.journeyFare;
  refund.journeyFare = refund.journeyFare.replace("£", "");
  refund.journeyFare = parseFloat(refund.journeyFare);

  refund.journey = refund.journey.replace(/\s/g, " ").trim();

  return refund;
});

const refundsFromCuttyShark = refunds.filter(refund => refund.journey.includes("Cutty Sark"));

const totalOwed = refundsFromCuttyShark.reduce((sum, refund) => sum + refund.journeyFare, 0);

const messages = refundsFromCuttyShark.map(
  refund =>
    `Date: ${refund.date}\nJourney: ${refund.journey}\nIncomplete journey fare: ${refund.journeyFareRaw}`
);

const message = `
Dear Sir/Madam,

I have come to the realization that half of my daily commute days were not fared correctly. I commute multiple days a week from Cutty Shark to Hammersmith, and then I come back in the evening. I change from DLR to Jubilee at Canary Wharf.

However, it seems like sometimes, the system does not recognize that I arrived to Cutty Shark from Canary Wharf, and it charges me an incomplete journey fee of £5.60. I have calculated all these incorrect fares from Canary Wharf to Cutty Shark and they add up to £170.20.

This is the list of incorrect fares.

${messages.join("\n\n")}

Total refund: £${totalOwed}

Please let me know if you have any questions or you need me to submit any extra information regarding this claim.

Kind regards,
Carlos
`;

fs.writeFileSync(`./message`, message);

console.log(totalOwed);
