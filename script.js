const employeesData = JSON.parse(localStorage.getItem('employeesData')) || [];

const addEmployeeForm = document.getElementById('addEmployeeForm');
const employeeTableBody = document.querySelector('#employeeTable tbody');

function addEmployee() {
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const notesInput = document.getElementById('notes');

    const name = nameInput.value;
    const age = ageInput.value;
    const notes = notesInput.value;

    if (name && age) {
        const newEmployee = { name, age, notes };
        employeesData.push(newEmployee);
        saveDataToLocal();
        displayEmployees();
    }

    nameInput.value = '';
    ageInput.value = '';
    notesInput.value = '';
}

function displayEmployees() {
    employeeTableBody.innerHTML = '';

    employeesData.forEach((employee, index) => {
        const row = employeeTableBody.insertRow();
        row.innerHTML = `<td>${employee.name}</td>
                         <td>${employee.age}</td>
                         <td>${employee.notes}</td>
                         <td><button onclick="editEmployee(${index})">تعديل</button></td>
                         <td><button onclick="confirmDelete(${index})">حذف</button></td>`;
    });
}

function editEmployee(index) {
    const newName = prompt('أدخل اسم الموظف الجديد:', employeesData[index].name);
    const newAge = prompt('أدخل العمر الجديد:', employeesData[index].age);
    const newNotes = prompt('أدخل الملاحظات الجديدة:', employeesData[index].notes);

    if (newName !== null && newAge !== null && newNotes !== null) {
        employeesData[index].name = newName;
        employeesData[index].age = newAge;
        employeesData[index].notes = newNotes;

        saveDataToLocal();
        displayEmployees();
    }
}

function confirmDelete(index) {
    const confirmDelete = confirm('هل أنت متأكد من حذف هذا الموظف؟');
    if (confirmDelete) {
        employeesData.splice(index, 1);
        saveDataToLocal();
        displayEmployees();
    }
}

function saveDataToLocal() {
    localStorage.setItem('employeesData', JSON.stringify(employeesData));
}

window.onload = displayEmployees;
