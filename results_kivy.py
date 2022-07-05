from kivy.garden.matplotlib import FigureCanvasKivyAgg
from kivy.app import App
from kivy.uix.button import Button
from kivy.uix.image import Image
from kivy.uix.label import Label
from kivy.uix.behaviors import ButtonBehavior
from kivy.uix.gridlayout import GridLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.graphics import Color, Rectangle
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.checkbox import CheckBox
from kivy.core.window import Window
from kivy.uix.slider import Slider
from wordle_cluster_modified import run_simulations as rl_cluster_2
from wordle_cluster import run_simulations as rl_cluster_1
from wordle_base import run_simulations as rl_base
from datetime import date
import numpy as np
import matplotlib.pyplot as plt
import time

class MyButton(Button):
  def __init__(self,**kwargs):
    super().__init__(**kwargs)
    self.size = (50,50)
    self.valign = 'middle'
    self.halign = 'center'
    self.padding = (20,20)

class TestApp(App):
    def build(self):
        # state 1 is rl base
        # state 2 is rl cluster 1 (13k words)
        # state 3 is rl cluster 2 (2k words)
        # state 4 is search
        self.state = 1
        self.current_words_on_display = []

        # First row is just welcome to wordle solver
        self.root = GridLayout(cols = 2, rows = 1)
        self.root.add_widget(BoxLayout(orientation='vertical'))
        self.root = BoxLayout(orientation='vertical')
        first_row = Label(text='Welcome to [color=3333ff]Wordle[/color] solver results page',markup=True,font_size='20sp')
        self.root.add_widget(first_row) 

        # Second row is 3 checkbox to determine which mode to solve
        second_row = BoxLayout(orientation = 'horizontal')
        first_index = BoxLayout(orientation = 'horizontal')
        rl_base_checkbox = CheckBox()
        rl_base_checkbox.id = 1
        rl_base_checkbox.active = True
        rl_base_checkbox.group = "checkboxgroup"
        rl_base_checkbox.bind(active=self.get_checkbox_index)
        first_index.add_widget(rl_base_checkbox)
        first_index.add_widget(Label(text='RL Base model',halign="left"))
        second_row.add_widget(first_index)

        rl_cluster_1_checkbox = CheckBox()
        second_index = BoxLayout(orientation = 'horizontal')
        rl_cluster_1_checkbox.id = 2
        rl_cluster_1_checkbox.active = False
        rl_cluster_1_checkbox.group = "checkboxgroup"
        rl_cluster_1_checkbox.bind(active=self.get_checkbox_index)
        second_index.add_widget(rl_cluster_1_checkbox)
        second_index.add_widget(Label(text='RL Clustering model 1',halign="left"))
        second_row.add_widget(second_index)

        rl_cluster_2_checkbox = CheckBox()
        third_index = BoxLayout(orientation = 'horizontal')
        rl_cluster_2_checkbox.id = 3
        rl_cluster_2_checkbox.active = False
        rl_cluster_2_checkbox.group = "checkboxgroup"
        rl_cluster_2_checkbox.bind(active=self.get_checkbox_index)
        third_index.add_widget(rl_cluster_2_checkbox)
        third_index.add_widget(Label(text='RL Clustering model 2',halign="left"))
        second_row.add_widget(third_index)

        search_checkbox = CheckBox()
        third_index = BoxLayout(orientation = 'horizontal')
        search_checkbox.id = 4
        search_checkbox.active = False
        search_checkbox.group = "checkboxgroup"
        search_checkbox.bind(active=self.get_checkbox_index)
        third_index.add_widget(search_checkbox)
        third_index.add_widget(Label(text='Search model',halign="left"))
        second_row.add_widget(third_index)
        self.root.add_widget(second_row)

        # Third row is sliders for each params
        slider_grid = GridLayout(cols=4,rows=4)

        # Cell 0,0 : learning rate
        self.learning_rate = 0.9
        self.learning_rate_text = Label(text=f'learning_rate : {self.learning_rate}')
        slider_grid.add_widget(self.learning_rate_text)
        self.learning_rate_slider = Slider(min=0,max=1,value=0.9,step=0.01)
        self.learning_rate_slider.bind(value=self.update_learning_rate_value)
        slider_grid.add_widget(self.learning_rate_slider)

        # Cell 0,1 : exploration rate
        self.exploration_rate = 0.1
        self.exploration_rate_text = Label(text=f'exploration_rate : {self.exploration_rate}')
        slider_grid.add_widget(self.exploration_rate_text)
        self.exploration_rate_slider = Slider(min=0,max=1,value=0.9,step=0.01)
        self.exploration_rate_slider.bind(value=self.update_exploration_rate_value)
        slider_grid.add_widget(self.exploration_rate_slider)

        # Cell 1,0 : shrinkage factor
        self.shrinkage_factor = 0.9
        self.shrinkage_factor_text = Label(text=f'shrinkage_factor : {self.shrinkage_factor}')
        slider_grid.add_widget(self.shrinkage_factor_text)
        self.shrinkage_factor_slider = Slider(min=0,max=1,value=0.9,step=0.01)
        self.shrinkage_factor_slider.bind(value=self.update_shrinkage_factor_value)
        slider_grid.add_widget(self.shrinkage_factor_slider)

        # Cell 1,1 : num clusters
        self.num_clusters = 10
        self.num_clusters_text = Label(text=f'num_clusters : {self.num_clusters}')
        slider_grid.add_widget(self.num_clusters_text)
        self.num_clusters_slider = Slider(min=1,max=50,value=10,step=1)
        self.num_clusters_slider.bind(value=self.update_num_clusters_value)
        slider_grid.add_widget(self.num_clusters_slider)
    
        self.root.add_widget(slider_grid)

        # Third row and a half is slider for number of simulations
        box_layout = BoxLayout(orientation='horizontal')
        self.num_sims = 10
        self.num_sims_text = Label(text=f'num_sims : {self.num_sims}')
        box_layout.add_widget(self.num_sims_text)
        self.num_sims_slider = Slider(min=1,max=50,value=10,step=1)
        self.num_sims_slider.bind(value=self.update_num_sims_value)
        box_layout.add_widget(self.num_sims_slider)
        self.root.add_widget(box_layout)

        # Fourth row is for button to generate graphs
        fourth_row = BoxLayout(orientation='vertical')
        fourth_row.add_widget(MyButton(text= 'Confirm',pos = (100,100),on_press = self.generate_graph))
        self.root.add_widget(fourth_row)

        # Fifth row is for graph results
        self.fifth_row = BoxLayout()
        self.root.add_widget(self.fifth_row)
        return self.root

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

    def get_checkbox_index(self,checkbox,value):
        if value:
            self.state = checkbox.id
        print(self.state)

    def generate_graph(self,instance):
        self.fifth_row.clear_widgets()
        if self.state == 1:
            time_taken, average_guesses, win_rate,guesses = rl_base(self.learning_rate,self.exploration_rate,self.shrinkage_factor,self.num_sims)
            epochs = np.arange(self.num_sims)
        elif self.state == 2:
            time_taken, average_guesses, win_rate,guesses = rl_cluster_1(self.learning_rate,self.exploration_rate,self.shrinkage_factor,self.num_sims,self.num_clusters)
            epochs = np.arange(self.num_sims)
        elif self.state == 3:
            time_taken, average_guesses, win_rate,guesses = rl_cluster_2(self.learning_rate,self.exploration_rate,self.shrinkage_factor,self.num_sims,self.num_clusters)
            epochs = np.arange(self.num_sims)
        else:
            pass
        plt.bar(epochs,guesses)
        plt.title("Epochs vs Guesses")
        plt.xlabel("Epochs")
        plt.ylabel("Guesses")
        self.fifth_row.add_widget(FigureCanvasKivyAgg(plt.gcf()))
        print(epochs,guesses)


if __name__ == '__main__':
    TestApp().run()
