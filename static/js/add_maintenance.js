const form_maintenance = document.getElementById('form_maintenance');
const submitter = document.getElementById('add_maintenance_button');


submitter.addEventListener('click', async (e) => {
    e.preventDefault();
    const maintenance_formData = new FormData(form_maintenance);
    try {
        await fetch('/maintenance/', {
            method: "POST",
            body: maintenance_formData,
        } ).then((res) => res.json()).then((data) => console.log(data))
    }
    catch (err) {
        console.log(err.message)
    }
})


