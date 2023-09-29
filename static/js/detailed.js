const id = document.getElementById("id").textContent.replace(/"/g, "");
const tabs = document.querySelectorAll('input[type="radio"]');
const tables = document.querySelectorAll(".table_wrapper");

const table_detailed_info = document.getElementById("table_detailed_info");
const table_detailed_maintenance = document.getElementById(
    "table_detailed_maintenance"
);
const table_detailed_complaints = document.getElementById(
    "table_detailed_complaints"
);

fetch(`/detailed/${id}`)
    .then((res) => res.json())
    .then((data) => {
        const row_info = table_detailed_info.insertRow(-1);
        const cell_info3 = row_info.insertCell(0);
        cell_info3.innerText =
            data.complaints_machine[0].machine.modelOfMachine.title;
        const cell_info4 = row_info.insertCell(1);
        cell_info4.innerText =
            data.complaints_machine[0].machine.modelOfEngine.title;
        const cell_info5 = row_info.insertCell(2);
        cell_info5.innerText =
            data.complaints_machine[0].machine.factoryNumberOfEngine;
        const cell_info6 = row_info.insertCell(3);
        cell_info6.innerText =
            data.complaints_machine[0].machine.modelOfTransmission.title;
        const cell_info7 = row_info.insertCell(4);
        cell_info7.innerText =
            data.complaints_machine[0].machine.factoryNumberOfTransmission;
        const cell_info8 = row_info.insertCell(5);
        cell_info8.innerText =
            data.complaints_machine[0].machine.modelOfMainAxle.title;
        const cell_info9 = row_info.insertCell(6);
        cell_info9.innerText =
            data.complaints_machine[0].machine.factoryNumberOfMainAxle;
        const cell_info10 = row_info.insertCell(7);
        cell_info10.innerText =
            data.complaints_machine[0].machine.modelOfSteeringAxle.title;
        const cell_info11 = row_info.insertCell(8);
        cell_info11.innerText =
            data.complaints_machine[0].machine.factoryNumberOfSteeringAxle;
        const cell_info12 = row_info.insertCell(9);
        cell_info12.innerText =
            data.complaints_machine[0].machine.dateOfShipment;
        const cell_info13 = row_info.insertCell(10);
        cell_info13.innerText =
            data.complaints_machine[0].machine.client.first_name;
        const cell_info14 = row_info.insertCell(11);
        cell_info14.innerText = data.complaints_machine[0].machine.consumer;
        const cell_info15 = row_info.insertCell(12);
        cell_info15.innerText =
            data.complaints_machine[0].machine.operationAddress;
        const cell_info16 = row_info.insertCell(13);
        cell_info16.innerText =
            data.complaints_machine[0].machine.additionalOptions;
        const cell_info17 = row_info.insertCell(14);
        cell_info17.innerText =
            data.complaints_machine[0].machine.serviceCompany.first_name;

        data.machine.map((item, idx) => {
            const row_maintenance = table_detailed_maintenance.insertRow(-1);
            const cell_maintenance0 = row_maintenance.insertCell(0);
            cell_maintenance0.innerText = idx + 1;
            const cell_maintenance2 = row_maintenance.insertCell(1);
            cell_maintenance2.innerText = item.typeOfMaintenance.title;
            const cell_maintenance3 = row_maintenance.insertCell(2);
            cell_maintenance3.innerText = item.dateOfMaintenance;
            const cell_maintenance4 = row_maintenance.insertCell(3);
            cell_maintenance4.innerText = item.operatingTime;
            const cell_maintenance5 = row_maintenance.insertCell(4);
            cell_maintenance5.innerText = item.numberOrderWork;
            const cell_maintenance6 = row_maintenance.insertCell(5);
            cell_maintenance6.innerText = item.dateOrderWork;
            const cell_maintenance7 = row_maintenance.insertCell(6);
            cell_maintenance7.innerText =
                item.maintenanceServiceCompany.id === item.machine.client.id
                    ? "самостоятельно"
                    : item.maintenanceServiceCompany.first_name;
        });

        data.complaints_machine.map((item, idx) => {
            const row_complaints = table_detailed_complaints.insertRow(-1);
            const cell_complaints0 = row_complaints.insertCell(0);
            cell_complaints0.innerText = idx;
            const cell_complaints2 = row_complaints.insertCell(1);
            cell_complaints2.innerText = item.dateOfFailure;
            const cell_complaints3 = row_complaints.insertCell(2);
            cell_complaints3.innerText = item.operatingTime;
            const cell_complaints4 = row_complaints.insertCell(3);
            cell_complaints4.innerText = item.nodeOfFailure.title;
            const cell_complaints5 = row_complaints.insertCell(4);
            cell_complaints5.innerText = item.descriptionOfFailure;
            const cell_complaints6 = row_complaints.insertCell(5);
            cell_complaints6.innerText = item.recoveryMethod.title;
            const cell_complaints7 = row_complaints.insertCell(6);
            cell_complaints7.innerText = item.usedSpareParts;
            const cell_complaints8 = row_complaints.insertCell(7);
            cell_complaints8.innerText = item.dateOfRecovery;
            const cell_complaints9 = row_complaints.insertCell(8);
            cell_complaints9.innerText = item.downtimeOfMachine;
        });
    });

tabs.forEach((item) => {
    item.addEventListener("click", () => {
        if (item.checked) {
            tables.forEach((table) => {
                if (table.id === item.value) {
                    table.style.display = "block";
                } else {
                    table.style.display = "none";
                }
            });
        }
    });
});
