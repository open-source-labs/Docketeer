NODE_ENV=development
TAG=docketeer-extension

#Currently this is a fixed port and this flag doesn't actually change anything
VITE_DEV_PORT=4000

dev:
	docker compose -f docker-compose-test.yaml up -d

#Removes dangling images, cache records, and unused images
hardclean: img_prune clr_cache


img_prune:
	docker image prune -af

clr_cache:
	docker buildx prune -f