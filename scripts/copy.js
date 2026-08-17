document.getElementById('copyBtn').addEventListener('click', function() {
  const btn = this;
  const textToCopy = btn.getAttribute('data-text');
  const btnText = btn.querySelector('.btn-text');

  // 優先使用 Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {

        const originalContent = btnText.innerHTML;

        // 【成功複製後的視覺回饋流程】
        btn.classList.add('success');
        btnText.innerHTML = '複製成功!';

        // 1.5 秒後自動恢復成原本的藍色按鈕
        setTimeout(() => {
          btn.classList.remove('success');
          btnText.innerHTML = originalContent;
        }, 1500);

      })
      .catch(err => {
        // Clipboard API 失敗，改用 Safari fallback
        console.error('Clipboard API 複製失敗: ', err);
        fallbackCopy(textToCopy, btn, btnText);
      });

  } else {
    // 不支援 Clipboard API，直接使用 fallback
    fallbackCopy(textToCopy, btn, btnText);
  }
});


// iPhone Safari fallback 複製方式
function fallbackCopy(textToCopy, btn, btnText) {
  const textarea = document.createElement('textarea');

  textarea.value = textToCopy;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '0';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);

  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  try {
    const successful = document.execCommand('copy');

    if (successful) {

      const originalContent = btnText.innerHTML;

      // 【成功複製後的視覺回饋流程】
      btn.classList.add('success');
      btnText.innerHTML = '複製成功!';

      // 1.5 秒後自動恢復成原本的藍色按鈕
      setTimeout(() => {
        btn.classList.remove('success');
        btnText.innerHTML = originalContent;
      }, 1500);

    } else {
      throw new Error('複製失敗');
    }

  } catch (err) {
    console.error('複製失敗: ', err);
    alert('複製失敗，請手動選取文字複製。');
  }

  document.body.removeChild(textarea);
}