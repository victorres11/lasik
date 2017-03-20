import datetime

import boto3
import pytesseract
import requests

from PIL import Image, ImageFilter
from StringIO import StringIO

S3_BUCKET_NAME = "lasik-victor"

def process_image(url):
    image = _get_image(url)
    image.filter(ImageFilter.SHARPEN)
    return pytesseract.image_to_string(image)

def store_image(img):
    """ Store image in the appropriate bucket in S3"""
    utc_datetime = datetime.datetime.utcnow()
    s3 = boto3.resource('s3')
    s3.Bucket('lasik-victor').put_object(Key='images/{year}-{month}-{day}/{hour}-{minute}-{second}'.format(
                                                     year=utc_date.year,
                                                     month=utc_date.month,
                                                     day=utc_date.day,
                                                     hour=utc_date.hour,
                                                     minute=utc_date.minute,
                                                     second=utc_date.second),
                                                     Body=img)

def _get_image(url):
    return Image.open(StringIO(requests.get(url).content))
