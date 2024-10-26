let form = document.getElementById("form");
let taskInput = document.getElementById("taskInput");
let dateInput = document.getElementById("dateInput");
let msg = document.getElementById("msg");
let todotablebody = document.getElementById("todotable").getElementsByTagName("tbody")[0];
var selectedRow = null;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
    onFormSubmit();
});

let formValidation = () => {
    if (taskInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log("success");
        msg.innerHTML = "";
    }
};

let onFormSubmit = () => {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
};

let readFormData = () => {
    var formData = {};
    formData["taskInput"] = taskInput.value;
    formData["dateInput"] = dateInput.value;
    return formData;
};

let insertNewRecord = (data) => {
    var newRow = todotablebody.insertRow(todotablebody.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.taskInput;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.dateInput;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = `<a href="#" class="edit" onclick="onEdit(this)">Edit</a>
                      <a href="#" class="delete" onclick="onDelete(this)">Delete</a>`;
};

let resetForm = () => {
    taskInput.value = "";
    dateInput.value = "";
    selectedRow = null;
};

let onEdit = (td) => {
    selectedRow = td.parentElement.parentElement;
    taskInput.value = selectedRow.cells[0].innerHTML;
    dateInput.value = selectedRow.cells[1].innerHTML;
};

let updateRecord = (formData) => {
    selectedRow.cells[0].innerHTML = formData.taskInput;
    selectedRow.cells[1].innerHTML = formData.dateInput;
};

let onDelete = (td) => {
    if (confirm('Are you sure you want to delete this task?')) {
        var row = td.parentElement.parentElement;
        todotablebody.deleteRow(row.rowIndex - 1); // Adjusted for tbody
        resetForm();
    }
};

let validate = () => {
    let isValid = true;
    if (taskInput.value == "") {
        isValid = false;
        document.getElementById("taskInputValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("taskInputValidationError").classList.contains("hide"))
            document.getElementById("taskInputValidationError").classList.add("hide");
    }
    return isValid;
};