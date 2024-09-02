import re
import string
import pandas as pd
import numpy as np
import pprint as pp
import io
from nlp_workshop import clean_sent
from nlp_workshop import textRank
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer

def create_output(inputdata):
        # #reading a file, not concerned with this yet
        # with io.open('linux_accept.txt', 'r', encoding="utf-8") as myfile:
        #     text=myfile.read().replace('\n', ' ')
        # #
        DEBUG = False
        def debug(string,variable=''):
            if DEBUG:
                print(string,variable)


        text = inputdata

        def remove_stop_words(sent):
            return ' '.join([x for x in sent.split() if x not in stopwords.words('english')])

        def flatten(array):
            return ' '.join([x for x in array])

        sentences=sent_tokenize(text)
        clean_sentences=[clean_sent(x) for x in sentences]
        clean_document = remove_stop_words(flatten(clean_sentences).lower())

        debug("clean doc: ", clean_document)
        vectorizer = TfidfVectorizer()
        weights = vectorizer.fit_transform([clean_document])

        debug("weights: ",weights)


        summary=textRank(text,stopWords=stopwords.words('english'))

        df = pd.DataFrame({"tfidf":weights.toarray()[0]},index=vectorizer.get_feature_names()).sort_values(by="tfidf",ascending=False)
        df['word'] = df.index
        debug(df)
        debug(summary)


        words_already_quizzed = []
        result = []

        for sentence in summary:
            best_word = ''
            highest = -1.0
            for word in sentence.split():
                if word in list(df.index) and word not in words_already_quizzed:
                    debug("weight: ",df.loc[word]['tfidf'])
                    if df.loc[word]['tfidf'] > highest:
                        highest = df.loc[word]['tfidf']
                        best_word = word
            words_already_quizzed.append(best_word)
            result.append({"question":sentence.replace(best_word,"_____",1),"answer":best_word})

        return(result)


with io.open('linux_accept.txt', 'r', encoding="utf-8") as myfile:
        text=myfile.read().replace('\n', ' ')

print(create_output(text))