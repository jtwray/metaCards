const router = require("express").Router();
const xrayScrapingLibrary = require("x-ray");
const XRAY = xrayScrapingLibrary();

/**check for req.params.url
    if true--
        -run xray scraper library at the url address
            if scrape successful
                -store results in an object
            if fail
                -send status 500 failed to scrape data from provided url internal library malfunction or timeout try again
                -create a new table entry for the results object
                    if successful
                        -send json response with resultsOBJ keys plugged into values of html elements
                    if fail
                        -send status 500 failed database table create
        -respond status 201 card created successfully
    if req.params.url false
        -respond 400 status= required values not present 
*/

router.get("/:id", async (req, res) => {
  const siteURL = 'http://google.com'

  if (siteURL) {
    try {
      const scraped = await XRAY(siteURL,'a',[{
        a:"",
        href:'@href',
        css:'@class'
        
        // title: "title",
        // //find the first selector of title and save it as 'title'
        // text: "a",
        // //find all the instances of p tag  and store them as 'p'
        // image: "img@src",
        // //find the first selector of img look at the src attribute and save that as 'image'
      }]
      ).write("results.json");
      res
        .status(201)
        .json({ siteURL: `URL received : ${siteURL}`, results: `${scraped[0]&&Object.entries(scraped)||scraped[0]}` });
    } catch (error) {
      res.status(500).json({ message: "Error creating the action" });
    }
  } else {
    res.status(400).json({
      message: "Please provide description, notes and the id of the project",
    });
  }
});

// router.post("/", async (req, res) => {
//     const action = req.body;

//     if (action.description && action.project_id && action.notes) {
//         try {
//             const inserted = await Actions.insert(action);
//             res.status(201).json(inserted);
//         } catch (error) {
//             res.status(500).json({ message: "Error creating the action" });
//         }
//     } else {
//         res.status(400).json({
//             message:
//                 "Please provide description, notes and the id of the project",
//         });
//     }
// });

// router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
//     // do your magic!
//     const postData = { ...req.body, user_id: req.params.id };

//     Posts.insert(postData)
//       .then(post => {
//         res.status(201).json(post);
//       })
//       .catch(error => {
//         // good to see the error during development
//         console.log('POST /api/users/:id/posts Error', error);

//         res.status(500).json({ error: 'We ran into an error creating the post' });
//       });
//   });

// //knex is always gonna give us an array back on a query. nice
// // database access using knex
// const db = require('../data/db-config.js');

// const Actions = require("../data/helpers/actionModel.js");

// router.get("/", async (req, res) => {
//     try {
//         const actions = await Actions.get();
//         res.status(200).json(actions);
//     } catch (error) {
//         res.status(500).json({ message: "Error getting the list of actions" });
//     }
// });

// router.get("/:id", async (req, res) => {
//     try {
//         const action = await Actions.get(req.params.id);
//         if (action) {
//             res.status(200).json(action);
//         } else {
//             res.status(404).json({ message: "We could not find the action" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Error getting the action" });
//     }
// });

// router.post("/", async (req, res) => {
//     const action = req.body;

//     if (action.description && action.project_id && action.notes) {
//         try {
//             const inserted = await Actions.insert(action);
//             res.status(201).json(inserted);
//         } catch (error) {
//             res.status(500).json({ message: "Error creating the action" });
//         }
//     } else {
//         res.status(400).json({
//             message:
//                 "Please provide description, notes and the id of the project",
//         });
//     }
// });

// router.put("/:id", async (req, res) => {
//     const changes = req.body;

//     if (
//         changes.description ||
//         changes.notes ||
//         changes.completed ||
//         changes.project_id
//     ) {
//         try {
//             const updated = await Actions.update(req.params.id, changes);
//             if (updated) {
//                 res.status(200).json(updated);
//             } else {
//                 res.status(404).json({
//                     message: "That action does not exist",
//                 });
//             }
//         } catch (error) {
//             res.status(500).json({
//                 message: "We ran into an error updating the project",
//             });
//         }
//     } else {
//         res.status(400).json({
//             message:
//                 "Please provide at least one of name, description, notes or completed status",
//         });
//     }
// });

// router.delete("/:id", async (req, res) => {
//     try {
//         const count = await Actions.remove(req.params.id);
//         if (count > 0) {
//             res.status(204).end();
//         } else {
//             res.status(404).json({
//                 message:
//                     "That project does not exist, perhaps it was deleted already",
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: "We ran into an error removing the project",
//         });
//     }
// });

module.exports = router;
