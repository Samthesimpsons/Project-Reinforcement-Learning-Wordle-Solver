import re
import random
import numpy as np
from tqdm import tqdm
import matplotlib.pyplot as plt

''' List of feasible words that our reinforcement learning model will be trained on, 
5-letter words from Wordle. Source: https://www.nytimes.com/games/wordle/index.html
Extracted the 2309 goal words from the source code javascript file and then sorted accordingly. 
https://www.pcmag.com/how-to/want-to-up-your-wordle-game-the-winning-word-is-right-on-the-page'''
words = []
with open('words.txt','r') as file:
    for word in file:
        words.append(word.strip('\n').upper())

''' Custom Wordle class that defines the state of the wordle and the actions (and reward) that can be taken 
also includes getter methods for the state and the goal word '''
class Wordle():
    def __init__(self, initial_word =  'CRANE'):
        # self.initial_word = initial_word
        self.current_word = initial_word
        self.goal_word = random.choice(words) 
        self.reached_goal = False
    
    def get_state(self):
        return self.current_word

    def get_goal(self):
        return self.goal_word
    
    def make_action(self, action):
        # scoring based on yellow, green & black letters
        current_score = eval.get_score(self.current_word, self.goal_word)

        # select next word and get a new scoring 
        self.current_word = action
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
            words = [word for word in words if re.sub(strings_to_remove, '', word) == word]
            
        # remove any words with the yellow letters in that position and if not in that position, only keep those in other positions
        if len(yellow_letters) != 0:
            for word in words:
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
                for key,value in green_letters.items():
                    if word[value] != key:
                        words.remove(word)
                        break
        
        # append back the word we evaluating on to prevent list error, then return filtered corpus
        words.append(word_1)
        return words

''' RL function that contains the Q-learning algorithm.'''
def reinforcement_learning():
    epsilon = 0.1 # probability of random action, exploration
    alpha = 0.1 # learning rate
    gamma = 0.9 # discounting factor

    wordle = Wordle()
    done = False
    steps = 0

    # initialize Q-table, goal word and the current corpus
    goal_word = wordle.get_goal()
    curr_corpus = words.copy()
    q_table = np.zeros((len(curr_corpus), len(curr_corpus)))

    while not done:
        state = wordle.get_state()
        word_to_filter_on = state

        # keep track of the corpus before and after filtering (cutting search space)
        prev_corpus = curr_corpus.copy()
        curr_corpus = eval.filter(word_to_filter_on, goal_word, curr_corpus)
    
        # Similarly, reduce the search space of the Q-table
        indices_removed = []
        for word in curr_corpus:
            if word not in prev_corpus:
                indices_removed.append(prev_corpus.index(word))           

        q_table = np.delete(q_table, indices_removed, axis=0)
        q_table = np.delete(q_table, indices_removed, axis=1)

        state_index = curr_corpus.index(state)

        # exploration
        if random.uniform(0,1) < epsilon:
            action = random.choice(curr_corpus)
            action_index = curr_corpus.index(action)
        # exploitation
        else:
            # Q-table is very sparse in beginning, hence if the row of Q-table all similar still (0), do exploration still
            if np.all(q_table[state_index][i] == q_table[state_index][0] for i in range(len(curr_corpus))):
                action = random.choice(curr_corpus)
                action_index = curr_corpus.index(action)
            # else exploit as usual
            else:
                action_index = np.argmax(q_table[state_index])
                action = curr_corpus[action_index]

        # get reward and update Q-table
        reward, done = wordle.make_action(action)        
        
        new_state = wordle.get_state()
        new_state_max = np.max(q_table[curr_corpus.index(new_state)])
        
        q_table[state_index, action_index] = (1 - alpha)*q_table[state_index, action_index] + alpha*(reward + gamma*new_state_max - q_table[state_index, action_index])
        
        # Increment the steps
        steps = steps + 1
        
        # exit condition in case search too long, set currently to total length of initial corpus
        if steps >= len(words):
            break
    return steps

if __name__ == '__main__':

    # Total number of game simulations (epochs)
    training_epochs=10
    epochs = np.arange(training_epochs)
    guesses = np.zeros(training_epochs)
    for i in tqdm(range(training_epochs)):
        steps = reinforcement_learning() # run RL algorithm
        guesses[i] = steps

    print(f'Average guesses: {np.mean(guesses)}')
    print(f'Total game losses out of {training_epochs}: {np.sum(guesses>6)}')
    print(f'Overall win rate: {(training_epochs-np.sum(guesses>6))/training_epochs*100}%')
    
    # Plot results as a histogram
    # plt.bar(epochs,guesses)
    plt.hist(guesses)
    plt.show()