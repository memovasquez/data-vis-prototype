import { writable } from 'svelte/store';

export const userName = writable('', validateUserText);
export const userAge = writable(0);
export const userSex = writable(null);
export const userLocation = writable('', validateUserText);
export const userMonthlyIncome = writable(null);
export const userHouseholdSize = writable(null);


function validateUserText(value) {
    if (typeof value !== 'string') {
      throw new Error('User text must be a string');
    }
    if (value.length > 100) {
      throw new Error('User text must be 100 characters or less');
    }
    return value;
}


