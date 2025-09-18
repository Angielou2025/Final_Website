    const form = document.getElementById('adoptionForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const submittedData = document.getElementById('submittedData');

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      Array.from(form.elements).forEach(el => el.disabled = true);

      thankYouMessage.style.display = 'block';

      const data = new FormData(form);
      let html = '<h4>Submitted Details:</h4>';

      const groups = {
        "Basic Information": ['firstName', 'lastName', 'email', 'mobileNumber', 'birthday', 'sex', 'age', 'streetAddress', 'city', 'province'],
        "Personal Reference": ['refFirstName', 'refLastName', 'refEmail', 'refMobileNumber', 'relationship', 'yearsKnown'],
        "Family and Housing": ['housingType', 'homeOwnership', 'landlordInfo', 'petAllergies']
      };

      for (const group in groups) {
        html += `<strong>${group}</strong><br/>`;
        groups[group].forEach(name => {
          let values = data.getAll(name);
          if (values && values.length > 0) {
            values.forEach(value => {
              html += `<p><b>${formatLabel(name)}:</b> ${value}</p>`;
            });
          } else {
            let value = data.get(name);
            if (value) {
              html += `<p><b>${formatLabel(name)}:</b> ${value}</p>`;
            }
          }
        });
        html += '<br/>';
      }

      submittedData.innerHTML = html;
    });

    function formatLabel(name) {
      return name
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
    }

    const ageInput = document.getElementById('age');

    ageInput.addEventListener('input', () => {
      if (ageInput.value < 12) {
        ageInput.setCustomValidity('Age must be 12 or above.');
      } else {
        ageInput.setCustomValidity('');
      }
    });


// This is for ourlink
    function navigateToPage(url) {
  if (url) {
    window.location.href = url; // pupunta sa link na pinili mo
  }
}