window.addEventListener("DOMContentLoaded", () => {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      const table = document.querySelector("table");
      const addBtn = document.querySelector(".addBtn");
      const addInput = document.querySelector(".addInput");

      addBtn.addEventListener("click", () => {
        fetch(`https://jsonplaceholder.typicode.com/todos/`, {
          method: "POST",
          body: JSON.stringify({
            title: addInput.value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => console.log(json));
      });
      for (let i = 0; i < json.length; i++) {
        // create elemets
        const tr = document.createElement("tr");
        const inputCheck = document.createElement("input");
        const thNum = document.createElement("th");
        const thText = document.createElement("th");
        const btnDel = document.createElement("button");
        const btnPatch = document.createElement("button");
        btnDel.classList.add("btnDel")
        btnPatch.classList.add("btnPatch")

        // elemetns patch
        // console.log(json[i].id);
        inputCheck.type = "checkbox";
        thNum.textContent = json[i].id;
        thText.textContent = json[i].title;
        btnDel.textContent = "delete";
        btnPatch.textContent = "patch";
        //
        btnDel.addEventListener("click", () => {
          fetch(`https://jsonplaceholder.typicode.com/todos/${i + 1}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(() => {
              alert(`пользователь с id: ${i + 1} удален`);
            })
            .catch((err) => console.log(err));
        });
        btnPatch.addEventListener("click", () => {
          const inputAlert = document.createElement("input");
          result = prompt("make changes", "");
          fetch(`https://jsonplaceholder.typicode.com/todos/${i + 1}`, {
            method: "PATCH",
            body: JSON.stringify({
              title: result,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => console.log(json));
        });
        //
        tr.append(inputCheck, thNum, thText, btnPatch, btnDel);
        table.appendChild(tr);
      }
    });
});
