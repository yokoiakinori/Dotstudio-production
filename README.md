# DotStudio-nginx
ドット絵作成共有SNSアプリです。
### アプリの概要
ドット絵を作成して共有するSNSアプリとなります。<br>
「だれでもカジュアルに絵を通して人と繋がる」ことをコンセプトにしています。<br>
- **ブラウザ上で手軽**にドット絵を作成し共有できる
- 絵を描くことが**得意でなくとも**オリジナルの作品を生み出すことができる  
主に上記の2点を目標に掲げております。<br>
コミュニケーションを促進する基本的な機能（いいね、コメント、フォロー）を備え、ドット絵を描くのが苦手な方でも後述するスタンプ機能のおかげで、他のクリエーターが作成した作品を組み合わせてオリジナルの作品を作成することができます。
### アプリを開発しようと思った経緯
私は元々絵を描くことが好きでした。しかしあまり絵が上手いとは言えず、絵を描くことがあまり好きではなくなってしまった経験があります。また既存のイラスト投稿SNSは絵の上手なクリエイターでないと評価されない（つまり「絵を通してコミュニケーションをとる」という行為は上級者限定のものになってしまう）という問題点があり、クリエイター格差のようなものができあがっていると感じています。そこで上級者でなくとも、オリジナルの作品を生み出しコミュニケーションを図ることができるアプリケーションを作ろうと思い至り、開発に着手いたしました。
###アプリの特徴
### 使用技術
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
### 機能一覧
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
