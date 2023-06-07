# Web Application Tutorial


## 準備

0. ブリッジネットワークを準備しておく

```
docker network create -d bridge my-blog
```

1. appフォルダを開き，Dev Containerを起動する

```
code ./start/app
```

2. アプリケーションサーバーを起動する

bush
```
flask --app 'src.main:create_app()' run --host 0.0.0.0
```

3. webフォルダを開き，Dev Containerを起動する

```
code ./start/web
```

4. Webサーバーを起動する

bush
```
yarn install
yarn start
```

## テストの実行

```
python3 -m pytest
```
