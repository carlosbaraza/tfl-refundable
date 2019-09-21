# TfL Incomplete Journey Fare refund

I realized that half of my daily commutes were not fared properly and I wrote
a small script to scrap this data from the [TfL Contactless web application](https://contactless.tfl.gov.uk).

# How to use

1. Open your "Journey and payment history" in [TfL Contactless web application](https://contactless.tfl.gov.uk).
2. Open the browser console.
3. Go month by month running this script in the console. Copy the output to one `refunds.json` containing an array.

```
days = [];

for (el of document.getElementsByClassName("warning-icon journey-icon")) {
  const a = el.parentElement.parentElement.parentElement.parentElement.parentElement;
  const rowTopLevel = a.closest(".statements-list");
  const date = rowTopLevel.getElementsByClassName("date-link")[0].innerText;
  const journey = a.getElementsByClassName("journey-to-from")[0].innerText;
  const journeyFare = a.getElementsByClassName("journey-fare")[0].innerText;

  days.push({ journey, journeyFare, href: a.href, date });
}

console.log(JSON.stringify(days));
```

4. Once you have all the refundable trips in a json file called `refunds.json`, run the `refund-analyser.js`:

```
node refund-analyser.js
```

5. Submit the resulting `message` file

# You may need to adapt this to your use case

# Future ideas

If I ever have time, it'd be cool to add these features:

- Find an API to query the data instead of scrapping
- Build a bot that could do the scrapping for you
- Create a Chrome extension
- Submit the message automatically
