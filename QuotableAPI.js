const axios = require('axios');
const uri1 = "https://api.quotable.io/random?minLength=30&maxLength=50";
const uri2 = "https://api.quotable.io/random?minLength=70&maxLength=100";
const uri3 = "https://api.quotable.io/random?minLength=300&maxLength=400";
// API docs
// https://github.com/lukePeavey/quotable

module.exports = getData =(difficulty)=>{
    if(difficulty === "easy")   return axios.get(uri1).then(response=> response.data.content.split(" "));
    else if(difficulty === "medium")  return axios.get(uri2).then(response=> response.data.content.split(" "));
    else     return axios.get(uri3).then(response=> response.data.content.split(" "));
}