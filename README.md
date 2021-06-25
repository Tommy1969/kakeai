# README

## 準備

1. タスクランナーとして [velociraptor](https://velociraptor.run/)
   を使ってます。事前にインストールする必要があります。
2. .env ファイルに DISCORD_KEY を設定しておく必要があります。

```env
#.env
DISCORD_KEY=<TOKEN of Discord>
```

## 実行 (production)

```sh
% vr start
```

## 実行 (develop)

```sh
% vr develop
```

## テスト

```sh
% vr test
```
