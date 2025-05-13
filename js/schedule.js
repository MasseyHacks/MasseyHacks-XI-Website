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
    titleNode.style.color = "#eae3ed";
    titleNode.innerHTML = title;

    const descriptionNode = document.createElement("p");
    const [a, b] = description.split(" | ");
    descriptionNode.innerHTML = a;
    descriptionNode.style.color = "#eae3ed";
    const descriptionNode2 = document.createElement("p");
    descriptionNode2.innerHTML = b;
    descriptionNode2.style.color = "#eae3ed";

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
    "#EEAF61",
    //"#868afc",
    "Let the coding begin! Create a project. Good luck."
  );
    timeLine.setTimeCell(
    2,
    11,
    0.5,
    0.5,
    "Tech Together",
    "7:30PM - 8:00PM | Cafeteria",
    "#EE5D6C",
    ""
  );
  timeLine.setTimeCell(
    2,
    13,
    0,
    1,
    "Super Smash Bros Ultimate",
    "9:00PM - 10:00PM | Cafeteria",
    "#EE5D6C",
    "Compete against hackers to be crowed the winner of this tournament!"
  );
  timeLine.setTimeCell(
    2,
    12,
    0.25,
    0.5,
    "Werewolf",
    "8:15PM - 8:45PM | Cafeteria",
    "#EE5D6C",
    ""
  );
  timeLine.setTimeCell(
    2,
    16,
    0,
    1,
    "Online Events",
    "12:00AM - 1:00AM | Online",
    "#EE5D6C",
    "Play a variety of iconic online games! You'll have options of Minecraft, Gartic Phone, Scribl.io, and much more :D"
  );

  timeLine.setTimeCell(
    2,
    26,
    0,
    1,
    "Submission Help",
    "10:00AM - 11:00PM | Cafeteria",
    "#EEAF61",
    "Ready to submit your project? If you're not sure how, come to the cafeteria and we have people here to help you out!"
  );
  timeLine.setTimeCell(
    2,
    32,
    0,
    1,
    "Trivia",
    "4:00PM - 5:00PM | South Gym",
    "#EE5D6C",
    "Nothing to do while waiting for closing ceremonies? Come relax with some MasseyHacks trivia to spend the time!"
  );
  timeLine.setTimeCell(
    1,
    1,
    0,
    1,
    "Check-In",
    "9:00AM - 10:00AM | Front Desk",
    "#6A0D83",
    //"#25137B",
    "Get ready to kick off an amazing start to MasseyHacksXI! Get swag, stickers and super cool stuff all for FREE. Remember to bring your ID."
  );
  timeLine.setTimeCell(
    1,
    2,
    0.5,
    0.5,
    "Opening Ceremony",
    "10:30AM - 11:00AM | South Gym",
    "#EEAF61",
    //"#9EF1EB",
    "Official launch to the event: acknowledgements, information, and more."
  );

  timeLine.setTimeCell(
    1,
    14,
    0.625,
    0.5,
    "Check-Out",
    "10:45PM - 11:15PM | Front Desk",
    "#6A0D83",
    //"#FFC3C3",
    "Go home. Time to work on your projects or perhaps get some sleep."
  );
  timeLine.setTimeCell(
    2,
    33,
    0.5,
    0.5,
    "Check-Out",
    "5:30PM - 6:30PM | Front Desk",
    "#6A0D83",
    "End of MasseyHacks. Thanks for participating!"
  );
  timeLine.setTimeCell(
    1,
    24,
    0,
    1,
    "Check-In",
    "8:00AM - 9:00AM | Front Desk",
    "#6A0D83",
    "Start the final day of MasseyHacks. ID!"
  );

  timeLine.setTimeCell(
    1,
    33,
    0,
    0.5,
    "Closing Ceremony",
    "5:00PM - 5:30PM | North Gym",
    "#EEAF61",
    "Closing remarks, awards ceremonies and more."
  );

  timeLine.setTimeCell(
    2,
    1,
    0,
    1.25,
    "Breakfast Snacks",
    "9:00AM - 10:15AM | Cafeteria",
    "#CE4993",
    //"#D8BBFF",
    "Fuel up with breakfast snacks before the event starts!"
  );
  timeLine.setTimeCell(
    2,
    4,
    0.5,
    1,
    "Lunch",
    "12:30PM - 1:30PM | Cafeteria",
    "#CE4993",
    //"#D8BBFF",
    "FOOOD"
  );
  timeLine.setTimeCell(
    1,
    3,
    0.125,
    1,
    "Introduction to Front End",
    "11:15AM - 12:15PM | Room 149",
    "#7E37AF",
    //"#a8d4ff",
    "HTML, CSS and JavaScript are the foundation of the Web. This workshop will quickly explain the basic setup of the Web then equip participants with the tools to create simple web pages using HTML. Participants will learn HTML by working through practical exercises.");

  timeLine.setTimeCell(
    1,
    6,
    0.625,
    1,
    "Introduction to Pytorch",
    "2:45PM - 3:45PM | Room 149",
    "#7E37AF",
    //"#a8d4ff",
    "Come join for an introduction to AI! Learn what a neural network is, and how to create and train your own. This workshop will be easier if you have any prior coding knowledge, especially in Python, but it is not necessary. All you need to do beforehand is install Python and Pytorch, and we will start from there.");

    timeLine.setTimeCell(
    1,
    6,
    0,
    0.5,
    "Github Copilot",
    "2:00PM - 2:30PM | Room 149",
    "#7E37AF",
    //"#a8d4ff",
    "");



    timeLine.setTimeCell(
      1,
      8,
      0,
      1,
      "Optimotive Workshop",
      "4:00PM - 5:00PM | Room 101",
      "#7E37AF",
      "");
 
  timeLine.setTimeCell(
    2,
    10,
    0,
    1,
    "Dinner",
    "6:00PM - 7:00PM | Cafeteria",
    "#CE4993",
    "MORE FOOOD"
  );

  timeLine.setTimeCell(
    2,
    24,
    0.5,
    1,
    "Breakfast",
    "8:30AM - 9:30AM | Cafeteria",
    "#CE4993",
    //"#D8BBFF",
    "Pancake breakfast????"
  );

  timeLine.setTimeCell(
    2,
    28,
    0.5,
    1.5,
    "Lunch",
    "12:30PM - 2:00PM | Cafeteria",
    "#CE4993",
    //"#D8BBFF",
    "Last meal before the end of MasseyHacks."
  );

  timeLine.setTimeCell(
    3,
    9,
    0,
    1,
    "Bandana Decorating",
    "5:00PM - 6:00PM | Room 101",
    "#EE5D6C",
    "Decorate your MasseyHacks bandana with colours! Come join us in making the event more colourful :)");
  timeLine.setTimeCell(
    3,
    10,
    0.5,
    18,
    "Hackenger Hunt",
    "6:30PM - 12:00PM | Online",
    "#7E37AF",
    "Put your puzzle-solving skills to the test with the Hackenger Hunt! In this event, you'll be given 15 creative tech-related challenges to solve, ranging from easy to difficult. Top scorers will receive stickers, limited-edition swag, and/or a gift card!"
  );

  timeLine.setTimeCell(
    3,
    30,
    0,
    2,
    "Judging",
    "2:00PM - 4:00PM | Cafeteria",
    "#EEAF61",
    "Get ready for presentations and displaying the project you worked hard on. Be proud of your accomplishments!"
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
