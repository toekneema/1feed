from gevent import monkey

monkey.patch_all()

from flask import Flask, jsonify, request
from TikTokApi import TikTokApi

app = Flask(__name__)
verify_fp = "verify_45a9f3f6846f65972420bf8be2d250ca"
api = TikTokApi(custom_verify_fp=verify_fp)

# Receives a string: username
# Return list of last N video urls from that user
@app.route("/tiktok")
def get_recent_tiktok_urls():
    user = api.user(username=request.args.get("username"))
    return_data = []
    count = 5
    for video in user.videos():
        if count == 0:
            break
        count -= 1
        return_data.append(video.as_dict)
    return jsonify(return_data)


if __name__ == "__main__":
    app.run(debug=True)
