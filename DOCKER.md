# Docker

Docker is a toll to simplify software building and deployment

[Download docker](https://docs.docker.com/get-docker/)
[Download Nix](https://nixos.org/download/)

## Terminal commands:

### build image:

nix build .#container; docker load < ./result

### list images:

docker image ls

### run image:

docker-compose up

### run image in background:

docker-compose up -d

# remove image

docker image rm image-name

### explore running container:

docker exec -it container-name bash

### restart container:

docker restart container-name

### remove container:

docker rm container-name

### remove all stopped containers including "none" containers:

docker system prune
