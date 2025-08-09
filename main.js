// code for changing pages

const page1btn = document.querySelector("#page1-btn");
const page2btn = document.querySelector("#page2-btn");
const page3btn = document.querySelector("#page3-btn");
const icy_blue = "#ddebf9"

var allpages = document.querySelectorAll(".page");
var all_page_btns = document.querySelectorAll(".pageBTN");
//select all subtopic pages
function hideall() { //function to hide all pages
    for (let onepage of allpages) { //go through all subtopic pages
        onepage.style.display = "none"; //hide it
    }
    for (let btn of all_page_btns) {
        btn.style.backgroundColor = "white";
    }
}
function show(pgno) { //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    onepage.style.display = "block"; //show the page
    document.querySelector("#page" + pgno + "-btn").style.backgroundColor = icy_blue;
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
});
show(1); // Initialize page load to first page



// code for page 2

const achroma_btn = document.querySelector("#achroma-btn");
let is_grayscale = false;
let image = document.querySelector("#achroma").firstElementChild;
var RGB = document.querySelectorAll(".color");
function toggle_grayscale() {
    if (is_grayscale) {
        console.log("grayscale test")
        image.classList.remove("grayscale");

        for (color of RGB) {
            color.classList.remove("gray");
        }
    }
    else {

        image.classList.add("grayscale");

        let count = 0;

        for (let color of RGB) {
            color.classList.add("gray");
            count += 1;
            console.log("gray test" + count);
        }
    }
    is_grayscale = !is_grayscale;
}

achroma_btn.addEventListener("click", function () {
    toggle_grayscale();
})




// code for toggling form

const toggle_form_btn = document.querySelector("#toggle-form");
const form = document.getElementById("website-form").firstElementChild; // get the table inside the form
let form_hidden = false;
function toggle_form() {
    if (form_hidden) {
        form.style.display = "block";
        toggle_form_btn.innerHTML = "hide form"
    }
    else {
        form.style.display = "none";
        toggle_form_btn.innerHTML = "show form"
    }
    form_hidden = !form_hidden
}



toggle_form_btn.addEventListener("click", function () {
    toggle_form();
})

// code for form input


const color_field = document.querySelector("#eye-color");
let color_input = "";
function get_form_data() {
    event.preventDefault(); // prevents the default behavior like going to the top of the page or appending the input values to the URL
    alert("Form has been submitted");
    color_input = color_field.value;

    let colored_border = document.querySelector("#game-area");
    colored_border.style.borderColor = color_input;
}
document.querySelector("#form-submit").addEventListener("click", function () {
    get_form_data();
})


const gameArea = document.querySelector("#game-area");
const eye1 = document.getElementById("gummy-eye1");
const eye2 = document.getElementById("gummy-eye2");
const eyeBad = document.getElementById("gummy-eye3");

var score = 0;
var watcher_open = false;
const watcher_msg = "You touched the screen while the big eye was watching"
const scoreBox = document.querySelector("#scoreBox")

const watcher = document.querySelector("#watcher");
var watcher_timer_interval_ID1;
var watcher_timer_interval_ID2;
var watcher_timer_interval_ID3;
var eye1_move_interval_ID;
var eye2_move_interval_ID;
var eye3_move_interval_ID;
var random_delay;

