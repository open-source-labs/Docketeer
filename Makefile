# Make sure to update versions to whatever the latest is
EXTENSION_IMAGE?=docketeerxiv/docketeer-extension
VERSION?=15.0.0
DEV_EXTENSION_NAME=docketeer-extension-dev
DOCKERFILEDIRECTORY=extension
BUILDER=buildx-multi-arch
VITE_DEV_PORT=4000

INFO_COLOR = \033[0;36m
NO_COLOR   = \033[m

browser-dev:
	docker compose -f ${DOCKERFILEDIRECTORY}/docker-compose-browser.yaml up -d

browser-down:
	docker compose -f ${DOCKERFILEDIRECTORY}/docker-compose-browser.yaml down

extension-dev: build-extension-dev install-extension-dev dev-tools

install-extension-dev:
	docker extension install ${DEV_EXTENSION_NAME} -f

build-extension-dev:
	docker build -t ${DEV_EXTENSION_NAME} -f ${DOCKERFILEDIRECTORY}/dockerfile.dev .

dev-tools:
	docker extension dev debug ${DEV_EXTENSION_NAME}
	docker extension dev ui-source ${DEV_EXTENSION_NAME} http://localhost:${VITE_DEV_PORT}

#use rarely
hardclean: img_prune clr_cache

remove-dev-extension:
	docker extension rm ${DEV_EXTENSION_NAME}
	
img_prune:
	docker image prune -af
clr_cache:
	docker buildx prune -f 

reload: build-dev update dev-tools

update: 
	docker extension update docketeer-extension

prod: install-prod debug-prod

build-prod: ## Build service image to be deployed as a desktop extension
	docker build --tag=$(EXTENSION_IMAGE):$(VERSION) -f ${DOCKERFILEDIRECTORY}/dockerfile.prod .

install-prod: build-prod ## Install the extension
	docker extension install $(EXTENSION_IMAGE):$(VERSION) -f

update-prod: build-prod ## Update the extension
	docker extension update $(EXTENSION_IMAGE):$(VERSION) -f

debug-prod: # Update the extension and put it into debug mode
	docker extension dev debug $(EXTENSION_IMAGE):$(VERSION)

validate-prod: install-prod## Make sure you have the multiplatform image created, need it to made to pass this
	docker extension validate $(EXTENSION_IMAGE):$(VERSION)

prepare-buildx: ## Create buildx builder for multi-arch build, if not exists
	docker buildx inspect $(BUILDER) || docker buildx create --name=$(BUILDER) --driver=docker-container --driver-opt=network=host


## Pushing one image will push all the others it references in the chain. push-extension will push everything to docker hub
push-extension: prepare-buildx## Build & Upload extension image to hub. Do not push if VERSION already exists: make push-extension VERSION=0.1
	docker pull $(EXTENSION_IMAGE):$(VERSION) && echo "Failure: Tag already exists" || docker buildx build --push --builder=$(BUILDER) --platform=linux/amd64,linux/arm64 --build-arg TAG=$(VERSION) --tag=$(EXTENSION_IMAGE):$(VERSION) -f ${DOCKERFILEDIRECTORY}/dockerfile.prod .

help: ## Show this help
	@echo Please specify a build target. The choices are:
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(INFO_COLOR)%-30s$(NO_COLOR) %s\n", $$1, $$2}'

.PHONY: help