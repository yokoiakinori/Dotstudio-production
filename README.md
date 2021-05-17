# DotStudio
ドット絵作成共有SNSアプリです。
## アプリの概要
ドット絵を作成して共有するSNSアプリとなります。<br>
「だれでもカジュアルに絵を通して人と繋がる」ことをコンセプトにしています。<br>
- **ブラウザ上で手軽**にドット絵を作成し共有できる
- 絵を描くことが**得意でなくとも**オリジナルの作品を生み出すことができる  

主に上記の2点を目標に掲げております。

コミュニケーションを促進する基本的な機能（いいね、コメント、フォロー）を備え、<br>ドット絵を描くのが苦手な方でも後述するスタンプ機能のおかげで、<br>他のクリエーターが作成した作品を組み合わせてオリジナルの作品を作成することができます。
## アプリを開発しようと思った経緯
私は元々絵を描くことが好きでした。しかしあまり絵が上手いとは言えず、<br>絵を描くこと少し嫌気がさした経験があります。<br>また既存のイラスト投稿SNSは絵の上手なクリエイターでないと評価されない（つまり「絵を通してコミュニケーションをとる」という行為は上級者限定のものになってしまう）という問題点があり、<br>クリエイター格差のようなものができあがっていると感じています。

そこで上級者でなくともオリジナルの作品を生み出し、<br>コミュニケーションを図ることができるアプリケーションを作ろうと思い至り、開発に着手いたしました。
## アプリの特徴
### ドット絵を作成するためのエディターが搭載
イラストを作成する場合なにかしらのツールを導入してそのツールの使い方等を学ぶ必要がありますが、ツールのインストールやツールの使い方を学習する手間は必要ありません。  シンプルで直感的に扱えるエディターを搭載しているためすぐに絵を描き始めることが可能です。
### 閲覧数やいいね数で集計したランキングシステム
より多くの人から見られたり評価される人気度の高い作品やクリエイターをランキング形式で表示しています。この機能のおかげで評価の高い作品はより多くの人の目に触れることとなります。
### 投稿された作品を素材として使えるスタンプ機能
このアプリで投稿された全ての作品は、ユーザーが素材として利用できるようになっております。私が既存のイラストSNSに感じる問題点を解決する仕組みです。<br>絵が上手な人は**GIVER**として素材を提供し、得意でない人はその人から素材をいただく、投稿に対する評価という形での一方的なコミュニケーションではなく双方向的なコミュニケーションを促す仕組みです。
### リクエスト機能
自分が欲しい素材が投稿されているという場合はそう多くはないでしょう。投稿が増えた場合探すのにも手間がかかってしまいます。<br>そこで欲しい素材をリクエストできる機能を開発しました。この機能を活用することでより自分のイメージにあった作品づくりができるようになると思います。
## スクリーンショット
会員登録・ログイン
<img width="1276" alt="スクリーンショット 2021-05-17 23 03 26" src="https://user-images.githubusercontent.com/26515575/118502317-8d4a4700-b764-11eb-9050-ea12ecce75cf.png">
ドット絵エディター
<img width="1145" alt="スクリーンショット 2021-05-17 23 23 05" src="https://user-images.githubusercontent.com/26515575/118504984-f632be80-b766-11eb-9cf6-422394b07630.png">

## インフラ構成
![インフラ構成図 (2)](https://user-images.githubusercontent.com/26515575/117087712-42efc000-ad8b-11eb-88bc-938d941bce10.jpg)
### ローカル環境
docker/dokcercomposeを使用して開発環境を構築しております。<br>当初vagrantとVirtualBoxを利用して開発環境を構築しておりましたが、設定が煩雑で動作も遅く必要以上にストレージも使ってしまうためdockerを導入いたしました。<br>またdockerを導入したことにより
1. 環境の破棄や再構築などがしやすい
2. 環境をコード化したファイルで管理するためどこでも誰でも同じ環境が作れる
3. dockerhubを使えば一からコードを書く必要もなくなる

以上のようなメリットも享受できます。
### デプロイ
Circle CIを利用しCI/CDパイプラインを構築し、githubのリポジトリにpushすると自動テスト及び自動ビルドを行いECRにイメージがpushされるような仕組みを構築しました。<br>CI/CDツールには様々あるようですがCircleCIを採用した理由は、環境構築コストや運営コストを低く抑えることができるからです。
### IaC（Infrastructure as Code）
インフラ構成を今後使いまわしたり、柔軟にカスタマイズすることを想定しTerraformによるインフラのコード化を導入いたしました。<br>インフラを柔軟にカスタマイズできるようリソースごとにフォルダを分けて、`.tfstate`ファイルを用いてリソースの値を伝播させています。<br>CodeDeployとは違いGCPやAzure等にも利用できる汎用性の高いIaCツールとしてTerraformを採用させていただきました。

## データベース設計
![ER図](https://user-images.githubusercontent.com/26515575/117104065-7136c500-adb6-11eb-9aab-bcf2a9a97473.jpg)
|テーブル名|テーブルの解説|
|:---:|:---|
|users|登録ユーザー情報|
|products|投稿された作品|
|likes|投稿作品に対するいいね|
|comments|投稿作品に対するコメント|
|notifications|通知情報|
|producttags|投稿作品につけるタグ|
|userthumbnails|ユーザーのサムネイル|
|followers|自分のフォロワー及び自分がフォローしている人の情報|
|materialproducts|スタンプ用の素材|
|material_requests|欲しい素材のリクエスト|
|request_replies|リクエストに対する返信|
## 使用技術
- バックエンド
  - PHP 7.4.1
  - Laravel 6.20.0
  - postgreSQL 11.10
  - Nginx 1.17.10
- フロントエンド
  - vue@2.6.12 （vuex,vue-router,その他ライブラリ）
  - sass
  - npm 6.14.10
- インフラ・開発環境
  - docker/docker-compose
  - AWS（VPC,IAM,ECR,ECS〔FARGATE〕,RDS,S3,ACM,Route53,ALB,CloudWatch）
  - CircleCI
  - Terraform v0.14.6
- SaaS
  - Algolia
## 機能一覧
- 管理ユーザ作成機能
- ログイン機能
- 投稿一覧表示
- 投稿詳細表示
- サムネイルの投稿（画像アップロード）、ユーザー名・挨拶文の編集
- ドット絵作成ツール（CRUD）
- いいね機能
- コメント機能
- フォロー機能
- フォロー・フォロワー一覧表示
- 管理ユーザー詳細表示
- 管理ユーザーごとの投稿表示
- 自分がいいねした投稿の表示
- いいね数・閲覧数・フォロワー数で判断したランキング表示（投稿・ユーザー）
- タグ・キーワードを使った投稿の検索機能（キーワード検索にはAlgoliaを使用）
- 他ユーザーが作成した作品を自分の作品に取り込むスタンプ機能
- 通知機能（投稿へのいいね・コメント、フォローされた、自分の投稿がスタンプとして使われた等）
