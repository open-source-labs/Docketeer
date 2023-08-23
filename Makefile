# Do any make commands from top level directory

# Change this to whatever you make your docker hub organization name and change it in the docker-compose as well
ITERATION?=docketeerxiv

# Make sure to update versions to whatever the latest is
IMAGE?=$(ITERATION)/docketeer
TAG?=14.0.0

GRAFANA_IMAGE?=$(ITERATION)/grafana
GRAFANA_VER?=latest
GRAFANA_DOCKERFILE_PATH?=imageConfigs/grafana/Dockerfile.grafana

PROM_IMAGE?=$(ITERATION)/prometheus
PROM_VER?=latest
PROM_DOCKERFILE_PATH?=imageConfigs/prometheus/Dockerfile.prom

NODE_EXPORTER_IMAGE?=$(ITERATION)/node-exporter
NODE_EXPORTER_VER?=latest
NODE_EXPORTER_DOCKERFILE_PATH?=imageConfigs/node-exporter/Dockerfile.node-exporter

CADVISOR_IMAGE?=$(ITERATION)/cadvisor
CADVISOR_VER?=latest
CADVISOR_DOCKERFILE_PATH?=imageConfigs/cadvisor/Dockerfile.cadvisor

POSTGRES_IMAGE?=$(ITERATION)/postgres
POSTGRES_VER?=latest
POSTGRES_DOCKERFILE_PATH?=imageConfigs/postgres/Dockerfile.postgres


BUILDER=buildx-multi-arch

INFO_COLOR = \033[0;36m
NO_COLOR   = \033[m

build-extension: ## Build service image to be deployed as a desktop extension
	docker build --tag=$(IMAGE):$(TAG) .

install-extension: build-extension ## Install the extension
	docker extension install $(IMAGE):$(TAG) -f

update-extension: build-extension ## Update the extension
	docker extension update $(IMAGE):$(TAG) -f

update-debug-extension: update-extension # Update the extension and put it into debug mode
	docker extension dev debug $(IMAGE):$(TAG)

validate-extension: ## Make sure you have the multiplatform image created, need it to made to pass this
	docker extension validate $(IMAGE):$(TAG)

prepare-buildx: ## Create buildx builder for multi-arch build, if not exists
	docker buildx inspect $(BUILDER) || docker buildx create --name=$(BUILDER) --driver=docker-container --driver-opt=network=host


## Pushing one image will push all the others it references in the chain. push-image will push everything to docker hub
push-image: push-grafana ## Build & Upload extension image to hub. Do not push if tag already exists: make push-extension tag=0.1
	docker pull $(IMAGE):$(TAG) && echo "Failure: Tag already exists" || docker buildx build --push --builder=$(BUILDER) --platform=linux/amd64,linux/arm64 --build-arg TAG=$(TAG) --tag=$(IMAGE):$(TAG) .

push-grafana: push-prometheus
	docker pull $(GRAFANA_IMAGE):$(GRAFANA_VER) && echo "Failure: Tag already exists" || docker buildx build --push --builder=$(BUILDER) --platform=linux/amd64,linux/arm64 --build-arg TAG=$(GRAFANA_VER) --tag=$(GRAFANA_IMAGE):$(GRAFANA_VER) -f $(GRAFANA_DOCKERFILE_PATH) .

push-prometheus: push-node-exporter
	docker pull $(PROM_IMAGE):$(PROM_VER) && echo "Failure: Tag already exists" || docker buildx build --push --builder=$(BUILDER) --platform=linux/amd64,linux/arm64 --build-arg TAG=$(PROM_VER) --tag=$(PROM_IMAGE):$(PROM_VER) -f $(PROM_DOCKERFILE_PATH) .

push-node-exporter: push-cadvisor
	docker pull $(NODE_EXPORTER_IMAGE):$(NODE_EXPORTER_VER) && echo "Failure: Tag already exists" || docker buildx build --push --builder=$(BUILDER) --platform=linux/amd64,linux/arm64 --build-arg TAG=$(NODE_EXPORTER_VER) --tag=$(NODE_EXPORTER_IMAGE):$(NODE_EXPORTER_VER) -f $(NODE_EXPORTER_DOCKERFILE_PATH) .

push-cadvisor: push-postgres
	docker pull $(CADVISOR_IMAGE):$(CADVISOR_VER) && echo "Failure: Tag already exists" || docker buildx build --push --builder=$(BUILDER) --platform=linux/amd64,linux/arm64 --build-arg TAG=$(CADVISOR_VER) --tag=$(CADVISOR_IMAGE):$(CADVISOR_VER) -f $(CADVISOR_DOCKERFILE_PATH) .

push-postgres: prepare-buildx
	docker pull $(CADVISOR_IMAGE):$(CADVISOR_VER) && echo "Failure: Tag already exists" || docker buildx build --push --builder=$(BUILDER) --platform=linux/amd64,linux/arm64 --build-arg TAG=$(CADVISOR_VER) --tag=$(CADVISOR_IMAGE):$(CADVISOR_VER) -f $(CADVISOR_DOCKERFILE_PATH) .


help: ## Show this help
	@echo Please specify a build target. The choices are:
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(INFO_COLOR)%-30s$(NO_COLOR) %s\n", $$1, $$2}'

.PHONY: help