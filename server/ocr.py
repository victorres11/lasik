import datetime

import boto3
import pytesseract
import requests

from PIL import Image, ImageFilter
from StringIO import StringIO

S3_BUCKET_NAME    = "lasik-victor"
S3_REGION         = "us-east-2"
S3_STORAGE_PREFIX = "https://s3.{region}.amazonaws.com/{bucket_name}/".format(region=S3_REGION, bucket_name=S3_BUCKET_NAME)

def process_image(data):
    image = Image.open(StringIO(data))
    if image.mode == 'RGBA':
        print "converting RGBA to RGB"
        image = image.convert('RGB')
    image.filter(ImageFilter.SHARPEN)
    return pytesseract.image_to_string(image)

def store_image(img):
    """ Store image in the appropriate bucket in S3
    Make sure the region is correct, otherwise AWS provides an error that barks about the SHA encoding.
    """
    utc_date = datetime.datetime.utcnow()
    s3 = boto3.resource('s3', region_name=S3_REGION)
    result = s3.Bucket(S3_BUCKET_NAME).put_object(Key='images/{year}-{month}-{day}/{hour}-{minute}-{second}.jpg'.format(
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
