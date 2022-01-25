const path = require('path')

// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "development";

// ソースマップの利用有無( production のときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: MODE,

  // エントリーポイントの設定
  entry: {
	// 出力するファイル名を bundle.js にするための設定
    bundle: './src/index.ts',
  },
  // 出力の設定
  output: {
    // 出力先のパス（絶対パス）
    path: path.join(__dirname, 'dist'),
    // 出力するファイル名 → bundle.js
    filename: '[name].js',
  },
  // インポートの設定
  resolve: {
    // 拡張子を省略できるようにする
    extensions: ['.ts', '.js'],
  },
  // webpack-dev-server の設定
  devServer: {
    // 静的ファイルの場所
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    // サーバー起動時にブラウザを自動的に起動
    open: true,
  },
  module: {
    rules: [
      // TypeScript ファイルの読み込みとコンパイル
      {
        // 対象となるファイルの拡張子
        test: /\.ts$/,
        // TypeScript をバンドルするための機能
        loader: 'ts-loader',
      },
      // Sass ファイルの読み込みとコンパイル
      {
        // 対象となるファイルの拡張子
        test: /\.s(c|a)ss$/,
        use: [
          // link タグに出力する機能
          "style-loader",
          {
            // CSS をバンドルするための機能
            loader: "css-loader",
            options: {
              // オプションで CSS 内の url() メソッドの取り込みを禁止する
              url: false,
              // ソースマップを有効にする
              sourceMap: enabledSourceMap,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2
            }
          },
          {
            // Sass 記述を解釈するためのローダー
            loader: "sass-loader",
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap
            },
          },
        ],
      },
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|svg)$/,
        // 画像をBase64として取り込む
        type: "asset/inline",
        // 画像を埋め込まず任意のフォルダに保存する
        // type: "asset/resource",
      },
    ],
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],
}
