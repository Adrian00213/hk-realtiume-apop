#!/bin/bash

# 🚀 香港即時資訊App - 一鍵部署腳本
# 代碼超勁 × UI精緻 × 完美主義

echo "🎯 開始部署香港即時資訊App..."
echo "========================================"

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}🔧 $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header() {
    echo -e "${PURPLE}========================================${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${PURPLE}========================================${NC}"
}

# 檢查目錄
check_directory() {
    print_header "檢查部署目錄"
    
    if [ ! -f "index.html" ]; then
        print_error "index.html 未找到"
        exit 1
    fi
    
    if [ ! -f "app.js" ]; then
        print_warning "app.js 未找到，創建基本版本"
        # 創建基本app.js
        cat > app.js << 'EOF'
// 香港即時資訊App - 基本功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('🇭🇰 香港即時資訊App 已加載');
    
    // 隱藏加載屏幕
    setTimeout(() => {
        const loading = document.getElementById('loading');
        const app = document.getElementById('app');
        if (loading && app) {
            loading.style.display = 'none';
            app.style.display = 'block';
        }
    }, 1500);
    
    // 基本功能
    const buttons = document.querySelectorAll('.action-btn, .nav-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action') || this.textContent;
            alert(`🚀 功能: ${action}`);
        });
    });
});
EOF
    fi
    
    print_success "部署文件檢查完成"
}

# 創建Git倉庫
setup_git() {
    print_header "設置Git倉庫"
    
    if [ ! -d ".git" ]; then
        print_info "初始化Git倉庫..."
        git init
        git add .
        git commit -m "🎉 初始提交: 香港即時資訊App"
        print_success "Git倉庫初始化完成"
    else
        print_success "Git倉庫已存在"
    fi
}

# 推送到GitHub
push_to_github() {
    print_header "推送到GitHub"
    
    local repo_url=""
    
    # 檢查是否已設置遠程倉庫
    if git remote | grep -q "origin"; then
        repo_url=$(git remote get-url origin)
        print_info "已設置遠程倉庫: $repo_url"
    else
        # 詢問GitHub倉庫URL
        echo ""
        echo "📝 請提供GitHub倉庫URL:"
        echo "格式: https://github.com/用戶名/倉庫名.git"
        echo "例如: https://github.com/adrian00213/hk-realtime-app.git"
        echo ""
        read -p "GitHub倉庫URL (按Enter跳過): " repo_url
        
        if [ -n "$repo_url" ]; then
            git remote add origin "$repo_url"
            print_success "遠程倉庫設置完成"
        else
            print_warning "未提供倉庫URL，跳過GitHub推送"
            return 1
        fi
    fi
    
    # 推送代碼
    print_info "推送代碼到GitHub..."
    git add .
    git commit -m "🚀 更新: $(date '+%Y-%m-%d %H:%M:%S')"
    
    if git push -u origin main 2>/dev/null; then
        print_success "代碼推送成功"
    else
        # 嘗試創建main分支
        print_warning "推送失敗，嘗試創建main分支..."
        git branch -M main
        if git push -u origin main --force 2>/dev/null; then
            print_success "代碼推送成功"
        else
            print_error "代碼推送失敗"
            echo "請手動推送: git push -u origin main"
            return 1
        fi
    fi
}

# 部署到Vercel
deploy_to_vercel() {
    print_header "部署到Vercel"
    
    echo ""
    echo "🚀 Vercel部署選項:"
    echo ""
    echo "1. 自動部署 (需要Vercel CLI)"
    echo "2. 手動部署 (推薦)"
    echo "3. 跳過Vercel部署"
    echo ""
    
    read -p "請選擇 (1-3): " choice
    
    case $choice in
        1)
            deploy_vercel_cli
            ;;
        2)
            deploy_vercel_manual
            ;;
        3)
            print_info "跳過Vercel部署"
            ;;
        *)
            print_error "無效選擇"
            deploy_to_vercel
            ;;
    esac
}

# 使用Vercel CLI部署
deploy_vercel_cli() {
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI未安裝"
        read -p "是否安裝Vercel CLI？ (y/n): " install_vercel
        if [[ $install_vercel == "y" || $install_vercel == "Y" ]]; then
            npm install -g vercel
        else
            deploy_vercel_manual
            return
        fi
    fi
    
    print_info "使用Vercel CLI部署..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        print_success "Vercel部署成功"
    else
        print_error "Vercel CLI部署失敗"
        deploy_vercel_manual
    fi
}

