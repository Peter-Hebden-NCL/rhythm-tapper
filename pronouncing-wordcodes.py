from pygame import mixer
import pronouncing
import time

mixer.init()

strong = mixer.Sound('/Users/peterhebden/Desktop/PhD/Sketches/Pronouncing API/tap-strong.wav')
weak = mixer.Sound('/Users/peterhebden/Desktop/PhD/Sketches/Pronouncing API/tap-weak.wav')

text = """In my country
walking by the waters
down where an honest river
shakes hands with the sea,
a woman passed round me
in a slow watchful circle
as if I were a superstition;

or the worst dregs of her imagination
so when she finally spoke
her words spliced into bars
of an old wheel. A segment of air.
Where do you come from?
'Here', I said, 'Here. These parts.'"""

textcode = ""
textcode_formatted = """"""

for line in text.splitlines():
    linecode = ''
    for word in line.split():
        wordcode = ''
        #word to lowercase
        word = word.lower()
        #removing any end punctuation
        while word[-1] in ".,!?;:-_'":
            word = word[:-1]
        while word[0] in ".,!?;:-_'":
            word = word[1:]
        #generating code for word stresses
        if pronouncing.phones_for_word(word) != []:
            wordphones = pronouncing.phones_for_word(word)[0]
            wordcode = pronouncing.stresses(wordphones)
        else:
            wordcode = 'x'
        #adding word code to full text code
        if linecode == '':
            linecode = wordcode
        else:
            linecode = linecode + ' ' + wordcode
    #add linecode to textcode
    if textcode == '':
        textcode = linecode
        textcode_formatted = linecode
    else:
        textcode = textcode + "-" + linecode
        textcode_formatted = textcode_formatted + """\n""" + linecode

#print textcode
print textcode_formatted

prev = ""
for syl in textcode:
    if syl == "0":
        #unstressed
        weak.play()
        print "dah"
        time.sleep(.2)
        
    elif syl == "1":
        #primary stress
        strong.play()
        print "DAH"
        time.sleep(.4)
        
    elif syl == "2":
        #secondary stress
        strong.play()
        print "Dah"
        time.sleep(.3)
        
    elif syl == " ":
        #word break
        if prev != "p":
            print "(space)"
            time.sleep(.1)
        else:
            print "(space after punctuation)"
            #no pause
            
    elif syl == "p":
        #punctuation
        print "(punctuation)"
        time.sleep(.3)
        
    elif syl == "-":
        #line break
        if prev != "p":
            print "(line break)"
            time.sleep(.3)
        else:
            print "(line break after punctuation)"
            #no pause
            
    else:
        #other
        print "(?)"
    
    prev = syl