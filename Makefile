# Change this to whatever you make your docker hub organization name and change it in the docker-compose as well
ITERATION?=docketeerxv

# Make sure to update versions to whatever the latest is
EXTENSION_IMAGE?=$(ITERATION)/docketeer-extension
TAG?=15.0.0

DOCKERFILEDIRECTORY=extension
BUILDER=buildx-multi-arch

INFO_COLOR = \033[0;36m
NO_COLOR   = \033[m

browser-dev:
	docker compose -f ${DOCKERFILEDIRECTORY}/docker-compose-browser.yaml up -d --tag docketeer-dev-browser

browser-down:
	docker compose -f ${DOCKERFILEDIRECTORY}/docker-compose-browser.yaml down

extension-dev: build-dev install-dev dev-tools

install-dev:
	docker extension install docketeer-extension-dev -f

build-extension:
	docker build -t docketeer-extension-dev -f dockerfile.dev ..

dev-tools:
	docker extension dev debug docketeer-extension-dev

#use rarely
hardclean: clean img_prune clr_cache

clean:
	docker extension rm docketeer-extension
img_prune:
	docker image prune -af
clr_cache:
	docker buildx prune -f 

reload: build-dev update dev-tools

update: 
	docker extension update docketeer-extension

prod: install-ext validate-ext debug-ext

build-prod: ## Build service image to be deployed as a desktop extension
	docker build --tag=$(EXTENSION_IMAGE):$(TAG) -f ${DOCKERFILEDIRECTORY}/dockerfile.prod .

install-prod: build-prod ## Install the extension
	docker extension install $(EXTENSION_IMAGE):$(TAG) -f

update-prod: build-prod ## Update the extension
	docker extension update $(EXTENSION_IMAGE):$(TAG) -f

debug-prod: # Update the extension and put it into debug mode
	docker extension dev debug $(EXTENSION_IMAGE):$(TAG)

validate-prod: install-prod## Make sure you have the multiplatform image created, need it to made to pass this
	docker extension validate $(EXTENSION_IMAGE):$(TAG)

prepare-buildx: ## Create buildx builder for multi-arch build, if not exists
	docker buildx inspect $(BUILDER) || docker buildx create --name=$(BUILDER) --driver=docker-container --driver-opt=network=host


## Pushing one image will push all the others it references in the chain. push-extension will push everything to docker hub
push-extension: prepare-buildx## Build & Upload extension image to hub. Do not push if tag already exists: make push-extension tag=0.1
	docker pull $(EXTENSION_IMAGE):$(TAG) && echo "Failure: Tag already exists" || docker buildx build --push --builder=$(BUILDER) --platform=linux/amd64,linux/arm64 --build-arg TAG=$(TAG) --tag=$(EXTENSION_IMAGE):$(TAG) -f ${DOCKERFILEDIRECTORY}/dockerfile.prod .

help: ## Show this help
	@echo Please specify a build target. The choices are:
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(INFO_COLOR)%-30s$(NO_COLOR) %s\n", $$1, $$2}'

.PHONY: help