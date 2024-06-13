import React from 'react';

const GeneratedMessage = ({ person }) => {
  return (
    <div className=' text-left'>
      <div className="mt-4">
        <h1 className="text-blue-500 font-bold text-lg">
          Subject: Seeking Accommodation in [City Name]{person.city}
        </h1>
        <p className='mt-3'>
          My name is {person.name}, and I am currently [studying/working] in {person.city}. As I am in the process of seeking accommodation, I am reaching
          out to inquire about any options you may have available that align
          with my requirements.
        </p>
        <p className='mt-3'>
          I am in need of accommodation for {person.noOfPerson} individuals and
          am looking to move in by {person.moveDate}. My budget
          for rent is [budget], and I am open to various types of accommodation
          such as apartments, houses, or basements. Regarding gender preference,
          [state your preference as girls/boys/any].
        </p>
        <p className='mt-3'>
          In terms of amenities, I prefer utilities to be [included/excluded],
          and it would be convenient if the accommodation is situated near
          [nearest bus stop]. For any further inquiries or to schedule a
          viewing, please feel free to contact me at [your contact number].
        </p>
        <p className='mt-3'>
          Additionally, if laundry facilities are available on-site, it would be
          beneficial. Regarding dietary preferences, I adhere to [pure
          veg/non-veg/vegan] options. My preferred location is in [State and
          City], and I require {person.noOfRooms} rooms. Furnishing preferences
          include [furnished/unfurnished].
        </p>
        <p className='mt-3'>
          I would be grateful if you could provide any information on suitable
          options you may have. Thank you for considering my request. Looking
          forward to hearing from you soon.
        </p>
        <p className='mt-3'>Best regards, {person.name}</p>
      </div>
      <div>
        <button className="bg-blue-600 text-white px-3 py-2 rounded-md mt-4">
          Copy Message
        </button>
      </div>
    </div>
  );
};

export default GeneratedMessage;
