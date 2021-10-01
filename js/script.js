$(document).ready(function() {
    // TIMER
    let circle = document.getElementById('cls');
    let timerId;
    let timerBlock = $('.seconds');

    function timer(timerNum) {
        var seconds = 41;
        timerBlock.html(15);

        drawCircle(seconds);

        set(1000 * (seconds - 25));

        // var index = num;
        timerId = setInterval(function() {
            if (timerNum > 0) {
                timerBlock.html(--timerNum);
            }
        }, 1000);
    }

    function drawCircle(secs) {
        circle.style.strokeDashoffset = "800";
        circle.style.animationDuration = secs + "s";
        circle.style.animationPlayState = "running";
        circle.classList.add("run-anim");
    }

    let interval;

    function set(total) {
        interval = setInterval(ret, total);
    }

    function ret() {
        clearTimer();

        hideQuestion();
        showWrongAnsw();
    }

    function clearTimer() {
        circle.classList.remove("run-anim");
        void circle.offsetWidth;
        clearInterval(interval);
    }

    $(".btn__start").on("click", function() {
        $(".container").addClass("animate__animated animate__slideOutLeft");

        setTimeout(() => {
            $(".container").hide();
        }, 150);

        setTimeout(() => {
            $("#question").show().addClass("animate__animated animate__slideInRight");
        }, 300);

        setTimeout(() => {
            $("#question").removeClass("animate__animated animate__slideInRight");
        }, 500);

        i = 0;
        generateQuestion(i);
    });

    // QUIZ
    let quiz = [];
    let quizObject;
    let i; // question number
    let wrongAnsw = 0;
    let correctAnsw = 0;

    $.getJSON("./js/survey.json", function(data) {
        quiz = data;
        // console.log(quiz);
    });

    function generateQuestion(num) {
        $(".question__wrong, .question__correct, .question__title").empty();
        $("form.question__answers input").remove();

        timer(15); // invoke timer

        quizObject = quiz[num];

        // console.log(num);
        // console.log(quizObject);

        $(".question__title").html(quizObject.question);

        // generate buttons
        for (var a = 0; a < quizObject.answers.length; a++) {
            var btnAnswer = $('<input/>').attr({
                type: "button",
                class: "btn__answer",
                value: quizObject.answers[a]
            });
            btnAnswer.appendTo("form.question__answers");
        }

        // adding class correct to btn (0,1,2 nums)
        switch (quizObject.correct_answer) {
            case 0:
                $(".question__answers .btn__answer:first-child").addClass("btn_correct");
                break;
            case 1:
                $(".question__answers .btn__answer:nth-child(2)").addClass("btn_correct");
                break;
            case 2:
                $(".question__answers .btn__answer:nth-child(3)").addClass("btn_correct");
                break;
        }

        $(".btn__answer").on("click", function() {
            clearTimer();
            clearInterval(timerId);

            if ($(this).hasClass("btn_correct")) { // correct question
                hideQuestion();
                showCorrectAnsw();
            } else { //wrong question
                hideQuestion();
                showWrongAnsw();
            }
        });
    }

    function showQuestion() {
        setTimeout(() => {
            $(".question__title, .question__answers").show().addClass("animate__animated animate__slideInRight");
        }, 200);

        setTimeout(() => {
            $(".question__title, .question__answers").removeClass("animate__animated animate__slideInRight");
        }, 300);
    }

    function nextQuestion() {
        setTimeout(() => {
            $(".question__wrong, .question__correct, .question__title").empty();
            i++;
            generateQuestion(i);
            showQuestion();
            EmptyHide();
        }, 100);
    }

    function checkLastQuestion() {
        var lastItem = quiz.length - 1;
        if (i == lastItem) {
            $("#question").addClass("animate__animated animate__slideOutLeft");

            setTimeout(() => {
                $("#question").removeClass("animate__animated animate__slideOutLeft").remove();
            }, 100);

            setTimeout(() => {
                $("#winner").show().addClass("animate__animated animate__slideInRight");
            }, 300);

            setTimeout(() => {
                $("#winner").removeClass("animate__animated animate__slideInRight");
            }, 400);
        } else {
            nextQuestion();
        }
    }

    function hideQuestion() {
        setTimeout(() => {
            $(".question__title, .question__answers").addClass("animate__animated animate__slideOutLeft");
        }, 200);

        setTimeout(() => {
            $(".question__title, .question__answers").hide().removeClass("animate__animated animate__slideOutLeft");
            EmptyShow();
        }, 300);
    }

    function showWrongAnsw() {
        setTimeout(() => {
            wrongAnsw++;
            // console.log("Wrong answers: " + wrongAnsw);

            $(".question__wrong").append(quizObject.wrong).show().addClass("animate__animated animate__slideInRight");
            EmptyHide()
        }, 400);

        setTimeout(() => {
            $("form.question__answers input").remove();
            $(".question__wrong").removeClass("animate__animated animate__slideInRight");

            setTimeout(() => {
                $(".question__wrong").addClass("animate__animated animate__slideOutLeft");
                EmptyShow();
            }, 200);
            setTimeout(() => {
                $(".question__wrong").hide().removeClass("animate__animated animate__slideOutLeft");
            }, 500);

            setTimeout(() => {
                EmptyHide();
                checkLastQuestion();
            }, 200);
        }, 1500);
    }

    function showCorrectAnsw() {
        setTimeout(() => {
            correctAnsw++;
            // console.log("Correct answers: " + correctAnsw);

            $(".question__correct").append(quizObject.correct).show().addClass("animate__animated animate__slideInRight");
            $(".empty").show().css({ "padding": 0 });
        }, 400);

        setTimeout(() => {
            $("form.question__answers input").remove();
            $(".question__correct").removeClass("animate__animated animate__slideInRight");

            setTimeout(() => {
                $(".question__correct").addClass("animate__animated animate__slideOutLeft");
                EmptyShow();
            }, 200);
            setTimeout(() => {
                $(".question__correct").hide().removeClass("animate__animated animate__slideOutLeft");
            }, 500);

            setTimeout(() => {
                EmptyHide();
                checkLastQuestion();
            }, 200);
        }, 1500);
    }

    function EmptyShow() {
        $(".empty").css({ "padding": 35 + '%' });
    }

    function EmptyHide() {
        $(".empty").css({ "padding": 0 });
    }

    // VALIDATE CHECK

    $(".btn__submit").on("click", function() {
        let validResult = validateForm();

        console.log(validResult);

        if (validResult == true) {
            showComplete();
        }
    });

    function showComplete() {
        setTimeout(() => {
            $("#winner").addClass("animate__animated animate__slideOutLeft");
        }, 200);

        setTimeout(() => {
            $("#winner").removeClass("animate__animated animate__slideOutLeft").remove();
        }, 300);

        setTimeout(() => {
            $("#complete").show().addClass("animate__animated animate__slideInRight");
        }, 500);
    }
});