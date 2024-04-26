// http://localhost:3000/transactions

const infoBtn = document.querySelector(".btn");
const contentTable = document.querySelector(".content-table");
const searchBox = document.querySelector(".searchbox");
const tableHead = document.querySelector(".table-head");
const tabelBody = document.querySelector(".table-body");
const thBtns = [...document.querySelectorAll("th")];
const priceBtn = document.querySelector(".price-btn");
const dateBtn = document.querySelector(".date-btn");

let allTransactions = [];

infoBtn.addEventListener("click", () => {
  axios
    .get("http://localhost:3000/transactions")
    .then((res) => {
      allTransactions = res.data;
      // create on DOM
      infoBtn.classList.add("hidden");
      searchBox.classList.remove("hidden");
      tableHead.classList.remove("hidden");
      console.log(allTransactions);
      renderTransactions(allTransactions);
    })
    .catch((err) => console.log(err));
});

function renderTransactions(data) {
  let result = "";
  data.forEach((item) => {
    result += `
        <tr>
        <td>${item.id}</td>
        <td>${item.type}</td>
        <td>${item.price}</td>
        <td>${item.refId}</td>
        <td>${new Date(item.date).toLocaleDateString("fa-IR")} ساعت ${new Date(
      item.date
    ).toLocaleTimeString("fa-IR")}</td></tr>`;

    tabelBody.innerHTML = result;
    contentTable.appendChild(tabelBody);
  });
}

searchBox.addEventListener("input", (e) => {
  const refId = e.target.value;
  axios
    .get(`http://localhost:3000/transactions?refId_like=${refId}`)
    .then((res) => {
      allTransactions = res.data;
      renderTransactions(allTransactions);
    })
    .catch((err) => console.log(err));
});

thBtns.forEach((th) =>
  th.addEventListener("click", () => {
    let column = th.dataset.column;
    let order = th.dataset.order;

    if (order === "desc" && column === "price") {
      th.dataset.order = "asc";
      axios
        .get("http://localhost:3000/transactions?_sort=price&_order=desc")
        .then((res) => {
          allTransactions = res.data;
          renderTransactions(allTransactions);
          priceBtn.classList.remove("fa-chevron-up");
          priceBtn.classList.add("fa-chevron-down");
        })
        .catch((err) => console.log(err));
    }

    if (order === "asc" && column === "price") {
      th.dataset.order = "desc";
      axios
        .get("http://localhost:3000/transactions?_sort=price&_order=asc")
        .then((res) => {
          allTransactions = res.data;
          renderTransactions(allTransactions);
          priceBtn.classList.remove("fa-chevron-down");
          priceBtn.classList.add("fa-chevron-up");
        })
        .catch((err) => console.log(err));
    }

    if (order === "desc" && column === "date") {
      th.dataset.order = "asc";
      axios
        .get("http://localhost:3000/transactions?_sort=date&_order=desc")
        .then((res) => {
          allTransactions = res.data;
          renderTransactions(allTransactions);
          dateBtn.classList.remove("fa-chevron-up");
          dateBtn.classList.add("fa-chevron-down");
        })
        .catch((err) => console.log(err));
    }

    if (order === "asc" && column === "date") {
      th.dataset.order = "desc";
      axios
        .get("http://localhost:3000/transactions?_sort=date&_order=asc")
        .then((res) => {
          allTransactions = res.data;
          renderTransactions(allTransactions);
          dateBtn.classList.remove("fa-chevron-down");
          dateBtn.classList.add("fa-chevron-up");
        })
        .catch((err) => console.log(err));
    }
  })
);
