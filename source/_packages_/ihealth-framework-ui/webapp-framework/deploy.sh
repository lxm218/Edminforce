
#export DOCKER_HOST=tcp://192.168.59.103:2376
#export DOCKER_CERT_PATH=/Users/Jason/.boot2docker/certs/boot2docker-vm
#export DOCKER_TLS_VERIFY=1
#boot2docker up

echo "DON'T FORGET TO REMOVE INSECURE/AUTOPUBLISH BEFORE DEPLOY"
echo "DON'T FORGET TO REMOVE INSECURE/AUTOPUBLISH BEFORE DEPLOY"
echo "DON'T FORGET TO REMOVE INSECURE/AUTOPUBLISH BEFORE DEPLOY"
echo "DON'T FORGET TO REMOVE INSECURE/AUTOPUBLISH BEFORE DEPLOY"

docker build -t ihealthlab/webapp-framework .
docker push ihealthlab/webapp-framework
