require('../models/database')
const category = require('../models/category');
const recipe = require('../models/recipe');


/**
 * GET /
 * Homepage 
*/

exports.homepage = async(req, res) => {

    try {

        const limitNumber = 5;
        const categories = await category.find({}).limit(limitNumber);
        const latest = await recipe.find({}).sort({_id: -1}).limit(limitNumber);
        const thai = await recipe.find({ 'category': 'Thai' }).limit(limitNumber);
        const american = await recipe.find({ 'category': 'American' }).limit(limitNumber);
        const chinese = await recipe.find({ 'category': 'Chinese' }).limit(limitNumber);

        const food = { latest, thai, american, chinese };


        res.render('index', { title: 'Cooking Blog - Home', categories, food } );
    } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured"})
    }


    
}
/**
 * GET /categories
 * Categories 
*/

exports.exploreCategories = async(req, res) => {

    try {

        const limitNumber = 20;
        const categories = await category.find({}).limit(limitNumber);
        res.render('categories', { title: 'Cooking Blog - Categories', categories } );
    } catch (error) {
        res.satus(500).send({message: error.message || "Error Occured"})
    }


    
}


/** 
async function insertDummyRecipeData(){
    try {
        await recipe.insertMany([
            {
                "name": "Sesame seared salmon",
                "description": ` Halve the salmon fillets lengthways, then cut the skin off each piece. Scatter the sesame seeds across a plate, 
                then lay the salmon slices in them to completely coat one side only. Pour the excess sesame seeds into a pestle 
                and mortar and pound into a paste. Pick and pound in most of the mint leaves, saving the pretty ones, muddle in 
                the juice of 1 orange and a swig each of extra virgin olive oil and red wine vinegar, then season to perfection. 
                Put a 30cm non-stick frying pan on a medium-high heat, add the grains with a good splash of water, and heat through. 
                Once hot, pour in the dressing, toss together well, then remove to a platter or serving bowl.
                Wipe out the pan, return to a medium-high heat, fry the salmon skin for a couple of minutes, until crispy on both sides,
                 then remove. Add the salmon, sesame side down, and fry for 3 minutes, then flip for 1 minute on the other side, 
                or until cooked through. Meanwhile, wash the carrots and use a speed-peeler to peel them into ribbons. Toss in a 
                drizzle each of extra virgin olive oil and red wine vinegar, season, and add to the grains. Peel the remaining orange, 
                finely slice into rounds, divide between your plates and sit the salmon and crispy skin on top. Spoon over the harissa,
                 then sprinkle both salmon and grains with the reserved mint, to finish.
        
                Source: https://www.jamieoliver.com/recipes/salmon-recipes/sesame-seared-salmon/`,
        
                "email": "kalashtelkar@gmail.com",
        
                "ingredients": [
                    "2 x 130 g salmon fillets, skin on, scaled, pin-boned",
                    "2 tablespoons sesame seeds",
                    "1 bunch of mint (30g)",
                    "2 large oranges",
                    "extra virgin olive oil",
                    "red wine vinegar",
                    "1 x 250 g packet of cooked mixed grains",
                    "2 small carrots",
                    "2 heaped teaspoons harissa"
                ],
                "category": "Chinese" ,
                "image": "Sesame.jpg"
            },
            {
                "name": "Chickpea & squash casserole",
                "description": ` Preheat the oven to 180°C/350°F/gas 4. Wash and trim the squash (there’s no need to peel it), 
                carefully halve lengthways and deseed. Place skin side down directly on the bars of the oven. 
                Put a large deep casserole pan on a high heat. Break in the mushrooms and toast in the dry pan 
                for 10 minutes to bring out their nuttiness, tossing regularly, while you peel the onions, deseed 
                the peppers and very roughly chop both. Add to the pan and cook for another 10 minutes, 
                stirring regularly. Peel and finely slice the garlic and add to the pan with 2 tablespoons 
                each of olive oil, red wine vinegar and the tapenade. Allow the liquid to evaporate, then go in 
                with the chickpeas, juice and all, the tomatoes, scrunching them in through clean hands, and 2 tins’ 
                worth of water. Bring to the boil, sit the squash halves on top, skin side down, and bake for 1 hour 
                30 minutes, or until thick, delicious, and the squash is soft.
                
                Use a serving spoon to roughly break up the squash and mix it through the stew, then season to perfection. 
                Enjoy as is, batching up extra portions to stash in the fridge or freezer for future meals.   
                Source: https://www.jamieoliver.com/recipes/vegetable-recipes/chickpea-squash-casserole/`,
                "email": "kalashtelkar@gmail.com",
                "ingredients": [
                    "1 butternut squash (1.2kg)",
                    "400 g chestnut mushrooms",
                    "4 onions",
                    "4 mixed-colour peppers",
                    "2 cloves of garlic",
                    "olive oil",
                    "red wine vinegar",
                    "2 tablespoons black olive tapenade",
                    "2 x 700g jars or 4 x 400g tins of chickpeas",
                    "2 x 400 g tins of plum tomatoes"
                ],
                "category": "Indian" ,
                "image": "Chickpea.jpg"
            },
            {
                "name": "Aubergine parmigiana burger",
                "description": ` Put a 30cm non-stick frying pan on a medium-high heat. Cut 2 x 2cm-thick slices of 
                aubergine lengthways (save the rest for another meal), season with sea salt and place 
                in the dry pan to char for 3 minutes on each side. Meanwhile, beat the egg in a shallow bowl. 
                Finely grate the Parmesan on your board. Drain and slice the mozzarella. Roughly chop 
                the sun-dried tomatoes. Pick the basil leaves.
                
                Dip the charred aubergine slices in the egg until well coated, then turn in the Parmesan, 
                patting to help it stick. Put a little drizzle of olive oil into the hot pan, then fry the 
                coated aubergine slices for 1½ minutes. Flip them over, lay the mozzarella, 
                sun-dried tomatoes and most of the basil leaves on one half of each slice, then fold the 
                other half up over the fillings to create your burger, turning every 30 seconds until golden. 
                Remove to a plate. Halve the buns and quickly toast in the hot pan, then place the aubergine 
                stacks on the bun bases, top with the remaining basil leaves, pop the lids on and devour.
                Source: https://www.jamieoliver.com/recipes/aubergine-recipes/aubergine-parmigiana-burger/`,
                "email": "kalashtelkar@gmail.com",
                "ingredients": [
                    "1 large aubergine (400g)",
                    "1 large egg",
                    "30 g Parmesan cheese",
                    "1 x 125 g ball of buffalo mozzarella cheese",
                    "2 large jarred sun-dried tomatoes",
                    "2 sprigs of basil",
                    "olive oil",
                    "2 burger buns"
                ],
                "category": "Spanish" ,
                "image": "Aubergine.jpg"
            },
            {
                "name": "Summer ratatouille salad",
                "description": ` Heat a griddle pan until searingly hot. Grill the peppers on both sides until blackened, 
                then transfer to a bowl and cover with clingfilm.
                Slice the aubergine and half the courgettes into long strips if you have any courgette 
                flowers leave them whole. Using the same pan, grill the aubergine, courgettes and their 
                flowers (if using) until slightly charred; transfer to a bowl, season, and drizzle with oil.
                Carefully peel the skin from the seared peppers and tear them into strips. Add to the bowl 
                with the aubergines and courgettes.
                Scrunch the tinned tomatoes in your hands and add to the bowl. Drizzle in the sherry vinegar 
                and a little extra oil if desired. Mix well.
                Halve or slice the fresh tomatoes and chop most of the herbs, leaving a few leaves whole. 
                Slice the remaining uncooked courgettes into rounds and toss in a separate bowl with the 
                fresh tomatoes, herbs and mizuna. Season and drizzle with olive oil. Serve the two salad 
                bowls together with grilled lamb or goat cheese.
                Source: https://www.jamieoliver.com/recipes/vegetables-recipes/summer-ratatouille-salad/`,
                "email": "kalashtelkar@gmail.com",
                "ingredients": [
                    "2 romano peppers",
                    "1 aubergine",
                    "400 g baby courgettes with flowers",
                    "olive oil",
                    "90 g tinned plum tomatoes",
                    "1 tablespoon sherry vinegar",
                    "400 g ripe tomatoes , ideally a mixture of cherry and heritage",
                    "2 handfuls of fresh mixed herbs , such as basil, chives or parsley",
                    "1 handful of mizuna leaves"
                ],
                "category": "American" ,
                "image": "Summer.jpg"
            },
            {
                "name": "Pork & prunes",
                "description": ` Preheat the oven to 220°C/425°F/gas 7. To make the crackling, 
                roll up the pork skin and use a sharp knife to cut it into 1cm slices, 
                then place in a deep roasting tray. Toss with a good pinch of sea 
                salt and black pepper, then roast for 20 minutes, or until golden 
                and crisp, stripping in and stirring through half the rosemary leaves 
                for the last 5 minutes. Remove to kitchen paper and put aside, then 
                reduce the oven to 160°C/325°F/gas 3.
                
                Meanwhile, slice the rest of the pork belly into 2.5cm chunks, 
                then toss the belly and ribs with a pinch of salt, 1 teaspoon of pepper 
                and the ground coriander. Fry in a large casserole pan on a high heat with 
                1 tablespoon of olive oil until golden all over, turning regularly, 
                while you slice the carrots into 3cm chunks and roughly chop the prunes. 
                Add to the pan, then pick and finely chop the remaining rosemary. 
                Keep everything moving for 5 minutes to accentuate the colour, add a 
                splash of red wine vinegar, then pour in 600ml of boiling water and 
                stir well. Cover and cook gently in the oven for 1 hour 30 minutes, 
                or until beautifully tender, stirring halfway and adding a splash of 
                water, if needed. Serve the stew with the crispy crackling on top. 
                Delicious with bread, rice or potatoes.
                Source: https://www.jamieoliver.com/recipes/pork-recipes/pork-prunes/`,
                "email": "kalashtelkar@gmail.com",
                "ingredients": [
                    "1.5 kg higher-welfare pork belly , skin and ribs removed and reserved (ask your butcher)",
                    "½ a bunch of rosemary , (10g)",
                    "1 heaped tablespoon ground coriander",
                    "800 g mixed-colour carrots",
                    "200 g prunes , (stoned)"
                ],
                "category": "Mexican" ,
                "image": "Pork.jpg"
            },
            {
                "name": "Quick crispy duck",
                "description": ` Score the duck skin, rub all over with sea salt and black pepper, 
                then place the fillets skin side down in a cold non-stick frying pan 
                and turn the heat on to medium. Cook for 8 minutes without moving the 
                duck, until the fat is well rendered and the skin is golden and crisp. 
                Turn the duck over and cook for a further 4 minutes, basting with the fat.
                Meanwhile, pick the sage leaves. Trim the broccoli stalks, halving the stems 
                lengthways. Top and tail the orange, trim off the skin and either slice into 
                rounds or segments, and toss with 1 teaspoon of red wine vinegar 
                and a small pinch of salt and pepper.
                Source: https://www.jamieoliver.com/recipes/main-recipes/quick-crispy-duck/`,
                "email": "kalashtelkar@gmail.com",
                "ingredients": [
                    "2 x 150g free-range duck breast fillets, skin on",
                    '2 sprigs of sage',
                    "200g purple sprouting broccoli",
                    "1 large juicy orange",
                    "1 x 400g tin of white beans"
                ],
                "category": "Thai" ,
                "image": "Quick.jpg"
            },
            {
                "name": "Pork & peppers",
                "description": `Carefully blacken the peppers over a direct flame on the 
                hob (or on a barbecue or under the grill), turning with tongs 
                until charred all over. Drain the artichokes, reserving the oil.
                Peel and bash the garlic in a pestle and mortar with a big pinch of 
                sea salt, add 1 teaspoon of red wine vinegar and muddle together. 
                Whisking continuously, slowly add the reserved artichoke 
                oil until thickened and emulsified. Taste and season to perfection 
                with salt and black pepper.
                
                Using a sharp knife, score the fat of the pork chops at ½cm intervals, 
                then season all over with sea salt. Put the two chops together and 
                balance fat side down in a large non-stick frying pan on a medium heat 
                for around 10 minutes, to get the fat crispy and rendering. Turn 
                chops on to their sides and cook for 5 minutes on each side, or until 
                golden and cooked through, stirring in the artichokes for the last 2 minutes, 
                then remove to a plate. Give the pan a quick wipe and cook the pork skin until crispy. 
                Meanwhile, peel, deseed and slice the peppers, then season with a 
                splash of red wine vinegar and a pinch of salt and pepper. Whiz 1 red 
                pepper in a blender and pour into the pan with the chickpeas (juices and all). 
                Warm through for a couple of minutes, then pour on to a serving platter. 
                Place the pork chops on top, drizzling over any resting juices. Scatter over 
                the peppers and artichokes, and break over the crispy pork skin. 
                Serve the alioli on the side, for drizzling over. 
                Source: https://www.jamieoliver.com/recipes/pork-recipes/pork-peppers/`,
                "email": "kalashtelkar@gmail.com",
                "ingredients": [
                    "4 mixed-colour peppers (make sure you have 1 red pepper)",
                    "1 x 280 g jar of artichoke hearts in oil",
                    "3 cloves of garlic",
                    "2 x 400 g higher-welfare thick pork chops , bone in, skin removed and reserved (ask your butcher)",
                    "1 x 700 g jar of chickpeas"
                ],
                "category": "Chinese" ,
                "image": "Pork_peppers.jpg"
            },
            {
                "name": "Sausage sandwich",
                "description": ` Halve the brioche buns and quickly toast in a large 
                dry non-stick frying pan on a medium-high heat, then put aside. 
                Squeeze the sausages out of their skins into a bowl, then divide 
                into 4 and with wet hands flatten out into 1cm-thick patties. 
                Drizzle 1 tablespoon of olive oil into the pan, add the patties 
                and cook for 2 minutes on each side, or until golden and cooked 
                through, then remove to a plate. Meanwhile, drain the peppers and 
                cut the Manchego into 4 slices (discarding any rind). Carefully 
                stuff the peppers with the Manchego slices, then cook in the pan 
                until starting to ooze, turning occasionally.
                
                To serve, spread 1 teaspoon of olive tapenade over the base of each bun. 
                Place a sausage patty on each one, then top with the Manchego-stuffed 
                peppers and the bun lids, and get stuck in.
                Source: https://www.jamieoliver.com/recipes/sausage-recipes/sausage-sandwich/`,
                "email": "kalashtelkar@gmail.com",
                "ingredients": [
                    "4 brioche buns",
                    "6 higher-welfare sausages , (400g total)",
                    "4 large jarred roasted red peppers , (whole)",
                    "80 g Manchego cheese",
                    "4 teaspoons black olive tapenade"
                ],
                "category": "American" ,
                "image": "sandwich.jpg"
            },
            {
                "name": "Garlic chicken",
                "description": ` Peel the garlic cloves and slice lengthways, then place in a large 
                non-stick frying pan on a high heat with 1 tablespoon of olive oil, 
                stirring regularly. Slice each chicken breast lengthways into 3 strips, 
                then toss with a pinch of sea salt and black pepper. Once the garlic is 
                nicely golden, quickly remove from the pan with a slotted spoon, leaving 
                the flavoured oil behind. Go in with the chicken and cook for 5 minutes, 
                or until golden and cooked through, turning regularly.
                
                Remove the chicken from the pan and tip in the chickpeas (juices and all). 
                Add the spinach, along with most of the garlic and 1 tablespoon 
                of red wine vinegar, then toss over the heat until the spinach 
                wilted and the chickpeas are hot through. Season to perfection with 
                salt and pepper, then return the chicken to the pan and finish 
                with the reserved garlic and a generous dusting of sumac.
                Source: https://www.jamieoliver.com/recipes/chicken-recipes/garlic-chicken/`,
                "email": "kalashtelkar@gmail.com",
                "ingredients": [
                    "4 cloves of garlic",
                    "2 x 150g skinless free-range chicken breasts",
                    "½ x 700g jar of chickpeas",
                    "250 g baby spinach",
                    "1 heaped teaspoon sumac"
                ],
                "category": "Indian" ,
                "image": "Garlic.jpg"
            },
            {
                "name": "Lemon-tzatziki chicken",
                "description": `Use a sharp knife to carefully cut down the back of the chicken, 
                so you can open it out flat. Rub half the tzatziki all over the 
                chicken with the juice of ½ a lemon and good pinch of sea salt and 
                black pepper, then cover and leave to marinate in the fridge for at 
                least 2 hours, preferably overnight. Preheat the oven to 180°C/350°F/gas 4. 
                Peel the onions, then very finely chop half an onion and place in a bowl 
                with the juice of ½ a lemon and a pinch of salt to make a pickle. 
                Quarter the rest of the onions and place in a deep tray or ovenproof 
                pan, then halve and add the remaining lemon. Place the chicken skin 
                side up on top (it should fit snugly) and drizzle with ½ a tablespoon 
                of olive oil. Roast for 1 hour 10 minutes, or until beautifully golden 
                and the leg meat pulls easily away from the bone. 
                Source: https://www.jamieoliver.com/recipes/chicken-recipes/lemon-tzatziki-chicken/`,
                "email": "kalashtelkar@gmail.com",
                "ingredients": [
                    "1 x 1.5kg whole free-range chicken",
                    "2 x 200g tubs of tzatziki",
                    "2 lemons",
                    "4 mixed-colour onions",
                    "300 g basmati rice",
                ],
                "category": "Indian" ,
                "image": "Lemon-tzatziki.jpg"
            },
        ]);
    } catch (error) {
        console.log('err', + error)
    }
}
insertDummyRecipeData();
*/


/**
 * async function insertDummyCategoryData(){
    try {
        await category.insertMany([
            {
                "name": "Thai",
                "image": "thai-food.jpg"
            },
            {
                "name": "American",
                "image": "american-food.jpg"
            },
            {
                "name": "Chinese",
                "image": "Chinese-food.jpg"
            },
            {
                "name": "Mexican",
                "image": "mexican-food.jpg"
            },
            {
                "name": "Indian",
                "image": "indian-food.jpg"
            },
            {
                "name": "Spanish",
                "image": "spanish-food.jpg"
            },
        
        
        ]);
    } catch (error) {
        console.log('err', + error)
    }
}
 */





 


/**insertDummyCategoryData(); */
