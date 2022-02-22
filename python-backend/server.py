from gevent import monkey

monkey.patch_all()

from flask import Flask, jsonify, request
from TikTokApi import TikTokApi

app = Flask(__name__)
api = TikTokApi()

# Receives a string: username
# Return list of last N video urls from that user
@app.route("/tiktok")
def get_recent_tiktok_urls():
    user = api.user(username=request.args.get("username"))
    for video in user.videos():
        print(
            video.as_dict
        )  # -> dict of TikTok's video object as found when requesting the videos endpoint
    return jsonify({"hi there": "lol"})


if __name__ == "__main__":
    app.run(debug=True)