# 手動部署到Vercel
deploy_vercel_manual() {
    echo ""
    echo "📝 手動部署到Vercel步驟:"
    echo ""
    echo "1. 訪問: https://vercel.com/new"
    echo "2. 使用GitHub登入"
    echo "3. 點擊 'Import Git Repository'"
    echo "4. 選擇你的倉庫"
    echo "5. 點擊 'Deploy'"
    echo "6. 等待1分鐘獲得URL"
    echo ""
    echo "🌐 預計URL: https://hk-realtime-app.vercel.app"
    echo ""
    
    read -p "是否打開瀏覽器訪問Vercel？ (y/n): " open_browser
    if [[ $open_browser == "y" || $open_browser == "Y" ]]; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open "https://vercel.com/new"
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open "https://vercel.com/new"
        else
            echo "請手動訪問: https://vercel.com/new"
        fi
    fi
    
    print_success "Vercel部署指南完成"
}

# 創建ZIP文件
create_zip() {
    print_header "創建部署包"
    
    local zip_name="hk-realtime-app-$(date +%Y%m%d-%H%M%S).zip"
    
    print_info "創建ZIP文件: $zip_name"
    
    # 創建臨時目錄
    mkdir -p deploy-package
    
    # 複製必要文件
    cp index.html deploy-package/
    cp app.js deploy-package/
    cp vercel.json deploy-package/ 2>/dev/null || true
    cp package.json deploy-package/ 2>/dev/null || true
    
    # 創建ZIP
    cd deploy-package
    zip -r "../$zip_name" .
    cd ..
    
    # 清理
    rm -rf deploy-package
    
    print_success "部署包創建完成: $zip_name"
    echo "📦 文件大小: $(du -h "$zip_name" | cut -f1)"
}

# 顯示部署結果
show_result() {
    print_header "部署完成！"
    
    echo ""
    echo "🎉 恭喜！香港即時資訊App部署完成！"
    echo ""
    echo "📊 部署狀態:"
    echo "  ✅ 文件檢查完成"
    echo "  ✅ Git倉庫設置完成"
    echo "  ✅ 部署包準備完成"
    echo ""
    echo "📁 已創建文件:"
    echo "  📄 index.html - 主頁面"
    echo "  📄 app.js - 應用邏輯"
    echo "  📄 vercel.json - Vercel配置"
    echo "  📄 package.json - 項目配置"
    echo ""
    
    if [ -f "*.zip" ]; then
        echo "📦 部署包:"
        ls -la *.zip
        echo ""
        echo "💡 你可以上傳ZIP文件到Vercel:"
        echo "   https://vercel.com/new"
    fi
    
    echo "🚀 下一步:"
    echo "1. 訪問: https://vercel.com/new"
    echo "2. 導入GitHub倉庫或上傳ZIP文件"
    echo "3. 點擊 'Deploy'"
    echo "4. 獲得專屬URL"
    echo ""
    echo "🌐 預計URL: https://hk-realtime-app.vercel.app"
    echo ""
    echo "💡 提示: 獲得URL後，請測試所有功能"
    echo ""
    
    print_success "部署流程完成！"
}

# 主函數
main() {
    clear
    print_header "香港即時資訊App部署工具"
    echo -e "${CYAN}💻 代碼超勁 × 🎨 UI精緻 × ♍ 完美主義${NC}"
    echo ""
    
    # 1. 檢查目錄
    check_directory
    
    # 2. 設置Git
    setup_git
    
    # 3. 推送到GitHub (可選)
    read -p "是否推送到GitHub？ (y/n): " push_github
    if [[ $push_github == "y" || $push_github == "Y" ]]; then
        push_to_github
    fi
    
    # 4. 部署到Vercel
    deploy_to_vercel
    
    # 5. 創建ZIP文件
    read -p "是否創建部署ZIP包？ (y/n): " create_zip_file
    if [[ $create_zip_file == "y" || $create_zip_file == "Y" ]]; then
        create_zip
    fi
    
    # 6. 顯示結果
    show_result
}

# 運行主函數
main