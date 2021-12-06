#This script uses the pronouncing Python library: https://github.com/aparrish/pronouncingpy
import pronouncing

#Here's two lines of placeholder text
text = """ If music be the food of love, play on,
That strain again! it had a dying fall"""

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

print textcode

## See index.js for the use of this code in the interface.
