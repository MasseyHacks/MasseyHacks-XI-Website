const colAmt = 34;
const rowAmt = 4;
const eventStartTime = 9;
const lineHeight = "90px";
const scheduleSection = document.querySelector(".timeline-wrapper");
var evcln = 1;

class TimeLineGrid {
  timeCellNodes = [];
  colContainerNodes = [];

  constructor() {
    this.setupColContainer();
    this.generateLabel();
    for (let row = 0; row < rowAmt; row++) {
      for (let col = 0; col < colAmt; col++) {
        const colNode = document.createElement("div");
        colNode.className = "timeline-cell";

        const divvy = document.createElement("div");
        divvy.className = "divvy";

        this.colContainerNodes[col].appendChild(colNode);
        this.colContainerNodes[col].appendChild(divvy);
        this.timeCellNodes[col].push(colNode);

        if (row == rowAmt - 1 && col == colAmt - 1) {
          const d = document.createElement("div");
          d.className = "divvy";
          d.style.marginLeft = "calc(50% - 2px)";
          this.colContainerNodes[col].appendChild(d);
        }
      }
    }
  }

  addFirstCell(row, col, startGap, duration, title, description, colour, info) {
    const lineNode = document.createElement("div");
    const remainingGap = 1 - startGap - Math.floor(startGap);
    let durationFilled;
    if (duration <= remainingGap) {
      durationFilled = duration;
      lineNode.style.width = `${duration * 100}%`;
    } else {
      durationFilled = remainingGap;
      lineNode.style.width = `${remainingGap * 110}%`;
    }

    lineNode.style.left = `${(startGap - Math.floor(startGap)) * 100}%`;

    lineNode.style.height = lineHeight;
    lineNode.style.backgroundColor = colour;
    lineNode.style.position = "absolute";
    lineNode.style.boxShadow = "0 3px 10px -8px rgb(0 0 0 / 0.3)";
    if (remainingGap == 1) {
      lineNode.style.marginLeft = "2px";
    }
    if (startGap == 0 && duration % 1 == 0) {
      lineNode.style.width = `calc(${lineNode.style.width} - 2px)`;
    }
    if (startGap == 0 && duration % 1 == 0.5) {
      lineNode.style.width = `calc(${lineNode.style.width} - 4px)`;
    }

    lineNode.onclick = function () {
      document.querySelectorAll("#myPopup").forEach(function (e) {
        e.classList.remove("show");
      });
      var popup = lineNode.querySelector("#myPopup");
      popup.classList.toggle("show");
    };
    lineNode.classList.add("popup");
    lineNode.classList.add("evcl");
    lineNode.setAttribute("data-evcl", ++evcln);

    const textSection = document.createElement("div");
    textSection.className = "timeline-text-section";

    const titleNode = document.createElement("h5");
    titleNode.style.color = "#434667";
    titleNode.innerHTML = title;

    const descriptionNode = document.createElement("p");
    const [a, b] = description.split(" | ");
    descriptionNode.innerHTML = a;
    descriptionNode.style.color = "#434667";
    const descriptionNode2 = document.createElement("p");
    descriptionNode2.innerHTML = b;
    descriptionNode2.style.color = "#434667";

    const infoNode = document.createElement("span");
    infoNode.id = "myPopup";
    infoNode.className = "popuptext";
    if (row == 1 || row == 2) {
      infoNode.style.bottom = "unset";
      infoNode.style.top = "0";
    }

    const infoDesc = document.createElement("p");
    infoDesc.innerHTML = info;

    const infoTitle = document.createElement("h2");
    infoTitle.innerHTML = title;

    const moreInfo = document.createElement("p");
    moreInfo.innerHTML = description;

    infoNode.appendChild(infoTitle);
    infoNode.appendChild(moreInfo);
    infoNode.appendChild(infoDesc);

    textSection.appendChild(titleNode);
    textSection.appendChild(descriptionNode);
    textSection.appendChild(descriptionNode2);

    lineNode.appendChild(textSection);
    lineNode.appendChild(infoNode);

    this.timeCellNodes[col - 1][row - 1].appendChild(lineNode);
    return [durationFilled, lineNode.querySelector("#myPopup")];
  }

