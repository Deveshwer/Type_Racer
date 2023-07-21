const axios = require('axios');
const uri1 = "https://api.quotable.io/random?minLength=30&maxLength=50";
const uri2 = "https://api.quotable.io/random?minLength=70&maxLength=100";
const uri3 = [
    "At Maplewood Elementary School, the annual school play titled \"The Great Mix-Up\" turned into a sidesplitting comedy when a mischievous student switched the script with a hilarious, nonsensical version. Clumsy but determined, Max embraced the chaos, delivering lines that made no sense, leading to uproarious laughter from the audience. Props went missing, characters popped up in the wrong scenes, and unexpected antics ensued, making it a legendary show that taught everyone the value of embracing mistakes and finding humor in unexpected situations.",
    "Neither a borrower or a lender be. Yes, so please your Majesty. I did go between them, as I said; but more than that, he loved her-for indeed he was mad for her, and talk'd of Satan, and of Limbo, and of Furies, and I know not what.",
    "It is ten o\'clock; Thus we may see,\' quoth he, \'how the world wags; \'Tis but an hour ago since it was nine; And after one hour more \'twill be eleven; And so, from hour to hour, we ripe and ripe, And then, from hour to hour, we rot and rot; And thereby hangs a tale.",
    "worm's meat in respect of a good piece of flesh indeed! Learn of the wise, and perpend: civet is of a baser birth than tar- the very uncleanly flux of a cat. Mend the instance, shepherd.\",\"It is meat and drink to me to see a clown: That's meat and drink to me, now. The course of true love never did run smooth",
    "Then the whining school-boy, with his satchel And shining morning face, creeping like snail Unwillingly to school. Now in respect it is in the fields, it pleaseth me well; but in respect it is not in the court."
]
// API docs
// https://github.com/lukePeavey/quotable

module.exports = getData =(difficulty)=>{
    if(difficulty === "easy")   return axios.get(uri1).then(response=> response.data.content.split(" "));
    else if(difficulty === "medium")  return axios.get(uri2).then(response=> response.data.content.split(" "));
    else {
        const randomIndex = Math.floor(Math.random() * uri3.length);
        return uri3[randomIndex].split(" ");
    }
}