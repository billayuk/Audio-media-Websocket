

async function submitForm (e, form, task) {
    e.preventDefault();
    
    const data = buildJsonFormData(form);
    delete data.confirmPassword;
    const url = task === "login" ? "http://localhost:8888/api/login" : "http://localhost:8888/api/register";

    // console.log(data)
    const response = await fetch(url, {
        method:"POST", 
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
     });
    const result = await response.json();

    const heading = document.getElementById("heading");
    if (response.status === 200 || response.status === 201) {
        heading.innerHTML = `${task} successfull!`;
        if (task === "login") {
            const moveA = document.createElement("a");
            moveA.href = "music";
            moveA.click();
        }
    }else {
        console.log(result.error);
        // console.log(typeof result.error)
        heading.innerHTML = typeof result?.error === "string" ? result.error : `${task} not successfull! Please try again`
    }

   
    
}


function buildJsonFormData (form) {

    const jsonFormData = {};

    for (const pair of new FormData(form)){
        jsonFormData[pair[0]] = pair[1]
    }

    return jsonFormData;
}