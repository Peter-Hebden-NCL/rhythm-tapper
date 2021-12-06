$(document).ready(function(){
    
    weak = new Audio('tap-weak.mp3');
    strong = new Audio('tap-strong.mp3');

    playstate = "";
    prev = ""
    dur = 0;
    sound = "";
    pos = 0;
    lapsed = 0;
    line_pos = 0;

    unstressed = 0;
    primary = 0;
    secondary = 0;
    space = 0;
    punctuation = 0;
    line = 0;

    poem_text = [];


    // EXAMPLE TEXT - Each poem requires a stresses variable and a poem-text variable as shown below
    string_1 = "0 10 1 0 1 0 1 0 1-0 1 01 0 1 0 10 1"
    string_1_text = ["If music be the food of love, play on,","That strain again! it had a dying fall"];


    // EXAMPLE SELECTION BUTTON - each poem requires one of these functions (SEE INDEX.HTML FOR PLACEMENT)
    $("#string_1").click(function(){
        if ( !($(this).hasClass("noclick")) ) {
            $(".poet-select").addClass("noclick");
            $(this).css({"color":"white"});
            $("#stop").removeClass("hidden");
            poem_text = string_1_text;
            play_poem(string_1);
            
        }
    });

    $("#minus-button").click(function(){
        alter_speed("-");
    });

    $("#plus-button").click(function(){
        alter_speed("+");
    });

    $("#show-text").click(function(){
        if ($("#show-text").prop("checked") && playstate == "play") {
            $("#line-display").removeClass("hidden");
        } else {
            $("#line-display").addClass("hidden");
        }
    });

    $("#stop").click(function(){
        playstate = "stop"
        $(".poet-select").removeClass("noclick");
        $(".poet-select").removeAttr("style");
        $(this).addClass("hidden");
        $("#the_dot").removeClass("big-dot med-dot little-dot");
        $("#the_dot").addClass("hidden");
    });




    function get_sound(a) {
        if (a == "0") {
            return weak.play();
        } else {
            if (a == "1" || a == "2") {
                return strong.play();
            } else {
                return false;
            }
        }
    };

    //no argument needed in this version (controls dictate speed rather than choice of poem)
    function set_speed(p) {
            unstressed = 300;
            primary = 500;
            secondary = 400;
            space = 200;
            punctuation = 400;
            line = 400;
    };

    function alter_speed(sym) {
        if (sym == "-") {
            //either increase duration by 100ms or double value
            if (unstressed >= 100) {
                unstressed = unstressed + 100;
            } else {
                if (unstressed > 0.5) {
                    unstressed = Math.floor(unstressed * 2);
                }
            }
        }
        if (sym == "+") {
            //either reduce duration by 100ms or halve value
            if (unstressed > 100) {
                unstressed = unstressed - 100;
            } else {
                if (unstressed > 0.5) {
                    unstressed = Math.floor(unstressed * 0.5);
                }
            }
        }
        //alter all other values
        primary = Math.floor(unstressed * (5/3));
        secondary = Math.floor(unstressed * (4/3));
        space = Math.floor(unstressed * (2/3));
        punctuation = Math.floor(unstressed * (4/3));
        line = Math.floor(unstressed * (4/3));

        console.log("unstressed: "+unstressed);
        console.log("primary: "+primary);
        console.log("secondary: "+secondary);
        console.log("space: "+space);
        console.log("punctuation: "+punctuation);
        console.log("line: "+line);

    }

    function get_duration(a) {
        if (a == "0") {
            //unstressed
            return unstressed;
        }
        if (a == "1") {
            //primary stress
            return primary;
        }
        if (a == "2") {
            //secondary stress
            return secondary;
        }
        if (a == " ") {
            //word break
            if (prev != "p") {
                //space
                return space;
            } else {
                //space after punctuation
                //nopause
            }
        }
        if (a == "p") {
            //punctuation
            return punctuation;
        }
        if (a == "-") {
            //line break
            if (prev != "p") {
                //new line
                return line;
            } else {
                //new line after punctuation
                //nopause
            }
        }
    };

    function get_dot(a) {
        if (a == "0") {
            $("#the_dot").removeClass("hidden big-dot med-dot");
            $("#the_dot").addClass("little-dot");
        }
        if (a == "1") {
            $("#the_dot").removeClass("hidden little-dot med-dot");
            $("#the_dot").addClass("big-dot");
        }
        if (a == "2") {
            $("#the_dot").removeClass("hidden big-dot little-dot");
            $("#the_dot").addClass("med-dot");
        }

        if (!(
            a == "0" ||
            a == "1" ||
            a == "2"
        )) {
            $("#the_dot").removeClass("big-dot med-dot little-dot");
            $("#the_dot").addClass("hidden");
        }
    }


    function play_poem(poem) {
        //state of play
        playstate = "play";
        //previous poem-code value
        prev = ""
        //set speed of poem
        set_speed(poem);
        //position (index) in the poem-code
        pos = 0;
        //duration of current beat (initially set to first beat)
        dur = get_duration(poem[pos]);
        //amount of time lapsed within current beat
        lapsed = 0;

        line_pos = 0;
        console.log(poem_text[line_pos]);
        $("#line-display").html(poem_text[line_pos]);

        if ($("#show-text").prop("checked")) {
            $("#line-display").removeClass("hidden");
        } else {
            $("#line-display").addClass("hidden");
        }

        //play initial beat sound
        get_sound(poem[pos]);
        //display initial beat dot
        get_dot(poem[pos]);

        var id = setInterval(frame, 100);

        function frame() {
            // Check - at the end of the poem code and the beat
            if ( pos == (poem.length - 1) /*&& lapsed >= dur*/) {
                playstate = "";
                clearInterval(id);
                $(".poet-select").removeClass("noclick");
                $(".poet-select").removeAttr("style");
                $("#the_dot").removeClass("big-dot med-dot little-dot");
                $("#stop, #the_dot, #line-display").addClass("hidden");
            } else {
                // Check - stop button pressed
                if (playstate == "stop") {
                    playstate = "";
                    clearInterval(id);
                    $(".poet-select").removeClass("noclick");
                    $(".poet-select").removeAttr("style");
                    $("#the_dot").removeClass("big-dot med-dot little-dot");
                    $("#stop, #the_dot, #line-display").addClass("hidden");
                }

                //move lapsed on by 100
                lapsed = lapsed + 100;

                //Check - move to next beat?
                if (lapsed >= dur) {
                    prev = poem[pos];
                    pos = pos + 1;
                    dur = get_duration(poem[pos]);
                    lapsed = 0;

                    // Check - need to play sound for new beat?
                    if (
                        poem[pos] == "0" ||
                        poem[pos] == "1" ||
                        poem[pos] == "2"
                    ) {
                        get_sound(poem[pos]);
                    }
                    //change dot for new beat
                    get_dot(poem[pos]);

                    //change text line if new line
                    if (poem[pos] == "-") {
                        line_pos = line_pos + 1;
                        console.log(poem_text[line_pos]);
                        $("#line-display").html(poem_text[line_pos]);
                    }
                }
            }
        }
    };
});


