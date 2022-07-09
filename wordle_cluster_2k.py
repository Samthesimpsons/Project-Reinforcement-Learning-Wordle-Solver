import re
import time
import random
import numpy as np
from tqdm import tqdm
from leven import levenshtein
from sklearn.cluster import AgglomerativeClustering
import matplotlib.pyplot as plt

''' List of feasible words that our reinforcement learning model will be trained on, 
5-letter words from Wordle. Source: https://www.nytimes.com/games/wordle/index.html
Extracted the 2309 goal words from the source code javascript file and then sorted accordingly. 
Only using the goal words as feasible words for the reinforcement learning model unlike wordle_cluster_1.py.
https://www.pcmag.com/how-to/want-to-up-your-wordle-game-the-winning-word-is-right-on-the-page'''

words = []
with open('goal_words.txt', 'r') as file:
    for word in file:
        words.append(word.strip('\n').upper())

''' Instead of the words themselves being the state of the game, and also to further reduce the search space,
the idea of clustering comes into mind. In order to measure the differences between two words without the sentiment value, 
we can make use of the levenshtein distance or better known as the edit distance, which is really the minimum number of 
single-character edits required to change from one word to another. For clustering wise, instead of viewing the space of words 
as a vector space, since we are comparing words between each other, an hierarchical tree structure seems the most appropriate. 
Next consideration, is whether a top-down or bottom-up clustering approach is more feasible. Since the nodes of the tree are the 
words themselves and we want to group similar words together, a bottom-up approach is more suited. Hence the choice of clustering 
would be to use agglomerative hierarchical clustering based on levenshtein distance measure.

Custom Clustering class that does the clustering based on the levenshtein distance measure'''

class Clustering():
    def __init__(self, number_of_clusters:int):
        self.number_of_clusters = number_of_clusters

    # Calculate the distance matrix based on the levenshtein distance measure
    def get_dist_matrix(self, corpus:list):
        n = len(corpus)
        distance_matrix = np.zeros((n, n))
        for i in range(n):
            for j in range(i, n):
                distance_matrix[i, j] = levenshtein(corpus[i], corpus[j])
                distance_matrix[j, i] = distance_matrix[i, j]
        return distance_matrix

    # Get the indexes of the words with the chosen cluster number
    def get_indexes_of_cluster(self, cluster_number:int, clusters:list):
        indexes = []
        for index, number in enumerate(clusters):
            if cluster_number == number:
                indexes.append(index)
        return indexes

    # Pick a random word from the chosen cluster
    def get_chosen_word(self, indexes:list, corpus:list):
        chosen_word_index = random.choice(indexes)
        return corpus[chosen_word_index]

    # Get the clusters based on the levenshtein distance measure
    def get_clusters(self, corpus:list):
        distance_matrix = self.get_dist_matrix(corpus)
        # Can do simulation analysis to test the parameters
        clusters = AgglomerativeClustering(
            n_clusters=self.number_of_clusters, 
            affinity='precomputed', 
            linkage='average').fit_predict(distance_matrix)
        return clusters

''' Custom Wordle class that defines the state of the wordle and the actions (and reward) that can be taken 
also includes getter methods for the state and the goal word '''

class Wordle():
    def __init__(self, initial_word='CRANE'):
        self.current_word = initial_word
        self.current_state = None 
        self.goal_word = random.choice(words)
        self.reached_goal = False

    # State is the current cluster number itself
    def get_state(self):
        return self.current_state

    def get_curr_word(self):
        return self.current_word

    def get_goal(self):
        return self.goal_word

    # Action is the next cluster number, and then the chosen word from the cluster for evaluation
    def make_action(self, action, state):
        # scoring based on yellow, green & black letters
        current_score = eval.get_score(self.current_word, self.goal_word)

        # select next word and get a new scoring
        self.current_word = action
        self.current_state = state
        new_score = eval.get_score(self.current_word, self.goal_word)

        # calculate reward of previous word to new word
        reward = eval.get_reward(current_score, new_score)

        # if ever the case the goal state is reached, True is returned
        if self.current_word == self.goal_word:
            return reward, True
        return reward, False

''' Custom Evaluation class that contains the getter methods for the scoring and reward of the wordle.
The scoring is based on the number of yellow, green and black letters in the wordle.
The reward is based on the number of yellow (+/-5), green (+/-10) and black letters (-/+1) in the wordle.
Reward 10 for each additional green letter, +5 for each additional yellow letter, penalty of -1 for each additional black letter.
Includes filter function to help reduce the search space of the wordle in terms of the feasible words remaining. '''

