ドラム風おしゃべりボイス（Webアプリ/PWA）

公開方法（スマホのみ）
1. ZIPをスマホでダウンロードし、ファイルアプリで解凍します。
2. GitHubのアカウントを作り、新しい公開リポジトリを作ります。
3. ブラウザの「デスクトップ用サイト」表示でリポジトリの Add file → Upload files を使い、解凍したフォルダ内の7ファイルをルートにアップロードして Commit changes します。
4. Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save。
5. 数分後、表示された https://ユーザー名.github.io/リポジトリ名/ にChromeでアクセスします。
6. Chromeのメニュー「ホーム画面に追加」または「アプリをインストール」を選びます。

注: GitHub Pagesは公開サイトです。個人情報や秘密の文章をリポジトリに保存しないでください。入力した文章はこのアプリではサーバーに送信しません。
読み上げにはAndroid/ChromeのWeb Speech APIを利用します。声やオフライン動作は端末に依存します。
