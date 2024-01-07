from flask import Flask, render_template, jsonify, request
from scraper import scrape_nba_stats
import json

app = Flask(__name__)
player_stats = []
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scrape-stats', methods=['GET', 'POST'])
def scrape_stats_route():
    if request.method == 'POST':
        data = request.get_json()
        url1 = data.get('url1')
        url2 = data.get('url2')
    elif request.method == 'GET':
        url1 = request.args.get('url1')
        url2 = request.args.get('url2')
    else:
        return jsonify({'error': 'Unsupported method'}), 405

    global player_stats
    player_stats = scrape_nba_stats(url1, url2)
    return jsonify(player_stats)

if __name__ == '__main__':
    app.run(debug=True)


