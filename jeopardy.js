const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CAT = 5;
// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

const categories = [];
let categoryIDs = [];
const tableBody = document.querySelector("#clues");
const tableHead = document.querySelector("#categories tr");

/*
get a number of random categories from the jeopardy API. Create an array of just those IDs. Call the getClues function over that array.
*/
async function getRandomCategories(number) {
  categoryIDs.length = 0;
  categories.length = 0;
  const res = await axios.get("https://jservice.io/api/random", {
    params: { count: number },
  });
  const randClues = res.data;
  for (let clue of randClues) {
    categoryIDs.push(clue.category.id);
  }
  getClues(categoryIDs);
}

/* 
getClues is called on the array of category ids.
first, it pulls all clues from that category, uses Lodash to sample 5.
then it creates an object for the category. 
Pulls the category name,
creates an array for the clues, and creates a clue object with only the question, answer, and showing status
*/
async function getClues(catID) {
  for (let category of catID) {
    const results = await axios.get("http://jservice.io/api/clues", {
      params: { category },
    });

    const categoryObj = {};
    const fullClueData = _.sampleSize(results.data, 5);
    const cluesArr = [];

    categoryObj.title = fullClueData[0].category.title;
    categoryObj.clues = cluesArr;

    for (let clue of fullClueData) {
      const clueObj = {};
      clueObj.question = clue.question;
      clueObj.answer = clue.answer;
      clueObj.showing = null;
      cluesArr.push(clueObj);
    }

    categories.push(categoryObj);
  }
  await fillTable();
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  //filling in table head with categories

  tableHead.innerHTML = "";
  for (let category of categories) {
    const headCell = document.createElement("td");
    headCell.innerText = `${category.title}`;
    tableHead.append(headCell);
  }
  //Filling in table body, row by row

  for (i = 0; i < NUM_CLUES_PER_CAT; i++) {
    const newRow = document.createElement("tr");
    for (j = 0; j < NUM_CATEGORIES; j++) {
      const newCell = document.createElement("td");
      newCell.innerHTML = `<div class="clue" data-X="${j}" data-Y="${i}">${categories[j].clues[i].showing}</div>`;
      newRow.append(newCell);
    }

    tableBody.append(newRow);
  }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */
tableBody.addEventListener("click", handleClick);
function handleClick(evt) {
  evt.preventDefault;
  if (evt.target.className === "clue") {
    categoryNum = evt.target.dataset.x;
    clueNum = evt.target.dataset.y;
    const currentClueObj = categories[categoryNum].clues[clueNum];
    if (!currentClueObj.showing) {
      currentClueObj.showing = currentClueObj.question;
      evt.target.innerText = `${currentClueObj.showing}`;
    } else if (currentClueObj.showing === currentClueObj.question) {
      currentClueObj.showing = currentClueObj.answer;
      evt.target.innerText = `${currentClueObj.showing}`;
    } else if (currentClueObj.showing === currentClueObj.answer) {
      return;
    }
  } else return;
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO
