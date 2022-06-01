docker-build:
	docker build -t se-baradvisor .

docker-run:
	docker run -d -p8080:80 --env-file .env se-baradvisor:latest