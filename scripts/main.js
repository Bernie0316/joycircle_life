window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav'); // 抓取您的 nav 元素
    
    // 當網頁下滑超過 100 像素時（可自行調整數字）
    if (window.scrollY > 100) {
      nav.classList.add('show'); // 加上 visible 顯示 nav
    } else {
      nav.classList.remove('show'); // 回到置頂時移除 visible 隱藏 nav
    }
});