from turtle import onclick
from kivy.app import App
from kivy.uix.label import Label
from kivy.uix.togglebutton import ToggleButton
from kivy.uix.button import Button
from kivy.uix.gridlayout import GridLayout
from kivy.uix.boxlayout import BoxLayout

class MainApp(App):

    def build(self):
        # main widget (root)
        self.root = GridLayout(cols=4, rows=3)
        self.root.add_widget(BoxLayout(orientation='vertical'))
        self.root = BoxLayout(orientation='vertical')

        # header row to welcome the player
        header_row = BoxLayout(orientation = "vertical")
        intro_text = Label(text='Welcome to [color=3333ff]Wordle[/color] solver results page',markup=True,font_size='20sp')
        header_row.add_widget(intro_text)
        self.root.add_widget(header_row) 

        # buttons row which contains the togglebuttons indicating the selected mode
        button_row = BoxLayout(orientation = "horizontal")
        btn1 = ToggleButton(text='RL Base model', group='mode',)
        btn1.id = 1
        btn1.bind(on_press = self.select_mode)

        btn2 = ToggleButton(text='RL Clustering model 1', group='mode')
        btn2.id = 2
        btn2.bind(on_press= self.select_mode)

        btn3 = ToggleButton(text='RL Clustering model 2', group='mode')
        btn3.id = 3
        btn3.bind(on_press = self.select_mode)

        btn4 = ToggleButton(text='Search model', group='mode')
        btn4.id = 3
        btn4.bind(on_press = self.select_mode)

        button_row.add_widget(btn1)
        button_row.add_widget(btn2)
        button_row.add_widget(btn3)
        button_row.add_widget(btn4)
        self.root.add_widget(button_row)

        return self.root

    def select_mode(self, instance):
        print(instance.id)
        print(instance.state)

if __name__ == "__main__":
    MainApp().run()