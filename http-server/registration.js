document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const tableBody = document.getElementById("entriesTableBody");
    const dobError = document.getElementById("dobError");
  
    // Function to calculate age from date of birth
    function calculateAge(dob) {
      const dobDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const ageMonthDiff = today.getMonth() - dobDate.getMonth();
  
      // Adjust age if the current month is before the birth month, or it's the same month but the current day is earlier
      if (ageMonthDiff < 0 || (ageMonthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      return age;
    }
  
    // Validate date of birth
    function validateDOB(dob) {
      const age = calculateAge(dob);
      return age >= 18 && age <= 55;
    }
  
    // Load entries from localStorage
    function loadEntries() {
      const entries = JSON.parse(localStorage.getItem("entries")) || [];
      entries.forEach(entry => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${entry.name}</td>
          <td>${entry.email}</td>
          <td>${entry.password}</td>
          <td>${entry.dob}</td>
          <td>${entry.terms ? 'true' : 'false'}</td>
        `;
        tableBody.appendChild(newRow);
      });
    }
  
    // Save entry to localStorage
    function saveEntry(entry) {
      const entries = JSON.parse(localStorage.getItem("entries")) || [];
      entries.push(entry);
      localStorage.setItem("entries", JSON.stringify(entries));
    }
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();  // Prevent the form from refreshing the page
  
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const dob = document.getElementById("dob").value;
      const terms = document.getElementById("terms").checked;
  
      if (!validateDOB(dob)) {
        dobError.classList.remove("hidden");
        return; // Stop form submission if the age is not valid
      } else {
        dobError.classList.add("hidden");
      }
  
      // Append new entry to the table
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>${dob}</td>
        <td>${terms ? 'true' : 'false'}</td>
      `;
      tableBody.appendChild(newRow);
  
      // Save entry to localStorage
      saveEntry({ name, email, password, dob, terms });
  
      // Reset form after submission
      form.reset();
    });
  
    // Load existing entries when the page loads
    loadEntries();
  });
  