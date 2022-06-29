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
from wordle_cluster import reinforcement_learning as rl_cluster
from wordle_base import reinforcement_learning as rl_base
from datetime import date

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
        # state 2 is rl cluster
        # state 3 is search
        self.state = 2
        self.current_words_on_display = []

        # First row is just welcome to wordle solver
        self.root = BoxLayout(orientation='vertical')
        first_row = Label(text='Welcome to [color=3333ff]Wordle[/color] solver',markup=True,font_size='20sp')
        self.root.add_widget(first_row) 

        # Second row is 3 checkbox to determine which mode to solve
        second_row = BoxLayout(orientation = 'horizontal')
        first_index = BoxLayout(orientation = 'horizontal')
        rl_base_checkbox = CheckBox()
        rl_base_checkbox.id = 1
        rl_base_checkbox.active = False
        rl_base_checkbox.group = "checkboxgroup"
        rl_base_checkbox.bind(active=self.get_checkbox_index)
        first_index.add_widget(rl_base_checkbox)
        first_index.add_widget(Label(text='RL Base model',halign="left"))
        second_row.add_widget(first_index)

        rl_cluster_checkbox = CheckBox()
        second_index = BoxLayout(orientation = 'horizontal')
        rl_cluster_checkbox.id = 2
        rl_cluster_checkbox.active = True
        rl_cluster_checkbox.group = "checkboxgroup"
        rl_cluster_checkbox.bind(active=self.get_checkbox_index)
        second_index.add_widget(rl_cluster_checkbox)
        second_index.add_widget(Label(text='RL Clustering model',halign="left"))
        second_row.add_widget(second_index)

        search_checkbox = CheckBox()
        third_index = BoxLayout(orientation = 'horizontal')
        search_checkbox.id = 3
        search_checkbox.text = "Search model"
        search_checkbox.active = False
        search_checkbox.group = "checkboxgroup"
        search_checkbox.bind(active=self.get_checkbox_index)
        third_index.add_widget(search_checkbox)
        third_index.add_widget(Label(text='Search model',halign="left"))
        second_row.add_widget(third_index)
        self.root.add_widget(second_row)

        # Third row is custom input for wordle solver
        third_row = GridLayout(cols = 2, rows = 1)
        submit_button = MyButton(text= 'Submit custom word',pos = (40,40))
        custom_word_input = TextInput(hint_text='define custom word here',halign = 'center')
        third_row.add_widget(submit_button)
        third_row.add_widget(custom_word_input)
        self.root.add_widget(third_row)

        # Fourth row is solving todays' wordle
        fourth_row = MyButton(text = "Solve today's wordle!",on_press=self.solve_today_wordle)
        self.root.add_widget(fourth_row)

        # Fifth row is display of all visited words in wordle
        self.fifth_row = BoxLayout(orientation='vertical')
        self.root.add_widget(self.fifth_row)
        return self.root
    
    def get_checkbox_index(self,checkbox,value):
        if value:
            self.state = checkbox.id
        print(self.state)

    def solve_today_wordle(self,instance):
        if self.current_words_on_display != []:
            self.current_words_on_display = []
            self.fifth_row.clear_widgets()
        today_wordle = self.get_todays_wordle()
        today_wordle = today_wordle.upper()
        
        if self.state == 1:   # Use rl_base
            steps,visited_words = rl_base(learning_rate=0.1, exploration_rate=0.1, shrinkage_factor=0.9, custom_goal=True,custom_goal_word=today_wordle) # run RL algorithm
        elif self.state == 2: # Use rl_clustering
            steps,visited_words = rl_cluster(learning_rate=0.1, exploration_rate=0.1, shrinkage_factor=0.9, number_of_cluster=10,custom_goal=True,custom_goal_word=today_wordle) # run RL algorithm
        else:                 # Use search algorithm
            pass
        self.current_words_on_display = visited_words
        for i in visited_words:
            self.fifth_row.add_widget(Label(text=i,halign="left"))

    # This function will get today's wordle
    def get_todays_wordle(self):
        with open('./goals.txt') as f:
            goals = f.read().splitlines() 
            print(goals)
        reference_goal = goals.index('beady')
        today =  date.today()
        reference_date = date(2022,6,25)
        date_diff = today - reference_date
        date_diff = date_diff.days
        today_wordle_index = reference_goal + date_diff
        today_wordle = goals[today_wordle_index]
        return today_wordle



if __name__ == '__main__':
    # steps,visited_words = reinforcement_learning(learning_rate=0.1, exploration_rate=0.1, shrinkage_factor=0.9, number_of_cluster=10,custom_goal=False,custom_goal_word=None) # run RL algorithm
    # print(visited_words)
    TestApp().run()