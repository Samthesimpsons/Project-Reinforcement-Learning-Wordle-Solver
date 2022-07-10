from multiprocessing import Process
from models.wordle_base_15k import run_simulations as rl_base
from models.wordle_cluster_15k import run_simulations as rl_cluster
from models.wordle_cluster_2k import run_simulations as rl_cluster_2
import pandas as pd

learning_rates = [0.1, 0.01, 0.001]    
exploration_rates = [0.5, 0.6, 0.7, 0.8, 0.9]
shrinkage_factors = [0.5, 0.6, 0.7, 0.8, 0.9]
num_of_clusters = [6, 7, 8, 9, 10]

# Set to True to rerun grid_search
run_grid_search = False

def func_1():
    df_1 = pd.DataFrame(columns=['learning_rate', 'exploration_rate', 'shrinkage_factor', 'time_taken', 'average_guesses', 'win_rate'])

    for i, alpha in enumerate(learning_rates):
        for j, epsilon in enumerate(exploration_rates):
            for k, gamma in enumerate(shrinkage_factors):
                print(f'Running epoch {i}, {j}, {k}')
                time_taken, average_guesses, win_rate, guesses = rl_base(learning_rate=alpha, exploration_rate=epsilon, shrinkage_factor=gamma, num_simulations=100)
                df_1.loc[len(df_1)] = [alpha, epsilon, gamma, time_taken, average_guesses, win_rate]
                
    df_1.to_csv('grid_search_results/results_base.csv', index=False)
    df_1 = df_1.sort_values(by=['win_rate', 'average_guesses', 'time_taken'], ascending=[False, True, True])
    print(df_1.iloc[0])

def func_2():
    df_2 = pd.DataFrame(columns=['learning_rate', 'exploration_rate', 'shrinkage_factor', 'num_of_clusters', 'time_taken', 'average_guesses', 'win_rate'])

    for i, alpha in enumerate(learning_rates):
        for j, epsilon in enumerate(exploration_rates):
            for k, gamma in enumerate(shrinkage_factors):
                for l, num_clusters in enumerate(num_of_clusters):
                    print(f'Running epoch {i}, {j}, {k}, {l}')
                    time_taken, average_guesses, win_rate, guesses = rl_cluster(learning_rate=alpha, exploration_rate=epsilon, shrinkage_factor=gamma, number_of_cluster=num_clusters, num_simulations=100)
                    df_2.loc[len(df_2)] = [alpha, epsilon, gamma, num_clusters, time_taken, average_guesses, win_rate]

    df_2.to_csv('grid_search_results/results_cluster.csv', index=False)
    df_2 = df_2.sort_values(by=['win_rate', 'average_guesses', 'time_taken'], ascending=[False, True, True])
    print(df_2.iloc[0])

def func_3():
    df_3 = pd.DataFrame(columns=['learning_rate', 'exploration_rate', 'shrinkage_factor', 'num_of_clusters', 'time_taken', 'average_guesses', 'win_rate'])

    for i, alpha in enumerate(learning_rates):
        for j, epsilon in enumerate(exploration_rates):
            for k, gamma in enumerate(shrinkage_factors):
                for l,num_clusters in enumerate(num_of_clusters):
                    print(f'Running epoch {i}, {j}, {k}, {l}')
                    time_taken, average_guesses, win_rate, guesses = rl_cluster_2(learning_rate=alpha, exploration_rate=epsilon, shrinkage_factor=gamma, number_of_cluster=num_clusters, num_simulations=100)
                    df_3.loc[len(df_3)] = [alpha, epsilon, gamma, num_clusters, time_taken, average_guesses, win_rate]

    df_3.to_csv('grid_search_results/results_cluster_2.csv', index=False)
    df_3 = df_3.sort_values(by=['win_rate', 'average_guesses', 'time_taken'], ascending=[False, True, True])
    print(df_3.iloc[0])

def run_cpu_tasks_in_parallel(tasks):
    running_tasks = [Process(target=task) for task in tasks]
    for running_task in running_tasks:
        running_task.start()
    for running_task in running_tasks:
        running_task.join()

if __name__=='__main__':
    if run_grid_search == True:
        run_cpu_tasks_in_parallel([func_1, func_2, func_3])

    df_1 = pd.read_csv('grid_search_results/results_base.csv')
    df_2 = pd.read_csv('grid_search_results/results_cluster.csv')
    df_3 = pd.read_csv('grid_search_results/results_cluster_2.csv')

    df_1 = df_1.sort_values(by=['win_rate', 'average_guesses', 'time_taken'], ascending=[False, True, True])
    df_2 = df_2.sort_values(by=['win_rate', 'average_guesses', 'time_taken'], ascending=[False, True, True])
    df_3 = df_3.sort_values(by=['win_rate', 'average_guesses', 'time_taken'], ascending=[False, True, True])

    print(df_1.iloc[0])
    print(df_2.iloc[0])
    print(df_3.iloc[0])