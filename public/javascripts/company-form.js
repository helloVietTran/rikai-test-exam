document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#companyForm");

  form.addEventListener("submit", function (e) {
    const name = form.name.value.trim();
    const address = form.address.value.trim();
    const errors = [];

    if (!name) errors.push("Tên công ty không được để trống.");
    if (!address) errors.push("Địa chỉ không được để trống.");

    if (errors.length > 0) {
      e.preventDefault(); // chặn submit
      const errorBox = document.querySelector("#formError");
      errorBox.innerHTML = errors.map(err => `<div>${err}</div>`).join("");
      errorBox.style.display = "block";
    }
  });
});
