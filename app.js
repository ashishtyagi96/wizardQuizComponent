//setting up submit button

const checkbox0S = document.getElementById('opt0');

checkbox0S.addEventListener('change',function (event) {
    if (event.target.checked) {
        document.getElementById('submit').disabled=false;
        document.getElementById('submit').style.cursor='pointer';
    }
});
const checkbox1S = document.getElementById('opt1');

checkbox1S.addEventListener('change',function (event) {
    if (event.target.checked) {
        document.getElementById('submit').disabled=false;
        document.getElementById('submit').style.cursor='pointer';
    }
});
const checkbox2S = document.getElementById('opt2');

checkbox2S.addEventListener('change',function (event) {
    if (event.target.checked) {
        document.getElementById('submit').disabled=false;
        document.getElementById('submit').style.cursor='pointer';
    }
});
const checkbox3S = document.getElementById('opt3');

checkbox3S.addEventListener('change',function (event) {
    if (event.target.checked) {
        document.getElementById('submit').disabled=false;
        document.getElementById('submit').style.cursor='pointer';
    }
});



//---------------------------------------------------//
//setting up next button

const checkbox0 = document.getElementById('opt0');

checkbox0.addEventListener('change',function (event) {
    if (event.target.checked) {
        document.getElementById('next').disabled=false;
        document.getElementById('next').style.cursor='pointer';
    }
});
const checkbox1 = document.getElementById('opt1');

checkbox1.addEventListener('change',function (event) {
    if (event.target.checked) {
        document.getElementById('next').disabled=false;
        document.getElementById('next').style.cursor='pointer';
    }
});
const checkbox2 = document.getElementById('opt2');

checkbox2.addEventListener('change',function (event) {
    if (event.target.checked) {
        document.getElementById('next').disabled=false;
        document.getElementById('next').style.cursor='pointer';
    }
});
const checkbox3 = document.getElementById('opt3');

checkbox3.addEventListener('change',function (event) {
    if (event.target.checked) {
        document.getElementById('next').disabled=false;
        document.getElementById('next').style.cursor='pointer';
    }
});
window.onload=function () {
    document.getElementById('names_down').onchange=function () {
        document.getElementById('next').disabled=false;
        document.getElementById('next').style.cursor='pointer';
        if(document.getElementById('names_down').value===""){
            document.getElementById('next').disabled=true;
            document.getElementById('next').style.cursor='not-allowed';
        }
    };
    document.getElementById('names_down').onchange=function () {
        document.getElementById('submit').disabled=false;
        document.getElementById('submit').style.cursor='pointer';
        if(document.getElementById('names_down').value===""){
            document.getElementById('submit').disabled=true;
            document.getElementById('submit').style.cursor='not-allowed';
        }
    };
};


//-------------------------------------------------------------------//
// Parse JSON string into object

var quiz;
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './data/questions.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            var actual_JSON = JSON.parse(xobj.responseText).questions;
            var questions=[];
            for(var i=0;i<actual_JSON.length;i++){
                var ques = new Questions(actual_JSON[i].title,actual_JSON[i].type,actual_JSON[i].options,actual_JSON[i].correct);
                questions.push(ques);
            }
            quiz =  new Quiz(questions);
            document.getElementById('info_bar').innerHTML=(quiz.answerArray.length)+" / "+(quiz.questions.length);

            populate();
        }
    };
    xobj.send(null);

