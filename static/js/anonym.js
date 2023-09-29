const btn = document.querySelector("#button_search");
const id = document.querySelector("#input_factory_number");

id.addEventListener("input", () => {
    if (id.value.length > 0) {
        if (btn.hasAttribute("disabled")) {
            btn.attributes.removeNamedItem("disabled");
        }
    } else {
        btn.setAttribute("disabled", "true");
    }
});

btn.addEventListener("click", () => {
    const table = document.querySelector("#table_anonym");
    if (table.querySelectorAll("tr").length > 1) {
        table.deleteRow(-1);
    }

    fetch("/vehicle/" + id.value)
        .then((res) => res.json())
        .then((data) => {
            let row = table.insertRow(-1);
            let c1 = row.insertCell(0);
            let c2 = row.insertCell(1);
            let c3 = row.insertCell(2);
            let c4 = row.insertCell(3);
            let c5 = row.insertCell(4);
            let c6 = row.insertCell(5);
            let c7 = row.insertCell(6);
            let c8 = row.insertCell(7);
            let c9 = row.insertCell(8);
            let c10 = row.insertCell(9);

            c1.innerText = data.factoryNumberOfMachine;
            c2.innerText = data.modelOfMachine;
            c3.innerText = data.modelOfEngine;
            c4.innerText = data.factoryNumberOfEngine;
            c5.innerText = data.modelOfTransmission;
            c6.innerText = data.factoryNumberOfTransmission;
            c7.innerText = data.modelOfMainAxle;
            c8.innerText = data.factoryNumberOfMainAxle;
            c9.innerText = data.modelOfSteeringAxle;
            c10.innerText = data.factoryNumberOfSteeringAxle;
            id.value = "";
            btn.setAttribute("disabled", "true");
        });
});
