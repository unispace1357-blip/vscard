document.addEventListener("DOMContentLoaded", function () {
  const profileImage = document.getElementById("profileImage");
  const card = document.querySelector(".card");
  const emailLink = document.querySelector('a[href^="mailto:"]');

  if (profileImage) {
    profileImage.addEventListener("error", function () {
      this.src = "https://via.placeholder.com/300x300/f1f5f9/94a3b8?text=PROFILE";
    });
  }

  if (card) {
    card.addEventListener("mouseenter", function () {
      card.style.transform = "translateY(-12px)";
      card.style.boxShadow = "0 32px 70px rgba(0, 0, 0, 0.6)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 24px 55px rgba(0, 0, 0, 0.45)";
    });
  }

  if (emailLink) {
    emailLink.addEventListener("click", function (event) {
      event.preventDefault();

      const emailText = emailLink
        .getAttribute("href")
        .replace("mailto:", "")
        .trim();

      copyToClipboard(emailText);
    });
  }
});

function copyToClipboard(text) {
  if (!text) {
    alert("복사할 이메일 주소가 없습니다.");
    return;
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(function () {
        alert("이메일 주소가 복사되었습니다.");
      })
      .catch(function () {
        fallbackCopyText(text);
      });
  } else {
    fallbackCopyText(text);
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");

  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "-9999px";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    alert("이메일 주소가 복사되었습니다.");
  } catch (error) {
    alert("복사에 실패했습니다. 이메일 주소를 직접 복사해주세요.");
  }

  document.body.removeChild(textArea);
}