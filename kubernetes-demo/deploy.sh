set -e

NAME="kubernetes-demo-api"
USERNAME="kllr500"
REPO="kubernetes-demo"
TAG="latest"
IMAGE="$USERNAME/$REPO:$TAG"

echo "Building docker image..."
docker build -t $IMAGE .
echo "Pushing docker image to Docker Hub..."
docker push $IMAGE

echo "Applying Kubernetes manifests..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

echo "Getting pods..."
kubectl get pods

echo "Getting services..."
kubectl get services

echo "Fetching main service..."
kubectl get services $NAME