class eval():
    def __init__(self):
        pass

    def get_score(word_1:str , word_2:str):
        scoring = {'green': 0, 'yellow': 0, 'black': 0}
        for i in range(5):
            if word_1[i] == word_2[i]:
                scoring['green'] += 1
            elif word_1[i] in word_2:
                scoring['yellow'] += 1
            else:
                scoring['black'] += 1
        return scoring

    def get_reward(new_scoring:dict, previous_score:dict):
        reward = 0
        reward += (new_scoring['green'] - previous_score['green'])*10 
        reward += (new_scoring['yellow'] - previous_score['yellow'])*5 
        reward -= (new_scoring['black'] - previous_score['black'])*1 
        return reward

    def filter(filter_word:str, goal_word:str, corpus:list):
        black_letters = []  # list of black letters
        yellow_letters = {}  # key-val pair of yellow letters and their positions
        green_letters = {}  # key-val pair of green letters and their positions

        # Get the list or dict of black letters, yellow letters and green letters
        for i in range(5):
            if filter_word[i] != goal_word[i] and filter_word[i] not in goal_word:
                black_letters.append(filter_word[i])
            elif filter_word[i] == goal_word[i]:
                green_letters[filter_word[i]] = i
            elif filter_word[i] != goal_word[i] and filter_word[i] in goal_word:
                yellow_letters[filter_word[i]] = i

        # Remove any words with the black letters
        if len(black_letters) != 0:
            strings_to_remove = "[{}]".format("".join(black_letters))
            corpus = [word for word in corpus if (
                re.sub(strings_to_remove, '', word) == word or word == filter_word)]

        # Keep only words with correct green position
        if len(green_letters) != 0:
            for key, value in green_letters.items():
                corpus = [word for word in corpus if (
                    word[value] == key or word == filter_word)]

        # Do not keep words with yellow letters in current position
        if len(yellow_letters) != 0:
            for key, value in yellow_letters.items():
                corpus = [word for word in corpus if (
                    word[value] != key or word == filter_word)]

        # Do not keep words without yellow letters in other positions
        if len(yellow_letters) != 0:
            for yellow_letter in yellow_letters.keys():
                corpus = [word for word in corpus if (
                    yellow_letter in word or word == filter_word)]

        # Unlike worle_base we can remove the word we filtering on, since our state-action pair is cluster-cluster and not word-word
        if filter_word in corpus:
            corpus.remove(filter_word)

        # Return filtered corpus
        return corpus

''' RL function that contains the Q-learning algorithm.'''

def reinforcement_learning(learning_rate: int,
                           exploration_rate: int, 
                           shrinkage_factor: int, 
                           number_of_cluster: int,
                           pairwise_distance_matrix: np.ndarray,
                           cluster_assignment: np.ndarray, 
                           Q_table: np.ndarray):

    epsilon = exploration_rate  # probability of exploration
    alpha = learning_rate  # learning rate
    gamma = shrinkage_factor  # discounting factor

    wordle = Wordle()
    done = False
    steps = 1 # Since we start off with an initial word already

    # initialize Q-table, goal word and the current corpus
    goal_word = wordle.get_goal()
    if goal_word == 'CRANE':
        return 1, ['CRANE']
    
    curr_corpus = words.copy()
    q_table = Q_table

    # initialize distance matrix (similarities) and the clustering results
    distance_matrix = pairwise_distance_matrix
    cluster_results = cluster_assignment

    # initialize the first word cluster numer
    wordle.current_state = cluster_results[curr_corpus.index(
        wordle.get_curr_word())]

    visited_words = []
    while not done:
        state = wordle.get_state()
        word_to_filter_on = wordle.get_curr_word()
        visited_words.append(word_to_filter_on)

        # keep track of the corpus before and after filtering (cutting search space)
        prev_corpus = curr_corpus.copy()
        curr_corpus = eval.filter(word_to_filter_on, goal_word, curr_corpus)
        
        # Similarly, reduce the search space of the distance_matrix and cluster_results
        indices_removed = []
        for i, word in enumerate(prev_corpus):
            if word not in curr_corpus:
                indices_removed.append(i)

        distance_matrix = np.delete(distance_matrix, indices_removed, axis=0)
        distance_matrix = np.delete(distance_matrix, indices_removed, axis=1)
        cluster_results = np.delete(cluster_results, indices_removed, axis=0)

        epsilon = epsilon / (steps ** 2) # Decaying epsilon, explore lesser as it goes on
        if random.uniform(0, 1) < epsilon: # Explore
            list_of_states_to_explore = list(set(cluster_results))
            if len(list_of_states_to_explore) != 1:
                if state in list_of_states_to_explore:
                    list_of_states_to_explore.remove(state)
            action_index = random.choice(list_of_states_to_explore)

        else: #Exploit
            # Q-table is very sparse in beginning, hence if the row of Q-table all similar still (0), do exploration still
            if np.all(q_table[state][i] == q_table[state][0] for i in range(len(curr_corpus))):
                list_of_states_to_explore = list(set(cluster_results))
                if len(list_of_states_to_explore) != 1:
                    if state in list_of_states_to_explore:
                        list_of_states_to_explore.remove(state)
                action_index = random.choice(list_of_states_to_explore)
            else: # Exploit
                action_index = np.argmax(q_table[state])

        c = Clustering(number_of_cluster)
        chosen_word = c.get_chosen_word(c.get_indexes_of_cluster(action_index, cluster_results), curr_corpus)

        # Get reward and update Q-table
        reward, done = wordle.make_action(chosen_word, action_index)
        new_state_max = np.max(q_table[action_index])

        q_table[state, action_index] = (1 - alpha)*q_table[state, action_index] + alpha*(
            reward + gamma*new_state_max - q_table[state, action_index])

        # Increment the steps
        steps = steps + 1

        # Exit condition in case search too long, set currently to total length of initial corpus
        if steps >= len(words):
            break

    visited_words.append(goal_word)
    return steps, visited_words


