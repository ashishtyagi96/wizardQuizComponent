/**
 * Created by ashishtyagi9622 on 1/5/19.
 */
function Questions(text, type, choices, answer) {
    this.text=text;
    this.type=type;
    this.choices=choices;
    this.answer=answer;
}

Questions.prototype.correctAnswer = function (choice) {
    return choice===this.answer;
};