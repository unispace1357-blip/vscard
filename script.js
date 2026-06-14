document.addEventListener("DOMContentLoaded", function () {
  const profileImage = document.getElementById("profileImage");
  const card = document.querySelector(".card");
  const emailButtons = document.querySelectorAll(".email-copy");
  const contactSaveButton = document.querySelector(".contact-save");

  const contact = {
    name: "심재윤",
    phone: "010-2491-3498",
    email: "unispace1357@gmail.com",
    job: "Game Business PM · Service Operations"
  };

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

  emailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const email = button.dataset.email || contact.email;
      copyToClipboard(email, "이메일 주소가 복사되었습니다.");
    });
  });

  if (contactSaveButton) {
    contactSaveButton.addEventListener("click", function () {
      downloadContact(contact);
    });
  }
});

function copyToClipboard(text, successMessage) {
  if (!text) {
    alert("복사할 내용이 없습니다.");
    return;
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(function () {
        alert(successMessage);
      })
      .catch(function () {
        fallbackCopyText(text, successMessage);
      });
  } else {
    fallbackCopyText(text, successMessage);
  }
}

function fallbackCopyText(text, successMessage) {
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
    alert(successMessage);
  } catch (error) {
    alert("복사에 실패했습니다. 내용을 직접 복사해주세요.");
  }

  document.body.removeChild(textArea);
}

function downloadContact(contact) {
  const vCardContent = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:" + contact.name + ";;;;",
    "FN:" + contact.name,
    "TITLE:" + contact.job,
    "TEL;TYPE=CELL:" + contact.phone,
    "EMAIL;TYPE=INTERNET:" + contact.email,
    "END:VCARD"
  ].join("
");

  const blob = new Blob([vCardContent], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "sim-jaeyoon-contact.vcf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
