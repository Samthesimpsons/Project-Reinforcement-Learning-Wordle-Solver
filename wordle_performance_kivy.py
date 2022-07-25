from pyexpat import model
from kivy.app import App
from kivy.uix.label import Label
from kivy.uix.togglebutton import ToggleButton
from kivy.uix.button import Button
from kivy.uix.gridlayout import GridLayout
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.slider import Slider
from kivy.uix.popup import Popup
from kivy.metrics import *
from models.wordle_base_15k import run_simulations as rl_base
from models.wordle_cluster_2k import run_simulations as rl_cluster_1
from models.wordle_cluster_15k import run_simulations as rl_cluster_2
from models.wordle_greedy_search_2k import run_simulations as rl_greedy_1
from models.wordle_greedy_search_15k import run_simulations as rl_greedy_2
import numpy as np
import matplotlib.pyplot as plt
from GUI_files.complexRadar import ComplexRadar # Code taken online
from kivy.garden.matplotlib import FigureCanvasKivyAgg
from kivy.uix.progressbar import ProgressBar
from kivy.properties import StringProperty
from kivy.clock import mainthread

import threading
import time

# class LoadingPopup(Popup):
#     counter = 0
#     data_label = StringProperty("Nothing yet!")

#     def __init__(self, **kwargs):
#         super().__init__(**kwargs)
#         threading.Thread(target=self.get_data).start()

#     def get_data(self):
#         while App.get_running_app():
#             # get data here
#             # sock.recv(1024) or how you do it
#             time.sleep(1)

#             # if you change the UI you need to do it on main thread
#             self.set_data_label(self.counter)

#             self.counter += 1

    # @mainthread
    # def set_data_label(self, data):
    #     self.data_label = str(data)




