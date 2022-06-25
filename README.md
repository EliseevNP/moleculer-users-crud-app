# users-crud

## 1 Kubernetes setup

### 1.1 Create temporary namespace

```shell
$ kubectl create ns temp
$ kubectl config set-context --current --namespace=temp
```

### 1.2 Setup enviroment

#### 1.2.1 Add helm repo's
```shell
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm repo add kafka-ui https://provectus.github.io/kafka-ui
$ helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
$ helm repo update
```

#### 1.2.2 Setup database
```shell
$ helm upgrade --install postgres bitnami/postgresql -f ./enviroment/helm/postgres/values.yaml
```

#### 1.2.3 Setup kafka
```shell
$ helm upgrade --install kafka bitnami/kafka -f ./enviroment/helm/kafka/values.yaml

# optional
$ helm upgrade --install kafka-ui kafka-ui/kafka-ui -f ./enviroment/helm/kafka-ui/values.yaml # http://kafka-ui.arch.homework/
```

#### 1.2.4 Setup config
```shell
$ helm upgrade --install config ./enviroment/helm/config
```

#### 1.2.5 Setup ingress-controller
```shell
$ helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx --namespace temp-ingress-nginx --create-namespace -f ./enviroment/helm/ingress-nginx/values.yaml
```

#### 1.2.6 Setup propetheus-stack
```shell
helm upgrade --install prometheus-stack prometheus-community/kube-prometheus-stack --namespace temp-monitoring --create-namespace -f ./enviroment/helm/prometheus-stack/values.yaml

# access to propetheus-stack via following links:
# - http://prometheus.arch.homework
# - http://alertmanager.arch.homework/
# - http://grafana.arch.homework

# grafana dashboards:
# - https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/grafana/dashboards/nginx.json
# - TODO: add link to moleculer-users-crud-dashboard
```

### 1.3 Setup application

> After starting the application, please wait a bit for the database migrations to complete.

```shell
$ helm upgrade --install api-gateway ./api-gateway/helm
$ helm upgrade --install moleculer-users-crud ./moleculer-users-crud/helm
```
