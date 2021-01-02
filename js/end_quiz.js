const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
finalScore.innerText = mostRecentScore;
function print_score() {
    
  }
 if (mostRecentScore<=200){
    alert("You need to work Harder !");
 }else if (mostRecentScore==500){
    alert("Excellent !!");
}
else{
    alert("Goood!");
}