class MainApp(App):

    def build(self):
        # initialize some variables
        self.training = False
        self.state = 0
        self.current_words_on_display = []
        self.currently_displayed = {
                                    "RL Base": [],
                                    "RL Cluster 2k": [], 
                                    "RL Cluster 15k": [] , 
                                    "Greedy Search 2k": [], 
                                    "Greedy Search 15k": []
                                    }
        self.state_dict = {
            1 : "RL Base",
            2 : "RL Cluster 2k",
            3 : "RL Cluster 15k",
            4 : "Greedy Search 2k",
            5 : "Greedy Search 15k"
        }
        self.max_time = 0
        # best parameters from grid search
        # [learning_rate, exploration_rate, shrinkage_factor, num_clusters]
        self.best_params = {
            1 : [0.1, 0.8, 0.8, 10],
            2 : [0.1, 0.9, 0.5, 6],
            3 : [0.001, 0.9, 0.9, 9],
            4 : [0.9, 0.9, 0.9, 10],
            5 : [0.9, 0.9, 0.9, 10]
        }


        # main widget (root)
        # self.root = GridLayout(cols=4, rows=3)
        # self.root.add_widget(BoxLayout(orientation='vertical'))
        self.root = BoxLayout(orientation='vertical')

        # header row to welcome the player
        header_row = BoxLayout(orientation = "vertical")
        intro_text = Label(text='Welcome to [color=3333ff]Wordle[/color] solver results page',markup=True,font_size='20sp')
        header_row.add_widget(intro_text)
        self.root.add_widget(header_row) 

        # buttons row which contains the togglebuttons indicating the selected mode
        button_row = BoxLayout(orientation = "horizontal", spacing=2)
        btn1 = ToggleButton(text='RL Base model', group='mode')
        btn1.id = 1
        btn1.bind(on_press = self.select_mode)

        btn2 = ToggleButton(text='RL Clustering 2k', group='mode')
        btn2.id = 2
        btn2.bind(on_press= self.select_mode)

        btn3 = ToggleButton(text='RL Clustering 15k', group='mode')
        btn3.id = 3
        btn3.bind(on_press = self.select_mode)

        btn4 = ToggleButton(text='Greedy Search 2k', group='mode')
        btn4.id = 4
        btn4.bind(on_press = self.select_mode)

        btn5 = ToggleButton(text='Greedy Search 15k', group='mode')
        btn5.id = 5
        btn5.bind(on_press = self.select_mode)

        button_row.add_widget(btn1)
        button_row.add_widget(btn2)
        button_row.add_widget(btn3)
        button_row.add_widget(btn4)
        button_row.add_widget(btn5)
        self.root.add_widget(button_row)

        # row to select parameters
        parameter_row = GridLayout(rows=3, cols=2)

        # Cell 0,0 : learning rate
        self.box1 = BoxLayout(orientation="horizontal")
        self.learning_rate = 0.9
        self.learning_rate_text = Label(text=f'learning rate : {self.learning_rate}')
        self.box1.add_widget(self.learning_rate_text)
        self.learning_rate_slider = Slider(min=0.001,max=0.1,value=0.9,step=0.001)
        self.learning_rate_slider.bind(value=self.update_learning_rate_value)
        self.box1.add_widget(self.learning_rate_slider)
        parameter_row.add_widget(self.box1)

        # Cell 0,1 : exploration rate
        self.box2 = BoxLayout(orientation="horizontal")
        self.exploration_rate = 0.9
        self.exploration_rate_text = Label(text=f'exploration rate : {self.exploration_rate}')
        self.box2.add_widget(self.exploration_rate_text)
        self.exploration_rate_slider = Slider(min=0.5,max=0.9,value=0.9,step=0.1)
        self.exploration_rate_slider.bind(value=self.update_exploration_rate_value)
        self.box2.add_widget(self.exploration_rate_slider)
        parameter_row.add_widget(self.box2)

        # Cell 1,0 : shrinkage factor
        self.box3 = BoxLayout(orientation="horizontal")
        self.shrinkage_factor = 0.9
        self.shrinkage_factor_text = Label(text=f'shrinkage factor : {self.shrinkage_factor}')
        self.box3.add_widget(self.shrinkage_factor_text)
        self.shrinkage_factor_slider = Slider(min=0.5,max=0.9,value=0.9,step=0.1)
        self.shrinkage_factor_slider.bind(value=self.update_shrinkage_factor_value)
        self.box3.add_widget(self.shrinkage_factor_slider)
        parameter_row.add_widget(self.box3)

        # Cell 1,1 : num clusters
        self.box4 = BoxLayout(orientation="horizontal")
        self.num_clusters = 10
        self.num_clusters_text = Label(text=f'num clusters : {self.num_clusters}')
        self.box4.add_widget(self.num_clusters_text)
        self.num_clusters_slider = Slider(min=6,max=10,value=10,step=1)
        self.num_clusters_slider.bind(value=self.update_num_clusters_value)
        self.box4.add_widget(self.num_clusters_slider)
        parameter_row.add_widget(self.box4)

        # num_sims
        self.box5 = BoxLayout(orientation="horizontal")
        self.num_sims = 10
        self.num_sims_text = Label(text=f'num sims : {self.num_sims}')
        self.box5.add_widget(self.num_sims_text)
        self.num_sims_slider = Slider(min=1,max=50,value=10,step=1)
        self.num_sims_slider.bind(value=self.update_num_sims_value)
        self.box5.add_widget(self.num_sims_slider)
        parameter_row.add_widget(self.box5)

        # run sims btn
        run_sim_row = BoxLayout(orientation='vertical')
        run_btn = Button(text = "Run model")
        run_btn.bind(on_press = self.generate_graph)
        run_btn.pos_hint = {'center_y':0.5, 'center_x':0.5}
        # run_btn.size_hint = 0.3,0.3
        run_sim_row.add_widget(run_btn)
        parameter_row.add_widget(run_sim_row)
        self.root.add_widget(parameter_row)

        return self.root

    def select_mode(self, instance):
        if instance.state == "normal":
            self.state = 0
            self.learning_rate_slider.disabled = False
            self.exploration_rate_slider.disabled = False
            self.shrinkage_factor_slider.disabled = False
            self.num_clusters_slider.disabled = False
        else:
            self.state = instance.id
            # print(self.state)
            
            # learning_rate defaults
            self.learning_rate = self.best_params[self.state][0]
            self.learning_rate_text.text = f"learning rate : {round(self.learning_rate,3)}"
            self.learning_rate_slider.value = self.learning_rate
            
            # exploration_rate defaults
            self.exploration_rate = self.best_params[self.state][1]
            self.exploration_rate_text.text = f"exploration rate : {round(self.exploration_rate,2)}"
            self.exploration_rate_slider.value = self.exploration_rate

            # shrinkage_factor defaults
            self.shrinkage_factor = self.best_params[self.state][2]
            self.shrinkage_factor_text.text = f"shrinkage factor : {round(self.shrinkage_factor,2)}"
            self.shrinkage_factor_slider.value = self.shrinkage_factor

            # num_clusters defaults
            self.num_clusters = self.best_params[self.state][3]
            self.num_clusters_text.text = f"num clusters : {round(self.num_clusters,2)}"
            self.num_clusters_slider.value = self.num_clusters

            if self.state == 4 or self.state == 5:
                self.learning_rate_slider.disabled = True
                self.exploration_rate_slider.disabled = True
                self.shrinkage_factor_slider.disabled = True
                self.num_clusters_slider.disabled = True
            else:
                self.learning_rate_slider.disabled = False
                self.exploration_rate_slider.disabled = False
                self.shrinkage_factor_slider.disabled = False
                self.num_clusters_slider.disabled = False




    def update_learning_rate_value(self,instance,value):
        self.learning_rate_text.text = f"learning rate : {round(value,3)}"
        self.learning_rate = value

    def update_exploration_rate_value(self,instance,value):
        self.exploration_rate_text.text = f"exploration rate : {round(value,2)}"
        self.exploration_rate = value

    def update_shrinkage_factor_value(self,instance,value):
        self.shrinkage_factor_text.text = f"shrinkage factor : {round(value,2)}"
        self.shrinkage_factor = value

    def update_num_clusters_value(self,instance,value):
        self.num_clusters_text.text = f"num clusters : {round(value)}"
        self.num_clusters = value

    def update_num_sims_value(self,instance,value):
        self.num_sims_text.text = f"num sims : {round(value)}"  
        self.num_sims = value

    def generate_graph(self,instance):

        categories = ['Time Taken', 'Average guesses', 'Win Rate']
        current_model = None
        popup_content = BoxLayout(orientation = "vertical")

        
        if self.state == 0:
            warning_text = Label(text="No models selected")
            popup_content.add_widget(warning_text)

        else:
            # graphs
            popup_content.clear_widgets()
            # progress_popup = Popup(title="Results", content=self.progress_bar_popout, auto_dismiss=False)
            # progress_popup.open()
            # print("open")

            # self.progress_bar_popout = LoadingPopup()
            # self.progress_bar_popout.open()
            self.training = True
            
            # if self.state == 1:
            #     current_model = "RL Base"
            #     time_taken, average_guesses, win_rate,guesses = rl_base(self.learning_rate,self.exploration_rate,self.shrinkage_factor,self.num_sims)
            #     epochs = np.arange(self.num_sims)
            # elif self.state == 2:
            #     current_model = "RL Cluster 2k"
            #     time_taken, average_guesses, win_rate,guesses = rl_cluster_1(self.learning_rate,self.exploration_rate,self.shrinkage_factor,self.num_sims,self.num_clusters)
            #     epochs = np.arange(self.num_sims)
            # elif self.state == 3:
            #     current_model = "RL Cluster 15k"
            #     time_taken, average_guesses, win_rate,guesses = rl_cluster_2(self.learning_rate,self.exploration_rate,self.shrinkage_factor,self.num_sims,self.num_clusters)
            #     epochs = np.arange(self.num_sims)
            # elif self.state == 4:
            #     current_model = "Greedy Search 2k"
            #     time_taken, average_guesses, win_rate,guesses = rl_greedy_1(self.num_sims)
            #     epochs = np.arange(self.num_sims)
            # elif self.state == 5:
            #     current_model = "Greedy Search 15k"
            #     time_taken, average_guesses, win_rate,guesses = rl_greedy_2(self.num_sims)
            #     epochs = np.arange(self.num_sims)

            # else:
            #     pass
            
            print(self.state)
            results_list = []
            threading.Thread(target=self.run_model, args=[self.state, self.learning_rate,self.exploration_rate,self.shrinkage_factor,self.num_sims,self.num_clusters,results_list]).start()
            print(results_list)
            current_model, time_taken, average_guesses, win_rate,guesses, epochs = results_list
            
            self.training = False
            # progress_popup.dismiss()
            # print("close")
            plt.figure(0) # First plot of epochs vs guesses
            plt.bar(epochs,guesses,alpha=0.5, label=self.state_dict[self.state])
            # plt.legend(bbox_to_anchor=(1.04,0.5), loc="upper left")
            plt.legend(loc="upper right")
            plt.title("Epochs vs Guesses")
            plt.xlabel("Epochs")
            plt.ylabel("Guesses")
            popup_content.add_widget(FigureCanvasKivyAgg(plt.gcf()))

            
            # Used to create a radar chart for all other metrics
            # https://towardsdatascience.com/how-to-make-stunning-radar-charts-with-python-implemented-in-matplotlib-and-plotly-91e21801d8ca
            fig1 = plt.figure(1)
            #define max scale range for each axes
            max_time = time_taken + 1.0
            if max_time > self.max_time:
                self.max_time = max_time
            category_range = [(0,self.max_time),(1,15),(0,100)]
            radar = ComplexRadar(fig1,categories,category_range)

            metrics = [time_taken,average_guesses,win_rate]
            
            # To plot multiple radar charts 
            for key in self.currently_displayed.keys():
                if key == current_model:
                    self.currently_displayed[current_model] = metrics
                    if self.currently_displayed[current_model] == []:
                        self.currently_displayed[current_model] = metrics
                        radar.plot(self.currently_displayed[current_model]) # this plot will add multiple plots to the graph
                        radar.fill(metrics,alpha=0.2)
                if self.currently_displayed[key] != []:
                    radar.plot(self.currently_displayed[key])
                    radar.fill(self.currently_displayed[key],alpha=0.2)
                print(key,self.currently_displayed[key])
            popup_content.add_widget(FigureCanvasKivyAgg(plt.gcf()))


        close_btn = Button(text='Close me!', size_hint=(0.3,0.2))
        close_btn.pos_hint = {"center_x":0.5, "center_y":0.5}
        popup_content.add_widget(close_btn)

        popup = Popup(title="Results", content=popup_content, auto_dismiss=False)
        close_btn.bind(on_press=popup.dismiss)

        # open the popup
        popup.open()

    def get_data(self):
        while App.get_running_app():
            # get data here
            # sock.recv(1024) or how you do it
            time.sleep(1)

            # if you change the UI you need to do it on main thread
            self.set_data_label(self.counter)

            self.counter += 1

    def run_model(self, state, learning_rate,exploration_rate,shrinkage_factor,num_sims,num_clusters, out_list):
        if state == 1:
            current_model = "RL Base"
            time_taken, average_guesses, win_rate,guesses = rl_base(learning_rate,exploration_rate,shrinkage_factor,num_sims)
            epochs = np.arange(num_sims)
        elif state == 2:
            current_model = "RL Cluster 2k"
            time_taken, average_guesses, win_rate,guesses = rl_cluster_1(learning_rate,exploration_rate,shrinkage_factor,num_sims,num_clusters)
            epochs = np.arange(num_sims)
        elif state == 3:
            current_model = "RL Cluster 15k"
            time_taken, average_guesses, win_rate,guesses = rl_cluster_2(learning_rate,exploration_rate,shrinkage_factor,num_sims,num_clusters)
            epochs = np.arange(num_sims)
        elif state == 4:
            current_model = "Greedy Search 2k"
            time_taken, average_guesses, win_rate,guesses = rl_greedy_1(num_sims)
            epochs = np.arange(num_sims)
        elif state == 5:
            current_model = "Greedy Search 15k"
            time_taken, average_guesses, win_rate,guesses = rl_greedy_2(num_sims)
            epochs = np.arange(num_sims)

        else:
            pass
        
        out_list.extend([current_model,time_taken, average_guesses, win_rate,guesses, epochs])
        return out_list

if __name__ == "__main__":
    MainApp().run()