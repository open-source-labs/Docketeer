NODE_ENV=development
TAG=docketeer-extension

#Currently this is a fixed port and this flag doesn't actually change anything
VITE_DEV_PORT=4000

dev: dev_ext
	docker extension dev debug ${TAG}
	docker extension dev ui-source ${TAG} http://localhost:${VITE_DEV_PORT}

reload: build_dev
	docker extension update ${TAG}
	docker extension dev debug ${TAG}
	docker extension dev ui-source ${TAG} http://localhost:${VITE_DEV_PORT}

dev_ext: build_dev
	docker extension install docketeer-extension

build_dev:
	docker build -t ${TAG} -f dockerfile.test .

#Removes dangling images, cache records, and unused images
hardclean: clean img_prune clr_cache

clean:
	docker extension rm ${TAG}



img_prune:
	docker image prune -af

clr_cache:
	docker buildx prune -f