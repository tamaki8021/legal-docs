/**
 * Muse App 設定管理
 * 全ての定数をここで一元管理
 */

window.MUSE_CONFIG = {
    // 多言語設定
    languages: {
        ja: {
            name: '日本語',
            code: 'ja'
        },
        en: {
            name: 'English',
            code: 'en'
        }
    },
    
    // メールアドレス設定
    emails: {
        privacy: 'hbk14320@gmail.com',
        support: 'muse-support@example.com',
        general: 'info@example.com',
        webPrivacy: 'privacy@example.com',
        apiPrivacy: 'api-privacy@example.com',
        apiSupport: 'api-support@example.com'
    },
    
    // 会社情報（多言語対応）
    company: {
        ja: {
            name: 'Your Company Name',
            legalName: 'Your Company Name株式会社',
            address: '〒000-0000 東京都○○区○○ ○-○-○',
            phone: '03-0000-0000',
            businessHours: '平日 9:00-18:00'
        },
        en: {
            name: 'Your Company Name',
            legalName: 'Your Company Name Co., Ltd.',
            address: '〒000-0000 Tokyo, Japan',
            phone: '+81-3-0000-0000',
            businessHours: 'Mon-Fri 9:00-18:00 JST',
            incorporation: 'a company incorporated under the laws of Japan'
        }
    },
    
    // 日付・期間設定（多言語対応）
    dates: {
        ja: {
            lastUpdated: '2025年7月2日',
            responsePeriod: '30日以内',
            deletionPeriod: '7営業日以内',
            thirdPartyDeletionPeriod: '30日後'
        },
        en: {
            lastUpdated: 'July 2, 2025',
            responsePeriod: 'within 30 days',
            deletionPeriod: 'within 7 business days',
            thirdPartyDeletionPeriod: '30 days after disconnection'
        }
    },
    
    // アプリ情報
    app: {
        name: 'Muse',
        version: '1.0.0',
        minAge: 13
    },
    
    // 法的要件
    legal: {
        jurisdiction: '当社の本店所在地を管轄する裁判所',
        governingLaw: '日本法',
        regulations: [
            { name: '日本', law: '個人情報保護法（APPI）' },
            { name: '欧州', law: '一般データ保護規則（GDPR）' },
            { name: '米国', law: 'カリフォルニア州消費者プライバシー法（CCPA）' },
            { name: '子ども', law: '児童オンラインプライバシー保護法（COPPA）' }
        ]
    },
    
    // 第三者サービス設定
    thirdPartyServices: {
        spotify: {
            name: 'Spotify',
            privacyUrl: 'https://www.spotify.com/legal/privacy-policy/',
            purposes: ['音楽ストリーミング', 'ログイン', 'パーソナライズ']
        },
        apple: {
            name: 'Apple ID',
            privacyUrl: 'https://www.apple.com/legal/privacy/',
            purposes: ['Apple ログイン', 'プロフィール取得']
        },
        firebase: {
            name: 'Firebase',
            privacyUrl: 'https://firebase.google.com/support/privacy',
            purposes: ['プッシュ通知', '認証']
        },
        googleAnalytics: {
            name: 'Google Analytics',
            privacyUrl: 'https://policies.google.com/privacy',
            purposes: ['利用統計分析']
        }
    }
};

/**
 * DOM要素に設定値を適用する関数
 */
function applyConfig() {
    const config = window.MUSE_CONFIG;
    
    // 現在の言語を取得（URLパスから判定）
    const currentLang = getCurrentLanguage();
    
    // メールアドレスの設定
    Object.keys(config.emails).forEach(emailType => {
        document.querySelectorAll(`[data-email="${emailType}"]`).forEach(element => {
            const email = config.emails[emailType];
            element.textContent = email;
            if (element.tagName === 'A') {
                element.href = `mailto:${email}`;
            }
        });
    });
    
    // 会社情報の設定（多言語対応）
    if (config.company[currentLang]) {
        Object.keys(config.company[currentLang]).forEach(companyField => {
            document.querySelectorAll(`[data-company="${companyField}"]`).forEach(element => {
                element.textContent = config.company[currentLang][companyField];
            });
        });
    }
    
    // 日付・期間の設定（多言語対応）
    if (config.dates[currentLang]) {
        Object.keys(config.dates[currentLang]).forEach(dateField => {
            document.querySelectorAll(`[data-period="${dateField}"]`).forEach(element => {
                element.textContent = config.dates[currentLang][dateField];
            });
        });
        
        // 最終更新日の特別処理
        document.querySelectorAll('[data-date="lastUpdated"]').forEach(element => {
            const prefix = currentLang === 'ja' ? '最終更新日: ' : 'Last Updated: ';
            element.textContent = `${prefix}${config.dates[currentLang].lastUpdated}`;
        });
    }
    
    // アプリ情報の設定
    Object.keys(config.app).forEach(appField => {
        document.querySelectorAll(`[data-app="${appField}"]`).forEach(element => {
            element.textContent = config.app[appField];
        });
    });
}

/**
 * 現在の言語を取得する関数
 */
function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.includes('/ja/')) return 'ja';
    if (path.includes('/en/')) return 'en';
    return 'ja'; // デフォルト
}

// DOM読み込み完了時に設定を適用
document.addEventListener('DOMContentLoaded', applyConfig);

/**
 * 設定値を動的に更新する関数
 * @param {string} path - 設定パス (例: 'emails.privacy')
 * @param {string} value - 新しい値
 */
function updateConfig(path, value) {
    const keys = path.split('.');
    let current = window.MUSE_CONFIG;
    
    // 最後のキー以外をたどる
    for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
    }
    
    // 値を更新
    current[keys[keys.length - 1]] = value;
    
    // 再適用
    applyConfig();
}

/**
 * 設定値を取得する関数
 * @param {string} path - 設定パス
 * @returns {any} 設定値
 */
function getConfig(path) {
    const keys = path.split('.');
    let current = window.MUSE_CONFIG;
    
    for (const key of keys) {
        current = current[key];
        if (current === undefined) return undefined;
    }
    
    return current;
}
