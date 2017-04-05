# start with a base image
FROM ubuntu:16.04

# File Author / Maintainer
MAINTAINER victorres11@gmail.com

# Install basic applications
RUN apt-get update && apt-get install -y \
        curl \
        libnotify-bin \
        libpq-dev \
        python-dev \
        python-pip \
        sqlite \
        tesseract-ocr \
        vim \
        wget

ADD . /home/docker/code

WORKDIR /home/docker/code

RUN pip install -r requirements.txt

# Expose ports
EXPOSE 5000

# Set the default directory where CMD will execute
# when creating a new container
CMD python server/app.py