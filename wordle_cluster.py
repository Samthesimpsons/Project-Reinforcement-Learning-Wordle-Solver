import re
import random
import numpy as np
from tqdm import tqdm
from leven import levenshtein
from sklearn.cluster import AgglomerativeClustering
import matplotlib.pyplot as plt

''' List of feasible words that our reinforcement learning model will be trained on, 
5-letter words from Wordle. Source: https://gist.github.com/cfreshman'''
words = []
with open('words.txt','r') as file:
    for word in file:
        words.append(word.strip('\n').upper())

''' Instead of the words themselves being the state of the game, and also to further reduce the search space,
the idea of clustering comes into mind. The motivation also came from https://github.com/danschauder/wordlebot/blob/main/Wordle_Bot.ipynb.
However, we will do doing our own version and not referencing the above repository. Best way to learn is to do it yourself!

In order to measure the similarity between two words without the sentiment value, we can make use of the levenshtein distance or better
known as the edit distance, which is really the minimum number of single-character edits required to change from one word to another.
For clustering wise, instead of viewing the space of words as a vector space, since we are comparing words between each other, an hierarchical
tree structure seems the most appropriate. Next consideration, is whether a top-down or bottom-up clustering approach is more feasible. Since the 
nodes of the tree are the words themselves and we want to group similar words together, a bottom-up approach is more suited.

Hence the choice of clustering would be to use agglomerative hierarchical clustering based on levenshtein distance measure.'''

''' Custom Clustering class that does the clustering based on the similarities of the words'''
class Clustering():
    def __init__(self):
        pass

    def get_dist_matrix(self, corpus):
        n = len(corpus)
        distance_matrix = np.zeros((n,n))
        for i in range(n):
            for j in range(i,n):
                distance_matrix[i,j] = levenshtein(corpus[i], corpus[j])
                distance_matrix[j,i] = distance_matrix[i,j]
        return distance_matrix

    def get_clusters(self, corpus):
        distance_matrix = self.get_dist_matrix(corpus)
        # Can do simulation analysis to test the parameters
        clusters = AgglomerativeClustering(n_clusters = 5, affinity = 'precomputed', linkage = 'average').fit(distance_matrix)
        return clusters.labels_

if __name__ == '__main__':
    cluster = Clustering()
    cluster.get_clusters(words)

