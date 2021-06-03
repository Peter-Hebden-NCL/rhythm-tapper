$(document).ready(function(){

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
      
    async function pause(t) {
        await sleep(t);
        console.log("paused for "+t);
    }
    
    var weak = new Audio('tap-weak.mp3');
    var strong = new Audio('tap-strong.mp3');

    var playstate = "";

    kay = "0 1 10-10 1 0 10-1 1 1 10 10-1 1 1 0 1-0 10 1 1 1-0 0 1 10 10-1 1 1 1 0 2010--1 0 1 1 1 1 22010-1 1 1 100 1-1 1 1 10 1-1 1 1 1 0 10 1 1-1 1 1 1 1-1 1 1 1 1 1";
    prynne = "10 1 1 0 10 12-010 10 0 01-1 1 1 1 10 12-1 1 1 0 0 1-10 0 010 1 10 1-1 0 201 0 10 1-10 0 1 1 1 0 100-1 1 1 1 1 10 1-0 10 1 1 1 1--1 1 10 0 0 1 1 01 0-0 1 1 01 1 10-1 1 0 10 1 1 1-10 10 10 1 1 0-1 1 0 10 1 1-1 1 0 10 1 010 1-0 10 1 0 1 1 0-0 10 1 10 1-1 1 1 1 0 10 1--0 12 1 210 1 1-1 1 1 1 10-1 12 10-10 0 10 1 1 10-0 1 10 1 1 10 1 1 1-1 1 10 1 1 1-1 010 1 1 1000 1 0 1-12 01 1 1 0-1 0 1 1 1 10--1 10 1 1 1 1 1-1 10 1 10 1 1 1-0 1 1 1 1 1 0 1 1 10-0 1 1 1 1 10-1 0 1 1 1 1 1 0 1-1 0 1 10 0 1 01 1 1-10 1 1 1 1 0 1 0-10 1 1 1 1 1 0 1-10 1 10 0 0 1";
    williams = "0 2010 1 10 10-21 1 1 1 10 220010-0100 1 0 1020 1 210--1 10 1 1 1 1 1 0 1 1-1 10 1 01 0 0 10 10 0-1 1 1 201 10 1 0 1--1 010 1 0 100 0 1 1 1-1 10 1 1 1 01 1-0 1 01020 2010 1 1 1 1--100 10 1 10 10 1 1-10 01020 01 0 01-1 1 1 1 21 0 1 1 21--10 1 1 1 100 1 1-1020 1 1 1 0 1 10-100 1 10 1020 1";

    $("#kay").click(function(){
        if ( !($(this).hasClass("noclick")) ) {
            $(".poet-select").addClass("noclick");
            $(this).css({"color":"black"});
            $("#stop").removeClass("hidden");
            play_poem(kay);
        }
    });

    $("#prynne").click(function(){
        if ( !($(this).hasClass("noclick")) ) {
            $(".poet-select").addClass("noclick");
            $(this).css({"color":"black"});
            $("#stop").removeClass("hidden");
            play_poem(prynne);
        }
    });

    $("#williams").click(function(){
        if ( !($(this).hasClass("noclick")) ) {
            $(".poet-select").addClass("noclick");
            $(this).css({"color":"black"});
            $("#stop").removeClass("hidden");
            play_poem(williams);
        }
    });

    $("#stop").click(function(){
        playstate = "stop";
        $(".poet-select").removeClass("noclick");
        $(".poet-select").removeAttr("style");
        $(this).addClass("hidden");
    });



    function play_poem(poem) {
        playstate = "play";
        prev = ""
        for (s in poem) {
            if (playstate == "stop") {
                playstate = "";
                break;
            }

            syl = poem[s];
            console.log(syl);

            if (syl == "0") {
                //unstressed
                weak.play();
                pause(200);
            }
            if (syl == "1") {
                //primary stress
                strong.play();
                pause(400);
            }
            if (syl == "2") {
                //secondary stress
                strong.play();
                pause(300);
            }
            if (syl == " ") {
                //word break
                if (prev != "p") {
                    //space
                    pause(100);
                } else {
                    //space after punctuation
                    //nopause
                }
            }
            if (syl == "p") {
                //punctuation
                pause(300);
            }
            if (syl == "-") {
                //line break
                if (prev != "p") {
                    //new line
                    pause(300);
                } else {
                    //new line after punctuation
                    //nopause
                }
            }

            if (s == (poem.length)-1) {
                playstate = "";
                $(".poet-select").removeClass("noclick");
                $(".poet-select").removeAttr("style");
                $("#stop").addClass("hidden");
            }

            prev = syl;
        }
    }




});

