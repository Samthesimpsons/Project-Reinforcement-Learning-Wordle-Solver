import re
import random
import numpy as np
from tqdm import tqdm
from leven import levenshtein
from sklearn.cluster import AgglomerativeClustering
import matplotlib.pyplot as plt

''' List of feasible words that our reinforcement learning model will be trained on, 
5-letter words from Wordle. Source: https://www.nytimes.com/games/wordle/index.html
Extracted the 2309 goal words from the source code javascript file and then sorted accordingly. 
https://www.pcmag.com/how-to/want-to-up-your-wordle-game-the-winning-word-is-right-on-the-page'''
words = []
with open('words.txt','r') as file:
    for word in file:
        words.append(word.strip('\n').upper())

''' Instead of using levenshtein distance, we can try to build our own similarity measurement'''
class Clustering():
    def __init__(self, number_of_clusters):
        self.number_of_clusters = number_of_clusters

    def calculate_word_similarity(self,a,b):
        score = np.sum([1 for i in range(len(a)) if a[i]==b[i]])
        a_set = set(a)
        b_set = set(b)
        return (score + len(a_set.intersection(b_set)))/10

    def get_dist_matrix(self, corpus):
        n = len(corpus)
        distance_matrix = np.zeros((n,n))
        for i in range(n):
            for j in range(i,n):
                distance_matrix[i,j] = self.calculate_word_similarity(corpus[i], corpus[j])
                distance_matrix[j,i] = distance_matrix[i,j]
        return distance_matrix

    def get_indexes_of_cluster(self, cluster_number:int, clusters):
        indexes = []
        for index, number in enumerate(clusters):
            if cluster_number == number:
                indexes.append(index)
        return indexes

    def get_chosen_word(self, indexes, corpus, distance_matrix):
        chosen_word_index = random.choice(indexes)
        return corpus[chosen_word_index] 

    def get_clusters(self, corpus):
        distance_matrix = self.get_dist_matrix(corpus)
        # Can do simulation analysis to test the parameters
        clusters = AgglomerativeClustering(n_clusters = self.number_of_clusters, affinity = 'precomputed', linkage = 'average').fit_predict(distance_matrix)
        return clusters

'''The new idea now shall be, for each simulation run of the RL algorithm:
1. Do clustering on the whole corpus
then for each iteration 
2. Use Q-leaning to select the a cluster from which to draw our word from
3. The word drawn will be the word with the minimum similarity scoring
4. Evaluate the word, calculate the reward, to fliter the cluster
5. Either explore other clusters or exploit the Q-table argmax'''

