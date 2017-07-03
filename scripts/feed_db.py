"""
    This module fetches data from the web and feeds it to the database.
"""

# -*- coding=utf-8 -*-

from urllib.request import urlopen
from html.parser import HTMLParser


CONTINENTS = {
    'AF': 1,
    'AN': 2,
    'AS': 3,
    'AU': 4,
    'OC': 4,
    'EU': 5,
    'NA': 6,
    'SA': 7
}

class MyHTMLParser(HTMLParser):
    """Parses specific HTML file.
    
    Attributes:
        html_data (list): parsed data is stored in this list
    """

    def __init__(self):
        super(MyHTMLParser, self).__init__()

        self.html_data = []

    def handle_starttag(self, tag, attrs):
        if tag == 'tr':
            self.html_data.append([])

    def handle_data(self, data):
        if self.lasttag == 'td':
            self.html_data[-1].append(data)


def extract_countries(html):
    """Extracts country information from HTML file."""
    my_parser = MyHTMLParser()
    my_parser.feed(html)

    countries = []
    for country in my_parser.html_data:
        try:
            countries.append(str(CONTINENTS[country[0]]) + ','+ country[8] + '\n')
        except Exception:
            pass


    return countries

def main():
    """Fetches data from wiki page and inserts it to the database.

        Disclaimer:
            There are few changes that need to be made to the database.
            North Korea and South Korea are both described as Korea due to 
            shortening of names.
    """

    #fetch data
    response = urlopen('https://en.wikipedia.org/wiki/List_of_sovereign_states_\
                        and_dependent_territories_by_continent_(data_file)')
    html = str(response.read())

    with open('data/countries', mode='w', encoding='UTF-8') as f:
        f.writelines(extract_countries(html))


if __name__ == '__main__':
    main()