''' Run n simulations function where each simulation is one run of the game'''

def run_simulations(learning_rate: int,
                    exploration_rate: int,
                    shrinkage_factor: int,
                    num_simulations:int,
                    number_of_cluster: int):

    epochs = np.arange(num_simulations)
    guesses = np.zeros(num_simulations)
    
    toc_1 = time.time()
    clust = Clustering(number_of_cluster)
    distance_matrix = clust.get_dist_matrix(words)
    cluster_results = clust.get_clusters(words)
    tic_1 = time.time()

    # Note unlike wordle_base, we are not reinitializing the Q-table each time, 
    # instead we are going to keep updating it and learn from prev simulations
    Q_table = np.zeros((number_of_cluster, number_of_cluster))

    toc_2 = time.time()
    for epoch in range(num_simulations):
        steps, visited_words = reinforcement_learning(learning_rate, 
                                                      exploration_rate, 
                                                      shrinkage_factor, 
                                                      number_of_cluster,
                                                      distance_matrix, 
                                                      cluster_results, 
                                                      Q_table)
        guesses[epoch] = steps
    tic_2 = time.time()

    time_taken = tic_2 - toc_1
    average_guesses = np.mean(guesses)
    win_rate = (num_simulations-np.sum(guesses>6))/num_simulations*100
    
    # print(f'Time for clustering: {tic_1 - toc_1}')
    # print(f'Time for learning: {tic_2 - toc_2}')
    # print(f'Average guesses: {np.mean(guesses)}')
    # print(f'Total game losses out of {num_simulations}: {np.sum(guesses>6)}')
    # print(f'Overall win rate: {(num_simulations-np.sum(guesses>6))/num_simulations*100}%')
    
    return time_taken, average_guesses, win_rate, guesses

    # plt.bar(epochs,guesses)
    # plt.hist(guesses)
    # plt.show()

def run_simulation_pygame(learning_rate: int,
                          exploration_rate: int,
                          shrinkage_factor: int,
                          num_simulations:int,
                          number_of_cluster: int):

    epochs = np.arange(num_simulations)
    guesses = np.zeros(num_simulations)
    
    clust = Clustering(number_of_cluster)
    distance_matrix = clust.get_dist_matrix(words)
    cluster_results = clust.get_clusters(words)
    Q_table = np.load('Q_table.npy')

    for epoch in tqdm(range(num_simulations)):
        steps, visited_words = reinforcement_learning(learning_rate, 
                                                      exploration_rate, 
                                                      shrinkage_factor, 
                                                      number_of_cluster,
                                                      distance_matrix, 
                                                      cluster_results, 
                                                      Q_table)
        guesses[epoch] = steps
        average_guesses = np.mean(guesses)

    win_rate = (num_simulations-np.sum(guesses>6))/num_simulations*100
    
    return average_guesses, win_rate, guesses, Q_table

if __name__ == '__main__':
    # average_guesses, win_rate, guesses, Q_table = run_simulation_pygame(learning_rate=0.001, exploration_rate=0.9, shrinkage_factor=0.9, num_simulations=100000, number_of_cluster=9)
    # np.save('Q_table.npy', Q_table)
    
    run_simulations(learning_rate=0.001, exploration_rate=0.9, shrinkage_factor=0.9, num_simulations=1000, number_of_cluster=9)