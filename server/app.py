import os
import logging
from logging import FileHandler, Formatter
from flask import Flask, request, jsonify, render_template

from ocr import process_image, store_image

app = Flask(__name__, static_folder="../dist", template_folder="../app/templates")
_VERSION = 1 # API Version

@app.route('/v{}/ocr'.format(_VERSION), methods=["POST"])
def ocr():
    try:
        url = request.json['image_url']
        if 'jpg' in url:
            output = process_image(url)
            return jsonify({"output": output})
        else:
            return jsonify({"error": "only .jpg files, please"})
    except:
        return jsonify(
            {"error": "Did you mean to send: {'image_url': 'some_jpeg_url'}"}
        )

@app.route('/v{}/stringify_image'.format(_VERSION), methods=["POST"])
def stringify_image ():
    try:
        image_file = request.files['file']
        output = process_image(image_file.stream.read())

        print 'hello'
        # import ipdb; ipdb.set_trace();
        return jsonify(
            {"output": output}
        )
    except Exception as err:
        import ipdb; ipdb.set_trace();
        return jsonify(
            {"error": err.message}
        )


@app.route('/v{}/store_to_s3'.format(_VERSION), methods=["POST"])
def store_to_s3():
    result = store_image(request.files['file'])
    return jsonify({"image_url": result})


@app.route('/')
def index():
    print 'hello'
    return render_template('index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
