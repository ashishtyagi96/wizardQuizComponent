/**
 * Created by ashishtyagi9622 on 1/5/19.
 */
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
    this.answerArray=[];

}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
};

Quiz.prototype.isEnded = function () {
    return this.questions.length === this.questionIndex;
};

Quiz.prototype.guess = function (answer) {


    console.log("ans",answer);
    if(this.getQuestionIndex().correctAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
};
Quiz.prototype.prevQuestion = function () {
    this.questionIndex--;
    if(this.score>0){
        this.score--;
    }
};