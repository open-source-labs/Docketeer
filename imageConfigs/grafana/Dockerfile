FROM grafana/grafana:latest

COPY ./provisioning/dashboards /etc/grafana/provisioning/dashboards
COPY ./provisioning/datasources /etc/grafana/provisioning/datasources
COPY ./grafana.ini /etc/grafana/grafana.ini
COPY ./plugins /var/lib/grafana/plugins

ENV GF_PATHS_CONFIG=/etc/grafana/grafana.ini
