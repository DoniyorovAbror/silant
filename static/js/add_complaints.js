const form_complaints = document.getElementById('form_complaints');
const submitter = document.getElementById('add_complaints_button');


submitter.addEventListener('click', async (e) => {
    e.preventDefault();
    const complaints_formData = new FormData(form_complaints);
    try {
        await fetch('/complaints/', {
            method: "POST",
            body: complaints_formData,
        } ).then((res) => res.json()).then((data) => console.log(data))
    }
    catch (err) {
        console.log(err.message)
    }
})


