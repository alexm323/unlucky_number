/** processForm: get data from form and make AJAX call to our API. */
BASE = "http://127.0.0.1:5000/"



async function processForm(evt) {
    let name = $('#name').val()
    let email = $('#email').val()
    let year = $('#year').val()
    let color = $('#color').val()
    colorsList = ['red', 'blue', 'orange', 'green']
    evt.preventDefault()
    if (name.length === 0) {
        $('#name-err').append('<p>Name is a required field</p>')
    }
    else if (year.length === 0 || typeof (year) !== "string" || Number(year) < 1900 || Number(year) > 2000) {
        $('#year-err').append('<p>Year should be a number between 1900 and 2000</p>')

    }
    else if (email.length === 0) {
        $('#email-err').append('<p>Email is a required field</p>')
    }
    else if (!colorsList.includes(color)) {
        $('#color-err').append("<p>Color must be either red, blue, green, or orange</p>")
    }
    else {
        response = await axios.post(BASE + `api/get-lucky-num`, {
            "name": name,
            "email": email,
            "year": year,
            "color": color
        })
        handleResponse(response)
        $("#name-err").empty()
        $("#email-err").empty()
        $("#year-err").empty()
        $("#color-err").empty()
        $('#name').val("")
        $('#email').val("")
        $('#year').val("")
        $('#color').val("")

    }

}


/** handleResponse: deal with response from our lucky-num API. */

function handleResponse(response) {
    lucky_num = response.data.num.num
    lucky_num_fact = response.data.num.fact
    birth_year_fact = response.data.year.fact
    // console.log(`Your lucky number is ${response.data.num.num}`)
    $('#lucky-results').append(`<p> Your lucky number is ${lucky_num}.</p>
    <p>${lucky_num_fact}.</p>
    <p>Your birth year fact is ${birth_year_fact}</p>`)
    // console.log(response.data.num)
}


$("#lucky-form").on("submit", processForm);