''' Custom Wordle class that defines the state of the wordle and the actions (and reward) that can be taken 
also includes getter methods for the state and the goal word '''
class Wordle():
    def __init__(self, initial_word =  'CRANE'):
        self.current_word = initial_word
        self.current_state = 1
        self.goal_word = random.choice(words) 
        self.reached_goal = False
    
    def get_state(self):
        return self.current_state

    def get_curr_word(self):
        return self.current_word

    def get_goal(self):
        return self.goal_word
    
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
The reward is based on the number of yellow (=/-5), green (+/-10) and black letters (-/+1) in the wordle.
Includes filter function to help reduce the search space of the wordle. '''
class eval():
    def __init__(self):
        pass
    
    def get_score(word_1, word_2):
        scoring = {'green': 0, 'yellow': 0, 'black': 0}

        for i in range(5):            
            if word_1[i]==word_2[i]:
                scoring['green'] += 1
            elif word_1[i] in word_2:
                scoring['yellow'] += 1
            else:
                scoring['black'] += 1
        return scoring
    
    def get_reward(scoring_1, scoring_2):
        reward = 0
        reward += (scoring_1['green'] - scoring_2['green'])*10
        reward += (scoring_1['yellow'] - scoring_2['yellow'])*5
        reward -= (scoring_1['black'] - scoring_2['black'])*1
        return reward

    def filter(word_1, word_2, words):
        '''
        Cases: to cover all possible cases
        SOULS vs APPLE, all no match
        TRAIN vs APPLE, A match wrong position
        ALOUD vs APPLE, L match wrong posiiton, A match correct position
        ABOVE vs APPLE, A/E match correct position
        '''
        black_letters = [] # list of black letters
        yellow_letters = {} # key-val pair of yellow letters and their positions
        green_letters = {} # key-val pair of green letters and their positions
        for i in range(5):
            if word_1[i] != word_2[i] and word_1[i] not in word_2:
                black_letters.append(word_1[i])
            elif word_1[i] == word_2[i]:
                green_letters[word_1[i]] = i
            elif word_1[i] != word_2[i] and word_1[i] in word_2:
                yellow_letters[word_1[i]] = i

        # remove any words with the black letters
        if len(black_letters) != 0:
            strings_to_remove = "[{}]".format("".join(black_letters))
            words = [word for word in words if (re.sub(strings_to_remove, '', word) == word or word == word_1)]
            
        # remove any words with the yellow letters in that position and if not in that position, only keep those in other positions
        if len(yellow_letters) != 0:
            for word in words:
                if word != word_1:
                    for key, value in yellow_letters.items():
                        if word[value] == key:
                            words.remove(word)
                            break
                        elif word[value] != key:
                            if key not in word:
                                words.remove(word)
                                break

        # remove any words with the green letters not in that position
        if len(green_letters) != 0:
            for word in words:
                if word != word_1:
                    for key,value in green_letters.items():
                        if word[value] != key:
                            words.remove(word)
                            break
        
        # return filtered corpus
        return words

def reinforcement_learning(learning_rate: int, exploration_rate: int, shrinkage_factor: int, number_of_cluster: int):
    epsilon = exploration_rate # probability of random action, exploration
    alpha = learning_rate # learning rate
    gamma = shrinkage_factor # discounting factor

    wordle = Wordle()
    done = False
    steps = 0

    # initialize Q-table, goal word and the current corpus
    goal_word = wordle.get_goal()
    curr_corpus = words.copy()
    q_table = np.zeros((number_of_cluster, number_of_cluster))

    # initialize distance matrix (similarities) and the clustering results
    c = Clustering(number_of_cluster)
    distance_matrix = c.get_dist_matrix(curr_corpus)
    cluster_results = c.get_clusters(curr_corpus)

    while not done:
        # get the cluster number to select from
        state = wordle.get_state() 
        # get indexes of all matching states in the corpus
        indexes_of_state = c.get_indexes_of_cluster(state, cluster_results) 
        # get the word with the minimum total levenshtein distance in the state (chosen cluster number)
        word_to_filter_on = c.get_chosen_word(indexes_of_state, curr_corpus, distance_matrix)

        # keep track of the corpus before and after filtering (cutting search space)
        prev_corpus = curr_corpus.copy()
        curr_corpus = eval.filter(word_to_filter_on, goal_word, curr_corpus)
    
        # Similarly, reduce the search space of the Q-table
        indices_removed = []
        for i,word in enumerate(prev_corpus):
            if word not in curr_corpus:
                indices_removed.append(i)                       

        distance_matrix = np.delete(distance_matrix, indices_removed, axis=0)
        distance_matrix = np.delete(distance_matrix, indices_removed, axis=1)
        cluster_results = np.delete(cluster_results, indices_removed, axis=0)

        # exploration
        if random.uniform(0,1) < epsilon:
            list_of_states_to_explore = list(set(cluster_results))
            if len(list_of_states_to_explore) != 1:
                list_of_states_to_explore.remove(state)
            action_index = random.choice(list_of_states_to_explore)
        # exploitation
        else:
            # Q-table is very sparse in beginning, hence if the row of Q-table all similar still (0), do exploration still
            if np.all(q_table[state][i] == q_table[state][0] for i in range(len(curr_corpus))):
                list_of_states_to_explore = list(set(cluster_results))
                if len(list_of_states_to_explore) != 1:
                    list_of_states_to_explore.remove(state)
                action_index = random.choice(list_of_states_to_explore)
            # else exploit as usual
            else:
                action_index = np.argmax(q_table[state])

        action = c.get_chosen_word(c.get_indexes_of_cluster(action_index, cluster_results) , curr_corpus, distance_matrix)

        # get reward and update Q-table
        new_state = action_index
        reward, done = wordle.make_action(action, new_state)        
        new_state_max = np.max(q_table[new_state])

        q_table[state, action_index] = (1 - alpha)*q_table[state, action_index] + alpha*(reward + gamma*new_state_max - q_table[state, action_index])
    
        # Increment the steps
        steps = steps + 1
        
        # exit condition in case search too long, set currently to total length of initial corpus
        if steps >= len(words):
            break
    return steps

if __name__ == '__main__':
    training_epochs=3
    epochs = np.arange(training_epochs)
    guesses = np.zeros(training_epochs)
    for i in tqdm(range(training_epochs)):
        steps = reinforcement_learning(learning_rate=0.1, exploration_rate=0.1, shrinkage_factor=0.9, number_of_cluster=15) # run RL algorithm
        guesses[i] = steps

    print(f'Average guesses: {np.mean(guesses)}')
    print(f'Total game losses out of {training_epochs}: {np.sum(guesses>6)}')
    print(f'Overall win rate: {(training_epochs-np.sum(guesses>6))/training_epochs*100}%')

    # Plot results as a bar or histogram
    plt.bar(epochs,guesses)
    # plt.hist(guesses)
    plt.show()