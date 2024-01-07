from bs4 import BeautifulSoup
import requests

def scrape_nba_stats(url1, url2):
    player_stats = []
    player_one_dict = get_stats(url1)
    player_two_dict = get_stats(url2)
    
    player_stats.append(player_one_dict)
    player_stats.append(player_two_dict)
    
    return player_stats

def get_stats(url):
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'lxml')

    player = soup.find('div', class_='players')
    name = player.find('span').text

    statsone = soup.find('div', class_='p1')
    pts = statsone.find_all('div')[1].find('p').text
    trb = statsone.find_all('div')[2].find('p').text
    ast = statsone.find_all('div')[3].find('p').text

    statstwo = soup.find('div', class_='p2')
    fg = statstwo.find_all('div')[0].find('p').text
    fg3 = statstwo.find_all('div')[1].find('p').text
    ft = statstwo.find_all('div')[2].find('p').text

    player_dict = {
        'name': name,
        'pts': pts,
        'trb': trb,
        'ast': ast,
        'fg': fg,
        'fg3': fg3,
        'ft': ft
    }

    return player_dict    