  setTimeCell(row, col, startGap, duration, title, description, colour, info) {
    let f = this.addFirstCell(
      row,
      col,
      startGap,
      duration,
      title,
      description,
      colour,
      info
    );
    let time = f[0];
    let el = f[1];
    let colCounter = 1;
    while (time + 2 <= Math.floor(duration)) {
      const lineNode = document.createElement("div");
      lineNode.style.width = "100%";
      lineNode.style.height = lineHeight;
      lineNode.style.backgroundColor = colour;
      lineNode.classList.add("evcl");
      lineNode.setAttribute("data-evcl", evcln);
      lineNode.onclick = function () {
        document.querySelectorAll("#myPopup").forEach(function (e) {
          e.classList.remove("show");
        });
        el.classList.toggle("show");
      };
      this.timeCellNodes[col - 1 + colCounter][row - 1].appendChild(lineNode);
      time++;
      colCounter++;
    }

    // if there is a remainder at the end
    if (duration - time > 0.001 && time < duration) {
      const lineNode = document.createElement("div");
      lineNode.style.width = `${(duration - time) * 100 + 10}%`;
      lineNode.style.marginLeft = "-30px";
      lineNode.style.height = lineHeight;
      lineNode.style.backgroundColor = colour;
      lineNode.classList.add("evcl");
      lineNode.setAttribute("data-evcl", evcln);
      lineNode.onclick = function () {
        document.querySelectorAll("#myPopup").forEach(function (e) {
          e.classList.remove("show");
        });
        el.classList.toggle("show");
      };

      lineNode.style.boxShadow = "0 3px 10px -8px rgb(0 0 0 / 0.3)";
      lineNode.style.borderRadius = "10px";
      lineNode.style.position = "relative";
      if ((startGap + duration) % 1 != 0) {
        lineNode.style.width = `calc(${lineNode.style.width} - 4px)`;
      }
      this.timeCellNodes[col - 1 + colCounter][row - 1].appendChild(lineNode);
    }
  }

  generateLabel() {
    for (let col = 0; col < colAmt; col++) {
      const timeLineLabel = document.createElement("div");
      timeLineLabel.className = "timeline-label";
      timeLineLabel.innerHTML = `${((eventStartTime + col - 1) % 12) + 1}:00 ${
        (eventStartTime + col) % 24 >= 12 ? "PM" : "AM"
      }`;
      this.colContainerNodes[col].appendChild(timeLineLabel);
    }
    rootNode.style.setProperty(
      "--last-timeline-label-content",
      `"${((eventStartTime + colAmt - 1) % 12) + 1}:00 ${
        (eventStartTime + colAmt) % 24 >= 12 ? "PM" : "AM"
      }"`
    );
  }

  setupColContainer() {
    for (let col = 0; col < colAmt; col++) {
      this.timeCellNodes.push([]);
      const colContainerNode = document.createElement("div");
      colContainerNode.className = "timeline-col-container";
      scheduleSection.appendChild(colContainerNode);
      this.colContainerNodes.push(colContainerNode);
    }
  }
}

