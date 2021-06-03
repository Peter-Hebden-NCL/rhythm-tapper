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

    kay = "0 1 10-10 1 0 10-1 1 1 10 10-1 1 1 0 1-0 10 1 1 1-0 0 1 10 10-1 1 1 1 0 2010--1 0 1 1 1 1 22010-1 1 1 100 1-1 1 1 10 1-1 1 1 1 0 10 1 1-1 1 1 1 1-1 1 1 1 1 1";
    prynne = "10 1 1 0 10 12-010 10 0 01-1 1 1 1 10 12-1 1 1 0 0 1-10 0 010 1 10 1-1 0 201 0 10 1-10 0 1 1 1 0 100-1 1 1 1 1 10 1-0 10 1 1 1 1--1 1 10 0 0 1 1 01 0-0 1 1 01 1 10-1 1 0 10 1 1 1-10 10 10 1 1 0-1 1 0 10 1 1-1 1 0 10 1 010 1-0 10 1 0 1 1 0-0 10 1 10 1-1 1 1 1 0 10 1--0 12 1 210 1 1-1 1 1 1 10-1 12 10-10 0 10 1 1 10-0 1 10 1 1 10 1 1 1-1 1 10 1 1 1-1 010 1 1 1000 1 0 1-12 01 1 1 0-1 0 1 1 1 10--1 10 1 1 1 1 1-1 10 1 10 1 1 1-0 1 1 1 1 1 0 1 1 10-0 1 1 1 1 10-1 0 1 1 1 1 1 0 1-1 0 1 10 0 1 01 1 1-10 1 1 1 1 0 1 0-10 1 1 1 1 1 0 1-10 1 10 0 0 1";
    williams = "0 2010 1 10 10-21 1 1 1 10 220010-0100 1 0 1020 1 210--1 10 1 1 1 1 1 0 1 1-1 10 1 01 0 0 10 10 0-1 1 1 201 10 1 0 1--1 010 1 0 100 0 1 1 1-1 10 1 1 1 01 1-0 1 01020 2010 1 1 1 1--100 10 1 10 10 1 1-10 01020 01 0 01-1 1 1 1 21 0 1 1 21--10 1 1 1 100 1 1-1020 1 1 1 0 1 10-100 1 10 1020 1";

    kay_text = ["In my country","walking by the waters","down where an honest river","shakes hands with the sea,","a woman passed round me","in a slow watchful circle","as if I were a superstition;","","or the worst dregs of her imagination","so when she finally spoke","her words spliced into bars","of an old wheel. A segment of air.","Where do you come from?","'Here', I said, 'Here. These parts.'"];
    prynne_text = ["Under her brow the snowy wing-case","delivers truly the surprise","of days which slide under sunlight","past loose glass in the door","into the reflection of honour spread","through the incomplete, the trusted. So","darkly the stain skips as a livery","of your pause like an apple pip,","the baltic loved one who sleeps.","","Or as syrup in a cloud, down below in","the cup, you excuse each folded","cry of the finch’s wit, this flush","scattered over our slant of the","day rocked in water, you say","this much. A waver of attention at","the surface, shews the arch there and","the purpose we really cut;","an ounce down by the water, which","","in cross-fire from injustice too large","to hold he lets slither","from starry fingers","noting the herbal jolt of cordite","and its echo: is this our screen, on some","street we hardly guessed could mark","an idea bred to idiocy by the clear","sight-lines ahead. You come in","by the same door, you carry","","what cannot be left for its own","sweet shimmer of reason, its false blood;","the same tint I hear with the pulse it touches","and will not melt. Such shading","of the rose to its stock tips the bolt","from the sky, rising in its effect of what","motto we call peace talks. And yes the","quiet turn of your page is the day","tilting so, faded in the light."];
    williams_text = ["The sympathetic young woman doctor","informs me with an awkward uncharacteristic","formality that the laboratory has reported","","not only on my blood but on the day’s worth","of urine I’d amassed in a plastic bottle and","that I’ve been diagnosed awful word and that","","I’m afflicted with a malady the name of which","I’ve never heard but which arrives now","in an alliterated appellation that sounds to me","","utterly harmless what menace after all can","blameless alliteration contain and perhaps","that’s why I find myself in spite of myself","","blurting out well that certainly makes things","interesting no? that’s what in my utter","witlessness came blurting interesting no?"];


    $("#kay").click(function(){
        if ( !($(this).hasClass("noclick")) ) {
            $(".poet-select").addClass("noclick");
            $(this).css({"color":"white"});
            $("#stop").removeClass("hidden");
            poem_text = kay_text;
            play_poem(kay);
            
        }
    });

    $("#prynne").click(function(){
        if ( !($(this).hasClass("noclick")) ) {
            $(".poet-select").addClass("noclick");
            $(this).css({"color":"white"});
            $("#stop").removeClass("hidden");
            poem_text = prynne_text;
            play_poem(prynne);
            
        }
    });

    $("#williams").click(function(){
        if ( !($(this).hasClass("noclick")) ) {
            $(".poet-select").addClass("noclick");
            $(this).css({"color":"white"});
            $("#stop").removeClass("hidden");
            poem_text = williams_text;
            play_poem(williams);
            
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


