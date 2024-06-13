import React, { useState } from 'react';
import GeneratedMessage from './GeneratedMessage';

const Form = () => {
  const [person, setPerson] = useState({
    name: '',
    noOfPerson: '',
    city: '',
    moveDate: '',
    budget: '',
    noOfRooms: '',
  });
  // const [noOfPerson, setNoOfPerson] = useState('');

  const handleName = (e) => {
    console.log(e.target.value);
    setPerson({ ...person, name: e.target.value });
  };
  return (
    <div className=" bg-gray-200 pt-10">
      <h1 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Create Your{' '}
        <span class="text-blue-600 dark:text-blue-500">
          Rental Message With ease
        </span>{' '}
        Using a Simple form.
      </h1>
      <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        This makes it easy to generate proper rental inquiry message quickly
        with proper formatting.
      </p>
      <form>
        <div className="flex flex-row ">
          <div className="flex flex-col border p-7 bg-white m-3 rounded-md min-w-[50%]">
            <h3 class="text-3xl font-bold dark:text-white">
              Generated Your rental Message{' '}
            </h3>
            <select
              id="countries"
              class="bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
            <div className="flex flex-row mt-3 gap-3">
              <div cla>Enter Name</div>
              <input
                value={person.name}
                className="border bg-gray-50 border-gray-300 pl-2 rounded-md"
                type="text"
                onChange={handleName}
              />
            </div>
            <div className="flex flex-row mt-3 gap-3">
              <div cla>Enter No of Person</div>
              <input
                value={person.no}
                className="border bg-gray-50 border-gray-300 pl-2 rounded-md"
                type="text"
                onChange={(e) =>
                  setPerson({ ...person, noOfPerson: e.target.value })
                }
              />
            </div>
            <div>
              <div className="flex flex-row mt-3 gap-3">
                <div cla>Enter City</div>
                <input
                  value={person.city}
                  className="border bg-gray-50 border-gray-300 pl-2 rounded-md"
                  type="text"
                  onChange={(e) =>
                    setPerson({ ...person, city: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <div className="flex flex-row mt-3 gap-3">
                <div cla>Expected Move date</div>
                <input
                  value={person.moveDate}
                  className="border bg-gray-50 border-gray-300 pl-2 rounded-md"
                  type="text"
                  onChange={(e) =>
                    setPerson({ ...person, moveDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <div className="flex flex-row mt-3 gap-3">
                <div cla>Budget</div>
                <input
                  value={person.budget}
                  className="border bg-gray-50 border-gray-300 pl-2 rounded-md"
                  type="text"
                  onChange={(e) =>
                    setPerson({ ...person, budget: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <div className="flex flex-row mt-3 gap-3">
                <div cla>No of Rooms</div>
                <input
                  value={person.noOfPerson}
                  className="border bg-gray-50 border-gray-300 pl-2 rounded-md"
                  type="text"
                  onChange={(e) =>
                    setPerson({ ...person, noOfRooms: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col border p-7 bg-white m-3 rounded-md min-w-[45%]">
            <div>
              <h3 class="text-3xl font-bold  dark:text-white">
                Generated Sample message{' '}
              </h3>

              <GeneratedMessage person={person} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
