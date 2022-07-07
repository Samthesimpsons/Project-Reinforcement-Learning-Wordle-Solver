from kivy.app import App
from kivy.uix.label import Label
from kivy.uix.togglebutton import ToggleButton
from kivy.uix.button import Button
from kivy.uix.gridlayout import GridLayout
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.slider import Slider
from kivy.uix.popup import Popup
from kivy.metrics import *
from wordle_base_15k import run_simulations as rl_base
from wordle_cluster_2k import run_simulations as rl_cluster_1
from wordle_cluster_15k import run_simulations as rl_cluster_2
from wordle_greedy_search_2k import run_simulations as rl_greedy_1
from wordle_greedy_search_15k import run_simulations as rl_greedy_2
from kivy.garden.matplotlib import FigureCanvasKivyAgg
import numpy as np
import matplotlib.pyplot as plt

class MainApp(App):

    def build(self):
        # initialize some variables
        self.state = 0
        self.current_words_on_display = []


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
        box1 = BoxLayout(orientation="horizontal")
        self.learning_rate = 0.9
        self.learning_rate_text = Label(text=f'learning_rate : {self.learning_rate}')
        box1.add_widget(self.learning_rate_text)
        self.learning_rate_slider = Slider(min=0,max=1,value=0.9,step=0.01)
        self.learning_rate_slider.bind(value=self.update_learning_rate_value)
        box1.add_widget(self.learning_rate_slider)
        parameter_row.add_widget(box1)

        # Cell 0,1 : exploration rate
        box2 = BoxLayout(orientation="horizontal")
        self.exploration_rate = 0.9
        self.exploration_rate_text = Label(text=f'exploration_rate : {self.exploration_rate}')
        box2.add_widget(self.exploration_rate_text)
        self.exploration_rate_slider = Slider(min=0,max=1,value=0.9,step=0.01)
        self.exploration_rate_slider.bind(value=self.update_exploration_rate_value)
        box2.add_widget(self.exploration_rate_slider)
        parameter_row.add_widget(box2)

        # Cell 1,0 : shrinkage factor
        box3 = BoxLayout(orientation="horizontal")
        self.shrinkage_factor = 0.9
        self.shrinkage_factor_text = Label(text=f'shrinkage_factor : {self.shrinkage_factor}')
        box3.add_widget(self.shrinkage_factor_text)
        self.shrinkage_factor_slider = Slider(min=0,max=1,value=0.9,step=0.01)
        self.shrinkage_factor_slider.bind(value=self.update_shrinkage_factor_value)
        box3.add_widget(self.shrinkage_factor_slider)
        parameter_row.add_widget(box3)

        # Cell 1,1 : num clusters
        box4 = BoxLayout(orientation="horizontal")
        self.num_clusters = 10
        self.num_clusters_text = Label(text=f'num_clusters : {self.num_clusters}')
        box4.add_widget(self.num_clusters_text)
        self.num_clusters_slider = Slider(min=1,max=50,value=10,step=1)
        self.num_clusters_slider.bind(value=self.update_num_clusters_value)
        box4.add_widget(self.num_clusters_slider)
        parameter_row.add_widget(box4)

        # num_sims
        box5 = BoxLayout(orientation="horizontal")
        self.num_sims = 10
        self.num_sims_text = Label(text=f'num_sims : {self.num_sims}')
        box5.add_widget(self.num_sims_text)
        self.num_sims_slider = Slider(min=1,max=50,value=10,step=1)
        self.num_sims_slider.bind(value=self.update_num_sims_value)
        box5.add_widget(self.num_sims_slider)
        parameter_row.add_widget(box5)

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
        else:
            self.state = instance.id
        # print(instance.state)
        print(self.state)

    def update_learning_rate_value(self,instance,value):
        self.learning_rate_text.text = f"learning_rate : {round(value,2)}"
        self.learning_rate = value

    def update_exploration_rate_value(self,instance,value):
        self.exploration_rate_text.text = f"exploration_rate : {round(value,2)}"
        self.exploration_rate = value

    def update_shrinkage_factor_value(self,instance,value):
        self.shrinkage_factor_text.text = f"shrinkage factor : {round(value,2)}"
        self.shrinkage_factor = value

    def update_num_clusters_value(self,instance,value):
        self.num_clusters_text.text = f"num_clusters : {round(value)}"
        self.num_clusters = value

    def update_num_sims_value(self,instance,value):
        self.num_sims_text.text = f"num_sims : {round(value)}"
        self.num_sims = value

    def generate_graph(self,instance):
        popup_content = BoxLayout(orientation = "vertical")

        # graphs
        # self.fifth_row.clear_widgets()
        if self.state == 1:
            time_taken, average_guesses, win_rate,guesses = rl_base(self.learning_rate,self.exploration_rate,self.shrinkage_factor,self.num_sims)
            epochs = np.arange(self.num_sims)
        elif self.state == 2:
            time_taken, average_guesses, win_rate,guesses = rl_cluster_1(self.learning_rate,self.exploration_rate,self.shrinkage_factor,self.num_sims,self.num_clusters)
            epochs = np.arange(self.num_sims)
        elif self.state == 3:
            time_taken, average_guesses, win_rate,guesses = rl_cluster_2(self.learning_rate,self.exploration_rate,self.shrinkage_factor,self.num_sims,self.num_clusters)
            epochs = np.arange(self.num_sims)
        elif self.state == 4:
            time_taken, average_guesses, win_rate,guesses = rl_greedy_1(self.num_sims)
            epochs = np.arange(self.num_sims)
        elif self.state == 5:
            time_taken, average_guesses, win_rate,guesses = rl_greedy_2(self.num_sims)
            epochs = np.arange(self.num_sims)
        else:
            pass
        plt.bar(epochs,guesses,alpha=0.5)
        plt.title("Epochs vs Guesses")
        plt.xlabel("Epochs")
        plt.ylabel("Guesses")
        popup_content.add_widget(FigureCanvasKivyAgg(plt.gcf()))

        close_btn = Button(text='Close me!', size_hint=(0.3,0.2))
        close_btn.pos_hint = {"center_x":0.5, "center_y":0.5}
        popup_content.add_widget(close_btn)

        popup = Popup(title="Results", content=popup_content, auto_dismiss=False)
        close_btn.bind(on_press=popup.dismiss)

        # open the popup
        popup.open()

if __name__ == "__main__":
    MainApp().run()