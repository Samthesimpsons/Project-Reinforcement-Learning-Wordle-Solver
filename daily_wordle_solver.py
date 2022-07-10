import re
import sys
import random
import pygame
import numpy as np
from datetime import date
from leven import levenshtein
from sklearn.cluster import AgglomerativeClustering

'''Our AI wordle algorithm'''

words = []
with open('models/goal_words.txt', 'r') as file:
    for word in file:
        words.append(word.strip('\n').upper())

reference_goal = words.index('BEADY')
date_diff = (date.today() - date(2022,6,25)).days
CORRECT_WORD = words[reference_goal + date_diff].lower()

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

class Wordle():
    def __init__(self, initial_word='CRANE'):
        self.current_word = initial_word
        self.current_state = None 
        self.goal_word = CORRECT_WORD.upper()
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

def reinforcement_learning(learning_rate: int,
                           exploration_rate: int, 
                           shrinkage_factor: int, 
                           number_of_cluster: int):

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
    q_table = np.load('models/Q_table.npy')
    
    # initialize distance matrix (similarities) and the clustering results
    clust = Clustering(number_of_cluster)
    distance_matrix = clust.get_dist_matrix(words)
    cluster_results = clust.get_clusters(words)

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

        chosen_word = clust.get_chosen_word(clust.get_indexes_of_cluster(action_index, cluster_results), curr_corpus)

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
    return visited_words

'''Pygame Environment, referenced https://github.com/baraltech/Wordle-PyGame for the UI layout, 
adjusted the cases and code to our AI bot solver case.'''

WORDS = [word.lower() for word in words]

pygame.init()

# Constants
WIDTH, HEIGHT = 633, 900
SCREEN = pygame.display.set_mode((WIDTH, HEIGHT),pygame.SCALED)
BACKGROUND = pygame.image.load("assets/Starting Tiles.png")
BACKGROUND_RECT = BACKGROUND.get_rect(center=(317, 300))
SCREEN.fill("white")
SCREEN.blit(BACKGROUND, BACKGROUND_RECT)

ICON = pygame.image.load("assets/Icon.png")
pygame.display.set_icon(ICON)
pygame.display.set_caption("Wordle AI Bot Solver")

GREEN = "#6aaa64"
YELLOW = "#c9b458"
GREY = "#787c7e"
OUTLINE = "#d3d6da"
FILLED_OUTLINE = "#878a8c"

ALPHABET = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"]
GUESSED_LETTER_FONT = pygame.font.Font("assets/FreeSansBold.otf", 50)
AVAILABLE_LETTER_FONT = pygame.font.Font("assets/FreeSansBold.otf", 25)

pygame.display.update()

LETTER_X_SPACING = 85
LETTER_Y_SPACING = 12
LETTER_SIZE = 75

# Global variables
guesses_count = 0

# Guesses is a 2D list that will store guesses. A guess will be a list of letters.
# The list will be iterated through and each letter in each guess will be drawn on the screen.
guesses = [[]] * 6

current_guess = []
current_guess_string = ""
current_letter_bg_x = 110

# Indicators is a list storing all the Indicator object. An indicator is that button thing with all the letters you see.
indicators = []

# List of words from our AI solver and their letters to display
visited_words = reinforcement_learning(learning_rate=0.1, exploration_rate=0.9, shrinkage_factor=0.9, number_of_cluster=10)

letters = []
for word in visited_words:
    word_letters = list(word)
    for letter in word_letters:
        letters.append(letter)

# Keep track of the number of presses of `Enter` and the upperbound
max_presses = len(letters)
presses = 0

game_result = ""

class Letter:
    def __init__(self, text, bg_position):
        # Initializes all the variables, including text, color, position, size, etc.
        self.bg_color = "white"
        self.text_color = "black"
        self.bg_position = bg_position
        self.bg_x = bg_position[0]
        self.bg_y = bg_position[1]
        self.bg_rect = (bg_position[0], self.bg_y, LETTER_SIZE, LETTER_SIZE)
        self.text = text
        self.text_position = (self.bg_x+36, self.bg_position[1]+34)
        self.text_surface = GUESSED_LETTER_FONT.render(self.text, True, self.text_color)
        self.text_rect = self.text_surface.get_rect(center=self.text_position)

    def draw(self):
        # Puts the letter and text on the screen at the desired positions.
        pygame.draw.rect(SCREEN, self.bg_color, self.bg_rect)
        if self.bg_color == "white":
            pygame.draw.rect(SCREEN, FILLED_OUTLINE, self.bg_rect, 3)
        self.text_surface = GUESSED_LETTER_FONT.render(self.text, True, self.text_color)
        SCREEN.blit(self.text_surface, self.text_rect)
        pygame.display.update()

