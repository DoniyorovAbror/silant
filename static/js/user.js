const tabs = document.querySelectorAll('input[type="radio"]');
const tables = document.querySelectorAll(".table_wrapper");
const vehicle_sort_arrow = document.getElementById("vehicle_sort_button");
const maintenance_sort_arrow = document.getElementById("maintenance_sort_button");
const complaints_sort_arrow = document.getElementById("complaints_sort_button");
let sort_vehicle = false;
let sort_maintenance = true;
let sort_complaints = true;

vehicle_sort_arrow.addEventListener("click", () => {
    while (table_info.querySelectorAll("tr").length !== 1) {
        table_info.deleteRow(-1);
    }
    if (sort_vehicle) {
        sort_vehicle = false;
    } else {
        sort_vehicle = true;
    }
    vehicle();
});

maintenance_sort_arrow.addEventListener("click", () => {
    while (table_maintenance.querySelectorAll("tr").length !== 1) {
        table_maintenance.deleteRow(-1);
    }
    if (sort_maintenance) {
        sort_maintenance = false;
    } else {
        sort_maintenance = true;
    }
    maintenance();
});

complaints_sort_arrow.addEventListener("click", () => {
    while (table_complaints.querySelectorAll("tr").length !== 1) {
        table_complaints.deleteRow(-1);
    }
    if (sort_complaints) {
        sort_complaints = false;
    } else {
        sort_complaints = true;
    }
    complaints();
});

const vehicle = () => {
    const table_info = document.getElementById("table_info");
    if (
        table_info.querySelectorAll("tr").length <= 1 ||
        sort_vehicle !== null
    ) {
        fetch("/vehicle/")
            .then((res) => res.json())
            .then((data) => {
                let vehicle_array = [...data];
                vehicle_array.sort((a, b) => {
                    if (sort_vehicle) {
                        return a.dateOfShipment <= b.dateOfShipment ? -1 : 1;
                    }
                    return a.dateOfShipment <= b.dateOfShipment ? 1 : -1;
                });

                vehicle_array.map((item, idx) => {
                    const row = table_info.insertRow(-1);
                    const c1 = row.insertCell(0);
                    c1.innerText = idx + 1;
                    const c2 = row.insertCell(1);
                    c2.innerHTML = `<a href="machine/${item.modelOfMachine.title}">${item.modelOfMachine.title}</a>`;
                    const c3 = row.insertCell(2);
                    c3.innerHTML = `<a href="vehicle_detailed/${item.factoryNumberOfMachine}">${item.factoryNumberOfMachine}</a>`;
                    const c4 = row.insertCell(3);
                    c4.innerHTML = `<a href="engine/${item.modelOfEngine.title}">${item.modelOfEngine.title}</a>`;
                    const c5 = row.insertCell(4);
                    c5.innerText = item.factoryNumberOfEngine;
                    const c6 = row.insertCell(5);
                    c6.innerHTML = `<a href="transmission/${item.modelOfTransmission.title}">${item.modelOfTransmission.title}</a>`;
                    const c7 = row.insertCell(6);
                    c7.innerText = item.factoryNumberOfTransmission;
                    const c8 = row.insertCell(7);
                    c8.innerHTML = `<a href="mainaxle/${item.modelOfMainAxle.title}">${item.modelOfMainAxle.title}</a>`;
                    const c9 = row.insertCell(8);
                    c9.innerText = item.factoryNumberOfMainAxle;
                    const c10 = row.insertCell(9);
                    c10.innerHTML = `<a href="steeringaxle/${item.modelOfSteeringAxle.title}">${item.modelOfSteeringAxle.title}</a>`;
                    const c11 = row.insertCell(10);
                    c11.innerText = item.factoryNumberOfSteeringAxle;
                    const c12 = row.insertCell(11);
                    c12.innerText = item.dateOfShipment;
                    const c13 = row.insertCell(12);
                    c13.innerHTML = `<a href="account_detail/${item.client.id}">${item.client.first_name}</a>`;
                    const c14 = row.insertCell(13);
                    c14.innerText = item.consumer;
                    const c15 = row.insertCell(14);
                    c15.innerText = item.operationAddress;
                    const c16 = row.insertCell(15);
                    c16.innerText = item.additionalOptions;
                    const c17 = row.insertCell(16);
                    c17.innerHTML = `<a href="account_detail/${item.serviceCompany.id}">${item.serviceCompany.first_name}</a>`;
                });
            });
    }
};

