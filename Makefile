SHELL := /bin/bash

docker_build_image_on_heroku:
	docker tag lasik-docker registry.heroku.com/mysterious-harbor-13096/web 

docker_push_image_to_heroku:
	docker push registry.heroku.com/mysterious-harbor-13096/web

docker_deploy:
	docker build -t lasik-docker .
	docker tag lasik-docker registry.heroku.com/mysterious-harbor-13096/web 
	docker push registry.heroku.com/mysterious-harbor-13096/web

test:
	echo "one"
	echo "two"

