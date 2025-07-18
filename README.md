# 法的文書管理サイト

各サービスのプライバシーポリシーと利用規約を整理・公開するためのWebサイトです。

## 概要

このプロジェクトは、複数のサービス（Webアプリケーション、Muse アプリ、APIサービス）の法的文書を統一的に管理・公開するためのサイトです。

## ディレクトリ構造

```
legal-docs/
├── index.html              # メインページ（各サービスへのリンク）
├── assets/
│   └── style.css           # 共通スタイルシート
└── services/
    ├── web-app/            # Webアプリケーション
    │   ├── privacy-policy.html
    │   └── terms-of-service.html
    ├── muse-app/           # Muse アプリケーション
    │   ├── privacy-policy.html
    │   └── terms-of-service.html
    └── api-service/        # APIサービス
        ├── privacy-policy.html
        └── terms-of-service.html
```

## 特徴

- **レスポンシブデザイン**: モバイル・デスクトップに対応
- **モダンなUI**: グラデーション、アニメーション効果を使用
- **サービス別整理**: 各サービスごとにディレクトリで分離
- **一元管理**: 1つのindex.htmlから全ての文書にアクセス可能
- **日本語対応**: 日本の法的要件に準拠した内容

## 使用方法

1. Webサーバーにファイルをアップロード
2. index.htmlにアクセス
3. 各サービスのリンクから法的文書を確認

## カスタマイズ

- `assets/style.css`: デザインの変更
- 各HTMLファイル: 文書内容の更新
- `index.html`: サービス一覧の編集

## ライセンス

このテンプレートは自由にご利用いただけます。実際の使用時は、各社の実情に合わせて内容を調整してください。