//--------------------------------------------------------------------//
function populate() {

    if(quiz.questionIndex!==0){
        document.getElementById('prev').style.cursor="pointer";
        document.getElementById('prev').disabled=false;
    }
    else{
        document.getElementById('prev').style.cursor="not-allowed";
        document.getElementById('prev').disabled=true;
    }
    if(quiz.questionIndex===quiz.questions.length-1){
        document.getElementById('next').style.display="none";
        document.getElementById('submit').style.display="inline-block";
    }
    else{
        document.getElementById('submit').style.display="none";
        document.getElementById('next').style.display="inline-block";
    }
    if(quiz.isEnded()){
        //show submit button

    }
    else{


        //show questions

        var element = document.getElementById('question_body');
        element.innerHTML=quiz.getQuestionIndex().text;


        //show choices
        var choices = quiz.getQuestionIndex().choices;
        if(quiz.getQuestionIndex().type==="radiogroup"){
            document.getElementById('radio_button').style.display="block";

        document.getElementById('drop_down').style.display="none";

            for(var i=0;i<choices.length;i++){
                var elements = document.getElementById('choice'+i);
                elements.innerText=choices[i];
            }
        }
        else{
            document.getElementById('radio_button').style.display="none";
            document.getElementById('drop_down').style.display="block";
            for(var i=0;i<choices.length;i++){
                var elements = document.getElementById('opti'+i);
                elements.innerText=choices[i];
            }
        }
        if(quiz.answerArray.length!==quiz.questionIndex){
            for(var i=0;i<choices.length;i++){
                if(quiz.answerArray[quiz.questionIndex]===choices[i]){
                    if(quiz.getQuestionIndex().type==='radiogroup'){
                        document.getElementById("opt"+i).checked=true;
                        document.getElementById('next').disabled=false;
                        document.getElementById('next').style.cursor='pointer';
                        document.getElementById('submit').disabled=false;
                        document.getElementById('submit').style.cursor='pointer';
                    }
                    else{
                        document.getElementById("opti"+i).default=true;
                        document.getElementById('next').disabled=false;
                        document.getElementById('next').style.cursor='pointer';
                        document.getElementById('submit').disabled=false;
                        document.getElementById('submit').style.cursor='pointer';
                    }
                }
            }
        }


    }
}

function prev_question() {
    quiz.prevQuestion();
    populate();
}
function next_question() {

    document.getElementById('next').disabled=true;
    document.getElementById('submit').disabled=true;
    document.getElementById('next').style.cursor="not-allowed";
    document.getElementById('submit').style.cursor="not-allowed";
    var ansAll=document.getElementsByName('options');
    var ans;
    var i;
    if(quiz.getQuestionIndex().type==="radiogroup"){
        for(i=0;i<ansAll.length;i++){
            if(ansAll[i].checked){
                ans=ansAll[i].nextSibling.textContent;
                ansAll[i].checked=false;
            }
        }
    }
    else{
        ans=document.getElementById('names_down').value;
    }
    if(quiz.questionIndex===quiz.answerArray.length){
        quiz.answerArray.push(ans);
        quiz.guess(ans);
    }
    else{

            quiz.answerArray[quiz.questionIndex]=ans;
            quiz.guess(ans);

    }
    progress();
    populate();

}
function confirming() {
    document.getElementById('confirm').style.display="block";
}
function reconfirming() {
    document.getElementById('confirm').style.display="none";
}
function submit_test() {
    document.getElementById('confirm').style.display="none";
    document.getElementById('next').disabled=true;
    document.getElementById('submit').disabled=true;

    document.getElementById('next').style.cursor="not-allowed";
    document.getElementById('submit').style.cursor="not-allowed";
    var ansAll=document.getElementsByName('options');
    var ans;
    var i;
    if(quiz.getQuestionIndex().type==="radiogroup"){
        for(i=0;i<ansAll.length;i++){
            if(ansAll[i].checked){
                ans=ansAll[i].nextSibling.textContent;
                ansAll[i].checked=false;
            }
        }
    }
    else{
        ans=document.getElementById('names_down').value;
    }
    if(quiz.questionIndex===quiz.answerArray.length){
        quiz.answerArray.push(ans);
        quiz.guess(ans);
    }
    else{

            quiz.answerArray[quiz.questionIndex]=ans;

            quiz.guess(ans);


    }
    document.getElementById('question_page').style.display="none";
    document.getElementById('finalPage').style.display="block";
    document.getElementById('score_final').innerHTML=quiz.score;
    progress();

}
function progress() {
    var i = (quiz.answerArray.length/quiz.questions.length)*100;
    document.getElementById('myBar').style.width=i+"%";
    document.getElementById('info_bar').innerHTML=(quiz.answerArray.length)+" / "+(quiz.questions.length);
}



