const form_vehicle = document.getElementById('form_vehicle');
const submitter = document.getElementById('add_vehicle_button');


submitter.addEventListener('click', async (e) => {
    e.preventDefault();
    const vehicle_formData = new FormData(form_vehicle);
    try {
        await fetch('/vehicle/', {
            method: "POST",
            body: vehicle_formData,
        } ).then((res) => res.json()).then((data) => console.log(data))
    }
    catch (err) {
        console.log(err.message)
    }
})

