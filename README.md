# dark mode news
[日本語ニュースリーダー](https://github.com/yobukodori/j-news-reader)の対象ニュースサイトをダークモードで表示するユーザースクリプトです。  
### JIJI.COMでの表示の様子
<img src="https://yobukodori.github.io/freedom/image/dark-mode-news-jiji.jpg" style="width:90%">


自作 Firefox アドオンのユーザースクリプトマネージャー [Script for Me](https://addons.mozilla.org/ja/firefox/addon/script-for-me/) 用ですがヘッダ部分を変えれば（実際に試してはいませんが）他のユーザースクリプトマネージャーでも問題なく動くと思います。

日本語ニュースリーダーから記事を開くと以下の場合にダークモードで表示します。

1. 日本語ニュースリーダーのカラースキーム設定が「システム設定に従う」でシステム設定がダークモードである
1. 日本語ニュースリーダーのカラースキーム設定が「ダークモード」である
  
上記のように日本語ニュースリーダーとの連携を前提に作成したスクリプトですが、単独でもシステムのカラースキームがダークである場合にページをダークモードで表示します。  

無理やりにダークモードにしているので一部文字や画像が見えなくなったりしますが、記事本文が読めれば大丈夫のスタンスなので大目に見てやってください。  
ページをダークモードに変更したときは画面右下に黒白の四角いアイコン（ボタン）が表示されるのでクリック（タップ）してダーク／ライトを切り替えられます。

ロイターは react で動的にページを表示していて、ダークモードにするために react を無効にしています。そのため記事の発行日時が `2024年2月15日午前 12:55 UTC 前更新`となるなど不具合が目立ちます。これも記事本文が読めればいいやでスルーしています。  
react を無効にしているためダーク／ライト切り替えボタンでライトモードにしても不具合は残ります。

## Script for Me に登録する方法
下記のように Scripts Resource 欄にコピペして「Save」ボタンを押してください。   
「Enable at startup」にチェックを入れておかないと Firefox が起動するたびに Script for Me をオンにする必要があります。

<img src="https://yobukodori.github.io/freedom/image/dark-mode-news-with-script-for-me.jpg" style="width:90%">
