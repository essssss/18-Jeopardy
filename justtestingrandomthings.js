// Board
/*
<table id="jBoard">
    <tr>
        <th id="cat1">CATEGORY 1</th>
        <th id="cat2">CATEGORY 2</th>
        <th id="cat3">CATEGORY 3</th>
        <th id="cat4">CATEGORY 4</th>
        <th id="cat5">CATEGORY 5</th>
        <th id="cat6">CATEGORY 6</th>
    </tr>
    <tr>
        <td>cat1clue</td>
        <td>cat2clue</td>
        <td>cat3clue</td>
        <td>cat4clue</td>
        <td>cat5clue</td>
        <td>cat6clue</td>
    </tr>
*/

/*
API CALLS
http://jservice.io/api/categories ?count=6

http://jservice.io/api/clues ?category = "id"
*/

/*
 Make a function to call for categories and put them in an array
then make a function that calls for 5 clues from each category
Do I want to do like a  category obj? 
        important information to organize:
            category name, 
            category id, 
            clue question, 
            clue answer,
            clue ID?
*/

/*
This functions gets 5 random clues from a category using Lodash
*/
// let clueObj= {};
// async function getClues(catID) {
//    const results = await axios.get('http://jservice.io/api/clues', {
//       params: { category: catID },
//    });
//    const allClues = results.data;
//    _.sampleSize(allClues, 5);
// }

/* Lets make a function to get 6 random clues and extract the categories. Because just grabbing 6 categories will not be randomized.*/
// const catList = [];
// async function getRandomCategories(number) {
//    catList.length = 0;
//    const res = await axios.get('https://jservice.io/api/random', {
//       params: { count: number },
//    });
//    const randClues = res.data;
//    for (let clue of randClues) {
//       catList.push(clue.category.id);
//    }
// }

// OK so now I have an array (catList) of 6 random category ids.
// I can use that ID to get a list of all clues in each category.

// I need to run checks to make sure that I don't pick two of the same category

// I need to be clever again and pick 5 random clues from each category.
