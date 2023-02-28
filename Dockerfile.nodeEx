FROM prom/node-exporter

# Set the command for the container
CMD ["--path.procfs=/host/proc", "--path.sysfs=/host/sys", "--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|host|etc)($$|/)"]

# Expose the port for Prometheus to scrape
EXPOSE 9100