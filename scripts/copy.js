document.getElementById('copyBtn').addEventListener('click', function() {
  const btn = this;
  const textToCopy = btn.getAttribute('data-text'); // 抓取要複製的文字
  const btnText = btn.querySelector('.btn-text');    // 抓取按鈕內的文字標籤
  
  // 使用現代瀏覽器內建的剪貼簿 API
  navigator.clipboard.writeText(textToCopy).then(() => {
      const originalContent = btnText.innerHTML;      // 儲存原本的按鈕文字
    
      // 【成功複製後的視覺回饋流程】
    btn.classList.add('success');       // 讓按鈕變綠色
    btnText.innerHTML = '複製成功!'; // 更改按鈕文字

    // 1.5 秒後自動恢復成原本的藍色按鈕
    setTimeout(() => {
      btn.classList.remove('success');
      btnText.innerHTML = originalContent; // 恢復原本的按鈕文字
    }, 500);
  }).catch(err => {
    // 萬一瀏覽器不支援或封鎖剪貼簿權限時的防錯處理
    console.error('複製失敗: ', err);
    alert('複製失敗，請手動選取文字複製。');
  });
});
