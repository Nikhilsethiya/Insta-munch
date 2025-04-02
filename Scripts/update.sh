set -x

REPO_URL="https://2yIlkcyE0lEdRFh00iSIkAH57Mvb5wxDG9D3i7SaebSUeet1OEyZJQQJ99BCACAAAAAAAAAAAAASAZDO2mt0@dev.azure.com/pratikshappatil59/Insta-munch/_git/Insta-munch"

git clone "$REPO_URL" /tmp/temp_repo

cd /tmp/temp_repo

sed -i "s|image:.*|image: $2/$3:$4|g" k8s-specification/$1-deployment.yaml

git add .

git commit -m "Update Kubernetes manifest"

git push

rm -rf /tmp/temp_repo