class Indicator:
    def __init__(self, x, y, letter):
        # Initializes variables such as color, size, position, and letter.
        self.x = x
        self.y = y
        self.text = letter
        self.rect = (self.x, self.y, 57, 75)
        self.bg_color = OUTLINE

    def draw(self):
        # Puts the indicator and its text on the screen at the desired position.
        pygame.draw.rect(SCREEN, self.bg_color, self.rect)
        self.text_surface = AVAILABLE_LETTER_FONT.render(self.text, True, "white")
        self.text_rect = self.text_surface.get_rect(center=(self.x+27, self.y+30))
        SCREEN.blit(self.text_surface, self.text_rect)
        pygame.display.update()

# Drawing the indicators on the screen.

indicator_x, indicator_y = 20, 600

for i in range(3):
    for letter in ALPHABET[i]:
        new_indicator = Indicator(indicator_x, indicator_y, letter)
        indicators.append(new_indicator)
        new_indicator.draw()
        indicator_x += 60
    indicator_y += 100
    if i == 0:
        indicator_x = 50
    elif i == 1:
        indicator_x = 105

def check_guess(guess_to_check):
    # Goes through each letter and checks if it should be green, yellow, or grey.
    global current_guess, current_guess_string, guesses_count, current_letter_bg_x, game_result
    game_decided = False
    for i in range(5):
        lowercase_letter = guess_to_check[i].text.lower()
        if lowercase_letter in CORRECT_WORD:
            if lowercase_letter == CORRECT_WORD[i]:
                guess_to_check[i].bg_color = GREEN
                for indicator in indicators:
                    if indicator.text == lowercase_letter.upper():
                        indicator.bg_color = GREEN
                        indicator.draw()
                guess_to_check[i].text_color = "white"
                if not game_decided:
                    game_result = "W"
            else:
                guess_to_check[i].bg_color = YELLOW
                for indicator in indicators:
                    if indicator.text == lowercase_letter.upper():
                        indicator.bg_color = YELLOW
                        indicator.draw()
                guess_to_check[i].text_color = "white"
                game_result = ""
                game_decided = True
        else:
            guess_to_check[i].bg_color = GREY
            for indicator in indicators:
                if indicator.text == lowercase_letter.upper():
                    indicator.bg_color = GREY
                    indicator.draw()
            guess_to_check[i].text_color = "white"
            game_result = ""
            game_decided = True
        guess_to_check[i].draw()
        pygame.display.update()
    
    guesses_count += 1
    current_guess = []
    current_guess_string = ""
    current_letter_bg_x = 110

    if guesses_count == 6 and game_result == "":
        game_result = "L"

def play_again():
    # Puts the play again text on the screen.
    pygame.draw.rect(SCREEN, "white", (10, 600, 1000, 600))
    play_again_font = pygame.font.Font("assets/FreeSansBold.otf", 40)
    play_again_text = play_again_font.render("Press ESC to rerun!", True, "black")
    play_again_rect = play_again_text.get_rect(center=(WIDTH/2, 700))
    word_was_text = play_again_font.render(f"Today's wordle is {CORRECT_WORD.upper()}!", True, "black")
    word_was_rect = word_was_text.get_rect(center=(WIDTH/2, 650))
    SCREEN.blit(word_was_text, word_was_rect)
    SCREEN.blit(play_again_text, play_again_rect)
    pygame.display.update()

def reset():
    # Resets some global variables to their default states.
    global guesses_count, CORRECT_WORD, guesses, current_guess, current_guess_string, game_result, presses, letters, max_presses, visited_words
    SCREEN.fill("white")
    SCREEN.blit(BACKGROUND, BACKGROUND_RECT)
    guesses_count = 0
    CORRECT_WORD = CORRECT_WORD
    guesses = [[]] * 6
    current_guess = []
    current_guess_string = ""
    game_result = ""
    visited_words = reinforcement_learning(learning_rate=0.001, exploration_rate=0.9, shrinkage_factor=0.9, number_of_cluster=9)
    presses = 0
    letters = []
    for word in visited_words:
        word_letters = list(word)
        for letter in word_letters:
            letters.append(letter)           
    max_presses = len(letters)

    pygame.display.update()
    for indicator in indicators:
        indicator.bg_color = OUTLINE
        indicator.draw()

def create_new_letter():
    # Creates a new letter and adds it to the guess.
    global current_guess_string, current_letter_bg_x
    current_guess_string += key_pressed
    new_letter = Letter(key_pressed, (current_letter_bg_x, guesses_count*100+LETTER_Y_SPACING))
    current_letter_bg_x += LETTER_X_SPACING
    guesses[guesses_count].append(new_letter)
    current_guess.append(new_letter)
    for guess in guesses:
        for letter in guess:
            letter.draw()

while True:
    if game_result != "":
        play_again()
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                if game_result != "":
                    reset()
            elif event.key == pygame.K_RETURN:
                if presses < max_presses and len(current_guess_string) < 5:
                        key_pressed = str(letters.pop(0))
                        presses += 1
                        create_new_letter()
                if len(current_guess_string) == 5 and current_guess_string.lower() in WORDS:
                    check_guess(current_guess)