const initTimeLine = (timeLine) => {
  
  timeLine.setTimeCell(
    4,
    3,
    0,
    24,
    "Hacking Period",
    "11:00AM - 11:00AM | ",
    "#868afc",
    ""
  );
  timeLine.setTimeCell(
    2,
    11,
    0.5,
    1,
    "Cupstacking",
    "7:30PM - 8:30PM | Cafeteria",
    "#9EF1EB",
    "A MasseyHacks favourite is back in the game! Reach for the stars by creating the tallest possible cup tower!"
  );
  timeLine.setTimeCell(
    2,
    14,
    0,
    1,
    "Karaoke",
    "10:00PM - 11:00PM | Cafeteria",
    "#9EF1EB",
    "Ignore all your stage fright, pick up the mic and sing to your heart's content. Have fun!"
  );
  timeLine.setTimeCell(
    2,
    15,
    0.5,
    1,
    "Minecraft Bedwars",
    "12:00AM - 1:00AM | Online",
    "#9EF1EB",
    ""
  );
  // timeLine.setTimeCell(
  //   2,
  //   17,
  //   0,
  //   1,
  //   "Minecraft Bedwars",
  //   "1:30AM - 2:00AM | Online",
  //   "#9EF1EB",
  //   ""
  // );
  // timeLine.setTimeCell(
  //   2,
  //   26,
  //   0,
  //   1.5,
  //   "Therapy Dogs",
  //   "10:00AM - 11:30AM | Room 101",
  //   "#E1BDFF",
  //   ""
  // );
  // timeLine.setTimeCell(
  //   2,
  //   32,
  //   0,
  //   0.5,
  //   "Trivia",
  //   "4:00PM - 4:30PM | Cafeteria",
  //   "#E1BDFF",
  //   "Nothing to do while waiting for closing ceremonies? Come relax with some MasseyHacks trivia and some snacks to spend the time!"
  // );
  timeLine.setTimeCell(
    1,
    1,
    0,
    1,
    "Check-In",
    "9:00AM - 10:00AM | Front Desk",
    "#FFC3C3",
    ""
  );
  timeLine.setTimeCell(
    1,
    2,
    0.5,
    0.5,
    "Opening Ceremony",
    "10:30AM - 11:00AM | North Gym",
    "#9EF1EB",
    ""
  );

  timeLine.setTimeCell(
    1,
    14,
    0.5,
    0.5,
    "Check-Out",
    "10:30PM - 11:00PM | Front Desk",
    "#FFC3C3",
    ""
  );
  timeLine.setTimeCell(
    2,
    33,
    0,
    0.5,
    "Check-Out",
    "5:00PM - 5:30PM | Front Desk",
    "#FFC3C3",
    ""
  );
  timeLine.setTimeCell(
    1,
    24,
    0,
    1,
    "Check-In",
    "8:00AM - 9:00AM | Front Desk",
    "#FFC3C3",
    ""
  );

  timeLine.setTimeCell(
    1,
    32,
    0.5,
    0.5,
    "Closing Ceremony",
    "4:30PM - 5:00PM | North Gym",
    "#9EF1EB",
    ""
  );

  timeLine.setTimeCell(
    2,
    1,
    0,
    1.25,
    "Breakfast Snacks",
    "9:00AM - 10:15AM | Cafeteria",
    "#D8BBFF",
    ""
  );
  timeLine.setTimeCell(
    2,
    4,
    0.5,
    1.25,
    "Lunch",
    "12:30PM - 1:30PM | Cafeteria",
    "#D8BBFF",
    ""
  );
  timeLine.setTimeCell(
    1,
    3,
    0.125,
    1,
    "Intro Workshop I",
    "11:15AM - 12:15PM | Room 149",
    "#a8d4ff",
    "");
  timeLine.setTimeCell(
    2,
    3,
    0.125,
    1,
    "Intermediate Workshop",
    "11:15AM - 12:15PM | Room TBD",
    "#a8d4ff",
    "");
  timeLine.setTimeCell(
    1,
    6,
    0.5,
    1,
    "Intro Workshop II",
    "2:30PM - 3:30PM | Room 149",
    "#a8d4ff",
    "");

    timeLine.setTimeCell(
      1,
      8,
      0,
      1,
      "Connecting to Windsor's Tech Scene",
      "4:00PM - 5:00PM | Room TBD",
      "#a8d4ff",
      "");

      timeLine.setTimeCell(
        2,
        8,
        0,
        1,
        "Defang Workshop",
        "4:00PM - 5:00PM | Room TBD",
        "#a8d4ff",
        "");

        timeLine.setTimeCell(
          2,
          9,
          0.125,
          1,
          "Careers in Tech",
          "5:15PM - 6:00PM | Room TBD",
          "#a8d4ff",
          "");

          timeLine.setTimeCell(
            2,
            12,
            0.875,
            1,
            "Intro to CS (NOT programming)",
            "8:45PM - 9:45PM | Room TBD",
            "#a8d4ff",
            "");
 
  timeLine.setTimeCell(
    2,
    10,
    0,
    1,
    "Dinner",
    "6:00PM - 7:00PM | Cafeteria",
    "#D8BBFF",
    ""
  );

  timeLine.setTimeCell(
    2,
    24,
    0.5,
    1,
    "Breakfast",
    "8:30AM - 9:30AM | Cafeteria",
    "#D8BBFF",
    ""
  );

  timeLine.setTimeCell(
    2,
    28,
    0.5,
    1.5,
    "Lunch",
    "12:30PM - 2:00PM | Cafeteria",
    "#D8BBFF",
    ""
  );

  timeLine.setTimeCell(
    3,
    3,
    0,
    0.5,
    "Team Formation",
    "11:00AM - 11:30AM | North Gym",
    "#FECCFF",
    "Unsure who to work with or interested in making some new friends? Find your perfect partners and join up to create the project of your dreams!"
  );

  timeLine.setTimeCell(
    3,
    3,
    0,
    0.5,
    "Team Formation",
    "11:00AM - 11:30AM | North Gym",
    "#9FAFFF",
    "Unsure who to work with or interested in making some new friends? Find your perfect partners and join up to create the project of your dreams!"
  );

  timeLine.setTimeCell(
    3,
    6,
    0,
    1.5,
    "Innovation Fair",
    "2:00PM - 3:30PM | Cafeteria",
    "#9FAFFF",
    "");
  timeLine.setTimeCell(
    3,
    10,
    0,
    18,
    "Hackenger Hunt",
    "6:00PM - 12:00PM | Online",
    "#9BA3FF",
    "Put your puzzle-solving skills to the test with the Hackenger Hunt! In this event, you'll be given 15 creative tech-related challenges to solve, ranging from easy to difficult. Top scorers will receive stickers, limited-edition swag, and/or a gift card!"
  );

  timeLine.setTimeCell(
    3,
    30,
    0,
    2,
    "Judging",
    "2:00PM - 4:00PM | Cafeteria",
    "#9EF1EB",
    ""
  );
};

window.addEventListener("load", () => {
  const timeLine = new TimeLineGrid();
  initTimeLine(timeLine);

  var prev = undefined;
  document.body.addEventListener("click", function (e) {
    if (!e.target.classList.contains("evcl")) {
      var f = document.querySelector(".popuptext.show");
      if (f) {
        f.classList.remove("show");
      }
      prev = undefined;
    } else {
      if (prev)
        console.log(
          prev.getAttribute("data-evcl"),
          e.target.getAttribute("data-evcl")
        );
      if (
        prev &&
        prev.getAttribute("data-evcl") == e.target.getAttribute("data-evcl") &&
        document.querySelector(".popuptext.show")
      ) {
        document.querySelector(".popuptext.show").classList.remove("show");
        prev = undefined;
      } else {
        prev = e.target;
      }
    }
  });

  if ("ontouchstart" in window) {
    document.getElementById("scroll_tip").style.display = "none";
  }
});
