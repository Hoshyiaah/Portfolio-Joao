let currentDate = new Date();

let startDate = null;
let endDate = null;

document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

function renderCalendar() {
  fetch(`http://localhost:5000/api/alrReserved`)
    .then((response) => response.json())
    .then((reservedDates) => {
      const dateButtons = document.querySelectorAll(".calendar-date");

      dateButtons.forEach((button) => {
        const buttonDay = button.getAttribute("data-day");
        const buttonMonth = button.getAttribute("data-month");
        const buttonYear = button.getAttribute("data-year");

        const isReserved = reservedDates.some((reserved) => {
          return (
            parseInt(reserved.day) === parseInt(buttonDay) &&
            parseInt(reserved.month) === parseInt(buttonMonth) &&
            parseInt(reserved.year) === parseInt(buttonYear)
          );
        });

        if (isReserved) {
          button.disabled = true;
          button.style.backgroundColor = "#e0e0e0";
          button.style.color = "#7a7a7a";
          button.style.cursor = "not-allowed";
          button.style.border = "none";
          button.style.opacity = "0.6";
          button.style.pointerEvents = "none";
          button.style.width = "100%";
          button.style.height = "100%";
          button.style.padding = "0";
          button.style.boxSizing = "border-box";
        }
      });
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la récupération des dates réservées :",
        error
      );
    });

const year = currentDate.getFullYear();
const month = currentDate.getMonth();

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "Mai",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

document.querySelector("#monthYear").innerText = `${monthNames[month]} ${year}`;

const firstDay = new Date(year, month, 1);
const lastDay = new Date(year, month + 1, 0);

const firstDayOfWeek = firstDay.getDay();

let calendarHTML = "";
let dayCounter = 1;

for (let i = 0; i < firstDayOfWeek; i++) {
  calendarHTML += "<td></td>";
}

for (let i = firstDayOfWeek; i < 7; i++) {
  calendarHTML += `<td><button class="calendar-date" data-month="${
    month + 1
  }" data-day="${dayCounter}" data-year="${year}">${dayCounter}</button></td>`;
  dayCounter++;
  if (dayCounter > lastDay.getDate()) break;
}

while (dayCounter <= lastDay.getDate()) {
  calendarHTML += "<tr>";
  for (let i = 0; i < 7 && dayCounter <= lastDay.getDate(); i++) {
    calendarHTML += `<td><button class="calendar-date" data-month="${
      month + 1
    }" data-day="${dayCounter}" data-year="${year}">${dayCounter}</button></td>`;
    dayCounter++;
  }
  calendarHTML += "</tr>";
}

document.querySelector("#calendarTable tbody").innerHTML = calendarHTML;

const dateButtons = document.querySelectorAll(".calendar-date");
dateButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const day = Number(button.getAttribute("data-day"));
    const month = Number(button.getAttribute("data-month"));
    const year = Number(button.getAttribute("data-year"));

    if (!startDate) {
      startDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      document.getElementById(
        "startDate"
      ).innerText = `START DATE : ${startDate}`;
    } else if (!endDate) {
      endDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      document.getElementById("endDate").innerText = `END DATE : ${endDate}`;

      if (new Date(endDate) < new Date(startDate)) {
        alert("End date has to be after first date !");
        endDate = null;
        document.getElementById("endDate").innerText = "";
      } else if (people.value === "") {
        alert("Make sure to select the number of people.");
        endDate = null;
        document.getElementById("endDate").innerText = "";
      } else {
        window.location.href = `form.html?startDate=${startDate}&endDate=${endDate}&people=${people.value}`;
      }
    }
  });
});

};

renderCalendar();
