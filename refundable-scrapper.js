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