function GetRandom(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function Move(eye) {
    const bounds = gameArea.getBoundingClientRect();

    // Get width/height of container
    const containerWidth = bounds.width;
    const containerHeight = bounds.height;
    const eyeWidth = eye.offsetWidth;
    const eyeHeight = eye.offsetHeight;

    const randomX = GetRandom(0, containerWidth - eyeWidth);
    const randomY = GetRandom(0, containerHeight - eyeHeight);

    eye.style.left = randomX + "px";
    eye.style.top = randomY + "px";
}




const sfx = new Audio("audio/sfx.wav");

function catchAnim(eye) {
    sfx.play();
    scoreBox.innerHTML = "Score: " + score;
    eye.classList.add("shrink");
    setTimeout(function () {
        eye.classList.remove("shrink");
        eye.classList.add("anim1");
    }, 1000)
    setTimeout(function () { eye.classList.remove("anim1"); }, 500);
}
function Catchgood(eye) {
    //increases score after clicking
    if (!watcher_open) {
        score++;
    }
    else {
        end_game(watcher_msg);
    }
    catchAnim(eye);
}
function Catchbad(eye) {
    end_game("You touched the bad eye");
    catchAnim(eye);
}
function eye1func() {
    Catchgood(eye1);
}
function eye2func() {
    Catchgood(eye2);
}
function eyeBadfunc() {
    Catchbad(eyeBad)
}


function blankAreaWatcherCheck() { // checks if user tapped any black space in the game area while the watcher is watching
    if (watcher_open) {
        end_game(watcher_msg);
    }
}





// these next 4 functions should run in a loop of calling each other until end_game() clears the intervals

function nextWatcherState(state) {
    watcher.classList.remove("watcher-open", "watcher-close", "watcher-clopen");
    watcher.classList.add("watcher-" + state)
}
function scheduleWatcher() {
    random_delay = GetRandom(2000, 5000);
    watcher_timer_interval_ID1 = setTimeout(warningWatcher, random_delay)
}

function warningWatcher() {
    nextWatcherState("clopen");
    watcher_timer_interval_ID2 = setTimeout(openWatcher, 1000);
}

function openWatcher() {
    nextWatcherState("open");
    watcher_open = true;
    watcher_timer_interval_ID3 = setTimeout(closeWatcher, 1500);
    gameArea.style.backgroundColor = "DarkGray";
}

function closeWatcher() {
    gameArea.style.backgroundColor = "white";
    nextWatcherState("close");
    watcher_open = false;
    scheduleWatcher();
}


const navbar = document.querySelector("#website-nav");

var game_run = false;

function start_game() {
    game_run = true
    score = 0;
    watcher_open = false
    navbar.style.position = "static";

    eye1_move_interval_ID = setInterval(function () {
        Move(eye1)
    }, 1000)
    eye2_move_interval_ID = setInterval(function () {
        Move(eye2)
    }, 1000)
    eye3_move_interval_ID = setInterval(function () {
        Move(eyeBad)
    }, 500)



    toggle_game_btn.innerHTML = "Stop game"
    toggle_game_btn.style.backgroundColor = "red"
    eye1.addEventListener("click", eye1func);
    eye2.addEventListener("click", eye2func);
    eyeBad.addEventListener("click", eyeBadfunc);
    gameArea.addEventListener("click", blankAreaWatcherCheck)
    scheduleWatcher();
    eye1.classList.remove("shrink");
    eye2.classList.remove("shrink");
    eyeBad.classList.remove("shrink");
}

function end_game(reason) {
    if (!game_run) { // debouncing so that there will not be multiple alerts
        return;
    }

    gameArea.style.backgroundColor = "white";
    toggle_game_btn.innerHTML = "Start game"
    toggle_game_btn.style.backgroundColor = "green"
    game_run = false;
    navbar.style.position = "sticky";
    eye1.removeEventListener("click", eye1func);
    eye2.removeEventListener("click", eye2func);
    eyeBad.removeEventListener("click", eyeBadfunc);
    gameArea.removeEventListener("click", blankAreaWatcherCheck)

    clearInterval(eye1_move_interval_ID);
    clearInterval(eye2_move_interval_ID);
    clearInterval(eye3_move_interval_ID);
    clearInterval(watcher_timer_interval_ID1);
    clearInterval(watcher_timer_interval_ID2);
    clearInterval(watcher_timer_interval_ID3);
    nextWatcherState("close");
    eye1.classList.add("shrink");
    eye2.classList.add("shrink");
    eyeBad.classList.add("shrink");
    alert("Game over! " + reason);

}


const toggle_game_btn = document.querySelector("#toggle-game");

function toggle_game() {
    if (!game_run) {
        start_game();
    }
    else {

        end_game("You exited the game successfully");
    }
}

toggle_game_btn.addEventListener("click", toggle_game)