const maintenance = () => {
    const table_maintenance = document.getElementById("table_maintenance");
    if (table_maintenance.querySelectorAll("tr").length <= 1) {
        fetch("/maintenance/")
            .then((res) => res.json())
            .then((data) => {
                let array = [...data];
                array.sort((a, b) => {
                    if (sort_maintenance) {
                        return a.dateOfMaintenance <= b.dateOfMaintenance ? -1 : 1;
                    }
                    return a.dateOfMaintenance <= b.dateOfMaintenance ? 1 : -1;
                });
                array.map((item, idx) => {
                    const row = table_maintenance.insertRow(-1);
                    const c0 = row.insertCell(0);
                    c0.innerText = idx + 1;
                    const c1 = row.insertCell(1);
                    c1.innerText = item.machine.factoryNumberOfMachine;
                    const c2 = row.insertCell(2);
                    c2.innerHTML = `<a href="maintenancetype/${item.typeOfMaintenance.id}">${item.typeOfMaintenance.title}</a>`;
                    const c3 = row.insertCell(3);
                    c3.innerText = item.dateOfMaintenance;
                    const c4 = row.insertCell(4);
                    c4.innerText = item.operatingTime;
                    const c5 = row.insertCell(5);
                    c5.innerText = item.numberOrderWork;
                    const c6 = row.insertCell(6);
                    c6.innerText = item.dateOrderWork;
                    const c7 = row.insertCell(7);
                    c7.innerText =
                        item.maintenanceServiceCompany.id ===
                        item.machine.client.id
                            ? "самостоятельно"
                            : item.maintenanceServiceCompany.first_name;
                });
            });
    }
};

const complaints = () => {
    const table_complaints = document.getElementById("table_complaints");
    if (table_complaints.querySelectorAll("tr").length <= 1) {
        fetch("/complaints/")
            .then((res) => res.json())
            .then((data) => {
                let array = [...data];
                array.sort((a, b) => {
                    if (sort_complaints) {
                        return a.dateOfFailure <= b.dateOfFailure ? -1 : 1;
                    }
                    return a.dateOfFailure <= b.dateOfFailure ? 1 : -1;
                });
                array.map((item, idx) => {
                    const row = table_complaints.insertRow(-1);
                    const c0 = row.insertCell(0);
                    c0.innerText = idx + 1;
                    const c1 = row.insertCell(1);
                    c1.innerText = item.machine.factoryNumberOfMachine;
                    const c2 = row.insertCell(2);
                    c2.innerText = item.dateOfFailure;
                    const c3 = row.insertCell(3);
                    c3.innerText = item.operatingTime;
                    const c4 = row.insertCell(4);
                    c4.innerHTML = `<a href="failuretype/${item.nodeOfFailure.id}">${item.nodeOfFailure.title}</a>`;
                    const c5 = row.insertCell(5);
                    c5.innerText = item.descriptionOfFailure;
                    const c6 = row.insertCell(6);
                    c6.innerHTML = `<a href="recoverymethod/${item.recoveryMethod.id}">${item.recoveryMethod.title}</a>`;
                    const c7 = row.insertCell(7);
                    c7.innerText = item.usedSpareParts;
                    const c8 = row.insertCell(8);
                    c8.innerText = item.dateOfRecovery;
                    const c9 = row.insertCell(9);
                    c9.innerText = item.downtimeOfMachine;
                });
            });
    }
};

tabs.forEach((item) => {
    if (item.checked && item.value === "info") {
        vehicle();
    }

    item.addEventListener("click", () => {
        if (item.checked) {
            tables.forEach((table) => {
                if (table.id === item.value) {
                    table.style.display = "block";
                    if (table.id === "maintenance") {
                        maintenance();
                    }
                    if (table.id === "info") {
                        vehicle();
                    }
                    if (table.id === "complaints") {
                        complaints();
                    }
                } else {
                    table.style.display = "none";
                }
            });
        }
    });
});


const add_buttons = document.querySelectorAll('button')

add_buttons.forEach((button) => {
    if (button.id === 'add_new_vehicle') {
        button.addEventListener('click', () => {
            window.location.href = '/add_new_data/vehicle'
        })
    }
    if (button.id === 'add_new_maintenance') {
        button.addEventListener('click', () => {
            window.location.href = '/add_new_data/maintenance'
        })
    }
    if (button.id === 'add_new_complaints') {
        button.addEventListener('click', () => {
            window.location.href = '/add_new_data/complaints'
        })
    }
})
