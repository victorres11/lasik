import datetime

import boto3
import pytesseract
import requests

from PIL import Image, ImageFilter
from StringIO import StringIO

S3_BUCKET_NAME = "lasik-victor"
S3_STORAGE_PREFIX = "https://s3.us-east-2.amazonaws.com/lasik-victor/"

def process_image(data):
    # image = _get_image(url)
    Image.open(StringIO(data))
    image.filter(ImageFilter.SHARPEN)
    return pytesseract.image_to_string(image)

def store_image(img):
    """ Store image in the appropriate bucket in S3"""
    utc_date = datetime.datetime.utcnow()
    s3 = boto3.resource('s3')
    result = s3.Bucket('lasik-victor').put_object(Key='images/{year}-{month}-{day}/{hour}-{minute}-{second}.jpg'.format(
                                                     year=utc_date.year,
                                                     month=utc_date.month,
                                                     day=utc_date.day,
                                                     hour=utc_date.hour,
                                                     minute=utc_date.minute,
                                                     second=utc_date.second),
                                                     Body=img)

    return "{prefix}{key}".format(prefix=S3_STORAGE_PREFIX, key=result.key)

def _get_image(url):
    return Image.open(StringIO(requests.get(url).content))
