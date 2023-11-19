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
    2,
    9,
    0,
    1,
    "Soldering",
    "5:00PM - 6:00PM | Cafeteria",
    "#ABFF80",
    "Join IEEE Windsor for a hands-on soldering workshop designed to take your electronics skills to the next level! Our instructors will guide you through the process and basic techniques of soldering through-hole electrical components. You'll learn how to identify components and read PCB layouts, use soldering tools. By the end of the workshop, you'll have a board of your own to take home!"
  );
  timeLine.setTimeCell(
    1,
    9,
    0,
    1,
    "GitHub",
    "5:00PM - 6:00PM | Room 101",
    "#ABFF80",
    "GitHub is also a great tool to learn for anyone looking to work on their own personal projects and make sure they're not lost somewhere in the depths of their computer, and instead are easily accessible on the go, whenever and wherever they need it."
  );
  timeLine.setTimeCell(
    1,
    11,
    0.5,
    0.5,
    "Careers in Tech",
    "7:30PM - 8:00PM | Cafeteria",
    "#ABFF80",
    "What does working in the technology industry look like? Explore different career paths and journeys through this workshop and AMA from two Massey alumni!"
  );

  timeLine.setTimeCell(
    1,
    12,
    0,
    1,
    "Docker",
    "8:00PM - 9:00PM | Room 101",
    "#ABFF80",
    "In this interactive session, you'll gain a solid understanding of Docker's basic concepts. You'll learn how to create, run, and manage Docker containers, as well as how to use Docker to build and deploy applications in a variety of environments. By the end of the workshop, you'll have the confidence to start using Docker on your own, and you'll be well on your way to unlocking the power of containerization for your development and deployment workflows."
  );
  timeLine.setTimeCell(
    4,
    3,
    0,
    24,
    "Hacking Period",
    "11:00AM - 11:00AM | ",
    "#a8d4ff",
    ""
  );
  timeLine.setTimeCell(
    1,
    7,
    0.5,
    1,
    "Cupstacking",
    "3:30PM - 4:30PM | Cafeteria",
    "#E1BDFF",
    "A MasseyHacks favourite is back in the game! Reach for the stars by creating the tallest possible cup tower!"
  );
  timeLine.setTimeCell(
    2,
    13,
    0,
    1,
    "Karaoke",
    "9:00PM - 10:00PM | Cafeteria",
    "#E1BDFF",
    "Ignore all your stage fright, pick up the mic and sing to your heart's content. Have fun!"
  );
  timeLine.setTimeCell(
    2,
    15,
    0.5,
    1,
    "Skribbl.io",
    "11:30PM - 12:30AM | Online",
    "#E1BDFF",
    ""
  );
  timeLine.setTimeCell(
    2,
    17,
    0,
    1,
    "Minecraft Bedwars",
    "1:00AM - 2:00AM | Online",
    "#E1BDFF",
    ""
  );
  timeLine.setTimeCell(
    2,
    26,
    0,
    1.5,
    "Therapy Dogs",
    "10:00AM - 11:30AM | Room 101",
    "#E1BDFF",
    ""
  );
  timeLine.setTimeCell(
    2,
    32,
    0,
    0.5,
    "Trivia",
    "4:00PM - 4:30PM | Cafeteria",
    "#E1BDFF",
    "Nothing to do while waiting for closing ceremonies? Come relax with some MasseyHacks trivia and some snacks to spend the time!"
  );
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
    0,
    0.5,
    "Check-Out",
    "10:00PM - 10:30PM | Front Desk",
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
    "#FFA4D5",
    ""
  );
  timeLine.setTimeCell(
    2,
    5,
    0,
    1.25,
    "Lunch",
    "1:00PM - 2:15PM | Cafeteria",
    "#FFA4D5",
    ""
  );
  timeLine.setTimeCell(
    1,
    3,
    0.75,
    1,
    "Intro to Python I",
    "11:45AM - 12:45PM | Room 149",
    "#ABFF80",
    'Introduction to Python I is an introduction to programming and, by extension, how to think like a programmer. The inspiration for this workshop is the educational programming language Logo. Logo derives from the Greek logos, meaning word or thought. This language has been implemented and embraced by dozens of institutions from Apple to MIT since it\'s creation in 1967. Most people think of Logo as "that language where you draw lines with a turtle." In the Introduction to Python I workshop we will be using the turtle module to introduce the fundamental programming concepts of variables, sequence, selection and repetition.'
  );
  timeLine.setTimeCell(
    2,
    3,
    0.75,
    1,
    "Flask",
    "11:45AM - 12:45PM | Room 101",
    "#ABFF80",
    "Looking to explore the exciting world of web development? Join us for our Intro to Flask workshop! Flask is a popular backend web framework that allows developers to quickly build web applications using Python. In this workshop, you'll learn how to create a basic Flask application, handle user input, and display data from a database. Flask is a great gateway into backend web development, making this workshop perfect for beginners who are interested in exploring this field. Don't miss out on the chance to jumpstart your web development skills with Flask!"
  );
  timeLine.setTimeCell(
    1,
    6,
    0.5,
    1,
    "Intro to Python II",
    "2:30PM - 3:30PM | Room 149",
    "#ABFF80",
    "Introduction to Python II builds on the foundation of knowledge established in Introduction to Python I. The focus of the workshop will be on building the skills required to develop a simple game using pygame. We will set up a simple pygame template, explore basic drawing commands then focus on user interaction. We will develop the game of Pong and discuss how to approach a few other projects that are realistic to produce in a short period of time with minimal programming experience."
  );
  timeLine.setTimeCell(
    2,
    6,
    0.5,
    1,
    "Intro to Unity",
    "2:30PM - 3:30PM | Room 101",
    "#ABFF80",
    ""
  );
  timeLine.setTimeCell(
    2,
    10,
    0.25,
    1.25,
    "Dinner",
    "6:15PM - 7:30PM | Cafeteria",
    "#FFA4D5",
    ""
  );

  timeLine.setTimeCell(
    2,
    24,
    0.5,
    1,
    "Pancake Breakfast",
    "8:30AM - 9:30AM | Cafeteria",
    "#FFA4D5",
    ""
  );

  timeLine.setTimeCell(
    2,
    28,
    0.5,
    1.5,
    "Lunch",
    "12:30PM - 2:00PM | Cafeteria",
    "#FFA4D5",
    ""
  );

  timeLine.setTimeCell(
    3,
    3,
    0,
    0.5,
    "Team Formation",
    "11:00AM - 11:30AM | North Gym",
    "#E1BDFF",
    "Unsure who to work with or interested in making some new friends? Find your perfect partners and join up to create the project of your dreams!"
  );
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
