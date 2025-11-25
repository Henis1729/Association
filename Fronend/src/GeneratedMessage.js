import React, { useEffect } from 'react';

const GeneratedMessage = ({ person }) => {
  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '[Select date]';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Helper function to format gender
  const formatGender = (gender) => {
    if (!gender || gender === 'any') return 'any gender preference';
    return gender === 'male' ? 'male-only' : 'female-only';
  };

  // Helper function to format dietary
  const formatDietary = (dietary) => {
    if (!dietary || dietary === 'any') return '';
    return dietary === 'vegetarian' ? 'vegetarian' : dietary === 'vegan' ? 'vegan' : 'non-vegetarian';
  };

  // Helper function to format accommodation type
  const formatAccommodation = (type) => {
    if (!type || type === 'any') return 'apartment, house, or basement';
    const types = {
      apartment: 'apartment',
      house: 'house',
      basement: 'basement'
    };
    return types[type] || type;
  };

  const city = person.city || '[City Name]';
  const name = person.name || '[Your Name]';
  const studyWork = person.studyWork || 'studying';
  const instituteName = person.instituteName ? ` at ${person.instituteName}` : '';
  const noOfPerson = person.noOfPerson || '1';
  const moveDate = formatDate(person.moveDate);
  const budget = person.budget ? `$${person.budget}/month` : '[Budget]';
  const accommodationType = formatAccommodation(person.accommodationType);
  const gender = formatGender(person.gender);
  const noOfRooms = person.noOfRooms || '1';
  const dietary = formatDietary(person.dietary);
  const contactNumber = person.contactNumber || '[Your Contact Number]';
  const province = person.province ? `, ${person.province}` : '';

  // Generate clean text version for copying (stored in data attribute)
  const generateCleanText = () => {
    let text = `Subject: Seeking Accommodation in ${city}\n\n`;
    text += `Hi! My name is ${name} and I'm ${studyWork}${instituteName} in ${city}${province}. I'm looking for accommodation that matches my requirements.\n\n`;
    text += `Requirements:\n`;
    text += `• ${noOfPerson} person${noOfPerson !== '1' ? 's' : ''}\n`;
    text += `• Move-in: ${moveDate}\n`;
    if (person.budget) text += `• Budget: ${budget}\n`;
    text += `• Type: ${accommodationType}\n`;
    if (person.gender && person.gender !== 'any') text += `• Gender: ${gender}\n`;
    if (person.noOfRooms) text += `• Rooms: ${noOfRooms}\n`;
    if (dietary) text += `• Dietary: ${dietary}\n`;
    text += `\nIf you have any properties available, please contact me at ${contactNumber}. Thank you!\n\n`;
    text += `Best regards,\n${name}`;
    return text;
  };

  useEffect(() => {
    // Store clean text version in data attribute for easy copying
    const messageElement = document.getElementById('generated-message');
    if (messageElement) {
      messageElement.setAttribute('data-copy-text', generateCleanText());
    }
  }, [person]);

  return (
    <div id="generated-message" className="text-gray-800 space-y-3 leading-relaxed">
      <div className="text-blue-600 font-semibold text-lg mb-3 pb-2 border-b border-blue-200">
        🏠 Subject: Seeking Accommodation in {city}
      </div>

      <p className="text-base">
        Hi! 👋 My name is <span className="font-semibold text-gray-900">{name}</span> and I'm {studyWork}{instituteName} in <span className="font-semibold">{city}{province}</span>. I'm looking for accommodation that matches my requirements.
      </p>

      <div className="bg-white/60 rounded-lg p-4 border border-gray-200">
        <p className="font-semibold text-gray-900 mb-2 text-base">
          📋 My Requirements:
        </p>
        <ul className="list-none space-y-1.5 text-sm">
          <li>👥 <span className="font-medium">{noOfPerson} person{noOfPerson !== '1' ? 's' : ''}</span></li>
          <li>📅 <span className="font-medium">Move-in:</span> {moveDate}</li>
          {person.budget && <li>💰 <span className="font-medium">Budget:</span> {budget}</li>}
          <li>🏠 <span className="font-medium">Type:</span> {accommodationType}</li>
          {person.gender && person.gender !== 'any' && <li>⚧️ <span className="font-medium">Gender:</span> {gender}</li>}
          {person.noOfRooms && <li>🚪 <span className="font-medium">Rooms:</span> {noOfRooms}</li>}
          {dietary && <li>🥗 <span className="font-medium">Dietary:</span> {dietary}</li>}
        </ul>
      </div>

      <p className="text-base">
        If you have any properties available, please contact me at <span className="font-semibold text-blue-600">📞 {contactNumber}</span>. Thank you! 🙏
      </p>

      <p className="text-base pt-2 mt-2 border-t border-gray-200">
        Best regards,<br />
        <span className="font-semibold text-gray-900">{name}</span>
      </p>
    </div>
  );
};

export default GeneratedMessage;
