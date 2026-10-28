# ドラム風おしゃべりボイス
Android 8.0以上対応のオフライン音声読み上げアプリ（非公式）。

## APKの作り方
1. パソコンにAndroid Studioをインストールします。
2. `DrumVoice` フォルダを `Open` で開きます。
3. Gradle Sync完了後、`Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)` を選択します。
4. `app/build/outputs/apk/debug/app-debug.apk` をAndroidスマホへ転送してインストールします。

初回ビルド時にはAndroid SDKやGradleのダウンロードにネット接続が必要です。端末に日本語の音声データがない場合はAndroidのテキスト読み上げ設定から追加してください。
