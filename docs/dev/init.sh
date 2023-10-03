#!/bin/bash

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install my-prometheus prometheus-community/prometheus
kubectl port-forward service/my-prometheus-server 45555:80
