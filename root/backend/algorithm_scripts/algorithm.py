def similarity_score(assignment_file_path,
                     w2v_model_file_path = "word2vec_model.model",
                     base_network_model_file_path = "Base_Network_model_Trained_Model_Saved.model",
                     clf_network_model_file_path = "clf_network",
                     known_written_file_path = "testing_dict.pickle"):
    import numpy as np

    import pickle

    import nltk
    from nltk.tokenize import word_tokenize
    from nltk.corpus import stopwords
    from nltk.stem import WordNetLemmatizer
    nltk.download(["punkt", "stopwords","wordnet"])

    import tensorflow as tf
    from tensorflow import keras
    from keras.models import load_model

    import gensim
    from gensim.models import Word2Vec

    import string

    def preprocess_text(text):
        """
        Preprocess a given text by tokenizing, removing punctuation and numbers,
        removing stop words, and lemmatizing.

        Args:
            text (str): The text to preprocess.

        Returns:
            list: The preprocessed text as a list of tokens.
        """
        if not isinstance(text, str):
            text = str(text)

        # Tokenize the text into words
        tokens = word_tokenize(text.lower())

        # Remove punctuation and numbers
        table = str.maketrans('', '', string.punctuation + string.digits)
        tokens = [word.translate(table) for word in tokens]

        # Remove stop words
        stop_words = set(stopwords.words('english'))
        tokens = [word for word in tokens if (not word in stop_words) and (word != '')]

        # Lemmatize words
        lemmatizer = WordNetLemmatizer()
        tokens = [lemmatizer.lemmatize(word) for word in tokens]

        return tokens


    def convert_text_to_vector(texts, model):
        """
        Convert a list of texts into their corresponding word2vec vectors
        """
        vectors = []
        for text in texts:
            words = preprocess_text(text)
            vector = np.sum([model.wv[word] for word in words if word in model.wv], axis=0)
            word_count = np.sum([word in model.wv for word in words])
            if word_count != 0:
                vector /= word_count
            else:
                vector = np.zeros(300)

            vectors.append(vector)

        return vectors


    def count_punctuations(texts):
        """
        Count the frequency of different punctuations in the texts
        """
        # Define punctuations to count
        punctuations = set(['.', ',', ';', ':', '!', '?', '-', '(', ')', '\"', '\'', '`', '/'])

        # Initialize dictionary to count punctuations
        punctuations_count = {p: 0 for p in punctuations}

        # Count punctuations in text_list
        for text in texts:
            for char in text:
                if char in punctuations:
                    punctuations_count[char] += 1

        # Return list of punctuation counts
        return list(punctuations_count.values())


    def analyze_sentence_lengths(sentences):
        """
        Analyze the lengths of sentences
        """
        sentence_lengths = [len(sentence.split()) for sentence in sentences]
        average_length = np.mean(sentence_lengths)
        count_over_avg = np.sum([length > average_length for length in sentence_lengths])
        count_under_avg = np.sum([length < average_length for length in sentence_lengths])
        count_avg = len(sentence_lengths) - count_over_avg - count_under_avg

        return [count_over_avg, count_under_avg, count_avg, average_length]


    def analyze_words(texts):
        """
        Analyze the words used in the texts
        """
        words = []
        stop_words = set(stopwords.words('english'))
        lemmatizer = WordNetLemmatizer()
        for text in texts:
            tokenized = word_tokenize(text.lower())
            processed = [lemmatizer.lemmatize(word) for word in tokenized if word not in stop_words]
            words += processed
        word_freq = nltk.FreqDist(words)
        rare_count = np.sum([freq <= 2 for word, freq in word_freq.items()])
        long_count = np.sum([len(word) > 6 for word in words])
        word_lengths = [len(word) for word in words]
        average_length = np.mean(word_lengths)
        count_over_avg = np.sum([length > average_length for length in word_lengths])
        count_under_avg = np.sum([length < average_length for length in word_lengths])
        count_avg = len(word_lengths) - count_over_avg - count_under_avg
        ttr = len(set(words)) / len(words) if words else 0

        return [rare_count, long_count, count_over_avg, count_under_avg, count_avg, ttr]

    def calculate_style_vector(texts):
        """
        Calculate the style vector of the texts
        """
        punctuation_vec = count_punctuations(texts)     # Punctuations stylistic features
        sentence_vec = analyze_sentence_lengths(texts)  # Sentences stylistic features
        word_vec = analyze_words(texts)                 # Words stylistic features
        word_count = np.sum([len(text.split()) for text in texts])

        vector = np.concatenate((punctuation_vec, sentence_vec, word_vec))

        return vector / word_count if word_count else vector


    def get_vectors(texts, w2v_model):
        res = []
        for text in texts:
            w2v_vec = np.mean(convert_text_to_vector(text, w2v_model), axis=0)
            style_vec = calculate_style_vector(text)
            res.append(np.concatenate((w2v_vec, style_vec), axis=None))

        return res



    w2v_model = Word2Vec.load(w2v_model_file_path)
    base_network_model = load_model(base_network_model_file_path, compile=False)
    clf_network_model = load_model(clf_network_model_file_path, compile=False )

    known_file = known_written_file_path


    assignment_lines = []
    with open(assignment_file_path, 'r') as file:
        for line in file:
            cleaned_line = line.strip().lstrip("\ufeff")
            assignment_lines.append(cleaned_line)

    known_data = []
    with open(known_file, "rb") as file:
        l = pickle.load(file)
    for k,v in l.items():
        known_data.extend(v['known'])

    test_data = get_vectors([assignment_lines], w2v_model)

    known_feature_vectors = base_network_model.predict(np.array(known_data), verbose=0)
    unknown_feature_vectors = base_network_model.predict(np.array(test_data), verbose=0)

    author_representation = np.mean(known_feature_vectors, axis=0)
    unknown_representation = np.mean(unknown_feature_vectors, axis=0)

    concatenated_vectors = []
    concate_vec = np.concatenate((author_representation, unknown_representation), axis=None)
    concatenated_vectors.append(concate_vec)

    score = clf_network_model.predict(np.array(concatenated_vectors))

    return score[0][0]

